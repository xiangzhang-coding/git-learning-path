# 章节 3 — 远程协作

本章节的原理主线：**两份仓库与跟踪分支**。remote 是另一份仓库的地址；clone 复制它，fetch 更新「远程的镜像」（origin/main），push 把本地提交送过去，pull = fetch + merge。

## 课程

- 3-1 [git remote 远程仓库](/zh/stage/3/3-1-remote)：remote 是什么，添加与查看
- 3-2 [git clone 克隆仓库](/zh/stage/3/3-2-clone)：一次完成复制，origin 与跟踪分支
- 3-3 [git push 推送提交](/zh/stage/3/3-3-push)：发送本地提交，非快进拒绝
- 3-4 [git fetch 与 git pull](/zh/stage/3/3-4-fetch-pull)：fetch 只看不动，pull = fetch + merge

## 本章节新命令

| 命令 | 作用 |
| --- | --- |
| `git remote add <name> <url>` | 注册远程仓库地址 |
| `git remote -v` | 查看所有 remote 的名字与地址 |
| `git clone <url> [<dir>]` | 把远程仓库完整复制到本地 |
| `git push` | 把当前分支领先的提交推送到远程 |
| `git fetch` | 下载远程新提交，更新跟踪分支 |
| `git pull` | fetch + merge：拉取并合并远程更新 |
| `git log origin/main` | 查看远程分支当前指向的历史 |
| `cd <dir>` | 在练手区里切换目录（clone 后进入新仓库） |

<StageProgress stage="3" />
