---
title: git remote リモートリポジトリ
exercises:
  - id: 3-1-e1
    question: remote とは何ですか？
    options:
      - リポジトリのコピーが置かれるリモートの場所（もう 1 つのリポジトリ。通常はサーバー上）
      - ローカルのフォルダ
      - git の組み込みコマンドの 1 つで、リポジトリを圧縮するもの
    correct: 0
    explanation: remote は「もう 1 つのリポジトリ」の場所です。git はこれを介してコミットを push したり pull したりします。origin は clone 後のデフォルトの remote 名です。
    anchor: "#remote-とは何か"
  - id: 3-1-e2
    question: git remote -v は何を表示しますか？
    options:
      - すべての remote の名前とアドレス
      - すべてのブランチの一覧
      - リモートのすべてのコミット
    correct: 0
    explanation: git remote -v は各 remote の名前・アドレスと、fetch と push に使う設定を一覧表示します。
    anchor: "#git-remote-の確認と追加"
  - id: 3-1-e3
    question: 下の練手区で、origin という名前のリモートを追加しましょう。
    type: task
    scenario: remote
    goal: git remote add origin /origin でリモートを登録し、git remote -v で確認しましょう。
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: remote add はアドレスを登録するだけで、データは一切送られません。これで fetch / push / pull の行き先が決まります。
    anchor: "#git-remote-の確認と追加"
---

# git remote リモートリポジトリ

## この課の目標

- remote の概念を理解する：もう 1 つのリポジトリの場所
- git remote add でリモートを登録する
- git remote -v で設定を確認する

## remote とは何か

これまでのコミットはすべて**あなたのローカルの 1 つのリポジトリ**の中だけにあります。実際のプロジェクトでは複数人で協力します。それぞれがリポジトリを持ち、さらに「共有リポジトリ」を交換地点として使います——それが remote です。

remote（リモートリポジトリ）は、要するに**もう 1 つの git リポジトリのアドレス**です。git 自体に「クラウド」はありません。どんなマシン（あるいはディレクトリ）でも remote になれます。あなたのリポジトリは名前で remote を参照し、デフォルト名は **origin**（clone 時に自動で付けられる）です。

この課の練手区では、`/origin` がそのリモートリポジトリの場所——ローカルの `/repo` とは独立したメモリ上のリポジトリ——です。

## git remote の確認と追加

```bash
git remote            # remote の名前を一覧表示
git remote -v         # 名前 + アドレスを一覧表示（fetch / push それぞれ 1 行）
git remote add <名前> <アドレス>   # 新しい remote を登録
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add` はアドレスを登録するだけで、**データは一切送りません**。設定は `.git/config` に書き込まれます：

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## 2 つの役割を覚えよう

| 名前 | 意味 |
| --- | --- |
| ローカルブランチ | `refs/heads/main`。あなたのコミットがここに積まれる |
| remote | リモートリポジトリのアドレス（例：`/origin`） |
| トラッキングブランチ（tracking branch） | `refs/remotes/origin/main`。ローカルに記録された「リモートの main が今どこを指すか」のミラー |

トラッキングブランチは次からの clone / fetch の鍵です。これがあれば、ネットに繋がなくても「リモートがどんな状態か」を見られます。

## 練習

<Exercise />

## 練手区

<Playground scenario="remote" />

<LessonProgress />
