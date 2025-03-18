# 📌 Desafio Casa Civil - Sistema de Agendas

Este projeto é um sistema de gerenciamento de agendas, utilizando **FastAPI** no backend e **React** no frontend, rodando dentro de containers **Docker**.

## 🚀 Tecnologias Utilizadas

- **Backend:** FastAPI + SQLAlchemy + PostgreSQL
- **Frontend:** React + Material-UI
- **Containers:** Docker + Docker Compose

## 🛠 Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Como Rodar o Projeto com Docker

1. **Abra o Prompt de Comando (cmd) no Windows**  
   - Pressione `Win + R`, digite `cmd` e pressione **Enter**.

2. **Clone este repositório**:
   ```sh
   git clone https://github.com/hudsonps34/desafio-casa-civil.git
   ```

3. **Acesse a pasta do projeto**:
   ```sh
   cd desafio-casa-civil
   ```

4. **Inicie os containers com Docker Compose**:
   ```sh
   docker-compose up --build
   ```

5. **Acesse os serviços**:
   - **API:** [http://localhost:5000/docs](http://localhost:5000/docs)  
   - **Frontend:** [http://localhost:3000](http://localhost:3000)

6. **Parar os containers** (quando quiser encerrar):
   ```sh
   docker-compose down
   ```

---

## 📂 Estrutura do Projeto

```
/agendas-api          # Código da API (FastAPI)
  Dockerfile          # Configuração do backend no Docker
  requirements.txt    # Dependências do Python
  api.py              # Código principal do FastAPI

/agendas-frontend     # Código do frontend (React)
  Dockerfile          # Configuração do frontend no Docker
  package.json        # Dependências do frontend

docker-compose.yml    # Configuração dos containers
README.md             # Documentação do projeto
```

---

## ✨ Funcionalidades Implementadas

✔ Criar, editar e excluir agendas  
✔ Listagem das agendas em uma interface web  
✔ Backend rodando com FastAPI e Sqlite  
✔ Frontend com React  

---

## 🛠 Melhorias Futuras

- Implementação de login/autenticação
- Notificações por e-mail para eventos

---

## 👨‍💻 Autor

Desenvolvido por **Hudson Souza**  
📩 E-mail: hudson.ps@gmail.com  
📚 GitHub: [hudsonps34](https://github.com/hudsonps34)

<<<<<<< HEAD
=======

>>>>>>> 42f80af (Atualizando configurações do Docker e requirements.txt)
