FROM node:20 as build

WORKDIR /app
COPY viteDnDNew/package*.json ./
RUN npm install
COPY viteDnDNew/. .

CMD ["npx", "eslint", "src", "--max-warnings=0"]