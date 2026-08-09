---
title: Pull Request の流れ
exercises:
  - id: 5-2-e1
    question: Pull Request（PR）とは何ですか？
    options:
      - あるブランチの自分のコミットを、対象リポジトリの別のブランチに統合するよう依頼するもの
      - 他人のリポジトリを自分のローカルに直接上書きするもの
      - GitHub のグループチャット機能
    correct: 0
    explanation: PR は「私のコミットを統合してください」という正式な依頼で、コード差分・議論・自動チェック（CI）の結果が付属します。
    anchor: "#pull-request-とは"
  - id: 5-2-e2
    question: PR のマージ方式について、正しい説明はどれですか？
    options:
      - Create a merge commit は分岐とマージコミットを残し、Rebase and merge は履歴を一直線にする
      - Squash and merge は個々のコミットをすべて残す
      - マージ方式は履歴に影響しない
    correct: 0
    explanation: 3 つの方式で履歴が変わります：merge commit は分岐を残し、squash は 1 つのコミットにまとめ、rebase は線形にリプレイします。
    anchor: "#マージとクローズ"
  - id: 5-2-e3
    question: メンテナーから修正を求められたら、開いた PR はどう更新しますか？
    options:
      - PR のブランチにコミットを重ねて push すれば、PR は自動的に更新される
      - PR を作り直す
      - PR のタイトルを変えればよい
    correct: 0
    explanation: PR はブランチの「窓口」です。そのブランチに新しいコミットを push すれば、PR の差分も自動で更新されます。
    anchor: "#pr-ブランチの更新"
---

# Pull Request の流れ

## この課の目標

- 協働における PR の役割を理解する
- 「ブランチを切る → push → PR を開く → 議論 → マージ」の流れを通しで体験する
- 3 つのマージ方式と PR ブランチの更新を理解する

## pull request とは

Pull Request（PR）は「私のコミットをあなたのリポジトリに統合してください」という正式な依頼です。他人のリポジトリには直接書き込めませんが、PR を送ればメンテナーが review して統合するかどうかを決められます：

```
自分の fork のブランチ ──push──▶ 自分の fork
                                   │ PR を開く
                                   ▼
                        原作者リポジトリの main（review と merge を待つ）
```

PR はコミットだけではありません：コード差分（diff）・議論・自動チェック（CI）の結果を含み、オープンソース協働の中心となる単位です。

## PR を開く

前提：作業ブランチを自分の fork に push します：

```bash
git switch -c fix/login-bug
git commit -am "fix: login bug"
git push origin fix/login-bug
```

GitHub に戻ると、リポジトリページに Compare & pull request ボタンが現れます。base（対象ブランチ、例：原作者リポジトリの main）と compare（自分のブランチ）を選び、タイトルと説明を書いて PR を作成します。

## review と議論

PR は議論の場です：メンテナーはコードの特定の行にコメント（line comments）を残したり、修正要求（request changes）や承認（approve）を行えます。あなたの新しいコミットはすべて議論の流れに入り、対応が終わったら @ で相手に再レビューを依頼できます。

## マージとクローズ

マージには 3 つの方式があり、履歴がそれぞれ異なります：

| 方式 | 履歴 |
| --- | --- |
| Create a merge commit | 分岐を残し、マージコミットが生まれる |
| Squash and merge | すべてを 1 つのコミットにまとめる |
| Rebase and merge | 線形にリプレイ、マージコミットなし |

マージ後、GitHub は通常ブランチの削除を提案します。PR がマージされずにそのままクローズ（closed）されることもあります——たとえば案が見送られた場合です。

## PR ブランチの更新

メンテナーに修正を求められたら、PR を作り直す必要はありません：ブランチにコミットを重ねて push すれば、PR は自動的に更新されます：

```bash
git commit -am "fix: address review feedback"
git push origin fix/login-bug
```

## 実践してみよう

- GitHub に機能ブランチを push し、リポジトリに本物の PR を送る
- PR 内の 1 行のコードにコメントを残し、議論の流れを体験する
- 3 つのマージ方式で生まれる履歴の違いを比べる

## 練習

<Exercise />

<LessonProgress />
