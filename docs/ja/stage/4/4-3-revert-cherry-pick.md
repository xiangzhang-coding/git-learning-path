---
title: git revert と git cherry-pick
exercises:
  - id: 4-3-e1
    question: git revert はどのようにコミットを取り消しますか？
    options:
      - 逆の内容の新しいコミットを作り、履歴は前進したまま
      - そのコミットを直接削除する
      - ブランチのポインタを前に戻す
    correct: 0
    explanation: revert は履歴を書き換えません——対象コミットの変更を打ち消す新しいコミットを 1 つ足します。すでに push したコミットに向いています。
    anchor: "#git-revert-でコミットを取り消す"
  - id: 4-3-e2
    question: git cherry-pick は何に使いますか？
    options:
      - あるブランチの 1 つのコミットを現在のブランチへコピーする
      - 2 つのブランチをマージする
      - ファイルを選んで比較する
    correct: 0
    explanation: cherry-pick は指定したコミットの変更を現在のブランチに適用し、新しいコミットを作ります——他人の特定のコミットだけ欲しいときに便利です。
    anchor: "#git-cherry-pick-でコミットをコピーする"
  - id: 4-3-e3
    question: 下の練手区で、悪いコミットを取り消しましょう。
    type: task
    scenario: revert
    goal: "git revert で直近の悪いコミット（fix: break hello）を取り消し、hello.txt を正しい内容に戻しましょう。"
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert は "Revert \"fix: break hello\"" という新しいコミットを作り、hello.txt は壊される前の内容に戻ります。'
    anchor: "#git-revert-でコミットを取り消す"
  - id: 4-3-e4
    question: 下の練手区で、feature ブランチのコミットを main にコピーしましょう。
    type: task
    scenario: cherry-pick
    goal: main ブランチで git cherry-pick <feature のコミット> を実行し、feature.txt の機能を main に持ってきましょう。
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: cherry-pick でコミットをコピーしても feature ブランチはそのまま残り、main にも中身の同じコミットが 1 つ増えます。
    anchor: "#git-cherry-pick-でコミットをコピーする"
---

# git revert と git cherry-pick

## この課の目標

- git revert で既存のコミットを取り消す
- git cherry-pick でコミットをコピーする
- どちらも履歴を書き換えないことを理解する

## git revert でコミットを取り消す

```bash
git revert <コミット>
```

revert はそのコミットを「削除」するのではなく、**逆の内容の新しいコミットを作ります**：対象コミットの変更を逆に適用し、履歴はそのまま前進します：

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

なぜ reset ではだめなのでしょうか？それは **revert は履歴を書き換えない**からです——ほかの人が clone や pull を済ませたコミットを reset すると、すべての複製が食い違ってしまいます。revert は「打ち消すコミットを 1 つ足す」だけなので、全員にとって安全です。つまり：**ローカルの未 push のミスは reset、push 済みのミスは revert** です。

## git cherry-pick でコミットをコピーする

```bash
git cherry-pick <コミット>   # そのコミットを現在のブランチへコピーする
```

cherry-pick は**特定の 1 つのコミットの変更**を現在のブランチに適用し、新しいコミットを作ります（内容は同じ、ハッシュは異なる）。典型的な場面：feature ブランチでほかの人がバグを直した。feature 全体をマージせず、main でその修正だけを取りたい。

```
o  A ---- B (main) ---- B' (cherry-picked fix)
     \
      C (fix on feature)
```

## revert と cherry-pick の違い

| | revert | cherry-pick |
| --- | --- | --- |
| 向き | 取り消し（逆適用） | コピー（正方向の適用） |
| 使う場面 | コミットにミスがあり消したい | コミットが素晴らしく別のブランチへ運びたい |
| 結果 | 古いコミットを打ち消す新コミット | 古いコミットを複製する新コミット |

どちらも既存の履歴を書き換えず、コンフリクト時は止まって解決を待ちます。

## 練習

<Exercise />

## 練手区

<Playground scenario="revert" />

<LessonProgress />
