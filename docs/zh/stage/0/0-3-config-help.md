---
title: config 与 help
exercises:
  - id: 0-3-e1
    question: git config --global user.name 的作用范围是？
    options:
      - 仅当前仓库
      - 当前用户的所有仓库
      - 整台机器的所有用户
    correct: 1
    explanation: --global 表示写入 ~/.gitconfig，对当前用户的所有仓库生效；不加参数则只对当前仓库生效（local）。
    anchor: "#第一次使用前的配置"
  - id: 0-3-e2
    question: 三个配置层级中，优先级最高的是？
    options:
      - system
      - global
      - local
    correct: 2
    explanation: 越具体的层级优先级越高：local > global > system。local 只属于当前仓库，最贴近实际使用场景。
    anchor: "#三个层级"
  - id: 0-3-e3
    question: 想快速查看 git commit 的用法摘要，用哪条命令？
    options:
      - git commit -h
      - git help commit
      - 两者都可以
    correct: 2
    explanation: -h 显示用法摘要，git help 打开完整手册——两者都是官方用法，按需选择。
    anchor: "#遇到不认识的命令"
  - id: 0-3-e4
    question: git config --list 显示什么？
    options:
      - 当前生效的全部配置
      - 只有用户配置
      - 仓库里的文件列表
    correct: 0
    explanation: --list 列出当前生效的全部配置（按 local > global > system 合并后的结果），是排查配置问题的第一步。
    anchor: "#第一次使用前的配置"
---

# config 与 help

## 本课目标

- 配置 user.name 与 user.email
- 理解配置的 system / global / local 三个层级
- 学会用 help 查找命令用法

## 第一次使用前的配置

Git 每次提交都要知道作者是谁，所以第一次使用前要配置：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

`--global` 表示对所有仓库生效。用 `git config --list` 查看当前生效的全部配置，`git config user.name` 单独查看某一项。

## 三个层级

配置从宽到窄分三层，**越具体优先级越高**：

| 层级 | 生效范围 | 存放位置 |
| --- | --- | --- |
| system | 整台机器的所有用户 | `/etc/gitconfig` |
| global | 当前用户的所有仓库 | `~/.gitconfig` |
| local | 当前仓库 | `.git/config` |

实际生效值按 local → global → system 覆盖。

## 遇到不认识的命令

- `git help <命令>`：打开完整手册
- `git <命令> -h`：快速查看用法摘要
- `git help --all`：列出所有命令

忘记命令没关系，能查到就行。

## 练习

<Exercise />

<LessonProgress />
