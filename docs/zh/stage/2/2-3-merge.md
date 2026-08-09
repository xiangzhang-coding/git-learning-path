---
title: git merge 合并分支
exercises:
  - id: 2-3-e1
    question: 什么时候会发生 fast-forward（快进）合并？
    options:
      - 当前分支没有新提交，目标分支的提交全在它之后
      - 任何时候都会
      - 两个分支都有新提交时
    correct: 0
    explanation: 如果 main 停在原地、feature 在其后新增提交，merge 只需把 main 指针直接前移，历史保持一条直线，不产生新提交。
    anchor: "#快进合并"
  - id: 2-3-e2
    question: 两个分支都有新提交时，git merge 产生什么？
    options:
      - 一个合并提交（merge commit，有两个父提交）
      - 两个新提交
      - 一个标签
    correct: 0
    explanation: 历史分叉后合并，git 需要把两边的改动合到一处，产生一个带两个父提交的合并提交。
    anchor: "#合并提交"
  - id: 2-3-e3
    question: 在下面的练手区中，把 feature 合并进 main（快进合并）。
    type: task
    scenario: merge-ff
    goal: 在 main 上执行 git merge feature，合并后工作区包含 feature.txt。
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: 输出里有 Fast-forward：main 没有新提交，指针直接前进到 feature，工作区出现 feature.txt。
    anchor: "#快进合并"
  - id: 2-3-e4
    question: 在下面的练手区中，把 feature 合并进 main（两个分支都已分叉）。
    type: task
    scenario: merge
    goal: 在 main 上执行 git merge feature，完成一次普通合并。
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: 这次历史已分叉，merge 产生一个合并提交。练手区提交图上能看到 merge commit 连向两条分支。
    anchor: "#合并提交"
---

# git merge 合并分支

## 本课目标

- 用 git merge 把分支合并进当前分支
- 区分快进合并与合并提交
- 理解 merge commit 有两个父提交

## git merge 的基本流程

```bash
git switch main     # 先回到要接收改动的一方
git merge feature   # 把 feature 合进来
```

`git merge <分支>` 把目标分支的改动并入**当前分支**。它先找到两个分支的**共同祖先**，然后计算三条路径上的差异（共同祖先 → 当前分支、共同祖先 → 目标分支），再把改动合并成一份。

## 快进合并

如果当前分支没有新提交，目标分支只是「在它后面多走了几步」：

```
o  A ← main 停在这里
|
o  B ← feature
|
o  C ← feature 再提交一次
```

`git merge feature` 只需要把 `main` 指针**直接前移**到 C——这就是 fast-forward（快进）。输出会显示 `Fast-forward`，**不会产生新提交**，历史保持一条直线。


<MergeVisual />

## 合并提交

如果两个分支都各自提交了（历史分叉），就没有「指针前移」这条路可走，git 必须把两边的内容合成一个新提交：

```
o  A
|\
| o  B (main 的新提交)
o |  C (feature 的新提交)
 \|
  o  M (merge commit，两个父提交：B 和 C)
```

这个 **merge commit** 的特殊之处：它有两个父提交（parent）。练手区提交图上，合并提交会同时连向两条分支。

## 自动合并

只要双方改的是不同位置，git 能自动把两边改动合成一份，你不需要做任何事——输出形如：

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

如果两边改了同一处，就会进入下一课的主题：冲突。

## 练习

<Exercise />

## 练手区

<Playground scenario="merge" />

<LessonProgress />
