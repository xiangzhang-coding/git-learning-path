# 章 4 — 修正と応用

この章の原理の主線：**refs と reflog**。reset はブランチのポインタを移動し、revert/cherry-pick は新しいコミットを生み、rebase は履歴を書き換えます——そして reflog は HEAD の移動をすべて記録するので、どんな「後悔」も取り戻せます。

## コース

- 4-1 [git stash と git tag](/ja/stage/4/4-1-stash-tag)：変更を一時退避、バージョンを固定マーク
- 4-2 [git reset と reflog](/ja/stage/4/4-2-reset-reflog)：HEAD を動かす 3 つのモード、reflog でコミットを取り戻す
- 4-3 [git revert と git cherry-pick](/ja/stage/4/4-3-revert-cherry-pick)：逆方向の取り消しとコミットのコピー
- 4-4 [git rebase でコミットを重ね直す](/ja/stage/4/4-4-rebase)：履歴を一直線に、コンフリクトと中止
- 4-5 [git worktree](/ja/stage/4/4-5-worktree)：1 つのリポジトリに複数の作業ディレクトリ

## この章の新コマンド

| コマンド | 役割 |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | 未コミットの変更を一時退避する |
| `git tag <name>` / `git tag -a <name> -m <msg>` | コミットに固定マークをつける |
| `git reset [--hard\|--soft] <ref>` | HEAD を移動する（インデックス/ワークツリーも連動可能） |
| `git reflog` | HEAD の完全な移動記録を表示する |
| `git revert <ref>` | 逆方向の新しいコミットで 1 つのコミットを取り消す |
| `git cherry-pick <ref>` | 特定のコミットを現在のブランチへコピーする |
| `git rebase <branch>` / `--continue` / `--abort` | ブランチのコミットを対象ブランチに重ね直す |
| `git worktree add/list/remove` | リポジトリに複数の作業ディレクトリを追加する |

<StageProgress stage="4" />
