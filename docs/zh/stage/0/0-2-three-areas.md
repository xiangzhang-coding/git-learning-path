---
title: 三个区域模型
exercises:
  - id: 0-2-e1
    question: 你正在用编辑器修改的文件，位于哪个区域？
    options:
      - working tree（工作区）
      - staging area（暂存区）
      - repository（仓库）
    correct: 0
    explanation: 工作区就是你编辑文件的地方；暂存区是待提交的改动清单；仓库保存已提交的历史。
    anchor: "#三个区域"
  - id: 0-2-e2
    question: git add 把改动从哪个区域移到哪个区域？
    options:
      - working tree → staging area
      - staging area → repository
      - repository → working tree
    correct: 0
    explanation: git add 把工作区的改动登记进暂存区；真正写入历史的是 git commit（暂存区 → 仓库）。
    anchor: "#三个区域"
  - id: 0-2-e3
    question: git commit 把改动从哪个区域移到哪个区域？
    options:
      - working tree → staging area
      - staging area → repository
      - 直接丢弃改动
    correct: 1
    explanation: commit 把暂存区里的改动打包成一次提交，保存进仓库（.git 目录），成为一条历史快照。
    anchor: "#三个区域"
  - id: 0-2-e4
    question: 暂存区带来的最大好处是什么？
    options:
      - 让提交流程更繁琐
      - 可以把改动分次提交，历史更清晰
      - 可以自动修复错误
    correct: 1
    explanation: 改了两处不相关的功能，可以先 add 第一处、提交，再 add 第二处、提交，每条提交历史都干净可读。
    anchor: "#为什么要多一个暂存区"
---

# 三个区域模型

## 本课目标

- 认识 working tree、staging area、repository 三个区域
- 理解 git add 与 git commit 分别移动什么
- 知道 git status 在展示什么

## 三个区域

Git 把仓库分成三个区域：

- **working tree（工作区）**：你正在编辑的文件，编辑器改动的是它
- **staging area（暂存区，也叫 index）**：你挑好、准备提交的改动清单
- **repository（仓库，`.git` 目录）**：已提交的历史快照

`git status` 展示的就是这三个区域之间的差异：哪些文件改了没 add、哪些 add 了没 commit。

## 为什么要多一个暂存区

有了暂存区，你可以**分次提交**：一次改了不相干的两处功能，先 add 第一处提交，再 add 第二处提交，每条提交历史都干净、可读、可回退。没有暂存区，一次改动就只能一次提交，历史里全是「又改了一点」。

## 动画：三个区域

点按钮，观察文件在三个区域之间移动：编辑发生在工作区，`git add` 登记到暂存区，`git commit` 才真正写入历史。

<ThreeAreas />

## 练习

<Exercise />

<LessonProgress />
