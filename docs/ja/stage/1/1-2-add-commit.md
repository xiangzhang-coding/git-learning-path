---
title: git add と git commit
exercises:
  - id: 1-2-e1
    question: git add は変更をどのエリアに入れますか？
    options:
      - working tree
      - staging area（ステージングエリア）
      - repository（リポジトリ）
    correct: 1
    explanation: git add はワークエリアの変更をステージングエリアに登録し、「この変更はコミットする準備ができた」という合図になります。
    anchor: "#git-add-で変更をステージする"
  - id: 1-2-e2
    question: git commit の -m オプションは何をするものですか？
    options:
      - 2つのブランチをマージする
      - 今回のコミットに説明文を書く
      - コミットの作者を変更する
    correct: 1
    explanation: -m はコミットメッセージを指定します。このコミットで何をしたかを記録します。良いコミットメッセージは、他人（未来の自分を含む）のために書くものです。
    anchor: "#git-commit-でスナップショットを保存する"
  - id: 1-2-e3
    question: 下の練手区で、todo.txt をステージしましょう。
    type: task
    scenario: add-commit
    goal: git add todo.txt でファイルをステージングエリアに入れましょう。
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: ステージ後、git status で todo.txt が "Changes to be committed" の下に表示されます。
    anchor: "#git-add-で変更をステージする"
  - id: 1-2-e4
    question: 下の練手区で、todo.txt をコミットしましょう。コミットメッセージに "todo" を含めます。
    type: task
    scenario: add-commit
    goal: 'git add todo.txt の後、git commit -m "feat: add todo" でコミットしましょう。'
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: コミット後、todo.txt はリポジトリの履歴に入ります。なお、hello.txt の変更はワークエリアに残ったままで、コミットされていません——commit がまとめるのはステージングエリアの内容だけだからです。
    anchor: "#git-commit-でスナップショットを保存する"
---

# git add と git commit

## この課の目標

- git add で変更をステージングエリアに入れる
- git commit でスナップショットを保存する
- commit にはステージングエリアの内容だけが含まれると理解する

## git add で変更をステージする

```bash
git add <ファイル名>     # 単一ファイルをステージ
git add .            # 現在のディレクトリ以下の全変更をステージ
```

`git add` はワークエリアの変更を**ステージングエリア（staging area）**に登録します。ステージする対象は選べます：3か所を直しても、そのうち1か所だけを add してコミットすれば、履歴がきれいに保てます。

## git commit でスナップショットを保存する

```bash
git commit -m "feat: add login page"
```

`git commit` は**ステージングエリア**の内容を1つのコミットにまとめて、リポジトリの履歴に書き込みます。コミット1回ごとに：

- プロジェクト全ファイルの完全な**スナップショット**を保存（差分ではない）
- SHA-1 ハッシュで一意の ID を生成（例 `4a2b9c1`）
- 作者・時刻・コミットメッセージを記録

**重要なルール：commit に含まれるのはステージングエリアの内容だけです。** ワークエリアで変更しても add していない分は、このコミットには入りません。

## コミットメッセージの書き方

「何をしたか」を一文で：動詞で始め、時制を統一し、50文字以内に収めます。例：`fix: correct the login validation`。

## 練習

<Exercise />

## 練手区

<Playground scenario="add-commit" />

<LessonProgress />
