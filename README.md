# Astro 7 learning service help sample

Astro 7の主要機能を試す、オンライン学習サービスのヘルプセンターです。

- Content Collectionsで管理するFAQ
- FAQ一覧・詳細ページのSSG
- ReactクライアントアイランドによるFAQ検索
- Astro Actionsを使ったSSR問い合わせフォーム
- Cookieに保存した直近の問い合わせ状況を専用ページに表示するServer Island
- Honoによる高度なルーティング
- ブラウザ標準のView Transitions

問い合わせは直近1件をブラウザのCookieに保存し、送信内容をサーバーログへ出力します。

## Development

```sh
pnpm dev
```

## Build

```sh
pnpm build
```
