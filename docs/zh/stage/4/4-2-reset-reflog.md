---
title: git reset 与 reflog
exercises:
  - id: 4-2-e1
    question: git reset --hard 做了什么？
    options:
      - 把 HEAD、索引、工作区全部移动到目标提交，丢弃中间的提交和改动
      - 只撤销最后一次提交的信息
      - 把改动推到远程
    correct: 0
    explanation: --hard 是三者的整体回退：分支指针、暂存区、工作区都回到目标提交的状态——危险但常用。
    anchor: "#git-reset-移动-head"
  - id: 4-2-e2
    question: 被 reset 丢掉的提交还能找回来吗？
    options:
      - 能，用 git reflog 找到它的哈希再 reset 回去
      - 不能，永远消失了
      - 只能从远程 clone
    correct: 0
    explanation: git 不会立即删除提交对象；reflog 记录了 HEAD 的每一次移动，找到旧哈希就能恢复。
    anchor: "#git-reflog-找回丢失的提交"
  - id: 4-2-e3
    question: 在下面的练手区中，撤掉最近一次提交。
    type: task
    scenario: reset
    goal: 执行 git reset --hard HEAD~1，把最近一次提交（含其改动）撤掉。
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1 让分支后退一步，工作区也回到上一步的状态。
    anchor: "#git-reset-移动-head"
  - id: 4-2-e4
    question: 在下面的练手区中，用 reflog 找回被 reset 的提交。
    type: task
    scenario: reset
    goal: 用 git reflog 找到刚才被 reset 掉的提交（消息含 "break"），用 git reset --hard 恢复它。
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: reflog 显示 HEAD 的完整历史；找到那条 reset 前的提交哈希，reset --hard 回去，一切恢复。
    anchor: "#git-reflog-找回丢失的提交"
---

# git reset 与 reflog

## 本课目标

- 用 git reset 移动 HEAD 和状态
- 区分 --hard / 混合 / --soft
- 用 git reflog 找回被 reset 的提交

## git reset 移动 HEAD

```bash
git reset --hard <提交>   # HEAD、索引、工作区全部回退
git reset <提交>          # HEAD 和索引回退，工作区保留
git reset --soft <提交>   # 只动 HEAD，索引和工作区都不动
```

**reset 是「往回走」**：把分支指针移到任意一个提交。三种模式的区别在于「波及的范围」：

| 模式 | HEAD | 索引（暂存区） | 工作区 |
| --- | --- | --- | --- |
| `--soft` | 移动 | 保留 | 保留 |
| 默认（mixed） | 移动 | 重置 | 保留 |
| `--hard` | 移动 | 重置 | 重置 |

`--hard` 最常用也最危险：中间的所有提交和未提交改动一起消失（工作区直接被覆盖）。`--hard` 后输出 `HEAD is now at <短哈希> <消息>` 告诉你现在在哪。

## git reflog 找回丢失的提交

```bash
git reflog
```

**reflog（reference log）是 HEAD 的完整移动记录**——不只是当前分支历史，而是「你的 HEAD 到过哪里」：

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

被 reset 丢掉的提交**并没有被删除**，只是没有任何分支指向它。在 reflog 里找到它的哈希，`git reset --hard <哈希>` 就能完整找回。这就是 git 的「后悔药」：只要操作在本机发生，几乎都能恢复。

## 练习

<Exercise />

## 练手区

<Playground scenario="reset" />

<LessonProgress />
