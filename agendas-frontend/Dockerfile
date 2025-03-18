# 🛠️ Etapa 1: Construção da aplicação (Imagem maior, mas apenas para build)
FROM node:18-alpine AS builder

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos essenciais para instalar dependências
COPY package.json package-lock.json ./

# Instalar dependências sem armazenar cache desnecessário
RUN npm install --omit=dev

# Copiar o restante do código-fonte para o container
COPY . .

# Construir o frontend (gera a pasta `build`)
RUN npm run build


# 🏗️ Etapa 2: Container final otimizado (Imagem menor e mais leve)
FROM node:18-alpine

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos da build final (evita arquivos desnecessários)
COPY --from=builder /app/build ./build

# Expor a porta onde o frontend será servido
EXPOSE 80

# Servir a aplicação estática usando `serve`
CMD ["npx", "serve", "-s", "build", "-l", "80"]
