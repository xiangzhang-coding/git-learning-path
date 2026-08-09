---
title: git stash と git tag
exercises:
  - id: 4-1-e1
    question: git stash は何を保存しますか？
    options:
      - 未コミットの変更（staged と unstaged の tracked ファイル）
      - すでにコミットされた履歴
      - リモートリポジトリのすべての内容
    correct: 0
    explanation: stash はワークツリーの未コミットの変更を一時的に退避し、ワークツリーをクリーンな状態に戻します——あとで pop で取り戻せます。
    anchor: "#git-stash-で変更を一時退避"
  - id: 4-1-e2
    question: tag と branch の違いは？
    options:
      - branch はコミットとともに動くが、tag は 1 つの commit を固定で指し続ける
      - tag はコミットとともに動くが、branch は固定
      - 両者はまったく同じ
    correct: 0
    explanation: tag は特定の commit に釘付けされた名前で、その後のコミットでは動きません——バージョン番号のマークにぴったりです。
    anchor: "#git-tag-でバージョンをマーク"
  - id: 4-1-e3
    question: 下の練手区で、現在の未コミットの変更を stash しましょう。
    type: task
    scenario: stash
    goal: git stash を実行して、ワークツリーをクリーンな状態に戻しましょう。
    checks:
      - type: statusClean
    explanation: stash のあとワークツリーはクリーンになり、変更は stash リスト（stash@{0}）に保存されます。
    anchor: "#git-stash-で変更を一時退避"
  - id: 4-1-e4
    question: 下の練手区で、stash した変更を取り戻しましょう。
    type: task
    scenario: stash
    goal: git stash pop を実行して、hello.txt の変更をワークツリーに戻しましょう。
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop は stash@{0} の変更をワークツリーに戻し、その stash の記録を削除します。
    anchor: "#git-stash-list-と-git-stash-pop"
  - id: 4-1-e5
    question: 下の練手区で、現在のコミットにタグを付けましょう。
    type: task
    scenario: tag
    goal: git tag v1.0 を実行し、それから git tag でタグが存在することを確認しましょう。
    checks:
      - type: tagExists
        name: v1.0
    explanation: タグは現在の HEAD に釘付けされ、その後のコミットがどれだけ増えても動きません。
    anchor: "#git-tag-でバージョンをマーク"
---

# git stash と git tag

## この課の目標

- git stash で未コミットの変更を一時退避する
- git stash list / pop で stash を管理する
- git tag でバージョンをマークする

## git stash で変更を一時退避

```bash
git stash          # 現在のすべての未コミット変更を退避する
git stash list     # stash の一覧を表示する
git stash pop      # 最新の stash を取り戻す
```

仕事をしているとこんな場面がよくあります：変更をやりかけで、急にブランチを切り替えて別の作業をしないといけないけれど、切り替えは拒否されます（未コミットの変更がある）。**stash** は「一時預かり所」です：変更を退避してワークツリーをクリーンに戻し、あとでいつでも取り戻せます。

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list と git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` は最新の stash の変更をワークツリーに戻し、その記録を削除します（出力は `Dropped stash@{0}`）。注意：stash が保存するのは**git に追跡されている**ファイルだけです。新しく作った untracked ファイルは stash されません。

## git tag でバージョンをマーク

```bash
git tag v1.0              # 軽量タグ：現在の commit に名前をつける
git tag -a v1.0 -m "説明" # 注釈付きタグ：説明文つき
git tag                   # すべてのタグを一覧表示
```

バージョンをリリースするとき、「この commit を永遠に指し続ける名前」が必要になります——**tag** は commit に釘付けするマークです。branch と違って、tag は新しいコミットが来ても動きません。あとでいつでも `git switch <tag>` でそのバージョンに戻れます（このとき HEAD は detached 状態になります。章 4 の後半で説明します）。
**タグへの切り替えと detached HEAD**：`git switch <tag>` を実行すると、HEAD はタグの指す commit を指します——しかしこのとき HEAD はどのブランチにもぶら下がっていません。これが detached HEAD（分離ヘッド）です。この状態でコミットすると、新しいコミットはどのブランチにも属さず、一度切り替えて離れるともう見つけられないかもしれません。だから、見るだけなら問題ありません。コミットしたいときは、先に `git switch -c <新ブランチ名>` で新しいブランチを作りましょう。

## 練習

<Exercise />

## 練手区

<Playground scenario="stash" />

<LessonProgress />
