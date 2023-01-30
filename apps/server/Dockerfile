FROM node:lts-slim AS builder
RUN apt update
WORKDIR /app/

RUN yarn global add turbo

COPY . .
RUN turbo prune --scope=server --docker

FROM node:lts-slim as installer
RUN apt update
WORKDIR /app/

RUN apt install -y chromium

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=server

FROM node:lts-slim as runner
RUN apt update
WORKDIR /app/

RUN apt install -y chromium

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

COPY --from=installer /app/apps/server/dist/ ./apps/server/dist/
COPY --from=installer /app/packages/whatsapp/dist ./packages/whatsapp/dist/
COPY --from=installer /app/packages/db/dist ./packages/db/dist
COPY --from=installer /app/packages/db/prisma ./packages/db/prisma
COPY --from=installer /app/packages/logger/dist ./packages/logger/dist
COPY --from=installer /app/packages/tsconfig/base.json ./packages/tsconfig/bast.json

RUN yarn install --production


ENV CHROME_BIN="/usr/bin/chromium"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

CMD yarn start