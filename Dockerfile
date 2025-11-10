FROM node:24.11.0

WORKDIR /app

# Copiar apenas arquivos de dependências primeiro (melhor cache)
COPY package.json yarn.lock ./

# Instalar dependências com yarn
RUN yarn install --frozen-lockfile

# Copiar o restante do código
COPY . .

EXPOSE 3000

# Usar yarn para iniciar
CMD ["yarn", "start"]