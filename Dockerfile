# Use a imagem base do Node.js
FROM node:18 as api


# Defina o diretório de trabalho dentro do contêiner
WORKDIR /api

# Copie o arquivo package.json e o package-lock.json (se existir)
COPY package.json /api

# Instale as dependências do projeto
RUN yarn install

# Copie todo o código fonte para o diretório de trabalho
COPY . .

RUN yarn build

# Exponha a porta que o aplicativo Node.js está ouvindo
# EXPOSE 3000

# Comando a ser executado quando o contêiner for iniciado
CMD node dist/index.js