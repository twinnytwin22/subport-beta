# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i --production
CMD ["node", "/app"]
EXPOSE 3000