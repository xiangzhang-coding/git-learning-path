---
title: fork と upstream の同期
exercises:
  - id: 5-1-e1
    question: fork と clone の違いは何ですか？
    options:
      - fork は GitHub 上でリポジトリを自分のアカウントに複製し、clone はリポジトリを自分のパソコンに複製する
      - fork はコードだけを複製し、clone は履歴ごと複製する
      - fork は clone の別名である
    correct: 0
    explanation: fork は GitHub サーバー上に（自分のアカウント名義で）コピーを作り、clone はリポジトリをローカルに丸ごと複製します。fork した後は、通常さらに clone してローカルで作業します。
    anchor: "#fork-とは"
  - id: 5-1-e2
    question: オープンソース協働で origin と upstream の 2 つのリモートを残すのはなぜですか？
    options:
      - origin は自分の fork を指し、upstream は原作者のリポジトリを指す。それぞれ役割が異なる
      - 1 つのリモートでは履歴が収まりきらないから
      - 2 つのリモートは GitHub の強制要件だから
    correct: 0
    explanation: push は自分の fork（origin）にしか送れません。upstream は上流の更新を受け取り、PR で貢献を送り返すために使います。
    anchor: "#upstream-リモートの追加"
  - id: 5-1-e3
    question: 上流の新しいコミットを自分の fork に同期する正しい順序は？
    options:
      - git fetch upstream を実行し、upstream/main をローカルの main にマージ（または rebase）してから push origin する
      - git push upstream で上流を取り込む
      - git pull origin すれば上流も自動的に同期される
    correct: 0
    explanation: fetch は上流のコミットをダウンロードするだけで、merge/rebase で更新をローカルの main に取り込み、最後に自分の fork へ push して GitHub 上のコピーも更新します。
    anchor: "#上流との同期"
---

# fork と upstream の同期

## この課の目標

- fork がオープンソース協働で果たす役割を理解する
- git remote add upstream で原作者のリポジトリを登録する
- fetch + merge で上流の更新を同期する

## fork とは

fork（フォーク）は、GitHub 上で他人のリポジトリを自分のアカウントに複製する機能です：

```mermaid
flowchart TD
    A[原作者：github.com/author/project] -->|fork| B[自分：github.com/you/project<br/>← 自由に変更できる]
```

fork は GitHub の機能（git コマンドではない）です。clone との違い：fork は GitHub サーバー上にコピーを作り、clone はリポジトリをローカルのパソコンに複製します。典型的なオープンソースの流れは「まず fork、次に自分の fork を clone」——原作者のリポジトリには書き込み権限がないので、自分のコピーで作業します。

## 自分の fork を clone する

GitHub で Fork を押したら、自分のアカウント名義のリポジトリを clone します：

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v` は 1 つのリモートを表示します：`origin` は自分の fork を指します。この時点で読み書きできるのは origin だけ——原作者のリポジトリの更新は自動では現れません。

## upstream リモートの追加

原作者のリポジトリを 2 つ目のリモートとして登録します。慣例では `upstream` と呼びます：

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

これで 2 つの remote があります：`origin`（自分の fork、読み書き可）と `upstream`（原作者のリポジトリ、更新を受け取る専用）。この 2 つの役割分担を覚えることが fork ワークフローの核心です。

## 上流との同期

上流は常に更新されています。fork を最新に保つには：

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream` は上流のコミットをダウンロードする（ローカルは変更しない）
- `git merge upstream/main`（または rebase）で更新をローカルの main に取り込む
- `git push origin main` で更新を GitHub 上の fork に同期する

こうして fork を原作者のリポジトリと同じ状態に保ち、最新のコードの上でブランチを切り、貢献できます。

## 実践してみよう

- GitHub でよく使うオープンソースのリポジトリを fork する
- それを clone し、upstream を追加して同期を 1 回実行する
- Issues ページで他の人がどう協働しているか観察する

## 練習

<Exercise />

<LessonProgress />
