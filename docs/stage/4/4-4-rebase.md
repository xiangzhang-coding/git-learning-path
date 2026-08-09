---
title: git rebase replays commits
exercises:
  - id: 4-4-e1
    question: What does git rebase do?
    options:
      - Replays the current branch's commits after the fork point onto the tip of the target branch
      - Merges two branches into one commit
      - Deletes the current branch's history
    correct: 0
    explanation: rebase "replays" each commit after the fork onto the target branch's tip, turning a forked history into a straight line.
    anchor: "#git-rebase-replays-commits"
  - id: 4-4-e2
    question: What happens to the commit hashes after a rebase?
    options:
      - Replayed commits get new hashes (same content, new identity)
      - They stay unchanged
      - Only the first one changes
    correct: 0
    explanation: hashes include the parent commit and the time, so replaying produces brand-new commit objects — that's why you never rebase an already-pushed branch.
    anchor: "#git-rebase-replays-commits"
  - id: 4-4-e3
    question: In the playground below, rebase the feature branch onto main.
    type: task
    scenario: rebase
    goal: Switch to feature and run git rebase main so feature's commits land after main's.
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: "after rebase the graph is a straight line: main's two commits first, then feature's, with no merge commit."
    anchor: "#git-rebase-replays-commits"
  - id: 4-4-e4
    question: In the playground below, abort after a rebase conflict.
    type: task
    scenario: rebase-conflict
    goal: Switch to feature, run git rebase main to trigger a conflict, then git rebase --abort to restore the original state.
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: when both sides changed the same spot a conflict happens; --abort restores everything to how it was before the rebase.
    anchor: "#rebase-conflicts-and-abort"
---

# git rebase replays commits

## Lesson goals

- Replay a branch's commits onto the target branch with git rebase
- Understand that rebase rewrites history and produces new hashes
- Understand rebase conflicts and --abort

## git rebase replays commits

```bash
git switch feature
git rebase main
```

rebase reapplies every commit the current branch has **after the fork point** on top of the target branch's latest commit:

```
before rebase (forked):        after rebase (straight line):
o  A                          o  A
|\                            o  B (main)
| o  B (main)                 o  C' (feature, new hash)
o |  C (feature)              o  D' (feature, new hash)
 \|
  o  D (feature)
```

It prints `Successfully rebased and updated refs/heads/feature.` The commit graph goes from "a branch" to "a straight line" — that's the core value of rebase: **cleaner history**.

**Important**: replayed commits all get **new hashes** (same content, new identity). In other words, rebase rewrites history — so never rebase a branch that's already pushed and in use by others.

## rebase vs merge

| | merge | rebase |
| --- | --- | --- |
| History | keeps the fork + a merge commit | linear, no fork |
| Hashes | untouched | rewritten (new hashes) |
| Pushed branches | safe | forbidden |
| Use when | merging shared branches | tidying up local branches |

A common workflow combo: use rebase locally to straighten out history, push to the remote, then use merge to bring it into shared branches.

## rebase conflicts and abort

Every replayed commit can hit a conflict (both sides changed the same spot), and git stops:

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

Two ways to resolve:

```bash
git rebase --continue   # keep replaying once the conflict is resolved (after add)
git rebase --abort      # give up this rebase and restore the original state
```

Same as merge conflicts: edit the file, remove the markers, `git add`, then `--continue`. If you'd rather not deal with it, `--abort` puts everything back to before the rebase.

## Exercises

<Exercise />

## Playground

<Playground scenario="rebase" />

<LessonProgress />
