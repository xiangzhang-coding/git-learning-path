---
title: git reset and reflog
exercises:
  - id: 4-2-e1
    question: What does git reset --hard do?
    options:
      - Moves HEAD, the index and the working tree all to the target commit, discarding the commits and changes in between
      - Only undoes the latest commit's message
      - Pushes changes to the remote
    correct: 0
    explanation: --hard rolls back all three — the branch pointer, the staging area and the working tree all return to the target commit's state. Dangerous, but common.
    anchor: "#git-reset-moves-head"
  - id: 4-2-e2
    question: Can commits discarded by a reset be recovered?
    options:
      - Yes — find its hash with git reflog and reset back to it
      - No, they're gone forever
      - Only by cloning from the remote
    correct: 0
    explanation: git doesn't delete commit objects right away; reflog records every move of HEAD, so an old hash is enough to recover.
    anchor: "#git-reflog-finds-lost-commits"
  - id: 4-2-e3
    question: In the playground below, drop the most recent commit.
    type: task
    scenario: reset
    goal: Run git reset --hard HEAD~1 to drop the most recent commit (and its changes).
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1 steps the branch back one, and the working tree goes back to the previous state as well.
    anchor: "#git-reset-moves-head"
  - id: 4-2-e4
    question: In the playground below, use reflog to recover the commit you reset away.
    type: task
    scenario: reset
    goal: 'Use git reflog to find the commit you just reset away (message contains "break"), then restore it with git reset --hard.'
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: reflog shows HEAD's complete history; find the hash of the commit from before the reset and reset --hard back to it — everything is recovered.
    anchor: "#git-reflog-finds-lost-commits"
---

# git reset and reflog

## Lesson goals

- Move HEAD and repository state with git reset
- Tell apart --hard / mixed / --soft
- Recover reset-away commits with git reflog

## git reset moves HEAD

```bash
git reset --hard <commit>   # HEAD, index and working tree all roll back
git reset <commit>          # HEAD and index roll back, working tree keeps
git reset --soft <commit>   # only HEAD moves; index and working tree untouched
```

**reset "walks backwards"**: it moves the branch pointer to any commit. The three modes differ in "how far the effect reaches":

| Mode | HEAD | Index (staging area) | Working tree |
| --- | --- | --- | --- |
| `--soft` | moves | kept | kept |
| default (mixed) | moves | reset | kept |
| `--hard` | moves | reset | reset |

`--hard` is the most used and the most dangerous: all commits in between and uncommitted changes vanish together (the working tree is overwritten). After `--hard`, the output `HEAD is now at <short hash> <message>` tells you where you are now.

## git reflog finds lost commits

```bash
git reflog
```

**reflog (reference log) is HEAD's complete movement log** — not just the current branch's history, but "where your HEAD has been":

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

Commits discarded by a reset are **not deleted** — they just have no branch pointing at them. Find its hash in the reflog and `git reset --hard <hash>` brings it back completely. That's git's "regret pill": as long as the operation happened on your machine, almost everything can be recovered.

## Exercises

<Exercise />

## Playground

<Playground scenario="reset" />

<LessonProgress />
