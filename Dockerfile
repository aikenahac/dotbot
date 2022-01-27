FROM node:alpine

WORKDIR /app

ARG TOKEN
ENV TOKEN=${TOKEN}

RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY package*.json .

RUN npm i

COPY ./ ./


CMD [ "npm", "run", "deploy" ]