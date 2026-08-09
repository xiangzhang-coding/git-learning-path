# 章节 5 动手清单：localStorage 打卡，不设门槛

章节 5 在真实 GitHub 上练习（ADR-0002），操作无法在线验证。为此在章节 5 索引页新增「动手清单」组件：10 项真实操作任务（fork → upstream 同步 → PR → review → issue → fixes 关联 → Release → Actions 部署 → 失败日志），勾选状态存 localStorage。

- **Status**: accepted
- **Considered Options**: 保持纯叙述引导（散落各课，无可追踪性）；每课各放清单（分散、难维护）；后端打卡（违背纯静态）
- **Consequences**: 新增 Checklist.vue 组件（9 语言 label，任务文案走各语言 index.md 的 props）；清单项与五课的「动手练习」小节一一对应；勾选是学习进度的补充而非门槛——不做任何提交校验

技术细节：key `gitpath-checklist-stage5`，JSON 布尔数组按任务索引存取；勾选任意项后显示「清空清单」按钮；样式跟随主题变量（与练习卡片同体系）。
