FROM node:20 as build

WORKDIR /app
COPY viteDnDNew/package*.json ./
RUN npm install
COPY viteDnDNew/. .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY client-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]