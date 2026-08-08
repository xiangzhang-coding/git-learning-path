---
title: config と help
exercises:
  - id: 0-3-e1
    question: git config --global user.name が影響する範囲はどこまでですか？
    options:
      - 現在のリポジトリだけ
      - 現在のユーザーの全リポジトリ
      - マシン上の全ユーザー
    correct: 1
    explanation: --global は ~/.gitconfig に書き込まれ、現在のユーザーの全リポジトリに適用されます。フラグなしなら現在のリポジトリだけ（local）です。
    anchor: "#最初のコミット前の設定"
  - id: 0-3-e2
    question: 3 つの設定レベルで優先度が最も高いのはどれですか？
    options:
      - system
      - global
      - local
    correct: 2
    explanation: より具体的なレベルほど優先度が高く、local > global > system の順で上書きされます。local は現在のリポジトリだけを対象にします。
    anchor: "#3つの設定レベル"
  - id: 0-3-e3
    question: git commit の使い方の要約をすぐ確認するには？
    options:
      - git commit -h
      - git help commit
      - どちらでもよい
    correct: 2
    explanation: -h は使い方の要約、git help は完全なマニュアルを開きます。どちらも公式の使い方です。
    anchor: "#知らないコマンドに出会ったら"
  - id: 0-3-e4
    question: git config --list が表示するものは？
    options:
      - 現在有効なすべての設定
      - ユーザー設定だけ
      - リポジトリのファイル一覧
    correct: 0
    explanation: --list は有効な全設定（local > global > system をマージした結果）を表示します。設定トラブルの調査の第一歩です。
    anchor: "#最初のコミット前の設定"
---

# config と help

## この課の目標

- user.name と user.email を設定する
- system / global / local の 3 つのレベルを理解する
- help でコマンドの使い方を調べられるようになる

## 最初のコミット前の設定

Git はコミットごとに作者を知る必要があるため、最初に一度だけ設定します。

```bash
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメール"
```

`--global` はすべてのリポジトリに適用されます。`git config --list` で有効な全設定を、`git config user.name` で 1 項目だけを確認できます。

## 3つの設定レベル

設定には幅の異なる 3 つのレベルがあり、**より具体的なほど優先度が高い**。

| レベル | 範囲 | 保存場所 |
| --- | --- | --- |
| system | マシン上の全ユーザー | `/etc/gitconfig` |
| global | 現在のユーザーの全リポジトリ | `~/.gitconfig` |
| local | 現在のリポジトリ | `.git/config` |

有効な値は local → global → system の順で解決されます。

## 知らないコマンドに出会ったら

- `git help <コマンド>`：完全なマニュアルを開く
- `git <コマンド> -h`：使い方の要約をすぐ見る
- `git help --all`：すべてのコマンドを一覧表示

コマンドを忘れても大丈夫。調べ方を知っていれば十分です。

## 練習

<Exercise />

<LessonProgress />
