# Specify the base image
FROM node:22.7-alpine3.19
# Set the working directory
WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]