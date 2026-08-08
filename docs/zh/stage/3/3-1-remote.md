---
title: git remote 远程仓库
exercises:
  - id: 3-1-e1
    question: remote 是什么？
    options:
      - 一个存放仓库副本的远程位置（另一个仓库，通常在服务器上）
      - 本地的一个文件夹
      - git 的一个内置命令，用来压缩仓库
    correct: 0
    explanation: remote 是「另一份仓库」的位置。git 通过它把提交推上去、拉下来；origin 是 clone 后默认的 remote 名字。
    anchor: "#remote-是什么"
  - id: 3-1-e2
    question: git remote -v 显示什么？
    options:
      - 所有 remote 的名字和地址
      - 所有分支的列表
      - 远端所有提交
    correct: 0
    explanation: git remote -v 列出每个 remote 的名字、地址，以及它用于 fetch 和 push 的配置。
    anchor: "#git-remote-查看与添加"
  - id: 3-1-e3
    question: 在下面的练手区中，添加一个名为 origin 的远程仓库。
    type: task
    scenario: remote
    goal: 用 git remote add origin /origin 注册远程仓库，并用 git remote -v 确认。
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: remote add 只登记地址，不会传任何数据。之后 fetch/push/pull 就知道去哪了。
    anchor: "#git-remote-查看与添加"
---

# git remote 远程仓库

## 本课目标

- 理解 remote 的概念：另一份仓库的位置
- 用 git remote add 注册远程仓库
- 用 git remote -v 查看配置

## remote 是什么

到目前为止，你所有的提交都只在**你本机的一份仓库**里。真实项目需要多人协作：每个人都有一份仓库，还有一个「共享的仓库」作为交换点——它就是 remote。

remote（远程仓库）本质上是**另一个 git 仓库的地址**。git 本身没有「云」，任何一台机器（或一个目录）都可以当 remote。你的仓库通过名字引用它，默认名字是 **origin**（clone 时自动命名）。

本课的练手区里，`/origin` 就是那个远程仓库的位置——一个和本地 `/repo` 相互独立的内存仓库。**远程仓库不能 `cd` 进入**：它只有历史、没有工作区（就像真实的裸仓库或服务器上的仓库），你操作的是本地这份，通过 git 命令与它交换数据。

## git remote 查看与添加

```bash
git remote            # 列出 remote 名字
git remote -v         # 列出名字 + 地址（fetch/push 各一行）
git remote add <名字> <地址>   # 注册一个新 remote
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add` 只登记地址，**不传任何数据**。它把配置写进 `.git/config`：

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## 记住两个角色

| 名字 | 含义 |
| --- | --- |
| 本地分支 | `refs/heads/main`，你的提交落在这里 |
| remote | 远程仓库的地址，如 `/origin` |
| 跟踪分支（tracking branch） | `refs/remotes/origin/main`，本地记录「远程那边 main 指向哪」的镜像 |

跟踪分支是下一步 clone/fetch 的关键：它让你在不联网时也能看到「远端长什么样」。

## 练习

<Exercise />

## 练手区

<Playground scenario="remote" />

<LessonProgress />
