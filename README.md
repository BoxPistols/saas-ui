# DesignOps gp

更新: 2023-05-17

Links

- [DesignOps Documents · Wiki](https://github.com/goodpatch/cw_ddj-design/wiki)
- [DesignOps Projects](https://github.com/orgs/goodpatch/projects/12/views/1)

## 概要

このプロジェクト以下の目的で開発されます:

- デザイン起点でのフロントエンド UI 課題への取り組み
- フロント実装起点での UIUX への取り組み
- デザインツールからインブラウザデザインへの移行と検証
- パッケージやライブラリを通じたデザインパターンの可視化
- プロダクト環境に近い UI 状態でのデザイン議論の題材提供
- デザインカタログの自動検出
- アクセシビリティのテスト

このプロジェクトは以下の技術スタックを用いて構築されています:

- Next.js 13.4.2
- TypeScript 5.0.4
- MUI 5 + Material Icon
- Storybook7.0 CSF3.0
- AgGrid React

## 技術スタック

- Next.js -　 Next.js は React のフレームワークで、サーバーサイドレンダリング、ルーティング、ビルドの最適化などが可能なフレームワークです。

- TypeScript

  - TypeScript は JavaScript のスーパーセットで、静的型付けや最新の ECMAScript 機能を提供しています。

- MUI5 + Material Icon

  - MUI5 は React の UI フレームワークで、Material Design のガイドラインに従ったコンポーネントを提供しています。Material Icon は豊富なアイコンセットを提供しています。

- Storybook7.0 CSF3.0

  - Storybook は UI コンポーネントの開発環境で、CSF3.0 形式でのコンポーネントストーリー定義をサポートしています。

- AgGrid
  - AgGrid Design は、React アプリケーションで高機能なデータグリッド（表）を作成するための便利なライブラリです。このライブラリには、豊富な機能と高いパフォーマンスを備えたデータグリッドコンポーネントが含まれています。また、React との統合が容易になるように、AgGrid React という特別なライブラリも提供されています。
  - 柔軟なカラム定義、ソート、フィルタリング、グループ化、集計など、多くのデータグリッドの機能を簡単に実装することができます。また、大量のデータを効率的に処理し、スクロールやページングなどのパフォーマンスを最適化することも可能です。
  - ライフサイクルや状態管理との統合がシームレスに行えます。また、AgGrid は商用製品ですが、AgGrid React ライブラリは無料で使用することができます（ただし、商用利用にはライセンスが必要な場合もあります）。

---

## プロジェクトのセットアップと起動

以下のコマンドで環境をセットアップし、プロジェクトを起動できます。

```shell

# 依存関係のインストール

yarn install

# 開発サーバーの起動

yarn run dev
```

## Storybook の起動

以下のコマンドで Storybook を起動できます。

```shell
yarn run storybook
```

## ビルドとデプロイ

以下のコマンドでビルドとデプロイが行えます。

```shell

# ビルド

yarn run build

# ビルドしたコードの起動

yarn start
```

## Links

以下に各技術スタックの公式ウェブサイトへのリンクを記載します。

- Next.js: [https://nextjs.org/](https://nextjs.org/)
- TypeScript: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- MUI5: [https://mui.com/](https://mui.com/)
- Material Icons: [https://material-ui.com/components/material-icons/](https://material-ui.com/components/material-icons/)
- Storybook: [https://storybook.js.org/](https://storybook.js.org/)
