FROM node:20 as build

WORKDIR /app
COPY dndfrontend/package*.json ./
RUN npm install
COPY dndfrontend/. .

CMD ["cd dndfrontend", "npx", "eslint", "src", "--max-warnings=0"]