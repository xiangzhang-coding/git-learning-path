---
title: git rebase でコミットを重ね直す
exercises:
  - id: 4-4-e1
    question: git rebase は何をしますか？
    options:
      - 現在のブランチの分岐点以降のコミットを、対象ブランチの最新コミットの後ろに重ね直す
      - 2 つのブランチを 1 つのコミットにまとめる
      - 現在のブランチの履歴を削除する
    correct: 0
    explanation: rebase は分岐後のコミットを 1 つずつ「リプレイ」して対象ブランチの先頭に重ね、履歴が分岐から一直線になります。
    anchor: "#git-rebase-でコミットを重ね直す"
  - id: 4-4-e2
    question: rebase のあと、コミットのハッシュはどうなりますか？
    options:
      - リプレイされたコミットはすべて新しいハッシュになる（内容は同じ、正体は別）
      - 変わらない
      - 最初の 1 つだけ変わる
    correct: 0
    explanation: ハッシュには親コミットと時刻が含まれるため、リプレイでまったく新しいコミットオブジェクトが生まれます——だから push 済みのブランチを rebase してはいけません。
    anchor: "#git-rebase-でコミットを重ね直す"
  - id: 4-4-e3
    question: 下の練手区で、feature ブランチを main に rebase しましょう。
    type: task
    scenario: rebase
    goal: feature に切り替えて git rebase main を実行し、feature のコミットを main の後ろに落としましょう。
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: rebase 後はコミットグラフが一直線：main の 2 つのコミットが先頭に、feature のコミットが後ろに、マージコミットはありません。
    anchor: "#git-rebase-でコミットを重ね直す"
  - id: 4-4-e4
    question: 下の練手区で、rebase のコンフリクトを中止しましょう。
    type: task
    scenario: rebase-conflict
    goal: feature に切り替えて git rebase main でコンフリクトを発生させ、git rebase --abort で元の状態に戻しましょう。
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: 両方が同じ場所を変更するとコンフリクトします。--abort は rebase 前の状態にすべてを戻します。
    anchor: "#rebase-のコンフリクトと中止"
---

# git rebase でコミットを重ね直す

## この課の目標

- git rebase でブランチのコミットを対象ブランチに重ね直す
- rebase が履歴を書き換え、新しいハッシュを作ることを理解する
- rebase のコンフリクトと --abort を理解する

## git rebase でコミットを重ね直す

```bash
git switch feature
git rebase main
```

rebase は現在のブランチの**分岐点以降**の各コミットを、対象ブランチの最新コミットの後ろに適用し直します：

```
rebase 前（分岐）：          rebase 後（一直線）：
o  A                        o  A
|\                          o  B (main)
| o  B (main)               o  C' (feature、新しいハッシュ)
o |  C (feature)            o  D' (feature、新しいハッシュ)
 \|
  o  D (feature)
```

出力は `Successfully rebased and updated refs/heads/feature.`。コミットグラフが「枝分かれ」から「一直線」になる——これが rebase の核心的な価値です：**履歴がよりきれい**になります。

**重要**：リプレイされたコミットはすべて**新しいハッシュ**です（内容は同じ、正体は別）。つまり rebase は履歴を書き換えています——だから、すでに push してほかの人が使っているブランチを rebase してはいけません。

## rebase と merge の使い分け

| | merge | rebase |
| --- | --- | --- |
| 履歴 | 分岐を残しマージコミットが生まれる | 一直線、分岐なし |
| ハッシュ | 変わらない | 書き換えられる（新しいハッシュ） |
| push 済みブランチ | 安全 | 禁止 |
| 使う場面 | 共有ブランチのマージ | ローカルブランチの整理 |

ワークフローでよくある組み合わせ：ローカルでは rebase で履歴を一直線に整え、push した後は merge で共有ブランチに取り込みます。

## rebase のコンフリクトと中止

rebase は各コミットをリプレイするときコンフリクトが起こることがあります（両方が同じ場所を変更した場合）。このとき git は止まります：

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

解決方法は 2 つあります：

```bash
git rebase --continue   # コンフリクトを解決したら（add のあと）リプレイを続行
git rebase --abort      # この rebase をやめて元の状態に戻す
```

merge のコンフリクトと同じく：ファイルを編集し、マーカーを消し、`git add` して、`--continue` します。処理したくなければ `--abort` で、すべて rebase 前の状態に戻ります。

## 練習

<Exercise />

## 練手区

<Playground scenario="rebase" />

<LessonProgress />
