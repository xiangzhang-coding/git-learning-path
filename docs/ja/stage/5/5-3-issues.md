---
title: 5-3 Issues と協働
exercises:
  - id: 5-3-e1
    question: GitHub Issue の代表的な使い方は？
    options:
      - bug の報告、機能提案、具体的なタスクの議論
      - コードのバックアップ保存
      - コミットにログを書くこと
    correct: 0
    explanation: Issue は 1 つの具体的な問題をめぐる議論スレッドです。担当者の割り当て、ラベル付け、マイルストーンへの登録、PR との関連付けができます。
    anchor: "#issue-とは"
  - id: 5-3-e2
    question: PR のマージ時に issue を自動でクローズするには？
    options:
      - PR の説明や関連コミットのメッセージに "fixes #12" と書く
      - issue のコメントで PR 番号に触れる
      - issue は手動でしか閉じられない
    correct: 0
    explanation: GitHub は closes、fixes、resolves キーワードと issue 番号を認識し、PR のマージ時に該当 issue を自動でクローズします。
    anchor: "#pr-で-issue-をクローズする"
  - id: 5-3-e3
    question: label と milestone の役割はそれぞれ？
    options:
      - label は issue を分類し（例：bug、feature）、milestone は複数の issue を 1 つのバージョン目標にまとめる
      - label は権限マーク、milestone はタイムライン
      - どちらもリポジトリにスターを付ける機能
    correct: 0
    explanation: labels は絞り込みと分類に便利です。milestones は「このバージョンで何を達成するか」を示し、Release と対応することが多いです。
    anchor: "#ラベルとマイルストーン"
---

# Issues と協働

## この課の目標

- Issue が何か、どう開くかを理解する
- label と milestone でタスクを整理する
- 「fixes #番号」で PR と issue を関連付ける

## issue とは

Issue はリポジトリ内の議論スレッドです：bug の報告、機能提案、具体的なタスクの議論。各 issue には番号（例：#12）、タイトル、説明、コメントがあり、担当者の割り当て、ラベル付け、マイルストーンへの登録もできます。

## issue を開く

リポジトリページの Issues → New issue をクリックします。良い issue の説明には「何が問題か、どう再現するか、期待する動作」を含めます。多くのリポジトリは issue テンプレート（bug 報告 / 機能リクエスト）を用意しており、テンプレートに沿って書くと対応が格段に効率化します。

## ラベルとマイルストーン

- **label（ラベル）**：issue を分類します（例：bug、enhancement、good first issue）。ラベルで絞り込むのはメンテナーが作業を整理する主な方法です。
- **milestone（マイルストーン）**：複数の issue を同じバージョン目標（例：v1.2.0）にまとめます。マイルストーンは進捗（x/y 個の issue 完了）を表示します。

## PR で issue をクローズする

PR の説明（または関連コミットのメッセージ）に次のように書きます：

```
fixes #12
```

GitHub はその PR を issue 12 に関連付け、PR がマージされると issue は自動的にクローズされます。同義のキーワードは closes、resolves。「どの変更がどの問題を解決したか」が履歴で追跡できるようになります。

## 協働フローを一望する

```
bug を発見 → issue を開く（#12）→ メンテナーが label + milestone を付ける
  → 貢献者がブランチを切って修正 → PR の説明に "fixes #12" と書く
  → マージ → issue が自動クローズ、マイルストーン +1
```

## 実践してみよう

- 自分のリポジトリで issue を開き、label と milestone を作る
- bug を 1 つ修正して PR を送り、説明に issue を関連付ける
- マージ後に issue が自動クローズされるか確認する

## 練習

<Exercise />

<LessonProgress />
