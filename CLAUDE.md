# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

嶋村吉洋氏の公式サイト（https://shimamura-yoshihiro.jp/）をリニューアルし、最終的に新しいWordPressテーマとして本番投入するプロジェクト。

## 改修の流れ（`init.md` より）

1. 参考デザイン（本リポジトリのHTML）をGitHub Pagesで公開し、修正要望を受け付ける
2. 修正要望を取り込み、参考デザインをブラッシュアップ
3. ブラッシュアップした参考デザインをWordPressテーマ化する（既存サイトのWordPressテーマのコードを参考にする）
4. 本番に新しいWordPressテーマを登録して公開する

現時点ではフェーズ1〜2の段階で、`shimamura-yoshihiro_renewal.html` という単一の静的HTMLファイル（Fable 5で生成）のみが存在する。ビルドツール・パッケージマネージャ・lint・テストの仕組みは未導入で、Gitリポジトリとしても未初期化。

## ファイル構成

- `init.md` — 改修計画のメモ
- `input/` — 参照資料置き場（現時点では空）
- `shimamura-yoshihiro_renewal.html` — リニューアル後の参考デザイン（単一HTMLファイル、外部CSS/JSファイルなし）

## `shimamura-yoshihiro_renewal.html` の構造

- CSSは`<head>`内の`<style>`ブロックに一括記述。`:root`のCSS変数でゴールド×ダーク基調のカラーパレット（`--ink`, `--gold`, `--gold-bright`, `--ivory`, `--muted`など）とフォント（Cormorant Garamond / Shippori Mincho B1 / Zen Kaku Gothic New、いずれもGoogle Fonts CDN経由）を定義している。
- JSは`</body>`直前の`<script>`ブロックに一括記述。主な機能は以下の通り：
  - プリローダー：`firstview/fv_01〜10.jpg`をプリロードしつつ`#lbarfill`のプログレスバーとカウンターを更新
  - ヒーローのスライドショー：`#slides`内の画像を7秒間隔で切り替え
  - スクロール進捗バー：`#progress`の幅をスクロール量に応じて更新
  - スクロール連動フェードイン：`IntersectionObserver`で`.rv` / `.mask` / `.imgrv`要素に`in`クラスを付与
  - 数値カウントアップ：`IntersectionObserver`で`.cnt`要素（`data-to`が目標値、`data-comma`でカンマ区切り指定）をイージング付きでカウントアップ
  - ティッカー：`#tickertrack`の`innerHTML`を自身に連結して無限スクロールを実現
- 各セクションは`id`属性を持ち、ヘッダー／フッターのナビゲーションのアンカー先になっている：`#greeting`, `#film`, `#investment`, `#books`, `#media`, `#philanthropy`, `#community`
- 画像は現時点ですべて本番サイト（`https://shimamura-yoshihiro.jp/wp-content/themes/simamurahp/image/...`）から直接読み込んでおり、ローカルアセットは存在しない。本番サイトの既存WordPressテーマ名は`simamurahp`。

## 開発上の注意

- ビルド・lint・テストの仕組みは未整備。動作確認はHTMLファイルをブラウザで直接開くか、簡易サーバー（例：`python3 -m http.server`）を使って確認する。
- 本ディレクトリはGitリポジトリとして初期化されていない。GitHub Pagesで公開するにはリポジトリ化が必要。
- フェーズ3（WordPressテーマ化）に着手する際は、本番サイトの既存テーマ（`simamurahp`）のコードを参考にする方針（`init.md`に明記）。本リポジトリには現時点でそのテーマのコードは含まれていない。
