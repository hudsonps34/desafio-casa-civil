# Usar uma imagem oficial do Python
FROM python:3.10

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo de dependências primeiro para otimizar cache
COPY requirements.txt .

# Instalar dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo o código da API para dentro do container
COPY . .

# Expor a porta onde a API irá rodar
EXPOSE 5000

# Comando correto para rodar o FastAPI com Uvicorn
CMD ["uvicorn", "Api:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]
