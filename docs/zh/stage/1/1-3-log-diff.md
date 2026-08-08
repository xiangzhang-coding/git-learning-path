---
title: git log 与 git diff
exercises:
  - id: 1-3-e1
    question: git log --oneline 显示什么？
    options:
      - 每行一个提交：短哈希 + 提交信息
      - 文件的全部内容
      - 当前分支名
    correct: 0
    explanation: git log 列出提交历史；--oneline 压缩成一行（短哈希 + 提交信息），是日常最常用的查看方式。
    anchor: "#git-log-查看历史"
  - id: 1-3-e2
    question: git diff 显示什么？
    options:
      - 工作区与暂存区之间的内容差异
      - 提交历史的差异
      - 文件的编码差异
    correct: 0
    explanation: git diff 对比工作区与暂存区（未暂存的改动）；git diff --staged 对比暂存区与 HEAD（已暂存的改动）。
    anchor: "#git-diff-查看改动"
  - id: 1-3-e3
    question: 在下面的练手区中，修改 src/a.js 并提交，提交信息包含 "fix"。
    type: task
    scenario: history
    goal: "把 src/a.js 里的 const a = 2 改成 const a = 3，然后 add 并提交，信息为 \"fix: bump a\"。"
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: 提交后历史变成 5 次提交；git log --oneline 的第一行就是你的新提交。
    anchor: "#git-log-查看历史"
---

# git log 与 git diff

## 本课目标

- 用 git log 查看提交历史
- 用 git diff 查看改动内容
- 认识短哈希与快照模型

## git log 查看历史

```bash
git log              # 完整历史（含作者、日期）
git log --oneline    # 一行一个提交：短哈希 + 信息
```

每个提交的 SHA-1 哈希是它的身份证。`git log --oneline` 里显示的是前 7 位短哈希，足够唯一定位提交。

## git diff 查看改动

```bash
git diff             # 工作区 vs 暂存区（还没 add 的改动）
git diff --staged    # 暂存区 vs HEAD（已 add 还没 commit 的改动）
```

输出里 `-` 开头是被删掉的行，`+` 开头是新增的行。提交前用 diff 检查自己改了什么，是标准习惯。

## 快照模型

每次 commit 保存的是**完整快照**而不是差异。git 用 SHA-1 哈希内容——内容相同，哈希就相同，因此哈希本身可以验证完整性、去重存储。这也是「分布式」能成立的前提：任何一份克隆里的历史都完整可重建。

## 练习

<Exercise />

## 练手区

<Playground scenario="history" />

<LessonProgress />
