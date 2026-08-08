---
title: ブランチでの作業
exercises:
  - id: 2-2-e1
    question: feature ブランチでコミットした後、main に切り替えると、そのコミットは見えますか？
    options:
      - 見えない。コミットは現在のブランチにだけ積まれる
      - 見える。すべてのブランチが同じ履歴を共有する
      - コミットメッセージによる
    correct: 0
    explanation: コミットは毎回現在のブランチポインタに積まれます。feature でのコミットは feature を進めるだけで、main の履歴は影響を受けません。
    anchor: "#コミットは現在のブランチにだけ積まれる"
  - id: 2-2-e2
    question: 2つのブランチがそれぞれコミットすると、コミットグラフ（commit graph）はどんな形になりますか？
    options:
      - 共通祖先から分岐した DAG（有向非巡回グラフ）
      - 常に一直線
      - 1本のブランチの記録だけが残る
    correct: 0
    explanation: ブランチがそれぞれ進むと、履歴は共通のコミットから分岐し、分岐した木の形になります——git の世界ではこれを DAG と呼びます。
    anchor: "#分岐とコミットグラフ"
  - id: 2-2-e3
    question: 下の練手区で、feature ブランチでコミットを1つ作りましょう。
    type: task
    scenario: branching
    goal: feature を作成して切り替え、feat.txt を新規作成（内容は任意）してコミットします。コミットメッセージに "feat" を含めましょう。
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: コミットすると、練手区の下のコミットグラフが分岐します：feature ポインタは1つ前進し、main はその場に止まったままです。
    anchor: "#コミットは現在のブランチにだけ積まれる"
  - id: 2-2-e4
    question: 下の練手区で、main に切り替えてワークツリーをクリーンな状態に保ちましょう。
    type: task
    scenario: branching
    goal: git switch main で main に切り替え、状態を clean にしましょう。
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: main に切り替えると、feature でのコミットは main の履歴からは見えません。しかしブランチポインタは残っているので、いつでも切り替えて戻れます。
    anchor: "#コミットは現在のブランチにだけ積まれる"
---

# ブランチでの作業

## この課の目標

- ブランチ上でコミットし、コミットが現在のブランチにだけ積まれると理解する
- 分岐を理解する：コミットグラフは共通祖先から分岐する
- 練手区のコミットグラフでブランチの構造を観察する

## コミットは現在のブランチにだけ積まれる

ブランチを作成すると、**コミットは現在のブランチにだけ積まれます**。`main` が commit A にあるとして：

```bash
git switch -c feature
# コードを変更
git commit -m "feat: login page"
```

このコミットで前進するのは `feature` だけで、`main` は A に止まったままです。main に切り替えると、このコミットもそのファイルも見えません——ワークツリーは A のスナップショットに戻ります。

**これこそブランチの核心的な用途です**：feature の上で自由に実験しながら、main を安定させ続けることができます。

## 分岐とコミットグラフ

main と feature がそれぞれコミットすると、履歴は共通祖先から分岐します：

```
o  A (main と feature の共通の出発点)
|\
o |  B (main の新しいコミット)
| o  C (feature の新しいコミット)
```

この構造を**コミットグラフ（commit graph）**と呼びます。技術的には DAG（有向非巡回グラフ）です——各コミットは最大2つの親を持ち、循環はありません。練手区の下のコミットグラフはこれをリアルタイムに描画し、ブランチ名はブランチの先端に直接表示されます。

## git log で履歴を観察する

```bash
git log --oneline
```

`git log` は**現在のブランチ**の履歴だけを表示します。feature に切り替えると feature の線が表示され、main に戻すと main の線が表示されます。すべてのブランチのコミットを見たい場合は、練手区のコミットグラフが最も直感的です。

## 練習

<Exercise />

## 練手区

<Playground scenario="branching" />

<LessonProgress />
