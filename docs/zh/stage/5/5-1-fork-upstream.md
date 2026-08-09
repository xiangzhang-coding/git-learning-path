---
title: fork 与 upstream 同步
exercises:
  - id: 5-1-e1
    question: fork 与 clone 的区别是什么？
    options:
      - fork 在 GitHub 上把仓库复制到你的账号，clone 把仓库复制到你的电脑
      - fork 只复制代码，clone 连历史一起复制
      - fork 是 clone 的别名
    correct: 0
    explanation: fork 在 GitHub 服务器上创建副本（在你的账号名下），clone 把仓库完整复制到本地。fork 之后通常还要 clone 到本地才能工作。
    anchor: "#fork-是什么"
  - id: 5-1-e2
    question: 开源协作中为什么要保留 origin 和 upstream 两个远程？
    options:
      - origin 指向你自己的 fork，upstream 指向原作者仓库，各司其职
      - 因为一个远程装不下历史
      - 两个远程是 GitHub 强制要求的
    correct: 0
    explanation: 推送只能发到自己的 fork（origin）；upstream 用来接收上游更新，并通过 PR 把贡献送回去。
    anchor: "#添加-upstream-远程"
  - id: 5-1-e3
    question: 要把上游的新提交同步到自己的 fork，正确顺序是？
    options:
      - git fetch upstream，把 upstream/main 合并（或变基）进本地 main，再 push origin
      - git push upstream 把上游拉过来
      - 直接 git pull origin，上游会自动同步
    correct: 0
    explanation: fetch 只下载上游提交，merge/rebase 把更新接到本地 main，最后 push 到自己的 fork，让 GitHub 上的副本也更新。
    anchor: "#与上游同步"
---

# fork 与 upstream 同步

## 本课目标

- 理解 fork 在开源协作中的角色
- 用 git remote add upstream 挂上原作者仓库
- 用 fetch + merge 同步上游更新

## fork 是什么

fork（派生）是在 GitHub 上把别人的仓库复制到你自己账号下：

```
原作者：github.com/author/project
    │ fork
    ▼
你自己：github.com/you/project   ← 你可以随意改
```

fork 是 GitHub 的功能（不是 git 命令）。它与 clone 的区别：fork 在 GitHub 服务器上创建副本，clone 把仓库复制到本地电脑。典型开源流程是「先 fork，再 clone 自己的 fork」——你没有原作者仓库的写权限，只能在自己的副本上工作。

## 克隆你自己的 fork

在 GitHub 上点 Fork 之后，克隆你账号名下的那份仓库：

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v` 显示一个远程：`origin` 指向你的 fork。此时你只能读写 origin——原作者仓库的更新还不会自动出现。

## 添加 upstream 远程

把原作者仓库注册为第二个远程，惯例叫 `upstream`：

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

现在有两个 remote：`origin`（你的 fork，可读写）和 `upstream`（原作者仓库，只读接收更新）。记住两个角色的分工，是 fork 工作流的核心。

## 与上游同步

上游一直在更新，想让 fork 跟上节奏：

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream` 下载上游提交（不动本地）
- `git merge upstream/main`（或 rebase）把更新接进本地 main
- `git push origin main` 把更新同步到 GitHub 上的 fork

这样 fork 与原作者仓库保持一致，之后就能在最新代码上开分支、做贡献。

## 动手练习

- 在 GitHub 上 fork 一个你常用的开源仓库
- 克隆它，添加 upstream，完成一次同步
- 在 Issues 页面观察别人如何协作

## 练习

<Exercise />

<LessonProgress />
