---
title: 在分支上工作
exercises:
  - id: 2-2-e1
    question: 在 feature 分支上提交后，切回 main 会看到这个提交吗？
    options:
      - 不会，提交只落在当前分支上
      - 会，所有分支共享同一份历史
      - 取决于提交信息
    correct: 0
    explanation: 每次提交都落在当前分支指针上。feature 上的提交只推进 feature，main 的历史不受影响。
    anchor: "#提交只落在当前分支"
  - id: 2-2-e2
    question: 两个分支各自提交后，提交图（commit graph）是什么形状？
    options:
      - 从共同祖先分叉的 DAG（有向无环图）
      - 永远是一条直线
      - 只剩一条分支的记录
    correct: 0
    explanation: 分支各自前进后，历史从共同提交处分叉，形成一棵分叉树——git 的世界里叫 DAG。
    anchor: "#分叉与提交图"
  - id: 2-2-e3
    question: 在下面的练手区中，在 feature 分支上做一个提交。
    type: task
    scenario: branching
    goal: 创建并切换到 feature，新建 feat.txt（内容随意）并提交，提交信息包含 "feat"。
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: 提交后练手区下方的提交图会分叉：feature 指针前进了一格，main 停在原地。
    anchor: "#提交只落在当前分支"
  - id: 2-2-e4
    question: 在下面的练手区中，切回 main 并保持工作区干净。
    type: task
    scenario: branching
    goal: git switch main 切回 main，状态为 clean。
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: 切回 main 后，feature 上的提交在 main 的历史里看不到，但分支指针还在，随时可以切回去。
    anchor: "#提交只落在当前分支"
---

# 在分支上工作

## 本课目标

- 在分支上提交，理解提交只落在当前分支
- 理解分叉：提交图从共同祖先开始分叉
- 用练手区的提交图观察分支结构

## 提交只落在当前分支

创建分支后，**提交只落在当前分支**。假设 `main` 在 commit A，然后：

```bash
git switch -c feature
# 改代码
git commit -m "feat: login page"
```

这次提交只让 `feature` 前进，`main` 仍然停在 A。切回 main，看不到这个提交，也看不到那个文件——工作区恢复成 A 的快照。

**这正是分支的核心用途**：在 feature 上自由实验，main 始终保持稳定。

## 分叉与提交图

当 main 和 feature 各自提交时，历史从共同祖先分叉：

```
o  A (main 与 feature 的共同起点)
|\
o |  B (main 的新提交)
| o  C (feature 的新提交)
```

这个结构叫**提交图（commit graph）**，技术上是一个 DAG（有向无环图）——每个提交最多两个父提交，没有环。练手区下方的提交图会实时画出它：分支名直接标在分支尖端。

## git log 观察历史

```bash
git log --oneline
```

`git log` 只显示**当前分支**的历史。切到 feature，它显示 feature 这条线；切回 main，显示 main 这条线。想看所有分支的提交，用练手区的提交图最直观。

## 练习

<Exercise />

## 练手区

<Playground scenario="branching" />

<LessonProgress />
