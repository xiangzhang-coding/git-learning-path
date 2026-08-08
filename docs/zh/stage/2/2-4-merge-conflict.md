---
title: 解决合并冲突
exercises:
  - id: 2-4-e1
    question: 冲突（conflict）发生在什么时候？
    options:
      - 双方修改了同一个文件的同一处
      - 双方修改了不同的文件
      - 只要执行 git merge 就会
    correct: 0
    explanation: 改不同位置 git 能自动合并；只有两边改了同一处、git 无法判断该保留谁的，才需要你手动决定。
    anchor: "#冲突是怎么发生的"
  - id: 2-4-e2
    question: 冲突标记 <<<<<<< HEAD 和 ======= 之间是什么内容？
    options:
      - 当前分支（HEAD）对这一处的修改
      - 对方分支对这一处的修改
      - 完整的文件内容
    correct: 0
    explanation: 冲突文件里 <<<<<<< HEAD 与 ======= 之间是「你这边」的版本，======= 与 >>>>>>> 之间是「对方」的版本。
    anchor: "#冲突标记"
  - id: 2-4-e3
    question: 在下面的练手区中，制造并解决一次冲突。
    type: task
    scenario: conflict
    goal: 执行 git merge feature 触发冲突；把 hello.txt 的内容改为 hello resolved 并删掉冲突标记；git add hello.txt；再 git commit 完成合并。
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: 冲突解决的本质是「你来做 git 做不了的决定」：编辑文件、删掉标记、add、commit，合并提交就诞生了。
    anchor: "#解决冲突的流程"
  - id: 2-4-e4
    question: 解决完冲突（add 之后）用什么命令完成合并？
    options:
      - git commit（把解决结果提交，生成合并提交）
      - git stash
      - git reset
    correct: 0
    explanation: 冲突解决并 add 后，git 还处于合并中（MERGE_HEAD 存在），这时 git commit 会用当前内容生成合并提交，结束合并。
    anchor: "#解决冲突的流程"
---

# 解决合并冲突

## 本课目标

- 理解冲突产生的原因
- 看懂冲突标记
- 掌握解决冲突的标准流程：编辑 → add → commit

## 冲突是怎么发生的

合并时 git 需要把两边改动合成一份。如果两边改的是**不同位置**，git 可以自动合并；但如果**双方修改了同一个文件的同一处**，git 无法判断该保留谁的——它只能把两边的版本都放进文件，交给你决定。

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

输出里会明确告诉你是哪个文件：

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## 冲突标记

冲突文件的每一块冲突都有三个标记：

| 标记 | 含义 |
| --- | --- |
| `<<<<<<< HEAD` | 以下是你这边（当前分支）的内容 |
| `=======` | 分隔线 |
| `>>>>>>> feature` | 以下是对方分支（feature）的内容，标记名是对方分支名 |

**你的任务**：决定最终保留哪份（或写一份新的），然后把三个标记全部删掉。

## 解决冲突的流程

标准流程四步：

```bash
git merge feature          # 1. 触发冲突
# 编辑冲突文件：选择内容，删掉标记
git add hello.txt          # 2. 告诉 git 这个文件解决了
git commit -m "merge: resolve"   # 3. 完成合并，生成合并提交
```

期间 `git status` 会提醒你正处于合并中：有未解决文件时显示 `You have unmerged paths`，全部 add 后显示 `All conflicts fixed but you are still merging`——这时 commit 即可。

**要点**：冲突不是错误，是 git 把决定权交给你。解决后产生的仍然是一个普通合并提交，历史照常记录这次合并。

## 练习

<Exercise />

## 练手区

<Playground scenario="conflict" />

<LessonProgress />
