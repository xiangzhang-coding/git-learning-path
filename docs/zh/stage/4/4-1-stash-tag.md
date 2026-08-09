---
title: git stash 与 git tag
exercises:
  - id: 4-1-e1
    question: git stash 保存的是什么？
    options:
      - 尚未提交的改动（staged 和 unstaged 的 tracked 文件）
      - 已经提交的历史
      - 远程仓库的全部内容
    correct: 0
    explanation: stash 把工作区里未提交的改动临时收起来，让工作区回到干净状态——之后再 pop 取回。
    anchor: "#git-stash-暂存改动"
  - id: 4-1-e2
    question: tag 和 branch 的区别是？
    options:
      - branch 会随提交移动，tag 固定指向一个 commit
      - tag 会随提交移动，branch 固定
      - 两者完全一样
    correct: 0
    explanation: tag 是钉在某个 commit 上的名字，之后怎么提交都不会移动它——适合标记版本号。
    anchor: "#git-tag-标记版本"
  - id: 4-1-e3
    question: 在下面的练手区中，把当前未提交的改动 stash 起来。
    type: task
    scenario: stash
    goal: 执行 git stash，让工作区回到干净状态。
    checks:
      - type: statusClean
    explanation: stash 后工作区干净，改动被保存在 stash 列表里（stash@{0}）。
    anchor: "#git-stash-暂存改动"
  - id: 4-1-e4
    question: 在下面的练手区中，把 stash 的改动恢复回来。
    type: task
    scenario: stash
    goal: 执行 git stash pop，让 hello.txt 的修改回到工作区。
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop 把 stash@{0} 的改动放回工作区并删除这条 stash 记录。
    anchor: "#git-stash-list-与-git-stash-pop"
  - id: 4-1-e5
    question: 在下面的练手区中，给当前提交打一个标签。
    type: task
    scenario: tag
    goal: 执行 git tag v1.0，然后 git tag 确认标签存在。
    checks:
      - type: tagExists
        name: v1.0
    explanation: 标签钉在当前 HEAD 上，之后的提交再多也不会移动它。
    anchor: "#git-tag-标记版本"
---

# git stash 与 git tag

## 本课目标

- 用 git stash 临时收起未提交的改动
- 用 git stash list / pop 管理 stash
- 用 git tag 标记版本

## git stash 暂存改动

```bash
git stash          # 收起当前所有未提交改动
git stash list     # 查看 stash 列表
git stash pop      # 恢复最近一条 stash
```

工作中经常遇到这种情况：改动做了一半，突然要切分支处理别的事，但切换会拒绝（有未提交的改动）。**stash** 就是「临时寄存处」：把改动收起来，工作区恢复干净，之后随时取回。

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list 与 git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` 把最近一条 stash 的改动放回工作区，并删除该记录（输出 `Dropped stash@{0}`）。注意：stash 只保存**已被 git 跟踪**的文件；新建的 untracked 文件不会被 stash。

## git tag 标记版本

```bash
git tag v1.0              # 轻量标签：给当前 commit 起名
git tag -a v1.0 -m "说明" # 附注标签：带说明文字
git tag                   # 列出所有标签
```

发布版本时，你需要一个「永远指向这个 commit」的名字——**tag** 就是钉在 commit 上的标记。与 branch 不同，tag 不会随新提交移动。

**切到标签与 detached HEAD**：`git switch <tag>` 会把 HEAD 指向标签对应的提交——但此时 HEAD 不挂在任何分支上，这就是 **detached HEAD（分离头指针）**。在这个状态下提交，新提交不属于任何分支，一旦切换走就可能找不回来；所以只看看没问题，要提交就先 `git switch -c <新分支名>` 新建一个分支。

## 练习

<Exercise />

## 练手区

<Playground scenario="stash" />

<LessonProgress />
