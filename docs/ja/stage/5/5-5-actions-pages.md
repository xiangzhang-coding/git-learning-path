---
title: GitHub Actions と Pages
exercises:
  - id: 5-5-e1
    question: GitHub Actions のワークフローファイルはどこに置きますか？
    options:
      - リポジトリの .github/workflows/ ディレクトリ配下、YAML 形式
      - 任意のディレクトリの .yml ファイル
      - ルートに置くしかなく、main.yml という名前でなければならない
    correct: 0
    explanation: ワークフローは .github/workflows/*.yml に書き、イベント（push、pull_request など）でトリガーされます。
    anchor: "#workflow-ファイル"
  - id: 5-5-e2
    question: ワークフローにおける job と step の関係は？
    options:
      - job はタスク（並行実行可、別のマシンで走る）、step は job 内の 1 つ 1 つの動作
      - job は動作、step はマシン
      - 両者は同じもの
    correct: 0
    explanation: workflow は job で構成され、job は step で構成されます（各 step がコマンドを実行するか action を再利用）。job 間に依存関係を宣言できます。
    anchor: "#workflow-ファイル"
  - id: 5-5-e3
    question: このコースサイト（GitHub Pages）のデプロイはどのシナリオ？
    options:
      - push をトリガーに Actions がサイトをビルドし、Pages に公開する
      - 自分でサーバーを購入する必要がある
      - 毎回手動でファイルをアップロードする
    correct: 0
    explanation: コミットが Actions をトリガーして自動ビルド・Pages へのデプロイを行います。これがこのコースサイトのデプロイ方式です。
    anchor: "#github-pages-のデプロイ"
---

# GitHub Actions と Pages

## この課の目標

- Actions が何か、イベントがどうワークフローをトリガーするかを理解する
- workflow ファイルの構造を読み解く
- Actions で GitHub Pages をデプロイする方法を理解する

## Actions とは

GitHub Actions は組み込みの CI/CD です：リポジトリのイベント（push、pull_request、スケジュール、手動）が自動化タスクをトリガーします——テストの実行、ビルド、公開、デプロイ。今見ているこのコースサイトも、Actions がビルドして Pages にデプロイしています。

## workflow ファイル

ワークフローは `.github/workflows/` 配下の YAML ファイル（例：deploy.yml）で定義します：

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
```

構造：`on` はトリガーイベントを宣言し、`jobs` はタスクを定義します（並行実行可、それぞれ 1 台のマシンで実行）。`steps` はタスク内の 1 つ 1 つの動作です（`run` はコマンドを実行、`uses` はコミュニティ製の action を再利用）。

## よく使うトリガーイベント

- `push`：push 時にトリガー（ブランチを限定できる）
- `pull_request`：PR が開かれた、または更新されたとき
- `schedule`：定時トリガー（cron 構文）
- `workflow_dispatch`：手動クリックでトリガー

## GitHub Pages のデプロイ

Pages のデプロイには 2 つの方法があります：リポジトリ設定で Pages を有効にしてブランチを直接公開するか、Actions でビルド成果物を公開するか。後者のほうがよく使われます（先にテストとビルドを実行し、成果物を Pages に公開する）：

```mermaid
flowchart LR
    push --> workflow トリガー --> 依存のインストール --> ビルド --> 成果物を Pages に公開
```

デプロイの状態・ログ・失敗理由はすべてリポジトリの Actions タブで確認できます。コミット横の小さな緑のチェック（✓/✗）はチェックの実行結果への入り口です。

## 実践してみよう

- リポジトリに `.github/workflows/deploy.yml` を作成し、静的ページをデプロイする
- あえてビルドステップを間違え、Actions の失敗ログを観察する
- 練習用リポジトリにテストを実行するワークフローを追加する

## 練習

<Exercise />

<LessonProgress />
