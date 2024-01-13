FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .

RUN bun install --production

COPY src src
COPY public public

ENV NODE_ENV production
ENTRYPOINT ["bun", "src/index.ts"]

EXPOSE 3000