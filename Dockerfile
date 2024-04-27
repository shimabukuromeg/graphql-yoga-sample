FROM node:20.12-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app

# ビルドステージ
FROM base AS build
# プロジェクトのルートディレクトリからファイルをコピー
# ここでは、/app/apps/backend に必要な package.json が含まれていることを想定しています
COPY . /app

# backend の依存関係のインストール
RUN pnpm --filter backend install --frozen-lockfile

# プロジェクトのビルド
RUN pnpm --filter backend build

# 本番用の node_modules の作成
RUN pnpm deploy --filter=backend --prod /deploy/backend
WORKDIR /deploy/backend
RUN pnpm prisma generate

# 本番ステージ
FROM base AS backend
COPY --from=build /deploy/backend /app/apps/backend
WORKDIR /app/apps/backend
EXPOSE 4000

CMD [ "pnpm", "start" ]