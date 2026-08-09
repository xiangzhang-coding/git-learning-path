# 章 5 — GitHub エコシステム

この章の原理の主線：**GitHub をめぐる協働のループ**。fork は自分のコピーを作り、upstream は原作者とつなぎます。PR は変更が本流に入る門、issue は議論を担い、release はバージョンを公開し、Actions と Pages はテストとデプロイを自動化します。この章では実際の GitHub で練習します——どの概念にも実践タスクが付いています。

## コース

- 5-1 [fork と upstream の同期](/ja/stage/5/5-1-fork-upstream)：fork でコピーを作り、upstream で上流の更新を受け取る
- 5-2 [Pull Request の流れ](/ja/stage/5/5-2-pull-request)：PR を開く、review で議論、3 つのマージ方式
- 5-3 [Issues と協働](/ja/stage/5/5-3-issues)：issue での議論、label と milestone、PR による issue の自動クローズ
- 5-4 [Releases とバージョン公開](/ja/stage/5/5-4-releases)：セマンティックバージョニング、tag の push、Release の公開
- 5-5 [GitHub Actions と Pages](/ja/stage/5/5-5-actions-pages)：workflow の自動化、Pages のデプロイ

## この章のコア機能

| 機能 | 役割 |
| --- | --- |
| fork | GitHub 上でリポジトリを自分のアカウントに複製する |
| pull request | ブランチのコミットを対象リポジトリに統合するよう依頼する |
| issue | bug・機能・タスクの議論と追跡 |
| milestone | 複数の issue を 1 つのバージョン目標にまとめる |
| release | tag を基にした正式リリース（説明と添付物付き） |
| GitHub Actions | イベント駆動の CI/CD 自動化 |
| GitHub Pages | 無料の静的サイトホスティング（本プロジェクトもこれ） |

<StageProgress stage="5" />
