# INARI

## Overview
「INARI」はシンプルさにこだわったNode製のブログ用静的サイトジェネレーターです。

### Description
「INARI」はローカルで記事をビルドしてGitHub-Pagesにデプロイすることでブログを公開することができます。  
記事はマークダウン形式で書くことができるのでとても簡単です。  
テンプレートにはJadeを使用していますので、デザインの編集も容易です。

### Features
- シンプルで軽量なデザインテーマを標準搭載
- Markdownをコンパイル
- Jadeテンプレートを使用

### Usage
`$ inari init <name>`  
ブログを作成します。

`$ inari build`<br>
`_post`ディレクトリ内の.mdファイルをコンパイルします。  
コンパイルされたHTMLはbuildディレクトリ内に保存されます。

`$ inari deploy`<br>
config.jsonのgitで設定したリモートリポジトリにデプロイします。  
デプロイ時に自動で不要ファイルが削除されます。

### Install
Node Package Managerからインストールできます。  
`$ npm install inari -g`  
場合によっては`sudo`で実行して下さい。

### Licence
MIT

### Author
[@p1ch_jp](https://twitter.com/p1ch_jp)