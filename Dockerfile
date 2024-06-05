FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NEST_HOST=
ENV NEST_PORT=
ENV NEST_USERNAME=
ENV NEST_PASSWORD=
ENV NEST_DATABASE=
ENV NEST_SECRET_TOKEN=

expose 3000

CMD [ "npm", "run", "start:dev" ]