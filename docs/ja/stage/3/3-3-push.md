---
title: git push でコミットをプッシュ
exercises:
  - id: 3-3-e1
    question: git push は何をリモートに送りますか？
    options:
      - 現在のブランチにあって、リモートにまだないコミット（その履歴ごと）
      - ワークツリーのすべてのファイル
      - すべてのローカルブランチ
    correct: 0
    explanation: push はローカルのブランチがリモートより先んじているコミットを送り、リモートブランチを同じ位置まで前進させます。
    anchor: "#git-push-でコミットを送信"
  - id: 3-3-e2
    question: git はなぜ non-fast-forward（ファストフォワードではない）push を拒否するのですか？
    options:
      - リモートにローカルにないコミットがあり、上書きすると他人の作業が失われるから
      - リモートのリポジトリが満杯だから
      - ローカルのブランチ名が不正だから
    correct: 0
    explanation: リモートがローカルより先んじていると、push はリモートの新しいコミットを上書きします。git はこの上書きを拒否し、先に pull でマージしてから push するよう求めます。
    anchor: "#non-fast-forward-の-push-は拒否される"
  - id: 3-3-e3
    question: 下の練手区で、ローカルのコミットをリモートにプッシュしましょう。
    type: task
    scenario: push
    goal: main で git push を実行し、ローカルが先んじているコミットをリモートに送りましょう。
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: push 後、出力に To /origin と main -> main と表示されます。リモートのリポジトリはローカルと同じコミットを指すようになります。
    anchor: "#git-push-でコミットを送信"
---

# git push でコミットをプッシュ

## この課の目標

- git push でローカルのコミットをリモートに送る
- push は「先んじている分」だけを送ると理解する
- non-fast-forward の拒否ルールを理解する

## git push でコミットを送信

```bash
git push              # 現在のブランチを origin にプッシュ
git push origin main  # リモートとブランチを明示して指定
```

push は**現在のブランチにあって、リモートにまだないコミット**を送り、リモートブランチをローカルと同じ位置まで前進させます。出力は次のようになります：

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` は、リモートブランチが古いコミットから新しいコミットへ前進したことを示します。push が成功すると、リモートとローカルは同じ履歴を共有します。

**注意**：push は「先んじているコミット」だけを送ります。リモートにないがローカルにもない変更や、ローカルで未コミットの変更は送られません。

## 早送り更新とトラッキングブランチ

push は本質的に、リモートブランチをローカルブランチの位置まで**ファストフォワード**（早送り）させる操作です（ファストフォワードの概念は段階 2 の merge で出てきました）。push が成功すると、ローカルのトラッキングブランチ `origin/main` も一緒に前進します——これは「リモートが今どこにいるか」のミラーで、今はリモートと一致します。

**upstream（上流）**：push が成功すると、ローカルブランチとリモートブランチの間に上下関係ができます——リモートブランチがローカルブランチの upstream になります。以降、`git push` / `git pull` は引数なしでも、どのリモートブランチと同期すればよいかが分かります。

## non-fast-forward の push は拒否される

もし**リモートにローカルにないコミットがある**場合（他の人が先に push した、リモートリポジトリに別の更新があるなど）、そのまま push するとそれらのコミットを上書きすることになり、git は拒否します：

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

解決策はヒントの通りです：先に `git pull` でリモートの新しいコミットをマージしてから、もう一度 push します。

## 練習

<Exercise />

## 練手区

<Playground scenario="push" />

<LessonProgress />
