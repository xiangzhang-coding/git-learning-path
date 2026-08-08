---
title: git restore、git rm と git mv
exercises:
  - id: 1-4-e1
    question: git restore hello.txt の働きは何ですか？
    options:
      - hello.txt を HEAD のバージョンに戻し、ワークエリアの変更を捨てる
      - hello.txt を削除する
      - hello.txt をステージングエリアに入れる
    correct: 0
    explanation: git restore はファイルをリポジトリ内のバージョン（デフォルトでは HEAD）に戻し、ワークエリアの変更を捨てます。戻るのは追跡済み（tracked）ファイルだけなので、未追跡のファイルには影響しません。
    anchor: "#git-restore-で変更を取り消す"
  - id: 1-4-e2
    question: 下の練手区で、git restore を使って hello.txt を元に戻しましょう。
    type: task
    scenario: local
    goal: hello.txt が変更されてしまったので、git restore hello.txt で元通りにしましょう。
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: 元に戻すと hello.txt は "hello world" になり、ワークエリアはきれいになります。git status には nothing to commit と表示されます。
    anchor: "#git-restore-で変更を取り消す"
  - id: 1-4-e3
    question: 下の練手区で、notes.txt を削除しましょう（バージョン履歴には残します）。
    type: task
    scenario: local
    goal: git rm notes.txt でファイルを削除し、削除をステージしましょう。
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: git rm は2つのことを同時に行います：ワークエリアのファイル削除 + 削除のステージ。コミット後、ファイルは最新バージョンから消えますが、履歴からはいつでも取り戻せます。
    anchor: "#git-rm-でファイルを削除する"
  - id: 1-4-e4
    question: 下の練手区で、notes.txt を diary.txt にリネームしましょう。
    type: task
    scenario: local
    goal: git mv notes.txt diary.txt でリネームし、ステージまで完了させましょう。
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv は「移動 + ステージ」をまとめたコマンドです。リネーム後、git status には旧名の削除と新名の追加が表示されます。
    anchor: "#git-mv-でファイルを移動する"
---

# git restore、git rm と git mv

## この課の目標

- git restore でワークエリアの変更を捨てる
- git rm でファイルを削除する
- git mv でファイルを移動・リネームする

## git restore で変更を取り消す

変更に失敗してしまった？前回のコミットの状態に戻したいとき：

```bash
git restore <ファイル名>
```

`git restore` はファイルを HEAD のバージョンに戻し、**ワークエリアの変更を捨てます**。対象になるのは追跡済み（tracked）のファイルだけ——新規ファイルはまだ git に認識されていないので、restore では手が出せません。

## git rm でファイルを削除する

```bash
git rm <ファイル名>
```

1ステップで2つのことを行います：ワークエリアのファイル削除 + 削除のステージング。コミット後、ファイルは最新バージョンから消えますが、履歴は残っているので、いつでも取り戻せます。

## git mv でファイルを移動する

```bash
git mv 旧ファイル名 新ファイル名
```

ファイルを移動（リネーム）し、ステージまで行います。git はリネームそのものを「覚え」ません——内容の比較で識別するからです：旧ファイルが消え、新ファイルの内容が同じ = リネーム。だから mv の後、status には deleted と new file が表示されます。

## 練習

<Exercise />

## 練手区

<Playground scenario="local" />

<LessonProgress />
