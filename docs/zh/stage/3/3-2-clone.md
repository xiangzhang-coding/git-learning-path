---
title: git clone 克隆仓库
exercises:
  - id: 3-2-e1
    question: git clone 做了什么？
    options:
      - 把远程仓库完整复制到本地（历史 + 工作区），并自动配好 origin
      - 只下载最新的一个提交
      - 把本地仓库上传到远程
    correct: 0
    explanation: clone 复制整个历史、检出默认分支的工作区，并自动把远程命名为 origin，建立跟踪分支。
    anchor: "#git-clone-一次完成复制"
  - id: 3-2-e2
    question: clone 之后，origin/main 是什么？
    options:
      - 一个跟踪分支：本地记录「远程 main 指向哪个提交」的镜像
      - 远程仓库里的一个文件夹
      - 本地的一个新分支，可以直接在上面提交
    correct: 0
    explanation: refs/remotes/origin/main 是只读的跟踪镜像，记录 clone/fetch 时远程 main 的位置。
    anchor: "#跟踪分支-origin-main"
  - id: 3-2-e3
    question: 在下面的练手区中，克隆远程仓库并进入克隆出来的目录。
    type: task
    scenario: clone
    goal: 执行 git clone /origin，然后用 cd origin 进入克隆的仓库目录，并用 git status 确认在 main 分支上。
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: clone 后进入新目录（cd），你就在一份完整的历史副本里了——remote origin 已自动配好。
    anchor: "#git-clone-一次完成复制"
---

# git clone 克隆仓库

## 本课目标

- 用 git clone 把远程仓库复制到本地
- 理解 origin 与跟踪分支 origin/main
- 理解 clone 之后需要 cd 进入新目录

## git clone 一次完成复制

```bash
git clone /origin          # 在当前目录下创建 origin/ 子目录并克隆进去
git clone /origin 我的项目  # 也可以指定目录名
cd origin                  # 进入克隆出来的仓库
```

`git clone <地址>` 一次性完成四件事：

1. 在本地新建目录（默认取地址的最后一段）
2. 把远程的**全部历史**复制过来
3. 检出默认分支（通常是 main）的工作区
4. 自动命名远程为 **origin**，并建立跟踪分支

clone 是「加入一个已有项目」的标准入口——你不需要 `git init`，一切从远程来。

## 跟踪分支 origin/main

clone 时 git 会记录远程每个分支当时指向的提交，存成**跟踪分支（tracking branch）**：

```
refs/remotes/origin/main   # 只读镜像：远程 main 此刻的位置
```

它和本地分支（`refs/heads/main`）不同：**你的提交不会移动它**，只有 `git fetch` / `git pull` / `git push` 会更新它。之后你随时可以用 `git log origin/main` 查看「远程那边长什么样」。

## 复制 vs 连接

clone 是**复制**：克隆出来的仓库完全独立，和远程唯一的联系就是 origin 这个地址。你的提交不会自动跑到远程，远程的新提交也不会自动出现——接下来三课教的 fetch/push/pull 就是这两种方向的搬运。

## 练习

<Exercise />

## 练手区

<Playground scenario="clone" />

<LessonProgress />
