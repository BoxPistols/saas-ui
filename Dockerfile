# Node.js 20のイメージを使用
FROM node:20

# アプリケーションの作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとyarn.lockをコピー
COPY package.json yarn.lock ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN yarn build

# アプリケーションを起動
CMD ["yarn", "start"]
