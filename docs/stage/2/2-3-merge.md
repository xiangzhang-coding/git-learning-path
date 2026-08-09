---
title: git merge merges branches
exercises:
  - id: 2-3-e1
    question: When does a fast-forward merge happen?
    options:
      - The current branch has no new commits and the target branch's commits all sit after it
      - Anytime
      - When both branches have new commits
    correct: 0
    explanation: If main stays put while feature adds commits after it, merge only needs to move the main pointer straight ahead; history stays a single line and no new commit is created.
    anchor: "#fast-forward-merges"
  - id: 2-3-e2
    question: When both branches have new commits, what does git merge produce?
    options:
      - A merge commit (with two parents)
      - Two new commits
      - A tag
    correct: 0
    explanation: Once history has forked, git must combine both sides' changes into one place, producing a merge commit with two parents.
    anchor: "#merge-commits"
  - id: 2-3-e3
    question: In the playground below, merge feature into main (fast-forward).
    type: task
    scenario: merge-ff
    goal: Run git merge feature on main; after merging, the working tree contains feature.txt.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "The output shows Fast-forward: main has no new commits, the pointer just advances to feature, and feature.txt appears in the working tree."
    anchor: "#fast-forward-merges"
  - id: 2-3-e4
    question: In the playground below, merge feature into main (both branches have diverged).
    type: task
    scenario: merge
    goal: Run git merge feature on main to perform a regular merge.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: This time history has forked, so merge produces a merge commit. The playground's commit graph shows it connecting to both branches.
    anchor: "#merge-commits"
---

# git merge merges branches

## Lesson goals

- Merge a branch into the current branch with git merge
- Tell fast-forward merges apart from merge commits
- Understand that a merge commit has two parents

## The basic git merge flow

```bash
git switch main     # first go back to the side that receives the changes
git merge feature   # bring feature in
```

`git merge <branch>` merges the target branch's changes into the **current branch**. It first finds the two branches' **common ancestor**, then computes the differences along the three paths (common ancestor → current branch, common ancestor → target branch), and combines the changes into one result.

## Fast-forward merges

If the current branch has no new commits and the target branch simply "walked a few steps ahead of it":

```
o  A ← main stays here
|
o  B ← feature
|
o  C ← feature commits again
```

`git merge feature` only needs to move the `main` pointer **straight ahead** to C — that is a fast-forward. The output shows `Fast-forward`, **no new commit is created**, and history stays a single line.


<MergeVisual />

## Merge commits

If both branches committed independently (history forked), there is no "move the pointer ahead" path — git must combine both sides into a brand-new commit:

```
o  A
|\
| o  B (main's new commit)
o |  C (feature's new commit)
 \|
  o  M (merge commit, two parents: B and C)
```

What makes this **merge commit** special: it has two parents. On the playground's commit graph, a merge commit connects to both branches at once.

## Automatic merging

As long as both sides changed different spots, git automatically combines the two sets of changes — you do nothing, and the output looks like:

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

If both sides changed the same spot, you hit the topic of the next lesson: conflict.

## Exercises

<Exercise />

## Playground

<Playground scenario="merge" />

<LessonProgress />
