FROM node:20-alpine
WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT ["npx", "nodemon"]
