---
title: Issues 与协作
exercises:
  - id: 5-3-e1
    question: GitHub Issue 的典型用途是什么？
    options:
      - 报告 bug、提出功能建议、讨论具体任务
      - 存储代码备份
      - 给提交写日志
    correct: 0
    explanation: Issue 是围绕一个具体问题展开的讨论线程，可以指派负责人、打标签、放进里程碑、关联 PR。
    anchor: "#issue-是什么"
  - id: 5-3-e2
    question: 要让合并 PR 时自动关闭 issue，正确做法是？
    options:
      - 在 PR 描述或关联提交信息里写 "fixes #12"
      - 在 issue 的评论里提一下 PR 编号
      - 只能手动关闭 issue
    correct: 0
    explanation: GitHub 识别 closes、fixes、resolves 关键字加 issue 编号，PR 合并时自动关闭对应 issue。
    anchor: "#用-pr-关掉-issue"
  - id: 5-3-e3
    question: label 与 milestone 的作用分别是？
    options:
      - label 给 issue 分类（如 bug、feature），milestone 把一组 issue 归到一个版本目标
      - label 是权限标记，milestone 是时间线
      - 两者都是给仓库加星
    correct: 0
    explanation: labels 便于筛选分类；milestones 表示「这个版本要完成哪些事」，常与 Release 对应。
    anchor: "#标签与里程碑"
---

# Issues 与协作

## 本课目标

- 理解 Issue 是什么、怎么开
- 用 label 与 milestone 组织任务
- 用「fixes #编号」把 PR 与 issue 关联起来

## issue 是什么

Issue 是仓库里的讨论线程：报告 bug、提功能建议、讨论具体任务。每个 issue 有编号（如 #12）、标题、描述与评论，还可以指派负责人、打标签、放进里程碑。

## 开一个 issue

点仓库页面的 Issues → New issue。好的 issue 描述包含：问题是什么、如何复现、期望的行为。很多仓库提供 issue 模板（bug 报告 / 功能请求），按模板填写能显著提高处理效率。

## 标签与里程碑

- **label（标签）**：给 issue 分类，如 bug、enhancement、good first issue。按标签筛选是维护者整理工作的主要方式。
- **milestone（里程碑）**：把一组 issue 归到同一个版本目标，如 v1.2.0。里程碑显示进度（完成 x/y 个 issue）。

## 用 PR 关掉 issue

在 PR 描述（或关联提交的信息）里写：

```
fixes #12
```

GitHub 会把该 PR 与 issue 12 关联；PR 合并时，issue 自动关闭。同义关键字还有 closes、resolves。这让「哪个改动解决了哪个问题」在历史中可追溯。

## 协作流程一瞥

```
发现 bug → 开 issue（#12）→ 维护者加 label + milestone
  → 贡献者开分支修 bug → PR 描述写 "fixes #12"
  → 合并 → issue 自动关闭，里程碑 +1
```

## 动手练习

- 在你自己的仓库开一个 issue，创建 label 与 milestone
- 修一个 bug 并提交 PR，在描述里关联 issue
- 观察合并后 issue 是否自动关闭

## 练习

<Exercise />

<LessonProgress />
