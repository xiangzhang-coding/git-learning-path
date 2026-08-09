# 章 3 — リモートでの共同作業

この章の原理の主線：**2 つのリポジトリとトラッキングブランチ**。remote はもう 1 つのリポジトリのアドレスです。clone はそれを複製し、fetch は「リモートのミラー」（origin/main）を更新し、push はローカルのコミットを送り、pull = fetch + merge です。

## コース

- 3-1 [git remote リモートリポジトリ](/ja/stage/3/3-1-remote)：remote とは何か、追加と確認
- 3-2 [git clone でリポジトリをクローン](/ja/stage/3/3-2-clone)：一度で複製、origin とトラッキングブランチ
- 3-3 [git push でコミットをプッシュ](/ja/stage/3/3-3-push)：ローカルのコミットを送信、non-fast-forward は拒否
- 3-4 [git fetch と git pull](/ja/stage/3/3-4-fetch-pull)：fetch は見るだけで何も変えず、pull = fetch + merge

## この章の新コマンド

| コマンド | 役割 |
| --- | --- |
| `git remote add <name> <url>` | リモートリポジトリのアドレスを登録する |
| `git remote -v` | すべての remote の名前とアドレスを表示する |
| `git clone <url> [<dir>]` | リモートのリポジトリをローカルに丸ごと複製する |
| `git push` | 現在のブランチが先んじているコミットをリモートに送る |
| `git fetch` | リモートの新しいコミットをダウンロードし、トラッキングブランチを更新する |
| `git pull` | fetch + merge：リモートの更新を取得してマージする |
| `git log origin/main` | リモートブランチが今指している履歴を表示する |
| `cd <dir>` | 練手区の中でディレクトリを切り替える（clone 後に新しいリポジトリへ入る） |

<StageProgress stage="3" />
