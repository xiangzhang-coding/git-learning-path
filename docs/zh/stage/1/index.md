# 阶段 1 — 本地基础

本阶段的原理主线：**快照与 SHA**。这一阶段的所有命令，本质都是在三个区域之间搬动内容。

<StageProgress
  :lessons="[
    { text: '1-1 git init 与 git status', path: '/zh/stage/1/1-1-init-status' },
    { text: '1-2 git add 与 git commit', path: '/zh/stage/1/1-2-add-commit' },
    { text: '1-3 git log 与 git diff', path: '/zh/stage/1/1-3-log-diff' },
    { text: '1-4 git restore、git rm 与 git mv', path: '/zh/stage/1/1-4-restore-rm-mv' }
  ]"
/>

- 1-1：git init 创建仓库，git status 读懂仓库状态
- 1-2：git add 暂存，git commit 保存快照
- 1-3：git log 查看历史，git diff 查看改动
- 1-4：git restore 撤销，git rm 删除，git mv 移动

每课末尾的练手区都可以直接输入命令，任务题会自动检查你的结果。
