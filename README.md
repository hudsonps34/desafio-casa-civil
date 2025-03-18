#  Desafio Casa Civil - Sistema de Agendas

Este projeto é um sistema de gerenciamento de agendas, utilizando **FastAPI** no backend e **React** no frontend, rodando dentro de containers **Docker**.

##  Tecnologias Utilizadas

- **Backend:** FastAPI + SQLAlchemy + PostgreSQL
- **Frontend:** React + Material-UI
- **Containers:** Docker + Docker Compose

##  Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

##  Como Rodar o Projeto com Docker

1. **Clone este repositório**:
   sh
   git clone https://github.com/hudsonps34/desafio-casa-civil.git


   cd desafio-casa-civil
   

3. **Inicie os containers com Docker Compose**:
   sh
   docker-compose up --build
   

4. **Acesse os serviços**:
   - **API:** [http://localhost:5000/docs](http://localhost:5000/docs)  
   - **Frontend:** [http://localhost:3000](http://localhost:3000)

5. **Parar os containers** (quando quiser encerrar):
   sh
   docker-compose down
   `

---

##  Estrutura do Projeto


/agendas-api          # Código da API (FastAPI)
  Dockerfile          # Configuração do backend no Docker
  requirements.txt    # Dependências do Python
  api.py              # Código principal do FastAPI

/agendas-frontend     # Código do frontend (React)
  Dockerfile          # Configuração do frontend no Docker
  package.json        # Dependências do frontend

docker-compose.yml    # Configuração dos containers
README.md             # Documentação do projeto


---

## Funcionalidades Implementadas

✔ Criar, editar e excluir agendas  
✔ Listagem das agendas em uma interface web  
✔ Backend rodando com FastAPI e Sqlite  
✔ Frontend com React  

---

##  Melhorias Futuras

- Implementação de login/autenticação
- Notificações por e-mail para eventos

---

##  Autor

Desenvolvido por **Hudson Souza**  
 E-mail: hudson.ps@gmail.com  
 GitHub: [seu-usuario](https://github.com/seu-usuario)
