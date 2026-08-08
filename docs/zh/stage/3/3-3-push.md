---
title: git push 推送提交
exercises:
  - id: 3-3-e1
    question: git push 把什么送到远程？
    options:
      - 当前分支上、远程还没有的提交（连同它们的历史）
      - 工作区里所有文件
      - 全部本地分支
    correct: 0
    explanation: push 把本地分支领先于远程的提交发送过去，并让远程分支前进到相同位置。
    anchor: "#git-push-发送提交"
  - id: 3-3-e2
    question: 为什么 git 拒绝 non-fast-forward（非快进）推送？
    options:
      - 远程有本地没有的提交，直接覆盖会丢掉别人的工作
      - 远程仓库满了
      - 本地分支名不合法
    correct: 0
    explanation: 如果远程比本地领先，push 会覆盖远程的新提交——git 拒绝这种覆盖，要求先 pull 合并再 push。
    anchor: "#非快进推送会被拒绝"
  - id: 3-3-e3
    question: 在下面的练手区中，把本地提交推送到远程。
    type: task
    scenario: push
    goal: 在 main 分支上执行 git push，把本地领先的提交推送到远程。
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: push 后输出 To /origin 与 main -> main；远程仓库现在指向与本地相同的提交。
    anchor: "#git-push-发送提交"
---

# git push 推送提交

## 本课目标

- 用 git push 把本地提交推送到远程
- 理解 push 只推送「领先的部分」
- 理解 non-fast-forward 拒绝规则

## git push 发送提交

```bash
git push              # 推送当前分支到 origin
git push origin main  # 显式指定远程与分支
```

push 把**当前分支上、远程还没有的提交**发过去，然后让远程分支前进到与本地相同的位置。输出形如：

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` 表示远程分支从旧提交前进到了新提交。推送成功后，远程与本地共享同一份历史。

**注意**：push 只推「领先的提交」。远程没有但本地也没有的改动、以及本地未提交的改动，都不会被发送。

## 快进更新与跟踪分支

push 本质上是把远程分支**快进**到本地分支的位置（快进的概念来自阶段 2 的 merge）。推送成功后，本地的跟踪分支 `origin/main` 也会同步前进——它是「远程此刻在哪」的镜像，现在与远程一致。

## 非快进推送会被拒绝

如果**远程有本地没有的提交**（比如别人先推了，或远程仓库另有更新），直接推送会覆盖那些提交——git 会拒绝：

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

解法就是提示说的：先 `git pull` 把远程的新提交合并进来，再 push。

## 练习

<Exercise />

## 练手区

<Playground scenario="push" />

<LessonProgress />
