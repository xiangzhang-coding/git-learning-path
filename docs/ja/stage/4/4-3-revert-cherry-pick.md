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
    anchor: "#git-cherry-pick-でコミットをコピーする"
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
    anchor: "#git-cherry-pick-でコミットをコピーする"
  - id: 4-3-e5
    question: git bisect は何に使いますか？
    options:
      - 二分探索でバグを最初に導入したコミットを特定する
      - 2 つのブランチの履歴を統合する
      - 直近のコミットを取り消す
    correct: 0
    explanation: bisect は「悪い」コミットと「良い」コミットをマークすると、中間のコミットを繰り返し checkout して確認させ、二分法で「どのコミットから悪くなったか」を素早く特定します。
    anchor: "#git-bisect-で原因コミットを二分探索"
  - id: 4-3-e6
    question: 下の練手区で、bisect を使ってバグを導入したコミットを特定しましょう。
    type: task
    scenario: bisect
    goal: git bisect start、git bisect bad、git bisect good HEAD~3 を実行しましょう。中間のコミットに切り替わるたびに calc.js の add 関数を確認してください——正しければ git bisect good、バグがあれば git bisect bad を実行し、特定が完了するまで続けましょう。
    checks:
      - type: bisectDone
    explanation: 'bisect は「fix: typo in add」のコミットを特定します——add 関数はこのコミットから壊れ始めます。終了後は git bisect reset で元のブランチに戻れます。'
    anchor: "#git-bisect-で原因コミットを二分探索"
---

# git revert と git cherry-pick

## この課の目標

- git revert で既存のコミットを取り消す
- git cherry-pick でコミットをコピーする
- git bisect で原因コミットを二分探索する
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

## git bisect で原因コミットを二分探索

```bash
git bisect start          # 開始
git bisect bad            # 現在の HEAD は悪い
git bisect good <コミット>  # 良いとわかっているコミットをマーク
# 繰り返し：中間のコミットを checkout → テスト → git bisect good / git bisect bad
git bisect reset          # 終了して元のブランチに戻る
```

「ある機能が壊れたが、どのコミットから壊れたのかわからない」——手で履歴を 1 つずつ調べるのは非効率です。bisect は**二分法**を使います：「悪い」コミットと「良い」コミットをマークすると、git はその中間のコミットを自動で checkout します。テストして good か bad かを伝えると、範囲が半分に絞られます。これを繰り返せば、バグを最初に導入したコミットを特定できます。

## 練習

<Exercise />

## 練手区

<Playground scenario="revert" />

<LessonProgress />
