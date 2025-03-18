'''Configuração da Api'''
import os
import json
from datetime import datetime
from pydantic import BaseModel, field_validator
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, File, UploadFile, Query
from sqlalchemy import create_engine, Column, Integer, String, DateTime, MetaData, Table
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import inspect

#  Inicialização da API
app = FastAPI()

#  Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Configuração do banco de dados (SQLite por padrão)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dados.db")
engine = create_engine(DATABASE_URL, connect_args={
                       "check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
metadata = MetaData()

#  Modelo de Dados


class DadoInput(BaseModel):
    titulo: str
    descricao: str
    dataInicio: datetime
    dataFim: datetime
    local: str
    estadoAtualAgenda: str
    tabela: str

    @field_validator("dataInicio", "dataFim", mode="before")
    @classmethod
    def validar_datas(cls, value):
        if isinstance(value, str):
            return datetime.fromisoformat(value)
        return value

#  Função para criar banco e tabelas automaticamente


def inicializar_banco():
    print(" Verificando e criando tabelas no banco de dados...")
    with engine.connect() as connection:
        if not inspect(engine).has_table("agenda"):
            print(" Criando tabela 'agenda'...")
            tabela = Table(
                "agenda",
                metadata,
                Column("id", Integer, primary_key=True, index=True),
                Column("titulo", String, index=True),
                Column("descricao", String),
                Column("dataInicio", DateTime),
                Column("dataFim", DateTime),
                Column("local", String),
                Column("estadoAtualAgenda", String)
            )
            metadata.create_all(engine)  # 🔹 Cria todas as tabelas definidas
        else:
            print(" Tabela 'agenda' já existe.")


#  Chamar a função ao iniciar a API
inicializar_banco()

#  Gerenciador do Banco de Dados


class DatabaseManager:
    def __init__(self):
        self.engine = engine
        self.metadata = metadata

    def criar_tabela(self, tabela_nome: str):
        """ Cria uma tabela no banco de dados se ela não existir """
        inspector = inspect(self.engine)
        if not inspector.has_table(tabela_nome):
            tabela = Table(
                tabela_nome,
                self.metadata,
                Column("id", Integer, primary_key=True, index=True),
                Column("titulo", String, index=True),
                Column("descricao", String),
                Column("dataInicio", DateTime),
                Column("dataFim", DateTime),
                Column("local", String),
                Column("estadoAtualAgenda", String)
            )
            self.metadata.create_all(self.engine)  # 🔹 Cria a tabela
        return tabela_nome

    def salvar_no_banco(self, dado: DadoInput):
        """ Insere um novo registro na tabela correspondente """
        db = SessionLocal()
        self.criar_tabela(dado.tabela)  # 🔹 Garante que a tabela existe
        tabela = Table(dado.tabela, self.metadata, autoload_with=self.engine)

        insert_stmt = tabela.insert().values(
            titulo=dado.titulo,
            descricao=dado.descricao,
            dataInicio=dado.dataInicio,
            dataFim=dado.dataFim,
            local=dado.local,
            estadoAtualAgenda=dado.estadoAtualAgenda
        )

        db.execute(insert_stmt)
        db.commit()
        db.close()
        return {"mensagem": f"Dado salvo na tabela {dado.tabela}"}

    def listar_dados(self, tabela: str):
        """ Lista todos os registros de uma tabela """
        db = SessionLocal()
        try:
            self.criar_tabela(tabela)  # 🔹 Garante que a tabela existe
            tabela_obj = Table(tabela, self.metadata,
                               autoload_with=self.engine)
            select_stmt = tabela_obj.select()
            result = db.execute(select_stmt)
            dados = result.fetchall()
            colunas = [column.name for column in tabela_obj.columns]
            return [dict(zip(colunas, row)) for row in dados]
        finally:
            db.close()

    def atualizar_agenda(self, agenda_id: int, dado: DadoInput):
        """ Atualiza um registro na tabela """
        db = SessionLocal()
        tabela = Table(dado.tabela, self.metadata, autoload_with=self.engine)

        stmt_check = tabela.select().where(tabela.c.id == agenda_id)
        result_check = db.execute(stmt_check).fetchone()

        if result_check is None:
            db.close()
            raise HTTPException(
                status_code=404, detail=f"Agenda com ID {agenda_id} não encontrada")

        stmt = (
            tabela.update()
            .where(tabela.c.id == agenda_id)
            .values(
                titulo=dado.titulo,
                descricao=dado.descricao,
                dataInicio=dado.dataInicio,
                dataFim=dado.dataFim,
                local=dado.local,
                estadoAtualAgenda=dado.estadoAtualAgenda
            )
        )

        result = db.execute(stmt)
        db.commit()
        db.close()

        if result.rowcount == 0:
            raise HTTPException(
                status_code=400, detail="Nenhuma linha foi afetada na atualização")

        return {"mensagem": f"Agenda ID {agenda_id} atualizada com sucesso"}

    def deletar_agenda(self, agenda_id: int, tabela: str):
        """ Deleta um registro do banco """
        db = SessionLocal()
        tabela_obj = Table(tabela, self.metadata, autoload_with=self.engine)

        stmt = tabela_obj.delete().where(tabela_obj.c.id == agenda_id)
        result = db.execute(stmt)
        db.commit()
        db.close()

        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Agenda não encontrada")

        return {"mensagem": f"Agenda ID {agenda_id} removida com sucesso"}


# Instância do banco
db_manager = DatabaseManager()


@app.post("/upload-arquivo/")
def receber_arquivo(arquivo: UploadFile = File(...)):
    try:
        print(f" Recebendo arquivo: {arquivo.filename}")

        # Lendo conteúdo do arquivo
        conteudo = arquivo.file.read().decode("utf-8")
        print(f" Conteúdo do arquivo recebido:\n{conteudo}")  # 🚀 Debug

        # Certifica-se de que o JSON está correto
        dados = json.loads(conteudo)

        # Pegando `tabela` do JSON (primeiro item)
        # Verifica se `tabela` existe
        if not dados or "tabela" not in dados[0]:
            raise HTTPException(
                status_code=400, detail="Campo 'tabela' ausente no JSON!")

        tabela = dados[0]["tabela"]  # Agora `tabela` vem do JSON
        print(f" Tabela identificada: {tabela}")

        # Salvar cada item no banco
        for dado in dados:
            # Agora não precisamos passar `tabela` manualmente
            dado_obj = DadoInput(**dado)
            db_manager.salvar_no_banco(dado_obj)

        print(f" Dados salvos na tabela {tabela}")
        return {"mensagem": f"Arquivo {arquivo.filename} processado e salvo na tabela {tabela}."}
    except json.JSONDecodeError as e:
        print(f" Erro de JSON: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Erro no JSON: {str(e)}")
    except Exception as e:
        print(f" Erro inesperado: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Endpoints da API
@app.get("/dados/{tabela}/")
def listar_dados(tabela: str):
    try:
        return db_manager.listar_dados(tabela)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/dados/{tabela}/{agenda_id}/")
def atualizar_agenda(tabela: str, agenda_id: int, dado: DadoInput):
    try:
        return db_manager.atualizar_agenda(agenda_id, dado)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/dados/{tabela}/{agenda_id}/")
def deletar_agenda(tabela: str, agenda_id: int):
    try:
        return db_manager.deletar_agenda(agenda_id, tabela)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
