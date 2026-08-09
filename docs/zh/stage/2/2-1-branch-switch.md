---
title: git branch 与 git switch
exercises:
  - id: 2-1-e1
    question: git branch 显示什么？
    options:
      - 所有分支的列表，当前分支带 * 标记
      - 所有提交的列表
      - 未提交的改动
    correct: 0
    explanation: git branch 列出仓库里的分支，并用 * 标出你当前所在的分支。
    anchor: "#git-branch-查看与创建分支"
  - id: 2-1-e2
    question: 分支本质上是什么？
    options:
      - 一个指向某个 commit 的可移动指针
      - 一份完整的代码副本
      - 一个独立的文件夹
    correct: 0
    explanation: 分支只是一个指向 commit 的指针。创建分支不复制任何文件，所以它非常轻量。
    anchor: "#分支是指针"
  - id: 2-1-e3
    question: 在下面的练手区中，创建分支 feature 并切换到它。
    type: task
    scenario: branching
    goal: 用 git switch -c feature 一次性完成「创建并切换」。
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature 等于「创建分支 feature + 切换过去」两步。HEAD 现在指向 feature。
    anchor: "#git-switch-切换分支"
  - id: 2-1-e4
    question: 在下面的练手区中，切回 main 分支。
    type: task
    scenario: branching
    goal: 用 git switch main 切回 main。
    checks:
      - type: branchIs
        name: main
    explanation: 切换分支只移动 HEAD 和工作区内容，提交都还在各自分支上。
    anchor: "#git-switch-切换分支"
---

# git branch 与 git switch

## 本课目标

- 用 git branch 查看和创建分支
- 用 git switch 切换分支
- 理解分支是指针、HEAD 指向当前位置

## 分支是指针

分支（branch）本质上是一个**指向 commit 的可移动指针**。创建分支不会复制任何文件，只是新增一个名字，指向当前的 commit：

```bash
git branch feature
```

这个命令在仓库里记下一个名字 `feature`，指向当前 HEAD 所在的 commit。之后你在 `feature` 上提交，`feature` 指针就跟着前进。

**关键概念：分支没有「各自的代码」**，它只是历史中的一个位置标记。同一份工作区，换一个分支名字，看到的文件是那个分支指针指向的快照。

## git branch 查看与创建分支

```bash
git branch        # 列出所有分支，当前分支带 *
git branch <名字> # 创建分支（不切换）
```

列出时输出形如：

```
* main
  feature
```

创建分支只是记下一个指针，**不会切换过去**。要过去，用 switch。

## git switch 切换分支

```bash
git switch <名字>      # 切换到已有分支
git switch -c <名字>   # 创建并切换（最常用）
```

- `git switch feature`：HEAD 移到 `feature`，工作区文件替换为该分支指向的快照
- `git switch -c feature`：创建新分支并立即切换，等价于 `git branch feature` + `git switch feature`

**老式写法**：`git checkout <名字>` 与 `git checkout -b <名字>` 是旧版命令，作用相同；`git switch` 是较新的推荐命令，练手区两者都支持。`git checkout` 还有一个「恢复文件」的用途，如今由 `git restore`（章节 1 已学）接管。

切换时如果工作区有未提交的改动，git 会拒绝并提示先提交或暂存（stash）——因为换了快照，改动会无处安放。

## HEAD 指向当前位置

**HEAD** 是一个特殊指针，标记「你现在在哪个分支的哪个 commit 上」。`git status` 开头的 `On branch feature` 就是 HEAD 的答案。切换分支，就是移动 HEAD 这个指针。


<HeadVisual />

## 练习

<Exercise />

## 练手区

<Playground scenario="branching" />

<LessonProgress />
