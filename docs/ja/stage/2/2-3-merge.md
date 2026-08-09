---
title: git merge でブランチをマージ
exercises:
  - id: 2-3-e1
    question: fast-forward（ファストフォワード）マージはいつ起こりますか？
    options:
      - 現在のブランチに新しいコミットがなく、対象ブランチのコミットがすべてその先にあるとき
      - いつでも起こる
      - 両方のブランチに新しいコミットがあるとき
    correct: 0
    explanation: main が止まったままで feature だけがその後ろにコミットを積んだ場合、merge は main ポインタを直接前進させるだけで済みます。履歴は一直線のままで、新しいコミットは生まれません。
    anchor: "#fast-forward-ファストフォワード-マージ"
  - id: 2-3-e2
    question: 両方のブランチに新しいコミットがあるとき、git merge は何を生成しますか？
    options:
      - マージコミット（merge commit。親コミットが2つ）
      - 新しいコミット2つ
      - タグ1つ
    correct: 0
    explanation: 履歴が分岐してからマージする場合、git は両方の変更を1か所にまとめる必要があり、親コミットを2つ持つマージコミットが生成されます。
    anchor: "#マージコミット"
  - id: 2-3-e3
    question: 下の練手区で、feature を main にマージしましょう（fast-forward マージ）。
    type: task
    scenario: merge-ff
    goal: main の上で git merge feature を実行し、マージ後にワークツリーへ feature.txt が含まれる状態にしましょう。
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: 出力に Fast-forward と表示されます：main に新しいコミットがないため、ポインタが feature まで直接前進し、ワークツリーに feature.txt が現れます。
    anchor: "#fast-forward-ファストフォワード-マージ"
  - id: 2-3-e4
    question: 下の練手区で、feature を main にマージしましょう（両方のブランチが分岐しています）。
    type: task
    scenario: merge
    goal: main の上で git merge feature を実行し、普通のマージを1回行いましょう。
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: 今回は履歴が分岐しているので、merge はマージコミットを生成します。練手区のコミットグラフに、merge commit が2つのブランチへつながっているのが見えます。
    anchor: "#マージコミット"
---

# git merge でブランチをマージ

## この課の目標

- git merge でブランチを現在のブランチにマージする
- fast-forward マージとマージコミットを区別する
- merge commit が親コミットを2つ持つと理解する

## git merge の基本フロー

```bash
git switch main     # 先に変更を受け取る側へ戻る
git merge feature   # feature をマージする
```

`git merge <ブランチ>` は、対象ブランチの変更を**現在のブランチ**に取り込みます。まず2つのブランチの**共通祖先**を見つけ、3つの経路の差分（共通祖先 → 現在のブランチ、共通祖先 → 対象ブランチ）を計算して、変更を1つにまとめます。

## fast-forward（ファストフォワード）マージ

現在のブランチに新しいコミットがなく、対象ブランチがただ「その先を何歩か進んだだけ」の場合：

```
o  A ← main はここで止まっている
|
o  B ← feature
|
o  C ← feature がもう1回コミット
```

`git merge feature` は、`main` ポインタを C まで**直接前進させる**だけで済みます——これが fast-forward（ファストフォワード）です。出力に `Fast-forward` と表示され、**新しいコミットは生まれず**、履歴は一直線のままです。


<MergeVisual />

## マージコミット

両方のブランチがそれぞれコミットしている場合（履歴が分岐）、「ポインタの前進」という道は使えません。git は両方の内容を1つの新しいコミットに合成する必要があります：

```
o  A
|\
| o  B (main の新しいコミット)
o |  C (feature の新しいコミット)
 \|
  o  M (merge commit。親コミットは B と C の2つ)
```

この **merge commit** の特別な点は、親コミット（parent）を2つ持つことです。練手区のコミットグラフでは、マージコミットが2つのブランチへ同時につながります。

## 自動マージ

両側が違う場所を変更している限り、git は両方の変更を自動で1つに合成でき、何もする必要はありません——出力は次のようになります：

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

両側が同じ場所を変更していた場合は、次の課のテーマであるコンフリクト（conflict）に入ります。

## 練習

<Exercise />

## 練手区

<Playground scenario="merge" />

<LessonProgress />
