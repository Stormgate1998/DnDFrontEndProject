FROM node:20 as build

WORKDIR /app
COPY dndfrontend/package*.json ./
RUN npm install
COPY dndfrontend/. .
RUN npm run build

CMD ["npx", "eslint", "src", "--max-warnings=0"]