---
title: git clone でリポジトリをクローン
exercises:
  - id: 3-2-e1
    question: git clone は何をしますか？
    options:
      - リモートのリポジトリをローカルに丸ごと複製し（履歴 + ワークツリー）、origin も自動設定する
      - 最新のコミット 1 つだけをダウンロードする
      - ローカルのリポジトリをリモートにアップロードする
    correct: 0
    explanation: clone は履歴全体を複製し、デフォルトブランチのワークツリーをチェックアウトして、リモートを origin と名付け、トラッキングブランチを作成します。
    anchor: "#git-clone-で一括複製"
  - id: 3-2-e2
    question: clone した後、origin/main とは何ですか？
    options:
      - トラッキングブランチ：ローカルに記録された「リモートの main がどのコミットを指すか」のミラー
      - リモートリポジトリの中のフォルダ
      - ローカルの新しいブランチで、直接コミットできる
    correct: 0
    explanation: refs/remotes/origin/main は読み取り専用のトラッキングミラーで、clone / fetch 時点でのリモートの main の位置を記録します。
    anchor: "#トラッキングブランチ-origin-main"
  - id: 3-2-e3
    question: 下の練手区で、リモートリポジトリをクローンして、クローンしたディレクトリに入りましょう。
    type: task
    scenario: clone
    goal: git clone /origin を実行し、次に cd origin でクローンしたリポジトリのディレクトリに入り、git status で main ブランチにいることを確認しましょう。
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: clone 後に新しいディレクトリへ cd すると、履歴の完全なコピーの中にいます——remote origin は自動で設定済みです。
    anchor: "#git-clone-で一括複製"
---

# git clone でリポジトリをクローン

## この課の目標

- git clone でリモートのリポジトリをローカルに複製する
- origin とトラッキングブランチ origin/main を理解する
- clone 後は cd で新しいディレクトリに入る必要があると理解する

## git clone で一括複製

```bash
git clone /origin          # 現在のディレクトリに origin/ を作ってクローン
git clone /origin マイプロジェクト  # ディレクトリ名を指定することもできる
cd origin                  # クローンしたリポジトリに入る
```

`git clone <アドレス>` は一度で 4 つのことを行います：

1. ローカルに新しいディレクトリを作る（デフォルトではアドレスの最後の部分を名前にする）
2. リモートの**履歴すべて**をコピーする
3. デフォルトブランチ（通常は main）のワークツリーをチェックアウトする
4. リモートを **origin** という名前で自動設定し、トラッキングブランチを作る

clone は「既存のプロジェクトに参加する」ための標準の入り口です。`git init` は不要で、すべてはリモートからやってきます。

## トラッキングブランチ origin/main

clone のとき、git はリモートの各ブランチが指していたコミットを記録し、**トラッキングブランチ（tracking branch）**として保存します：

```
refs/remotes/origin/main   # 読み取り専用のミラー：リモートの main が今いる位置
```

これはローカルブランチ（`refs/heads/main`）とは違います：**あなたのコミットでは動かず**、更新するのは `git fetch` / `git pull` / `git push` だけです。その後いつでも `git log origin/main` で「リモートがどんな状態か」を確認できます。

## 複製と接続

clone は**複製**です：クローンしたリポジトリは完全に独立しており、リモートとの唯一のつながりは origin というアドレスだけです。あなたのコミットは自動ではリモートへ行かず、リモートの新しいコミットも自動では現れません——次の 3 課で学ぶ fetch / push / pull が、この 2 方向の運搬を担当します。

## 練習

<Exercise />

## 練手区

<Playground scenario="clone" />

<LessonProgress />
