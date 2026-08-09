---
title: git reset と reflog
exercises:
  - id: 4-2-e1
    question: git reset --hard は何をしますか？
    options:
      - HEAD・インデックス・ワークツリーをすべて対象の commit に戻し、途中のコミットと変更を捨てる
      - 最後のコミットのメッセージだけを取り消す
      - 変更をリモートにプッシュする
    correct: 0
    explanation: --hard は 3 つをまとめて戻す操作です：ブランチのポインタ、ステージングエリア、ワークツリーがすべて対象の commit の状態に戻ります——危険ですがよく使われます。
    anchor: "#git-reset-で-HEAD-を移動する"
  - id: 4-2-e2
    question: reset で捨てたコミットは取り戻せますか？
    options:
      - 取り戻せる。git reflog でハッシュを見つけて reset し直せばいい
      - 取り戻せない。永遠に消える
      - リモートから clone するしかない
    correct: 0
    explanation: git はコミットオブジェクトをすぐには削除しません。reflog は HEAD の移動をすべて記録しているので、古いハッシュを見つければ復元できます。
    anchor: "#git-reflog-で失ったコミットを取り戻す"
  - id: 4-2-e3
    question: 下の練手区で、直近のコミットを取り消しましょう。
    type: task
    scenario: reset
    goal: git reset --hard HEAD~1 を実行して、直近のコミット（その変更も含めて）を取り消しましょう。
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1 はブランチを一歩後退させ、ワークツリーも前の状態に戻します。
    anchor: "#git-reset-で-HEAD-を移動する"
  - id: 4-2-e4
    question: 下の練手区で、reflog を使って reset したコミットを取り戻しましょう。
    type: task
    scenario: reset
    goal: "git reflog でさきほど reset したコミット（メッセージに \"break\" を含む）を見つけ、git reset --hard で復元しましょう。"
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: reflog は HEAD の完全な履歴を表示します。reset する前のコミットハッシュを見つけて reset --hard すれば、すべてが元通りになります。
    anchor: "#git-reflog-で失ったコミットを取り戻す"
  - id: 4-2-e5
    question: git clean の役割は何ですか？
    options:
      - 未追跡ファイルを削除する（実際に削除するには -f が必要、-n はプレビュー）
      - すべてのコミット履歴を空にする
      - 追跡済みファイルの変更を元に戻す
    correct: 0
    explanation: clean は未追跡ファイルだけを扱います。デフォルトでは直接削除を拒否し（clean.requireForce）、-n でプレビュー、-f で実行します——削除したファイルは git では取り戻せません。
    anchor: "#git-clean-で未追跡ファイルを削除"
  - id: 4-2-e6
    question: 下の練手区で、未追跡ファイルをすべて削除しましょう。
    type: task
    scenario: clean
    goal: まず git clean -n でプレビューし、次に git clean -f で未追跡ファイル（scratch.txt と todo.tmp）を削除しましょう。
    checks:
      - type: workdirClean
    explanation: clean -f は未追跡ファイルを削除します。ワークツリーにコミット済みのファイルだけが残ればタスクはクリアです。
    anchor: "#git-clean-で未追跡ファイルを削除"
---

# git reset と reflog

## この課の目標

- git reset で HEAD と状態を移動する
- --hard / 混合（mixed）/ --soft の違いを理解する
- git reflog で reset されたコミットを取り戻す
- git clean で未追跡ファイルを削除する

## git reset で HEAD を移動する

```bash
git reset --hard <コミット>   # HEAD・インデックス・ワークツリーをすべて戻す
git reset <コミット>          # HEAD とインデックスを戻し、ワークツリーは残す
git reset --soft <コミット>   # HEAD だけ動かし、インデックスとワークツリーはそのまま
```

**reset は「引き返す」こと**です：ブランチのポインタを任意のコミットへ移動します。3 つのモードの違いは「影響の及ぶ範囲」です：

| モード | HEAD | インデックス（ステージングエリア） | ワークツリー |
| --- | --- | --- | --- |
| `--soft` | 移動 | 残す | 残す |
| デフォルト（mixed） | 移動 | リセット | 残す |
| `--hard` | 移動 | リセット | リセット |

`--hard` は最もよく使われ、最も危険です：途中のすべてのコミットと未コミットの変更がまとめて消えます（ワークツリーは直接上書きされます）。`--hard` のあと、出力 `HEAD is now at <短いハッシュ> <メッセージ>` で今どこにいるのかがわかります。


<ResetVisual />

## git reflog で失ったコミットを取り戻す

```bash
git reflog
```

**reflog（reference log）は HEAD の完全な移動記録**です——現在のブランチの履歴だけでなく、「あなたの HEAD がどこを訪れたか」を記録しています：

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

reset で捨てられたコミットは**削除されていません**。どのブランチからも指されていないだけです。reflog でハッシュを見つけて `git reset --hard <ハッシュ>` すれば完全に取り戻せます。これが git の「後悔薬」です：このマシンで行われた操作なら、ほとんどすべて復元できます。

## git clean で未追跡ファイルを削除

```bash
git clean -n       # プレビュー：削除されるファイルを一覧表示
git clean -f       # 実行：未追跡ファイルを削除
```

`git status` の Untracked files に並ぶのはすべて未追跡ファイルです——ローカルで生まれた、git の管理外のファイル（一時ファイル、ビルド成果物）です。`git clean` はこれらを掃除します。2 点に注意：

- デフォルトでは実行が拒否される（`clean.requireForce`）。`-f` が必須です。まず `-n` で削除対象をプレビューしましょう
- **clean で削除したファイルは git では取り戻せません**（一度もコミットされていないので、reflog でも救えません）——実行前に必ず確認しましょう

## 練習

<Exercise />

## 練手区

<Playground scenario="reset" />

<LessonProgress />
