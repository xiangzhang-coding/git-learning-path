---
title: git init と git status
exercises:
  - id: 1-1-e1
    question: git init は何をするコマンドですか？
    options:
      - 他人のコードをダウンロードする
      - 現在のディレクトリに .git ディレクトリを作成し、そのディレクトリをリポジトリにする
      - 新しいファイルを作成する
    correct: 1
    explanation: git init は現在のディレクトリに空の git リポジトリを初期化します（.git ディレクトリを作成）。以降、このディレクトリとそのサブディレクトリはバージョン管理下に置かれます。
    anchor: "#git-init-でリポジトリを作成"
  - id: 1-1-e2
    question: git status は何を教えてくれますか？
    options:
      - 現在のブランチと、3つのエリア間の差分
      - ファイルの性能指標
      - サーバーの状態
    correct: 0
    explanation: git status は最もよく使われるコマンドの1つです：現在のブランチ、ステージ済みの変更、未ステージの変更、未追跡のファイルを表示します。
    anchor: "#git-status-で状態を見る"
  - id: 1-1-e3
    question: ファイルが git に追跡（tracked）されているとはどういう意味ですか？
    options:
      - そのファイルが .gitignore に載っている
      - そのファイルが git の履歴またはステージングエリアに存在し、git がその変化を継続的に監視する
      - そのファイルがロックされて変更できない
    correct: 1
    explanation: tracked ファイルとは git が認識しているファイル（コミット済みかステージ済み）のことです。untracked ファイルとは、ワークエリアに新しく現れた、git がまだ見たことのないファイルです。
    anchor: "#git-status-で状態を見る"
  - id: 1-1-e4
    question: 下の練手区で、リポジトリを初期化しましょう。
    type: task
    scenario: init
    goal: git init で現在のディレクトリを git リポジトリにし、git status で確認しましょう。
    checks:
      - type: branchIs
        name: main
    explanation: 初期化後、git status に "On branch main" と表示されます。練手区には user.name/user.email がプリセットされているので、そのままコミットできます。
    anchor: "#git-init-でリポジトリを作成"
---

# git init と git status

## この課の目標

- git init でリポジトリを作成する
- git status でリポジトリの状態を把握する
- tracked と untracked のファイルを区別する

## git init でリポジトリを作成

バージョン管理の出発点：「このディレクトリは君が管理してくれ」と git に伝えます。

```bash
git init
```

現在のディレクトリに `.git` ディレクトリが作成されます。中にはオブジェクトのデータベース、インデックス、リファレンスなどが格納され——これがリポジトリ本体です。ワークエリアのファイルには影響しませんが、この瞬間から、そのすべての変化を記録できるようになります。

## git status で状態を見る

`git status` は最もよく使うコマンドで、3つのエリア間の差分をまとめて表示してくれます：

- 今どのブランチにいるか（On branch ...）
- ステージ済みの変更（Changes to be committed）
- 未ステージの変更（Changes not staged for commit）
- 未追跡のファイル（Untracked files）

1つ覚えておきましょう：**git は新しいファイルを自動的には追跡しません**。新しく作ったファイルは `git add` でステージングエリアに入れて初めて、git が継続的に監視してくれます。

## 練習

<Exercise />

## 練手区

<Playground scenario="init" />

<LessonProgress />
