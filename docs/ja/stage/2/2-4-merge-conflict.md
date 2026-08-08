---
title: マージのコンフリクトを解決する
exercises:
  - id: 2-4-e1
    question: コンフリクト（conflict）はいつ起こりますか？
    options:
      - 両方が同じファイルの同じ場所を変更したとき
      - 両方が違うファイルを変更したとき
      - とにかく git merge を実行したとき
    correct: 0
    explanation: 違う場所を変更していれば git は自動でマージできます。コンフリクトになるのは両方が同じ場所を変更し、git がどちらを残すべきか判断できないときだけで、その場合に手動での判断が必要になります。
    anchor: "#コンフリクトはどのように起こるのか"
  - id: 2-4-e2
    question: コンフリクトマーカー <<<<<<< HEAD と ======= の間にあるのは何の内容ですか？
    options:
      - 現在のブランチ（HEAD）によるこの場所の変更
      - 相手ブランチによるこの場所の変更
      - ファイルの完全な内容
    correct: 0
    explanation: コンフリクトファイルでは、<<<<<<< HEAD と ======= の間が「自分側」のバージョン、======= と >>>>>>> の間が「相手側」のバージョンです。
    anchor: "#コンフリクトマーカー"
  - id: 2-4-e3
    question: 下の練手区で、コンフリクトを発生させて解決しましょう。
    type: task
    scenario: conflict
    goal: git merge feature を実行してコンフリクトを発生させます。hello.txt の内容を「hello resolved」に変更して競合マーカーを削除し、git add hello.txt を実行、git commit で完了します。
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: コンフリクト解決の本質は「git にはできない判断を自分で行う」ことです：ファイルを編集してマーカーを削除し、add して commit すれば、マージコミットが生まれます。
    anchor: "#コンフリクト解決のフロー"
  - id: 2-4-e4
    question: コンフリクトを解決して（add した後）マージを完了させるコマンドはどれですか？
    options:
      - git commit（解決結果をコミットしてマージコミットを生成する）
      - git stash
      - git reset
    correct: 0
    explanation: コンフリクトを解決して add した後も、git はまだマージ中です（MERGE_HEAD が存在します）。この状態で git commit を実行すると、現在の内容でマージコミットが生成され、マージが完了します。
    anchor: "#コンフリクト解決のフロー"
---

# マージのコンフリクトを解決する

## この課の目標

- コンフリクトが起こる理由を理解する
- コンフリクトマーカーを読み解く
- コンフリクト解決の標準フローを身につける：編集 → add → commit

## コンフリクトはどのように起こるのか

マージのとき、git は両側の変更を1つに合成する必要があります。両側が**違う場所**を変更していれば、git は自動でマージできます。しかし**両方が同じファイルの同じ場所を変更した場合**、git はどちらを残すべきか判断できません——両方のバージョンをファイルに入れて、あなたの判断を待つしかありません。

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

出力には、どのファイルで起こったかが明示されます：

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## コンフリクトマーカー

コンフリクトしたファイルでは、コンフリクトのブロックごとに3つのマーカーが入ります：

| マーカー | 意味 |
| --- | --- |
| `<<<<<<< HEAD` | 以下は自分側（現在のブランチ）の内容 |
| `=======` | 区切り線 |
| `>>>>>>> feature` | 以下は相手ブランチ（feature）の内容。マーカーの名前は相手ブランチ名 |

**あなたの仕事**：最終的に残す方を決め（新しく書き直してもよい）、3つのマーカーをすべて削除します。

## コンフリクト解決のフロー

標準フローは4ステップ：

```bash
git merge feature          # 1. コンフリクトを発生させる
# コンフリクトしたファイルを編集：内容を選び、マーカーを削除
git add hello.txt          # 2. git に「このファイルは解決済み」と伝える
git commit -m "merge: resolve"   # 3. マージを完了し、マージコミットを生成
```

その間 `git status` はマージ中であることを知らせてくれます：未解決のファイルがあれば `You have unmerged paths`、すべて add すると `All conflicts fixed but you are still merging` と表示されます——この状態で commit すれば完了です。

**要点**：コンフリクトはエラーではありません。git が判断をあなたに委ねているだけです。解決後にできるのは普通のマージコミットで、履歴には今回のマージがそのまま記録されます。

## 練習

<Exercise />

## 練手区

<Playground scenario="conflict" />

<LessonProgress />
