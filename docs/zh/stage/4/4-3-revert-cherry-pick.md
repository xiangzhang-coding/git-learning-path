---
title: git revert 与 git cherry-pick
exercises:
  - id: 4-3-e1
    question: git revert 是怎么撤销提交的？
    options:
      - 产生一个反向的新提交，历史保持前进
      - 直接删除那个提交
      - 移动分支指针回去
    correct: 0
    explanation: revert 不改写历史——它用一个新的反向提交抵消目标提交的改动，适合已推送的提交。
    anchor: "#git-revert-撤销提交"
  - id: 4-3-e2
    question: git cherry-pick 用来做什么？
    options:
      - 把某个分支上的一个提交复制到当前分支
      - 把两个分支合并
      - 挑选文件进行对比
    correct: 0
    explanation: cherry-pick 把指定提交的改动应用到当前分支，生成一个新提交——适合只取别人某个提交。
    anchor: "#git-cherry-pick-复制提交"
  - id: 4-3-e3
    question: 在下面的练手区中，撤销那个坏提交。
    type: task
    scenario: revert
    goal: "用 git revert 撤销最近的坏提交（fix: break hello），让 hello.txt 恢复正确内容。"
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert 生成一个 "Revert \"fix: break hello\"" 的新提交，hello.txt 恢复为被破坏前的内容。'
    anchor: "#git-revert-撤销提交"
  - id: 4-3-e4
    question: 在下面的练手区中，把 feature 分支的提交复制到 main。
    type: task
    scenario: cherry-pick
    goal: 在 main 分支上执行 git cherry-pick <feature 的提交>，把 feature.txt 的功能带到 main。
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: cherry-pick 复制提交后，feature 分支原样保留，main 上也多了一个内容相同的提交。
    anchor: "#git-cherry-pick-复制提交"
  - id: 4-3-e5
    question: git bisect 用来做什么？
    options:
      - 通过二分搜索定位第一个引入 bug 的提交
      - 把两个分支的历史合并
      - 撤销最近一次提交
    correct: 0
    explanation: bisect 标记「坏」与「好」提交后，反复 checkout 中间点让你确认，用二分法快速锁定「从哪个提交开始变坏」。
    anchor: "#git-bisect-二分定位坏提交"
  - id: 4-3-e6
    question: 在下面的练手区中，用 bisect 定位引入 bug 的提交。
    type: task
    scenario: bisect
    goal: 执行 git bisect start、git bisect bad、git bisect good HEAD~3；每次被切到中间提交后查看 calc.js 的 add 函数——正确就 git bisect good，有 bug 就 git bisect bad，直到定位完成。
    checks:
      - type: bisectDone
    explanation: 'bisect 会定位到「fix: typo in add」——add 函数从它开始出错；结束后可用 git bisect reset 返回原分支。'
    anchor: "#git-bisect-二分定位坏提交"
---

# git revert 与 git cherry-pick

## 本课目标

- 用 git revert 撤销已存在的提交
- 用 git cherry-pick 复制提交
- 用 git bisect 二分定位坏提交
- 理解它们都不改写历史

## git revert 撤销提交

```bash
git revert <提交>
```

revert 不是「删除」那个提交，而是**产生一个反向的新提交**：它把目标提交的改动反过来应用，历史照常前进：

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

为什么不用 reset？因为 **revert 不改写历史**——别人已经 clone 或 pull 过的提交，一旦被 reset 掉，所有副本都会不一致；revert 只是「再加一个抵消提交」，对所有人安全。所以：**本地未推送的错误用 reset，已推送的错误用 revert**。

## git cherry-pick 复制提交

```bash
git cherry-pick <提交>   # 把该提交复制到当前分支
```

cherry-pick 把**某一个提交的改动**应用到当前分支，生成一个新提交（内容相同、哈希不同）。典型场景：别人在 feature 分支修复了一个 bug，你想在 main 上直接拿这个修复，而不把整个 feature 合并过来。

```
o  A ---- B (main) ---- B' (cherry-picked fix)
     \
      C (fix on feature)
```

## revert 与 cherry-pick 的区别

| | revert | cherry-pick |
| --- | --- | --- |
| 方向 | 撤销（反向应用） | 复制（正向应用） |
| 适用 | 提交有错误要抹掉 | 提交很好，想搬到别的分支 |
| 结果 | 一个新提交抵消旧提交 | 一个新提交复刻旧提交 |

两者都不改写已有历史，冲突时都会停下等你解决。

## git bisect 二分定位坏提交

```bash
git bisect start          # 开始
git bisect bad            # 当前 HEAD 是坏的
git bisect good <提交>     # 标记一个已知的好提交
# 循环：checkout 到中间点 → 测试 → git bisect good / git bisect bad
git bisect reset          # 结束，回到原分支
```

「某个功能坏了，但不知道从哪个提交开始坏」——人工逐个翻历史太低效。bisect 用**二分法**：标记一个「坏」提交和一个「好」提交后，git 自动 checkout 两者中间的那个提交，你测试后说 good 或 bad，范围就缩小一半。反复几次就能锁定第一个引入 bug 的提交。

## 练习

<Exercise />

## 练手区

<Playground scenario="revert" />

<LessonProgress />
