---
title: git add 与 git commit
exercises:
  - id: 1-2-e1
    question: git add 把改动放进哪个区域？
    options:
      - working tree
      - staging area（暂存区）
      - repository（仓库）
    correct: 1
    explanation: git add 把工作区的改动登记进暂存区，表示「这些改动准备提交」。
    anchor: "#git-add-把改动带进暂存区"
  - id: 1-2-e2
    question: git commit 的 -m 参数是做什么的？
    options:
      - 合并两个分支
      - 给本次提交写说明文字
      - 修改提交作者
    correct: 1
    explanation: -m 提供提交信息（commit message），记录这次提交做了什么。好的提交信息是给别人（包括未来的你）看的。
    anchor: "#git-commit-保存快照"
  - id: 1-2-e3
    question: 在下面的练手区中，把 todo.txt 暂存。
    type: task
    scenario: add-commit
    goal: 使用 git add todo.txt 把文件加入暂存区。
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: 暂存后 git status 里 todo.txt 会出现在 "Changes to be committed" 下。
    anchor: "#git-add-把改动带进暂存区"
  - id: 1-2-e4
    question: 在下面的练手区中，把 todo.txt 提交，提交信息包含 "todo"。
    type: task
    scenario: add-commit
    goal: "git add todo.txt 后用 git commit -m \"feat: add todo\" 提交。"
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: 提交后 todo.txt 进入仓库历史；注意 hello.txt 的修改仍然留在工作区，没有被提交——commit 只打包暂存区的内容。
    anchor: "#git-commit-保存快照"
---

# git add 与 git commit

## 本课目标

- 用 git add 把改动加入暂存区
- 用 git commit 保存快照
- 理解 commit 只提交暂存区的内容

## git add 把改动带进暂存区

```bash
git add <文件名>     # 暂存单个文件
git add .            # 暂存当前目录下所有改动
```

`git add` 把工作区的改动登记进**暂存区（staging area）**。你可以选择性地暂存：改了三处功能，只 add 其中一处提交，历史就干净。

## git commit 保存快照

```bash
git commit -m "feat: add login page"
```

`git commit` 把**暂存区**的内容打包成一次提交（commit），写入仓库历史。每次提交：

- 保存项目当前所有文件的完整**快照**（不是差异）
- 用 SHA-1 哈希生成唯一 ID（如 `4a2b9c1`）
- 记录作者、时间、提交信息

**关键规则：commit 只包含暂存区的内容。** 工作区里改了但没 add 的改动，不会进这次提交。

## 提交信息怎么写

一句话说清楚「做了什么」：动词开头、时态统一、控制在 50 字内。例如 `fix: correct the login validation`。

## 练习

<Exercise />

## 练手区

<Playground scenario="add-commit" />

<LessonProgress />
