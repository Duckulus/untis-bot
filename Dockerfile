FROM node:lts-slim

RUN apt update

RUN apt install -y chromium

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

ENV CHROME_BIN="/usr/bin/chromium"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

CMD yarn start