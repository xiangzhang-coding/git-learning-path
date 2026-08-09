# Git 学习路径（Git Learning Path）

一个基于 VitePress 的静态课程站：分六个章节由浅入深地教授 Git/GitHub **常用命令**及其原理，支持 9 种语言版本（英文 + 8）、站内**练手区**（浏览器内执行 git 命令并实时绘制提交图）与即时反馈**练习**，部署于 GitHub Pages。

[English](README.en.md) · 中文

在线地址：https://xiangzhang-coding.github.io/git-learning-path/

## 特性

- **9 种语言版本**：英文 + 简体中文/日语/韩语/德语/法语/西班牙语/葡萄牙语/俄语，按浏览器语言自动进入对应版本（Cookie 记忆选择）
- **浏览器练手区**：isomorphic-git 引擎在浏览器内真实执行 git 命令，实时绘制提交 DAG 与仓库状态，覆盖章节 1–4
- **即时反馈练习**：作答立刻给出正确/错误反馈，反馈中的讲解锚点直链对应课文
- **教学可视化**：5 个自动播放组件（快照模型、HEAD 指针、合并三结局、远程数据流、reset 三模式），支持暂停/重播，`prefers-reduced-motion` 下退化为手动逐步
- **章节 5 真实 GitHub 动手清单**：fork → PR → Issue → Release → Actions → Pages 十项打卡任务
- **站内搜索**：Pagefind 全文索引，9 种语言可用
- **5 种主题**：跟随系统 / 明亮 / 暗色 / 终端 / 复古终端
- **Mermaid 流程图**：章节 5 的流程示意随主题自动切换明暗

## 本地开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # 构建 + PageFind 索引（产物在 docs/.vitepress/dist）
```

练手区依赖 isomorphic-git，在浏览器内运行，无需后端。

## 测试

```bash
npm test                  # 单元测试（vitest，约 600 个）
npx playwright test       # 浏览器端到端测试（需要先 npm run build）
```

- `tests/`：练手区引擎的 git 命令语义（提交/分支/合并/rebase/reset…）与课程内容校验（练习数据、锚点字节级匹配、9 语言结构一致性）
- `e2e/`：真实浏览器行为（练习反馈、主题切换、搜索、mermaid 渲染、教学可视化、锚点跳转）

PR 提交时 CI（`.github/workflows/ci.yml`）会自动运行类型检查、单元测试、构建与 e2e。

## 目录结构

```
docs/
├─ .vitepress/
│  ├─ config.ts            # i18n 9 语言版本配置、主题、导航
│  └─ theme/               # 主题系统、搜索、语言跟随、教学组件
│     └─ lib/playground/   # 浏览器 git 引擎（isomorphic-git 封装 + 场景）
├─ adr/                    # 架构决策记录
├─ index.md                # 英文首页（root locale）
└─ zh|ja|ko|de|fr|es|pt|ru/  # 各语言内容
tests/                     # 单元测试（引擎语义 + 内容校验）
e2e/                       # 浏览器端到端测试
.github/workflows/         # CI（PR 校验）与部署（main 推送 → GitHub Pages）
```

## 课程结构

章节 0–5：概念与环境 → 本地基础 → 分支与合并 → 远程协作 → 修复与进阶 → GitHub 生态。每课覆盖 2–4 个常用命令 + 原理主线 + 练习 + 练手区场景。

术语与写作规范见 [`CONTEXT.md`](CONTEXT.md)（章节/课/练习/练手区等用词约定）。

## 技术栈

| 用途 | 技术 |
| --- | --- |
| 静态站点 | VitePress |
| 浏览器 git 引擎 | isomorphic-git |
| 流程图 | Mermaid（vitepress-plugin-mermaid） |
| 站内搜索 | Pagefind |
| 单元测试 | Vitest |
| 端到端测试 | Playwright |

## 部署

`.github/workflows/deploy.yml`：main 分支推送即触发 GitHub Actions 构建并发布到 GitHub Pages（项目页面，`/git-learning-path/` 路径）。

## 许可证

[MIT](LICENSE)
