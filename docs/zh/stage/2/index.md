# 阶段 2 — 分支与合并

本阶段的原理主线：**提交图与 HEAD**。分支只是一个指向 commit 的指针，HEAD 标记你当前的位置；一切分支操作（switch、merge、冲突）都是在提交图上移动指针、或把分叉重新合拢。

## 课程

- 2-1 [git branch 与 git switch](/zh/stage/2/2-1-branch-switch)：分支是指针，HEAD 是当前位置
- 2-2 [在分支上工作](/zh/stage/2/2-2-branch-workflow)：提交只落在当前分支，历史分叉成 DAG
- 2-3 [git merge 合并分支](/zh/stage/2/2-3-merge)：快进合并与合并提交
- 2-4 [解决合并冲突](/zh/stage/2/2-4-merge-conflict)：冲突标记与解决流程

## 本阶段新命令

| 命令 | 作用 |
| --- | --- |
| `git branch` | 查看分支列表，当前分支带 `*` |
| `git branch <name>` | 创建分支（不切换） |
| `git switch <name>` | 切换到已有分支 |
| `git switch -c <name>` | 创建并切换到新分支 |
| `git merge <branch>` | 把目标分支合并进当前分支 |

<StageProgress stage="2" />
