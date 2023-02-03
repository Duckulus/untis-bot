FROM node:16-slim AS builder
RUN apt-get update
WORKDIR /app/

RUN yarn global add turbo

COPY . .
RUN turbo prune --scope=@untis-bot/server --docker

FROM node:16-slim as installer
RUN apt-get update
WORKDIR /app/

RUN apt-get install -y chromium

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=@untis-bot/server...

FROM node:16-slim as runner
RUN apt-get update
WORKDIR /app/

RUN apt-get install -y chromium

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

COPY --from=installer /app/apps/server/dist/ ./apps/server/dist/
COPY --from=installer /app/packages/api/dist ./packages/api/dist/
COPY --from=installer /app/packages/db/dist ./packages/db/dist
COPY --from=installer /app/packages/db/prisma ./packages/db/prisma
COPY --from=installer /app/packages/env/dist ./packages/env/dist/
COPY --from=installer /app/packages/logger/dist ./packages/logger/dist
COPY --from=installer /app/packages/whatsapp/dist ./packages/whatsapp/dist/

RUN yarn install --production

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV CHROME_BIN="/usr/bin/chromium"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

CMD yarn workspace @untis-bot/server run start
