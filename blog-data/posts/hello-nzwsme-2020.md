---
title: 'nzws.meを書き直しました'
date: '2020-05-20'
tags:
  - 雑記
---

![](https://i.imgur.com/gqpu2Vf.png)

どうもこんにちは、ねじわさです。  
色々あって久しぶりに私のサイトのリニューアルをしました。

[以前のサイト](https://nzwsme-7p4zrxucx.now.sh/) は初版が 2019 年 10 月に完成していたので、
2020 年初の大きなリニューアルになります（ちまちま小さい改修はやってましたが）

## 構成

以前のサイトとほぼ変わらず

- Next.js
- Vercel (ZEIT Now)
- CSS は自前

です。

特に新しい事柄として私が作ったものを大きく表示するようにしました。またブログ機能を追加しました。

## ブログ

また、今回からブログを nzws.me の中で動かすようになりました。Hexo とかではなく自作です。
nextjs はこういった事も簡単にできるので本当に好きです。

なお、以前からあった [blog.nzws.me](https://blog.nzws.me) は nzws.me/blog へデータ移行が完了次第、
同じ記事への 302 リダイレクトを返す予定です。

ブログ自体のデザインは今時（？）のめちゃくちゃシンプルな感じにしました。かっこいいようなただただ面倒くさがりのような...

ただ、ブログの一番上にあるナビゲーションにはちょっとだけこだわり、URL っぽいパンくずリストにしてそれぞれ トップ / 記事一覧 / 今の記事 のリンクが貼ってあります。

## さいごに

実は最近そこまで時間がない（白目）