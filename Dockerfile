FROM node:latest AS build

WORKDIR /money-fe

COPY . /money-fe

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD  npm run start

