---
title: git worktree 多个工作树
exercises:
  - id: 4-5-e1
    question: 什么是 git worktree？
    options:
      - 一个额外的、共享同一仓库 objects 和 refs 的工作目录
      - 一个带自己历史的仓库副本
      - 一个用于实验的临时分支
    correct: 0
    explanation: git worktree add 会创建另一个工作目录，读写同一个仓库（共享 objects 和 refs），但保留自己的 HEAD 和 index。
    anchor: "#一个仓库-一个工作树"
  - id: 4-5-e2
    question: 同一个分支能同时被两个 worktree 检出吗？
    options:
      - 不能，git 会拒绝：一个分支只能在一个 worktree 中被检出
      - 可以，两边都能改，之后再合并
      - 只有分支还没推送时才可以
    correct: 0
    explanation: 每个分支只能在一个 worktree 中被检出——否则两个 worktree 会对同一分支互相覆盖提交。
    anchor: "#git-worktree-add-第二个工作树"
  - id: 4-5-e3
    question: 对带有未提交改动的 worktree 执行 git worktree remove 会发生什么？
    options:
      - git 会拒绝并保留该 worktree，直到你处理掉这些改动
      - git 会连同 worktree 一起删除这些改动
      - git 会自动提交这些改动
    correct: 0
    explanation: 作为安全保护，有未提交改动时 remove 会拒绝执行——先 commit 或 stash，实在想丢弃就用 -f（强制）。
    anchor: "#git-worktree-remove-清理工作树"
---

# git worktree 多个工作树

## 本课目标

- 用 git worktree 为同一仓库创建额外的工作目录
- 理解所有 worktree 共享 objects 和 refs，但各自有独立的 HEAD
- 列出并清理 worktree；知道为什么 Agent 会用它

## 一个仓库，一个工作树

默认情况下，一个仓库对应一个工作目录。你检出某个分支、编辑文件、提交——当需要另一个分支时，`git switch` 一执行，整个目录的内容就变了。

这种切换有代价：当前分支上进行中的工作必须先提交或 stash，而且两个分支共享同一个目录，你永远无法同时看到两个分支。

`git worktree` 打破了这一对一规则。**worktree** 是挂载到同一仓库上的额外工作目录：

```
your project/            <- 主工作树（原来的那个）
├── .git/                <- 共享：objects、refs、config
├── src/  (branch main)
└── ...
your project-hotfix/     <- 第二个工作树（由 git worktree add 添加）
└── src/  (branch hotfix)   <- 不同分支，不同目录
```

所有 worktree **共享同一个对象数据库和 refs**——在一个 worktree 里提交的 commit，其他 worktree 也都能看到——但每个 worktree 有**自己的 HEAD 和 index**，所以可以各自停在不同的分支上，互不干扰。

## git worktree add: 第二个工作树

```bash
git worktree add <path> <branch>
```

在 `<path>` 处创建新的工作目录并检出 `<branch>`。几种常见形式：

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

有用的细节：

- 如果分支已存在，目标路径必须为空——git 不会覆盖有文件的目录。
- 一个分支只能被**一个 worktree** 检出。在第二个 worktree 里检出同一分支会失败，报 `fatal: '<branch>' is already checked out at ...`。
- `git clone` 得到的是一个完整独立的仓库；worktree **不是** clone——它没有自己的 `.git` 目录，而是指向父仓库的。

## git worktree list: 查看所有工作树

```bash
git worktree list
```

列出挂载在仓库上的每个 worktree，包括路径、检出的分支，以及哪个是主 worktree：

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

主 worktree 就是仓库最初 clone 或创建时所在的目录——它不能被移除。

## git worktree remove: 清理工作树

```bash
git worktree remove <path>
```

删除工作目录并注销该 worktree。两道安全护栏：

- 目录中不能有未跟踪或已修改的文件——否则 git 会拒绝，并提示你 commit、stash 或用 `-f`。
- `git worktree remove -f <path>` 即使有改动也会删除，直接丢弃这些改动。

移除 worktree 不会动分支（及其提交）：分支指针仍留在仓库里，之后随时可以在主 worktree 中重新检出。

## 为什么 Agent 喜欢工作树

AI 编码 Agent（Claude Code、Cursor 等）经常同时处理多个任务。没有 worktree 时，Agent 切换任务就得先 commit 或 stash、再切分支，之后还要解开纠缠——一个失误就可能把一个任务的改动混进另一个分支的提交里。

有了 `git worktree add`，每个任务都有**自己独立的目录和分支**，完全隔离：

- 任务 A 的 Agent 在 `../task-a` 里、`feature/login` 分支上编辑
- 任务 B 的 Agent 在 `../task-b` 里、`fix/typo` 分支上编辑
- 两边提交都落在同一个仓库；任何一边都碰不到对方的文件

review 结果时，每个分支都是干净的一个单元——而且你仍然有一条可以推送的共享历史。正是这种隔离，让基于 worktree 的工作流成为 Agent 驱动开发的主流。

## 何时使用工作树

这些情况用得上：

- 需要同时工作在两个分支上（做 hotfix 时 feature 开发继续）
- 在一个 worktree 里跑长时间测试或 dev server，在另一个里继续编辑
- Agent 或团队工具并行运行相互隔离的任务

这些情况跳过：一次只做一个任务时——额外的目录只会增加管理负担，没有收益。

## 练习

<Exercise />

<LessonProgress />
