# 练手区采用 isomorphic-git 浏览器引擎

练手区（浏览器内可执行 git 命令并实时绘制提交 DAG）选用 isomorphic-git（纯 JS 的 git 实现，浏览器内运行）作为引擎，而非自研迷你 git 引擎。真实 git 语义由官方库兜底，`push/pull/fetch/clone` 用「第二个内存仓库模拟 origin」教学远程操作，可视化层在 commit 对象之上自绘。自研引擎虽与原理章节联动更紧密，但语义有细微漂移风险且工作量不成比例。覆盖阶段 0–4，阶段 5（fork/PR/Actions）在真实 GitHub 上练习。

- **Status**: accepted
- **Considered Options**: 自研迷你 git 引擎（语义漂移风险、工作量高）；真实 git 后端 + WebSocket（需服务端，违背纯静态）
- **Consequences**: 练手区依赖一个 npm 运行时依赖；远程操作是模拟而非真实网络；每场景需预设初始仓库状态；练手区覆盖阶段 1–4（阶段 0 为纯概念课，阶段 5 在真实 GitHub 上练习）
