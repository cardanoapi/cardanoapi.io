FROM node:22-alpine AS base

WORKDIR /src

COPY package.json .

RUN npm install --force

COPY . .

CMD npm run dev