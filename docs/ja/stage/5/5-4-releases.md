---
title: Releases とバージョン公開
exercises:
  - id: 5-4-e1
    question: セマンティックバージョニング 2.4.1 で、各数字は何を表しますか？
    options:
      - 2 はメジャー（破壊的変更）、4 はマイナー（新機能）、1 はパッチ（bug 修正）
      - 2 はパッチ、4 はメジャー、1 はマイナー
      - 3 つの数字に違いはない
    correct: 0
    explanation: MAJOR.MINOR.PATCH：メジャーは互換性を壊し、マイナーは機能を追加し、パッチは bug を直します。繰り上がりの規則でバージョン番号が互換性の情報を伝えます。
    anchor: "#セマンティックバージョニング"
  - id: 5-4-e2
    question: 注釈付きタグをリモートに push するには、正しい手順は？
    options:
      - 先に git tag -a v1.0.0 -m "v1.0.0" を実行し、次に git push origin v1.0.0 を実行する
      - git push すればタグも自動で全部送られる
      - git tag を打てば push は不要
    correct: 0
    explanation: 先にタグを打ち、次に明示的に push します。git push はデフォルトではタグを送りません（git push --tags は例外）。
    anchor: "#tag-を打って-push-する"
  - id: 5-4-e3
    question: GitHub Release と git tag の関係は？
    options:
      - Release は tag の上に立ち、追加でリリースノートと添付物を提供する
      - Release と tag は無関係
      - Release はブランチのこと
    correct: 0
    explanation: 既存の tag から Release を作り、説明文（release notes）とバイナリ添付物を補うことで正式なバージョンになります。
    anchor: "#release-を作成する"
---

# Releases とバージョン公開

## この課の目標

- セマンティックバージョニングの規則を理解する
- tag を打って GitHub に push する
- 説明と添付物付きの Release を作成する

## セマンティックバージョニング

バージョン番号 MAJOR.MINOR.PATCH（例：2.4.1）：

| 位 | いつ上がるか |
| --- | --- |
| MAJOR メジャー | 破壊的変更、旧バージョンと互換性なし |
| MINOR マイナー | 新機能の追加、後方互換 |
| PATCH パッチ | bug の修正、機能追加なし |

規則はシンプル：メジャーが上がったら「なぜ急にプログラムが壊れたか」が説明でき、パッチが上がったら「安心してアップグレードできる」ことがわかります。

## tag を打って push する

公開前にローカルでタグを打ちます（章 4 で学習済み）：

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

注意：`git push` はデフォルトではタグを送りません。明示的に `git push origin <tag>` が必要です（まとめて送るなら `git push --tags`）。

## Release を作成する

GitHub のリポジトリページ → Releases → Draft a new release：

1. tag を選択（または新規作成）します（例：v1.0.0）
2. タイトルとリリースノート（release notes）を書きます
3. バイナリ成果物（インストーラ、ビルド物）を添付できます
4. Publish release をクリックします

Release は「説明付きの tag」です：ユーザーはここでバージョンをダウンロードし、変更点を確認します。git log を読む必要はありません。

## release notes の書き方

良いリリースノートは読者ごとにグループ分けします：

- **新機能**（Features）：新しい機能。PR にリンクできる
- **修正**（Bug fixes）：何を直したか。issue にリンクできる
- **破壊的変更**（Breaking changes）：アップグレード時の注意点

## 実践してみよう

- 自分のプロジェクトに v0.1.0 タグを打って push する
- 最初の Release を作成し、3 つのセクションの説明を書く
- パッチバージョンを公開し、Releases の一覧を確認する

## 練習

<Exercise />

<LessonProgress />
