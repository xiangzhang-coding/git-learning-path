---
title: Releases 与版本发布
exercises:
  - id: 5-4-e1
    question: 语义化版本 2.4.1 中，每个数字代表什么？
    options:
      - 2 是主版本（破坏性变更），4 是次版本（新功能），1 是补丁（bug 修复）
      - 2 是补丁，4 是主版本，1 是次版本
      - 三个数字没有区别
    correct: 0
    explanation: MAJOR.MINOR.PATCH：主版本破坏兼容、次版本加功能、补丁修 bug。升位规则让版本号传递兼容性信息。
    anchor: "#语义化版本"
  - id: 5-4-e2
    question: 要把带注释的标签推送到远程，正确的是？
    options:
      - 先 git tag -a v1.0.0 -m "v1.0.0"，再 git push origin v1.0.0
      - git push 会自动带上所有标签
      - 打了 git tag 就不需要 push
    correct: 0
    explanation: 先打标签，再显式推送；git push 默认不推送标签（除非 git push --tags）。
    anchor: "#打-tag-并推送"
  - id: 5-4-e3
    question: GitHub Release 与 git tag 的关系是？
    options:
      - Release 建立在 tag 之上，额外提供发布说明与附件
      - Release 与 tag 无关
      - Release 就是分支
    correct: 0
    explanation: 从已有 tag 创建 Release，补上说明文字（release notes）和二进制附件，形成正式版本。
    anchor: "#创建-release"
---

# Releases 与版本发布

## 本课目标

- 理解语义化版本的规则
- 打 tag 并推送到 GitHub
- 创建带说明与附件的 Release

## 语义化版本

版本号 MAJOR.MINOR.PATCH（如 2.4.1）：

| 位 | 何时升 |
| --- | --- |
| MAJOR 主版本 | 破坏性变更，不兼容旧版 |
| MINOR 次版本 | 新增功能，向后兼容 |
| PATCH 补丁 | 修复 bug，不新增功能 |

规则很简单：升主版本可以解释「为什么你的程序突然坏了」，升补丁表示「可以放心升级」。

## 打 tag 并推送

发布前先在本地打 tag（章节 4 学过）：

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

注意 `git push` 默认不推送标签，需要显式 `git push origin <tag>`（或一次推全部：`git push --tags`）。

## 创建 Release

GitHub 上仓库页面 → Releases → Draft a new release：

1. 选择（或新建）tag，如 v1.0.0
2. 写标题与发布说明（release notes）
3. 可附上二进制产物（安装包、构建物）
4. 点 Publish release

Release 就是「带说明的 tag」：用户在这里下载版本、查看变更，而不是去翻 git log。

## release notes 怎么写

好的发布说明按读者分组：

- **新增**（Features）：新功能，可链接到 PR
- **修复**（Bug fixes）：修了什么，可链接到 issue
- **破坏性变更**（Breaking changes）：升级注意事项

## 动手练习

- 给你的项目打 v0.1.0 标签并推送
- 创建第一个 Release，写三段式说明
- 发布一个补丁版本，观察 Releases 列表

## 练习

<Exercise />

<LessonProgress />
