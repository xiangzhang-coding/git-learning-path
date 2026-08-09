---
title: git revert and git cherry-pick
exercises:
  - id: 4-3-e1
    question: How does git revert undo a commit?
    options:
      - It creates a new reverse commit, keeping history moving forward
      - It deletes that commit directly
      - It moves the branch pointer back
    correct: 0
    explanation: revert doesn't rewrite history — it cancels out the target commit's changes with a new reverse commit, which suits commits that are already pushed.
    anchor: "#git-revert-undoes-a-commit"
  - id: 4-3-e2
    question: What is git cherry-pick used for?
    options:
      - Copying a single commit from one branch onto the current branch
      - Merging two branches together
      - Picking files to compare
    correct: 0
    explanation: cherry-pick applies the target commit's changes to the current branch as a new commit — perfect for taking just one specific commit from someone else.
    anchor: "#git-cherry-pick-copies-a-commit"
  - id: 4-3-e3
    question: In the playground below, undo that bad commit.
    type: task
    scenario: revert
    goal: "Use git revert to undo the recent bad commit (fix: break hello) so hello.txt gets its correct content back."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert creates a new commit "Revert \"fix: break hello\"" and hello.txt gets its pre-break content back.'
    anchor: "#git-revert-undoes-a-commit"
  - id: 4-3-e4
    question: In the playground below, copy the feature branch's commit onto main.
    type: task
    scenario: cherry-pick
    goal: On main, run git cherry-pick <the feature commit> to bring the feature.txt work over to main.
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: after cherry-pick, the feature branch stays exactly as it was, and main now has its own commit with the same content.
    anchor: "#git-cherry-pick-copies-a-commit"
  - id: 4-3-e5
    question: What is git bisect for?
    options:
      - Binary-searching the first commit that introduced a bug
      - Merging the history of two branches
      - Undoing the most recent commit
    correct: 0
    explanation: bisect marks a bad and a good commit, then repeatedly checks out the midpoint for you to test — halving the range each time until the first bad commit is found.
    anchor: "#git-bisect-homes-in-on-the-bad-commit"
  - id: 4-3-e6
    question: In the playground below, use bisect to locate the commit that introduced the bug.
    type: task
    scenario: bisect
    goal: Run git bisect start, git bisect bad, git bisect good HEAD~3; at each midpoint check calc.js — if the add function is correct run git bisect good, if it is buggy run git bisect bad, until bisect finishes.
    checks:
      - type: bisectDone
    explanation: 'bisect will pinpoint "fix: typo in add" — the commit where add started failing; use git bisect reset afterwards to return to your branch.'
    anchor: "#git-bisect-homes-in-on-the-bad-commit"
---

# git revert and git cherry-pick

## Lesson goals

- Undo an existing commit with git revert
- Copy commits with git cherry-pick
- Use git bisect to home in on the commit that broke things
- Understand that none of these rewrite history

## git revert undoes a commit

```bash
git revert <commit>
```

revert doesn't "delete" the commit — it **creates a new reverse commit**: it applies the target commit's changes in reverse, and history keeps moving forward:

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

Why not reset? Because **revert doesn't rewrite history** — once other people have cloned or pulled a commit, resetting it away makes every copy inconsistent; revert just "adds one more offsetting commit", which is safe for everyone. So: **unpushed local mistakes use reset; pushed mistakes use revert**.

## git cherry-pick copies a commit

```bash
git cherry-pick <commit>   # copy that commit onto the current branch
```

cherry-pick applies **one commit's changes** to the current branch as a new commit (same content, different hash). The classic case: someone fixed a bug on a feature branch and you want that fix on main directly — without merging the whole feature over.

```
o  A ---- B (main) ---- B' (cherry-picked fix)
     \
      C (fix on feature)
```

## revert vs cherry-pick

| | revert | cherry-pick |
| --- | --- | --- |
| Direction | Undo (apply in reverse) | Copy (apply as-is) |
| Use when | A commit is wrong and has to be wiped out | A commit is good and you want it on another branch |
| Result | A new commit cancelling out an old one | A new commit replicating an old one |

Neither rewrites existing history, and both stop and wait for you to resolve conflicts.


## git bisect homes in on the bad commit

```bash
git bisect start          # begin
git bisect bad            # current HEAD is broken
git bisect good <commit>   # mark a known-good commit
# loop: checkout a midpoint → test → git bisect good / git bisect bad
git bisect reset          # finish, back to the original branch
```

"Something broke, but I don't know which commit did it" — going through history by hand is painfully slow. bisect uses **binary search**: after you mark one bad and one good commit, git checks out the midpoint between them; you test and say good or bad, and the range halves. A few rounds pin down the first commit that introduced the bug.

## Exercises

<Exercise />

## Playground

<Playground scenario="revert" />

<LessonProgress />
