---
title: git restore、git rm 与 git mv
exercises:
  - id: 1-4-e1
    question: git restore hello.txt 的作用是？
    options:
      - 把 hello.txt 恢复到 HEAD 版本，丢弃工作区改动
      - 删除 hello.txt
      - 把 hello.txt 加入暂存区
    correct: 0
    explanation: git restore 把文件恢复到仓库中的版本（默认从 HEAD 恢复），丢弃工作区的修改。注意：恢复的是已跟踪文件，未跟踪文件不受影响。
    anchor: "#git-restore-撤销改动"
  - id: 1-4-e2
    question: 在下面的练手区中，用 git restore 恢复 hello.txt。
    type: task
    scenario: local
    goal: hello.txt 被改乱了，用 git restore hello.txt 恢复原样。
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: 恢复后 hello.txt 回到 "hello world"，工作区干净，git status 显示 nothing to commit。
    anchor: "#git-restore-撤销改动"
  - id: 1-4-e3
    question: 在下面的练手区中，删除 notes.txt（保留在版本历史中）。
    type: task
    scenario: local
    goal: 用 git rm notes.txt 删除文件并暂存删除。
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: git rm 同时做了两件事：删除工作区文件 + 暂存删除。提交后文件就从最新版本中消失，但历史里还能找回。
    anchor: "#git-rm-删除文件"
  - id: 1-4-e4
    question: 在下面的练手区中，把 notes.txt 重命名为 diary.txt。
    type: task
    scenario: local
    goal: 用 git mv notes.txt diary.txt 完成重命名并暂存。
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv 是「移动 + 暂存」的组合命令，重命名后 git status 会显示删除旧名、新增新名。
    anchor: "#git-mv-移动文件"
---

# git restore、git rm 与 git mv

## 本课目标

- 用 git restore 丢弃工作区改动
- 用 git rm 删除文件
- 用 git mv 移动或重命名文件

## git restore 撤销改动

改坏了？想回到上次提交的样子：

```bash
git restore <文件名>
```

`git restore` 把文件恢复到 HEAD 中的版本，**丢弃工作区的修改**。注意它只作用于已跟踪（tracked）的文件——新文件还没被 git 认识，restore 管不着。

## git rm 删除文件

```bash
git rm <文件名>
```

一步完成两件事：删除工作区文件 + 把删除登记到暂存区。提交后文件从最新版本消失，但历史记录仍在——任何时候都能找回。

## git mv 移动文件

```bash
git mv 旧名 新名
```

移动（重命名）文件并暂存。git 不「记住」重命名本身——它通过内容对比识别：旧文件消失 + 新文件内容相同 = 重命名。所以 mv 之后 status 里显示的是 deleted + new file。

## 练习

<Exercise />

## 练手区

<Playground scenario="local" />

<LessonProgress />
