---
title: git rebase 重放提交
exercises:
  - id: 4-4-e1
    question: git rebase 做了什么？
    options:
      - 把当前分支在分叉点之后的提交，重放到目标分支最新提交之后
      - 把两个分支合并成一个提交
      - 删除当前分支的历史
    correct: 0
    explanation: rebase 把分叉后的提交一个个「重放」到目标分支顶部，历史从分叉变成一条直线。
    anchor: "#git-rebase-重放提交"
  - id: 4-4-e2
    question: rebase 之后，提交哈希会怎样？
    options:
      - 重放的提交都是新哈希（提交内容相同，身份不同）
      - 保持不变
      - 只有第一个会变
    correct: 0
    explanation: 哈希包含父提交和时间，重放产生了全新的提交对象——所以不要 rebase 已推送的分支。
    anchor: "#git-rebase-重放提交"
  - id: 4-4-e3
    question: 在下面的练手区中，把 feature 分支 rebase 到 main 上。
    type: task
    scenario: rebase
    goal: 切到 feature，执行 git rebase main，让 feature 的提交落到 main 之后。
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: rebase 后提交图是直线：main 的两个提交在前，feature 的提交在后，没有合并提交。
    anchor: "#git-rebase-重放提交"
  - id: 4-4-e4
    question: 在下面的练手区中，rebase 冲突后中止。
    type: task
    scenario: rebase-conflict
    goal: 切到 feature，执行 git rebase main 触发冲突，然后 git rebase --abort 恢复原状。
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
      - type: rebaseAborted
    explanation: 双方改了同一处时会冲突；--abort 把一切恢复到 rebase 之前。
    anchor: "#rebase-冲突与中止"
---

# git rebase 重放提交

## 本课目标

- 用 git rebase 把分支提交重放到目标分支
- 理解 rebase 改写历史、产生新哈希
- 理解 rebase 冲突与 --abort

## git rebase 重放提交

```bash
git switch feature
git rebase main
```

rebase 把当前分支在**分叉点之后**的每个提交，重新应用到目标分支的最新提交之后：

```
rebase 前（分叉）：          rebase 后（直线）：
o  A                        o  A
|\                          o  B (main)
| o  B (main)               o  C' (feature，新哈希)
o |  C (feature)            o  D' (feature，新哈希)
 \|
  o  D (feature)
```

输出 `Successfully rebased and updated refs/heads/feature.`。提交图从「树枝」变成「直线」——这是 rebase 的核心价值：**历史更干净**。

**重要**：重放的提交都是**新哈希**（内容相同、身份不同）。也就是说 rebase 在改写历史——所以永远不要 rebase 已经推送、别人在用的分支。

## rebase 与 merge 的选择

| | merge | rebase |
| --- | --- | --- |
| 历史 | 保留分叉 + 合并提交 | 线性，无分叉 |
| 哈希 | 不动 | 重写（新哈希） |
| 已推送分支 | 安全 | 禁止 |
| 适用 | 共享分支合并 | 本地分支整理 |

工作流上常见的组合：本地用 rebase 把历史整理成直线，推到远程后用 merge 合入共享分支。

## rebase 冲突与中止

rebase 重放每个提交时都可能冲突（双方改了同一处），此时 git 停下来：

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

解决方式有两种：

```bash
git rebase --continue   # 冲突已解决（add 之后）继续重放
git rebase --abort      # 放弃这次 rebase，恢复原状
```

与 merge 冲突相同：编辑文件、删掉标记、`git add`，然后 `--continue`。不想处理就 `--abort`，一切回到 rebase 之前。

## 练习

<Exercise />

## 练手区

<Playground scenario="rebase" />

<LessonProgress />
