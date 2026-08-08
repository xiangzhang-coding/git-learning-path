---
title: git init 与 git status
exercises:
  - id: 1-1-e1
    question: git init 做了什么？
    options:
      - 下载别人的代码
      - 在当前目录创建 .git 目录，把目录变成仓库
      - 创建一个新文件
    correct: 1
    explanation: git init 在当前目录初始化一个空的 git 仓库（创建 .git 目录），之后这个目录及子目录就在版本控制之下了。
    anchor: "#git-init-创建仓库"
  - id: 1-1-e2
    question: git status 告诉你什么？
    options:
      - 当前分支，以及三个区域之间的差异
      - 文件的性能指标
      - 服务器状态
    correct: 0
    explanation: git status 是最常用的命令之一：显示当前分支、已暂存的改动、未暂存的改动和未跟踪的文件。
    anchor: "#git-status-查看状态"
  - id: 1-1-e3
    question: 一个文件被 git 跟踪（tracked）意味着什么？
    options:
      - 它在 .gitignore 里
      - 它出现在 git 的历史或暂存区中，git 会持续关注它的变化
      - 它被锁定不能修改
    correct: 1
    explanation: tracked 文件是 git 认识的文件（已提交过或在暂存区）；untracked 文件是工作区里新出现的、git 还没见过的文件。
    anchor: "#git-status-查看状态"
  - id: 1-1-e4
    question: 在下面的练手区中，初始化一个仓库。
    type: task
    scenario: init
    goal: 使用 git init 把当前目录变成 git 仓库，然后用 git status 确认。
    checks:
      - type: branchIs
        name: main
    explanation: 初始化后 git status 会显示 "On branch main"。练手区已预置了 user.name/user.email，所以可以直接提交。
    anchor: "#git-init-创建仓库"
---

# git init 与 git status

## 本课目标

- 用 git init 创建仓库
- 用 git status 理解仓库状态
- 区分 tracked 与 untracked 文件

## git init 创建仓库

版本控制的起点：告诉 git「这个目录归你管」。

```bash
git init
```

它在当前目录创建 `.git` 目录，里面存放对象的数据库、索引、引用等——这就是仓库本体。工作区里的文件不受影响，从这一刻起它们的每次变化都可以被记录。

## git status 查看状态

`git status` 是最常用的命令，它把三个区域之间的差异汇总给你看：

- 当前在哪个分支（On branch ...）
- 已暂存的改动（Changes to be committed）
- 未暂存的改动（Changes not staged for commit）
- 未跟踪的文件（Untracked files）

记住一点：**git 不会自动跟踪新文件**。新建的文件要先 `git add` 才进入暂存区，git 才会持续关注它。

## 练习

<Exercise />

## 练手区

<Playground scenario="init" />

<LessonProgress />
