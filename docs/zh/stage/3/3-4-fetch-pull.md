---
title: git fetch 与 git pull
exercises:
  - id: 3-4-e1
    question: git fetch 做了什么？
    options:
      - 下载远程的新提交，更新跟踪分支，但不动你的工作区
      - 下载并直接合并进当前分支
      - 把本地提交发送到远程
    correct: 0
    explanation: fetch 只更新「远程的镜像」（origin/main），你的分支和工作区保持原样——安全地看看远端有什么。
    anchor: "#git-fetch-只看不动"
  - id: 3-4-e2
    question: git pull 与 git fetch 的关系是？
    options:
      - pull = fetch + merge（把远程的新提交合并进当前分支）
      - pull = fetch + push
      - 两者完全一样
    correct: 0
    explanation: pull 先 fetch 更新镜像，再把 origin/main 合并（或快进）进当前分支。
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: 在下面的练手区中，把远程的新提交拉取下来。
    type: task
    scenario: pull-ff
    goal: 在 main 分支上执行 git pull，把远程新增的提交快进合并进来。
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: 本地没有新提交时，pull 会快进：工作区直接出现远程新增的文件，历史保持一条直线。
    anchor: "#git-pull-fetch-merge"
---

# git fetch 与 git pull

## 本课目标

- 用 git fetch 下载远程更新而不改动工作区
- 理解 pull = fetch + merge
- 用 git log origin/main 观察远程状态

## git fetch 只看不动

```bash
git fetch            # 下载 origin 的所有新提交
git fetch origin     # 等价写法
```

fetch 把远程**新的提交对象**下载到本地，并更新跟踪分支 `origin/main`——但**不动你的分支和工作区**：

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

fetch 之后，你可以安全地「看」远程状态，随时可以看远程和本地差多少：

```bash
git log origin/main --oneline   # 远程这边有什么
git log main..origin/main       # 远程有而本地没有的提交
```


<RemoteFlow />

## git pull = fetch + merge

```bash
git pull             # 等价于 git fetch + git merge origin/main
```

pull 是两步的合体：先 fetch（更新镜像），再把 `origin/main` 合并进当前分支。

- **本地没有新提交**：快进合并，工作区直接更新，历史保持直线
- **本地也有新提交**：产生合并提交（merge commit），两个分支的历史合并
- **两边改了同一处**：冲突——解决流程与章节 2 完全一样（编辑 → add → commit）

## 什么时候用哪个

| 场景 | 命令 |
| --- | --- |
| 只想看看远程有什么新东西 | `git fetch` |
| 直接拿到远程的新提交 | `git pull` |
| 推不上去（被拒绝）时 | 先 `git pull` 再 `git push` |

**黄金规则**：push 之前先 pull——先合并远程的更新，再推自己的，就不会被 non-fast-forward 拒绝。

## 练习

<Exercise />

## 练手区

<Playground scenario="pull" />

<LessonProgress />
