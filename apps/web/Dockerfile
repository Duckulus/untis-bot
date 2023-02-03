FROM node:16-alpine as builder
RUN apk update
RUN apk add libc6-compat --no-cache
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@untis-bot/web --docker

FROM node:16-alpine as installer
RUN apk update 
RUN apk add libc6-compat --no-cache
RUN apk add curl
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_FRONTEND_URL

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=@untis-bot/web...

FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js
