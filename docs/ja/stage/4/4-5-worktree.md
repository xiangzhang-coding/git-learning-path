---
title: git worktree で複数のワークツリーを作る
exercises:
  - id: 4-5-e1
    question: ワークツリーとは何ですか？
    options:
      - 同じリポジトリの objects と refs を共有する追加の作業ディレクトリ
      - 独自の履歴を持つリポジトリのコピー
      - 実験用の一時的なブランチ
    correct: 0
    explanation: git worktree add は、同じリポジトリ（共有の objects と refs）を読み書きする別の作業ディレクトリを作りますが、HEAD と index はそれぞれ独立しています。
    anchor: "#_1-つのリポジトリに-1-つのワークツリー"
  - id: 4-5-e2
    question: 同じブランチを 2 つのワークツリーで同時に checkout できますか？
    options:
      - いいえ、git は拒否します：ブランチを checkout できるのは 1 つのワークツリーだけです
      - はい、両方で作業してあとで merge できます
      - まだ push していないブランチなら可能です
    correct: 0
    explanation: 各ブランチはちょうど 1 つのワークツリーでしか checkout できません——同じブランチを 2 つのワークツリーで共有すると、互いに相手のコミットを上書きしてしまうからです。
    anchor: "#git-worktree-add-2-つ目のワークツリー"
  - id: 4-5-e3
    question: コミットしていない変更があるワークツリーを git worktree remove するとどうなりますか？
    options:
      - 変更を処理するまで git は拒否してワークツリーを残します
      - 変更もワークツリーごと削除します
      - 変更を自動で commit します
    correct: 0
    explanation: 安全装置として、変更がコミットされていない間は remove は拒否されます——commit か stash をしましょう。どうしても破棄したい場合に限り -f（force）を渡します。
    anchor: "#git-worktree-remove-ワークツリーを片付ける"
---

# git worktree で複数のワークツリーを作る

## この課の目標

- git worktree で同じリポジトリに追加の作業ディレクトリを作る
- すべてのワークツリーが objects と refs を共有しつつ、別々の HEAD を持つことを理解する
- ワークツリーの一覧表示と削除ができるようになる；Agent がなぜこれを使うのかを知る

## 1 つのリポジトリに 1 つのワークツリー

デフォルトでは、1 つのリポジトリは 1 つの作業ディレクトリを意味します。1 つのブランチを checkout してファイルを編集し commit する——別のブランチが必要になったら `git switch` で、ディレクトリ全体の内容が切り替わります。

その切り替えにはコストがかかります：現在のブランチの作業途中の変更は先に commit か stash しなければならず、また 2 つのブランチは同じディレクトリを共有するため、2 つのブランチを同時に見ることはできません。

`git worktree` はこの 1 対 1 のルールを打ち破ります。**ワークツリー**とは、同じリポジトリに取り付けられた追加の作業ディレクトリのことです：

```
your project/            <- main working tree (the original one)
├── .git/                <- shared: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- second worktree (added by git worktree add)
└── src/  (branch hotfix)   <- different branch, different directory
```

すべてのワークツリーは**同じ object データベースと refs を共有**します——あるワークツリーで作った commit はすべてのワークツリーから見えます——しかし各ワークツリーには**独自の HEAD と index**があり、それぞれ別のブランチに載せても、ほかに干渉しません。

## git worktree add：2 つ目のワークツリー

```bash
git worktree add <path> <branch>
```

`<path>` に新しい作業ディレクトリを作成し、そこで `<branch>` を checkout します。よく使う形は次の通りです：

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

役立つ細かい点：

- ブランチがすでに存在する場合、パスは空でなければなりません——ファイルのあるディレクトリを git が上書きすることはありません。
- ブランチを checkout できるのは**1 つのワークツリーだけ**です。2 つ目のワークツリーで同じブランチを checkout しようとすると、`fatal: '<branch>' is already checked out at ...` というエラーで失敗します。
- `git clone` で作るクローンは完全に独立したリポジトリです。ワークツリーは**クローンではありません**——自分専用の `.git` ディレクトリを持たず、親リポジトリの `.git` を指します。

## git worktree list：全ワークツリーを確認する

```bash
git worktree list
```

リポジトリに取り付けられたすべてのワークツリーを、そのパス・checkout 中のブランチ・どれが main ワークツリーかを表示します：

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

main ワークツリーは、リポジトリを最初に clone または作成したディレクトリです——削除することはできません。

## git worktree remove：ワークツリーを片付ける

```bash
git worktree remove <path>
```

作業ディレクトリを削除し、ワークツリーの登録を解除します。2 つの安全装置があります：

- ディレクトリに untracked または変更済みのファイルがあってはいけません——あれば git は拒否し、commit・stash・`-f` のいずれかを指示します。
- `git worktree remove -f <path>` は変更があっても削除を実行し、変更を破棄します。

削除されたワークツリーのブランチ（とそのコミット）はそのまま残ります：ブランチのポインタはリポジトリに残っているので、あとで main ワークツリーでいつでも checkout できます。

## Agent はワークツリーを好む理由

AI コーディングエージェント（Claude Code、Cursor など）は、複数のタスクを同時に進めることがよくあります。ワークツリーがない場合、タスクを切り替えるエージェントは commit か stash をしてブランチを切り替え、あとで変更を仕分ける必要があります——ミスをすると、あるタスクの編集が別のブランチのコミットに混ざってしまいます。

`git worktree add` を使えば、各タスクは**専用のディレクトリとブランチ**を持ち、完全に分離されます：

- タスク A のエージェントは `feature/login` ブランチで `../task-a` を編集
- タスク B のエージェントは `fix/typo` ブランチで `../task-b` を編集
- 両方のコミットは同じリポジトリに記録され、どちらも相手のファイルには触れられません

結果をレビューするとき、各ブランチはきれいな単位になっていて、しかも push する履歴は 1 つにまとまったままです。この分離こそが、ワークツリー型のワークフローがエージェント駆動開発の標準になった理由です。

## ワークツリーを使う時

こんなときに使いましょう：

- 2 つのブランチを同時に進める必要がある（機能開発を続けながら hotfix を直す）
- 1 つのワークツリーで長時間のテストや開発サーバーを動かし、別のワークツリーで編集を続ける
- Agent やチームのツールが並行して分離されたタスクを実行する

使わなくていいとき：一度に 1 つのタスクだけが普通なら——余分なディレクトリは、利点なしに管理の手間を増やすだけです。

## 練習

<Exercise />

<LessonProgress />
