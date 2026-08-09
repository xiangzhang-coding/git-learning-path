---
title: git log と git diff
exercises:
  - id: 1-3-e1
    question: git log --oneline は何を表示しますか？
    options:
      - 1コミットにつき1行：短いハッシュ + コミットメッセージ
      - ファイルの全内容
      - 現在のブランチ名
    correct: 0
    explanation: git log はコミット履歴を一覧表示します。--oneline は1行に圧縮し（短いハッシュ + コミットメッセージ）、日常で最もよく使う確認方法です。
    anchor: "#git-log-で履歴を見る"
  - id: 1-3-e2
    question: git diff は何を表示しますか？
    options:
      - ワークエリアとステージングエリアの内容の差分
      - コミット履歴の差分
      - ファイルの文字コードの差分
    correct: 0
    explanation: git diff はワークエリアとステージングエリアを比較します（未ステージの変更）。git diff --staged はステージングエリアと HEAD を比較します（ステージ済みの変更）。
    anchor: "#git-diff-で変更を見る"
  - id: 1-3-e3
    question: 下の練手区で、src/a.js を変更してコミットしましょう。コミットメッセージに "fix" を含めます。
    type: task
    scenario: history
    goal: 'src/a.js の const a = 2 を const a = 3 に変更し、add してから "fix: bump a" というメッセージでコミットしましょう。'
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: コミット後、履歴は5回のコミットになります。git log --oneline の1行目があなたの新しいコミットです。
    anchor: "#git-log-で履歴を見る"
  - id: 1-3-e4
    question: git show <コミット> は何を表示しますか？
    options:
      - そのコミットの完全な詳細：作者、日付、コミットメッセージ、変更の diff
      - リポジトリ内の全ファイルの一覧
      - 現在のブランチのコミットグラフ
    correct: 0
    explanation: git show は 1 つのコミットを展開します：先頭は作者と日付、その下は親コミットとの diff——「あるコミットで何が変わったのか」を確認する標準的な方法です。
    anchor: "#git-show-でコミットを確認"
  - id: 1-3-e5
    question: git blame <ファイル> は何に使いますか？
    options:
      - 行ごとに、その行を最後に変更したコミットと作者を表示する
      - ファイルから空行を削除する
      - 2 つのファイルの差分を比較する
    correct: 0
    explanation: blame は行ごとに責任を追跡します：各行の先頭に「最後に変更したコミットの短いハッシュ + 作者」が付きます。「この行は誰が、どのコミットで変えたのか」を調べたいときに役立ちます。
    anchor: "#git-blame-で行の由来を追う"
---

# git log と git diff

## この課の目標

- git log でコミット履歴を確認する
- git diff で変更内容を確認する
- git show で個々のコミットの詳細を確認する
- git blame で各行の由来を追う
- 短いハッシュとスナップショットモデルを理解する

## git log で履歴を見る

```bash
git log              # 完全な履歴（作者・日付を含む）
git log --oneline    # 1コミット1行：短いハッシュ + メッセージ
```

各コミットの SHA-1 ハッシュはその身分証明書です。`git log --oneline` に表示されるのは先頭7桁の短いハッシュで、コミットを一意に特定するのに十分です。

## git diff で変更を見る

```bash
git diff             # ワークエリア vs ステージングエリア（まだ add していない変更）
git diff --staged    # ステージングエリア vs HEAD（add 済みでまだ commit していない変更）
```

出力で `-` で始まる行は削除された行、`+` で始まる行は追加された行です。コミット前に diff で自分の変更を確認するのは標準的な習慣です。

## git show でコミットを確認

```bash
git show <コミット>    # 特定のコミットの詳細を見る
git show HEAD     # 直近のコミット
```

`git show` は 1 つのコミットを展開します：先頭にコミットハッシュ、作者、日付、コミットメッセージ、その下に親コミットとの diff——まさに「このコミットで何が変わったのか」に答えます。git log のハッシュと組み合わせれば、任意の変更を遡って確認できます。

## git blame で行の由来を追う

```bash
git blame <ファイル>   # 行ごとに由来を表示する
```

blame はファイルの各行に接頭辞を付けます：**その行を最後に変更したコミットの短いハッシュ + 作者**。「この行は誰が変えたのか、どのコミットで導入されたのか」を知りたいとき、blame ですぐにわかります——バグ調査の定番の起点です。

## スナップショットモデル

コミット1回ごとに保存されるのは**完全なスナップショット**であり、差分ではありません。git はコンテンツを SHA-1 でハッシュ化します——内容が同じならハッシュも同じ。そのため、ハッシュ自体で完全性を検証でき、重複を排除して格納できます。これが「分散型」が成立する前提でもあります：どのクローンでも履歴全体が完全に再構築できます。


<SnapshotVisual />

## 練習

<Exercise />

## 練手区

<Playground scenario="history" />

<LessonProgress />
