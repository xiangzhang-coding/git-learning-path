# 段階 2 — ブランチとマージ

この段階の原理の主線：**コミットグラフと HEAD**。ブランチは commit を指すポインタにすぎず、HEAD が現在位置をマークします。ブランチの操作（switch、merge、コンフリクト）はすべて、コミットグラフ上でポインタを動かすか、分岐を再び束ねる作業です。

## コース

- 2-1 [git branch と git switch](/ja/stage/2/2-1-branch-switch)：ブランチはポインタ、HEAD は現在位置
- 2-2 [ブランチでの作業](/ja/stage/2/2-2-branch-workflow)：コミットは現在のブランチにだけ積まれ、履歴は DAG に分岐する
- 2-3 [git merge でブランチをマージ](/ja/stage/2/2-3-merge)：fast-forward マージとマージコミット
- 2-4 [マージのコンフリクトを解決する](/ja/stage/2/2-4-merge-conflict)：コンフリクトマーカーと解決のフロー

## この段階の新コマンド

| コマンド | 役割 |
| --- | --- |
| `git branch` | ブランチの一覧を表示。現在のブランチに `*` が付く |
| `git branch <name>` | ブランチを作成（切り替えない） |
| `git switch <name>` | 既存のブランチに切り替える |
| `git switch -c <name>` | 新しいブランチを作成して切り替える |
| `git merge <branch>` | 対象ブランチを現在のブランチにマージする |

<StageProgress stage="2" />
