# Git 学习路径（Git Learning Path）

一个基于 VitePress 的静态课程站：分六个章节由浅入深地教授 Git/GitHub **常用命令**及其原理，支持 9 种语言版本（英文 + 8）、站内**练手区**（浏览器内执行 git 命令并实时绘制提交图）与即时反馈**练习**，部署于 GitHub Pages。

在线地址：https://xiangzhang-coding.github.io/git-learning-path/

## 本地开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # 构建 + PageFind 索引（产物在 docs/.vitepress/dist）
```

练手区依赖 isomorphic-git，在浏览器内运行，无需后端。

## 目录结构

```
docs/
├─ .vitepress/
│  ├─ config.ts            # i18n 9 语言版本配置、主题、导航
│  └─ theme/               # 主题系统（跟随系统/明亮/暗色终端/复古终端）、搜索、语言跟随
├─ adr/                    # 架构决策记录
├─ index.md                # 英文首页（root locale）
└─ zh|ja|ko|de|fr|es|pt|ru/  # 各语言内容
```

## 课程结构

章节 0–5：概念与环境 → 本地基础 → 分支与合并 → 远程协作 → 修复与进阶 → GitHub 生态。每课覆盖 2–4 个常用命令 + 原理主线 + 练习 + 练手区场景。

## 部署

`.github/workflows/deploy.yml`：main 分支推送即触发 GitHub Actions 构建并发布到 GitHub Pages（项目页面，`/git-learning-path/` 路径）。
