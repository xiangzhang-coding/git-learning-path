---
title: 3つのエリアモデル
exercises:
  - id: 0-2-e1
    question: 今まさにエディタで編集しているファイルが置かれているのはどこですか？
    options:
      - working tree（作業ツリー）
      - staging area（ステージングエリア）
      - repository（リポジトリ）
    correct: 0
    explanation: 作業ツリーはファイルを編集する場所。ステージングエリアは次にコミットする変更の一覧、リポジトリはコミット済みの履歴です。
    anchor: "#3つのエリア"
  - id: 0-2-e2
    question: git add は変更をどこからどこへ移しますか？
    options:
      - working tree → staging area
      - staging area → repository
      - repository → working tree
    correct: 0
    explanation: git add は作業ツリーの変更をステージングエリアへ登録します。履歴へ書き込むのは git commit（staging area → repository）です。
    anchor: "#3つのエリア"
  - id: 0-2-e3
    question: git commit は変更をどこからどこへ移しますか？
    options:
      - working tree → staging area
      - staging area → repository
      - 変更を破棄する
    correct: 1
    explanation: commit はステージングされた変更を 1 つのコミットにまとめ、リポジトリ（.git ディレクトリ）へ保存して履歴のスナップショットにします。
    anchor: "#3つのエリア"
  - id: 0-2-e4
    question: ステージングエリアの最大の利点は何ですか？
    options:
      - コミットが面倒になる
      - 変更を分けてコミットでき、履歴がきれいになる
      - 誤りを自動で直してくれる
    correct: 1
    explanation: 無関係な 2 つの変更をしたら、1 つ目を add してコミット、2 つ目を add してコミット、と分けられます。各コミットが読みやすく巻き戻せます。
    anchor: "#なぜステージングエリアがもう1つあるのか"
---

# 3つのエリアモデル

## この課の目標

- working tree・staging area・repository の 3 つのエリアを理解する
- git add と git commit が何を移動するのか理解する
- git status が何を表示しているのか知る

## 3つのエリア

Git はリポジトリを 3 つのエリアに分けます。

- **working tree（作業ツリー）**：編集中のファイル。エディタが変更するのはここ
- **staging area（ステージングエリア、別名 index）**：次回コミットするために選んだ変更の一覧
- **repository（リポジトリ、`.git` ディレクトリ）**：コミット済みの履歴スナップショット

`git status` が表示するのは、まさにこの 3 つのエリアの間の差分です。変更したのに add していないファイル、add したのに commit していないファイル。

## なぜステージングエリアがもう1つあるのか

ステージングエリアがあれば**分割コミット**ができます。無関係な 2 つの機能を一度に変更しても、1 つ目を add してコミット、2 つ目を add してコミット、と分ければ履歴が読みやすく、巻き戻しやすいまま保てます。これがないと、一度の編集が「いろいろ変更」という雑な 1 コミットになってしまいます。

## アニメーション：3つのエリア

ボタンを押してファイルがエリア間を移動するのを見てください。編集は作業ツリーで起き、`git add` がステージングエリアへ登録し、履歴に書き込むのは `git commit` だけです。

<ThreeAreas />

## 練習

<Exercise />

<LessonProgress />
