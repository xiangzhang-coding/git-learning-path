---
title: Working on a branch
exercises:
  - id: 2-2-e1
    question: After committing on branch feature, will switching back to main show that commit?
    options:
      - No — commits only land on the current branch
      - Yes — all branches share the same history
      - It depends on the commit message
    correct: 0
    explanation: Every commit lands on the current branch's pointer. A commit on feature only advances feature; main's history is unaffected.
    anchor: "#commits-only-land-on-the-current-branch"
  - id: 2-2-e2
    question: After both branches commit separately, what shape does the commit graph take?
    options:
      - A DAG (directed acyclic graph) forking from a common ancestor
      - Always a straight line
      - Only one branch's record
    correct: 0
    explanation: As branches advance independently, history forks from a shared commit into a branching tree — in git's world this is called a DAG.
    anchor: "#forking-and-the-commit-graph"
  - id: 2-2-e3
    question: In the playground below, make a commit on branch feature.
    type: task
    scenario: branching
    goal: "Create and switch to feature, create feat.txt (any content), and commit it with a message containing \"feat\"."
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: "After the commit, the commit graph below the playground forks: the feature pointer moves one step forward while main stays put."
    anchor: "#commits-only-land-on-the-current-branch"
  - id: 2-2-e4
    question: In the playground below, switch back to main and keep the working tree clean.
    type: task
    scenario: branching
    goal: Use git switch main to switch back; the status should be clean.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: After switching back to main, the commit on feature is invisible in main's history, but the branch pointer remains — you can switch back anytime.
    anchor: "#commits-only-land-on-the-current-branch"
---

# Working on a branch

## Lesson goals

- Commit on a branch and understand that commits only land on the current branch
- Understand forking: the commit graph forks from a common ancestor
- Use the playground's commit graph to observe branch structure

## Commits only land on the current branch

After creating a branch, **commits only land on the current branch**. Suppose `main` is at commit A, then:

```bash
git switch -c feature
# change some code
git commit -m "feat: login page"
```

This commit only advances `feature`; `main` stays at A. Switch back to main and you won't see this commit or that file — the working tree reverts to A's snapshot.

**This is exactly the core use of branches**: experiment freely on feature while main stays stable.

## Forking and the commit graph

When main and feature each commit, history forks from their common ancestor:

```
o  A (common starting point of main and feature)
|\
o |  B (main's new commit)
| o  C (feature's new commit)
```

This structure is called the **commit graph**, technically a DAG (directed acyclic graph) — each commit has at most two parents, and there are no cycles. The commit graph in the playground draws it in real time, with branch names printed at the branch tips.

## git log views history

```bash
git log --oneline
```

`git log` only shows the **current branch's** history. Switch to feature and it shows feature's line; switch back to main and it shows main's line. To see commits from all branches at once, the playground's commit graph is the clearest way.

## Exercises

<Exercise />

## Playground

<Playground scenario="branching" />

<LessonProgress />
