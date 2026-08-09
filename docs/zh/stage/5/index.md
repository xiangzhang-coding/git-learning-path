# 章节 5 — GitHub 生态

本章节的原理主线：**围绕 GitHub 的协作回路**。fork 建立你的副本，upstream 连接原作者；PR 是提交进入主干的门，issue 承载讨论，release 发布版本，Actions 与 Pages 把测试和部署自动化。本章节在真实 GitHub 上练习——每个概念都配有动手任务。

## 动手清单

在真实 GitHub 上完成下面的全流程练习，勾选跟踪进度：

<Checklist :tasks="[
  { text: 'fork 一个你常用的开源仓库', link: '/zh/stage/5/5-1-fork-upstream' },
  { text: '克隆自己的 fork，添加 upstream，完成一次同步', link: '/zh/stage/5/5-1-fork-upstream' },
  { text: '推送一个功能分支并开一个真实的 PR', link: '/zh/stage/5/5-2-pull-request' },
  { text: '在 PR 中体验一次 review 讨论', link: '/zh/stage/5/5-2-pull-request' },
  { text: '开一个 issue，创建 label 与 milestone', link: '/zh/stage/5/5-3-issues' },
  { text: '提交一个关联 issue 的 PR（fixes #编号）', link: '/zh/stage/5/5-3-issues' },
  { text: '打 v0.1.0 标签并创建第一个 Release', link: '/zh/stage/5/5-4-releases' },
  { text: '发布一个补丁版本，写出三段式说明', link: '/zh/stage/5/5-4-releases' },
  { text: '写一个 workflow 部署静态页面到 Pages', link: '/zh/stage/5/5-5-actions-pages' },
  { text: '故意写错构建步骤，观察 Actions 失败日志', link: '/zh/stage/5/5-5-actions-pages' }
]" />

## 课程

- 5-1 [fork 与 upstream 同步](/zh/stage/5/5-1-fork-upstream)：fork 建立副本，upstream 接收上游更新
- 5-2 [Pull Request 工作流](/zh/stage/5/5-2-pull-request)：开 PR、review 讨论、三种合并方式
- 5-3 [Issues 与协作](/zh/stage/5/5-3-issues)：issue 讨论、label 与 milestone、PR 自动关闭 issue
- 5-4 [Releases 与版本发布](/zh/stage/5/5-4-releases)：语义化版本、tag 推送、Release 发布
- 5-5 [GitHub Actions 与 Pages](/zh/stage/5/5-5-actions-pages)：workflow 自动化、Pages 部署

## 本章节核心功能

| 功能 | 作用 |
| --- | --- |
| fork | 在 GitHub 上复制仓库到你的账号 |
| pull request | 请求把分支提交合入目标仓库 |
| issue | 讨论与追踪 bug、功能、任务 |
| milestone | 把一组 issue 归到版本目标 |
| release | 基于 tag 的正式发布（含说明与附件） |
| GitHub Actions | 事件驱动的 CI/CD 自动化 |
| GitHub Pages | 免费静态站点托管（本项目即是） |

<StageProgress stage="5" />
