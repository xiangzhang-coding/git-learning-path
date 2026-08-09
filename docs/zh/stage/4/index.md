# 章节 4 — 修复与进阶

本章节的原理主线：**refs 与 reflog**。reset 移动分支指针，revert/cherry-pick 生成新提交，rebase 重写历史——而 reflog 记录 HEAD 的每一次移动，让任何「后悔」都找得回来。

## 课程

- 4-1 [git stash 与 git tag](/zh/stage/4/4-1-stash-tag)：临时寄存改动，固定标记版本
- 4-2 [git reset 与 reflog](/zh/stage/4/4-2-reset-reflog)：移动 HEAD 的三种模式，reflog 找回提交
- 4-3 [git revert 与 git cherry-pick](/zh/stage/4/4-3-revert-cherry-pick)：反向撤销与复制提交
- 4-4 [git rebase 重放提交](/zh/stage/4/4-4-rebase)：线性化历史，冲突与中止
- 4-5 [git worktree 多工作树](/zh/stage/4/4-5-worktree)：一个仓库多个并行工作目录

## 本章节新命令

| 命令 | 作用 |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | 临时收起未提交改动 |
| `git tag <name>` / `git tag -a <name> -m <msg>` | 给提交打固定标记 |
| `git reset [--hard\|--soft] <ref>` | 移动 HEAD（可连索引/工作区） |
| `git reflog` | 查看 HEAD 的完整移动记录 |
| `git revert <ref>` | 用反向新提交撤销一个提交 |
| `git cherry-pick <ref>` | 把某个提交复制到当前分支 |
| `git rebase <branch>` / `--continue` / `--abort` | 把分支提交重放到目标分支 |
| `git worktree add/list/remove` | 为一个仓库挂载多个并行工作目录 |

<StageProgress stage="4" />
