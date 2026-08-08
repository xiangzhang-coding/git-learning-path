---
title: git fetch と git pull
exercises:
  - id: 3-4-e1
    question: git fetch は何をしますか？
    options:
      - リモートの新しいコミットをダウンロードし、トラッキングブランチを更新するが、ワークツリーには触らない
      - ダウンロードして現在のブランチに直接マージする
      - ローカルのコミットをリモートに送る
    correct: 0
    explanation: fetch は「リモートのミラー」（origin/main）を更新するだけで、ブランチもワークツリーもそのまま——安全にリモートの状態を見られます。
    anchor: "#git-fetch-は見るだけで何も変えない"
  - id: 3-4-e2
    question: git pull と git fetch の関係は？
    options:
      - pull = fetch + merge（リモートの新しいコミットを現在のブランチにマージする）
      - pull = fetch + push
      - 両者はまったく同じ
    correct: 0
    explanation: pull は先に fetch でミラーを更新し、次に origin/main を現在のブランチへマージ（またはファストフォワード）します。
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: 下の練手区で、リモートの新しいコミットを取得しましょう。
    type: task
    scenario: pull-ff
    goal: main で git pull を実行し、リモートに追加されたコミットをファストフォワードでマージしましょう。
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: ローカルに新しいコミットがなければ、pull はファストフォワードします：ワークツリーにリモートで追加されたファイルが直接現れ、履歴は一直線のままです。
    anchor: "#git-pull-fetch-merge"
---

# git fetch と git pull

## この課の目標

- git fetch でワークツリーを変えずにリモートの更新を取得する
- pull = fetch + merge を理解する
- git log origin/main でリモートの状態を確認する

## git fetch は見るだけで何も変えない

```bash
git fetch            # origin の新しいコミットをすべてダウンロード
git fetch origin     # 同じ意味の書き方
```

fetch はリモートの**新しいコミットオブジェクト**をローカルにダウンロードし、トラッキングブランチ `origin/main` を更新します——ただし、**ブランチとワークツリーには触りません**：

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

fetch の後なら、リモートの状態を安全に「見る」ことができます。リモートとローカルがどれだけ離れているかもいつでも確認できます：

```bash
git log origin/main --oneline   # リモート側には何があるか
git log main..origin/main       # リモートにあってローカルにないコミット
```

## git pull = fetch + merge

```bash
git pull             # git fetch + git merge origin/main と同じ
```

pull は 2 ステップをまとめたものです：まず fetch（ミラーの更新）、次に `origin/main` を現在のブランチへマージします。

- **ローカルに新しいコミットがない**：ファストフォワードマージ。ワークツリーが直接更新され、履歴は一直線
- **ローカルにも新しいコミットがある**：マージコミット（merge commit）が生まれ、2 つのブランチの履歴がまとまる
- **両方で同じ場所を変更している**：コンフリクト——解決の流れは段階 2 とまったく同じ（編集 → add → commit）

## どちらを使うべきか

| 場面 | コマンド |
| --- | --- |
| リモートに何が新しいか見たいだけ | `git fetch` |
| リモートの新しいコミットを直接取りたい | `git pull` |
| push が拒否されたとき | 先に `git pull`、それから `git push` |

**黄金のルール**：push の前に pull——先にリモートの更新をマージしてから自分の分を push すれば、non-fast-forward で拒否されることはありません。

## 練習

<Exercise />

## 練手区

<Playground scenario="pull" />

<LessonProgress />
