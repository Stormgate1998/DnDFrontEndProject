FROM node:20 as build

WORKDIR /app
COPY dndfrontend/package*.json ./
RUN npm install
COPY dndfrontend/. .
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npx", "eslint", "src", "--max-warnings=0"]