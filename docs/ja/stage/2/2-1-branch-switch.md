---
title: git branch と git switch
exercises:
  - id: 2-1-e1
    question: git branch は何を表示しますか？
    options:
      - すべてのブランチの一覧。現在のブランチに * マークが付く
      - すべてのコミットの一覧
      - 未コミットの変更
    correct: 0
    explanation: git branch はリポジトリ内のブランチを一覧表示し、* で現在いるブランチを教えてくれます。
    anchor: "#git-branch-でブランチを確認・作成する"
  - id: 2-1-e2
    question: ブランチは本質的に何ですか？
    options:
      - ある commit を指す移動可能なポインタ
      - コードの完全なコピー
      - 独立したフォルダ
    correct: 0
    explanation: ブランチは commit を指すポインタにすぎません。作成してもファイルはコピーされないので、とても軽量です。
    anchor: "#ブランチはポインタ"
  - id: 2-1-e3
    question: 下の練手区で、ブランチ feature を作成して切り替えましょう。
    type: task
    scenario: branching
    goal: git switch -c feature で「作成と切り替え」を一度に行いましょう。
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature は「ブランチ feature の作成＋切り替え」をまとめた操作です。HEAD はこれで feature を指します。
    anchor: "#git-switch-でブランチを切り替える"
  - id: 2-1-e4
    question: 下の練手区で、main ブランチに切り替えましょう。
    type: task
    scenario: branching
    goal: git switch main で main に切り替えましょう。
    checks:
      - type: branchIs
        name: main
    explanation: ブランチの切り替えは HEAD とワークツリーの内容を動かすだけです。コミットはそれぞれのブランチに残ったままです。
    anchor: "#git-switch-でブランチを切り替える"
---

# git branch と git switch

## この課の目標

- git branch でブランチを確認・作成する
- git switch でブランチを切り替える
- ブランチはポインタであり、HEAD が現在位置を指すと理解する

## ブランチはポインタ

ブランチ（branch）は本質的に、**commit を指す移動可能なポインタ**です。ブランチを作成してもファイルはコピーされず、現在の commit を指す名前が1つ増えるだけです：

```bash
git branch feature
```

このコマンドは、現在の HEAD が指す commit を指す名前 `feature` をリポジトリに記録します。その後 `feature` の上でコミットすると、`feature` ポインタも一緒に前進します。

**重要な概念：ブランチに「それぞれのコード」はありません**。ブランチは履歴の中の位置マーカーにすぎません。同じワークツリーのままブランチ名を切り替えると、見えるファイルはそのブランチポインタが指すスナップショットになります。

## git branch でブランチを確認・作成する

```bash
git branch        # すべてのブランチを一覧表示。現在のブランチに * が付く
git branch <名前> # ブランチを作成（切り替えない）
```

一覧の出力は次のようになります：

```
* main
  feature
```

ブランチの作成はポインタを1つ記録するだけで、**切り替えは行われません**。切り替えるには switch を使います。

## git switch でブランチを切り替える

```bash
git switch <名前>    # 既存のブランチに切り替える
git switch -c <名前> # 作成して切り替える（最もよく使う）
```

- `git switch feature`：HEAD が `feature` に移動し、ワークツリーのファイルがそのブランチが指すスナップショットに置き換わる
- `git switch -c feature`：新しいブランチを作成してすぐに切り替える。`git branch feature` + `git switch feature` と同じ

**古い書き方**: `git checkout <名前>` と `git checkout -b <名前>` は同じことを行う旧コマンドです。`git switch` が新しい推奨コマンドで、練手区は両方に対応しています。`git checkout` には「ファイルを復元する」用途もあり、現在は `git restore`（章 1 で学習済み）が担っています。

切り替え時にワークツリーに未コミットの変更があると、git は拒否して先にコミットか stash を促します——スナップショットが切り替わると、変更の置き場所がなくなってしまうからです。

## HEAD は現在位置を指す

**HEAD** は特別なポインタで、「今どのブランチのどの commit にいるか」を表します。`git status` の先頭に表示される `On branch feature` が HEAD の答えです。ブランチの切り替えとは、この HEAD ポインタを動かすことです。

## 練習

<Exercise />

## 練手区

<Playground scenario="branching" />

<LessonProgress />
