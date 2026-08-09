---
title: git fetch and git pull
exercises:
  - id: 3-4-e1
    question: What does git fetch do?
    options:
      - Downloads the remote's new commits, updates tracking branches, but leaves your working tree alone
      - Downloads and merges directly into the current branch
      - Sends local commits to the remote
    correct: 0
    explanation: fetch only updates "the remote's mirror" (origin/main); your branch and working tree stay untouched — a safe way to see what's on the remote.
    anchor: "#git-fetch-just-looks"
  - id: 3-4-e2
    question: What is the relationship between git pull and git fetch?
    options:
      - pull = fetch + merge (merges the remote's new commits into the current branch)
      - pull = fetch + push
      - They are exactly the same
    correct: 0
    explanation: pull first fetches to update the mirror, then merges (or fast-forwards) origin/main into the current branch.
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: In the playground below, pull down the remote's new commits.
    type: task
    scenario: pull-ff
    goal: Run git pull on main to fast-forward the remote's new commits into your branch.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: "When you have no new local commits, pull fast-forwards: the remote's new files appear directly in your working tree and history stays a straight line."
    anchor: "#git-pull-fetch-merge"
---

# git fetch and git pull

## Lesson goals

- Download remote updates with git fetch without touching the working tree
- Understand pull = fetch + merge
- Inspect the remote's state with git log origin/main

## git fetch just looks

```bash
git fetch            # download all of origin's new commits
git fetch origin     # equivalent
```

fetch downloads the remote's **new commit objects** and updates the tracking branch `origin/main` — but **doesn't touch your branch or working tree**:

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

After fetching, you can safely "look at" the remote's state and check how far apart remote and local are at any time:

```bash
git log origin/main --oneline   # what's on the remote
git log main..origin/main       # commits the remote has that you don't
```


<RemoteFlow />

## git pull = fetch + merge

```bash
git pull             # equivalent to git fetch + git merge origin/main
```

pull is both steps combined: first fetch (update the mirror), then merge `origin/main` into the current branch.

- **You have no new local commits**: fast-forward merge, the working tree updates directly, history stays a straight line
- **You also have new local commits**: a merge commit is created, joining the two branches' histories
- **Both sides changed the same spot**: conflict — the resolution flow is identical to Chapter 2 (edit → add → commit)

## When to use which

| Scenario | Command |
| --- | --- |
| Just want to see what's new on the remote | `git fetch` |
| Get the remote's new commits directly | `git pull` |
| Push rejected | `git pull` first, then `git push` |

**Golden rule**: pull before you push — merge the remote's updates first, then push yours, and you'll never hit the non-fast-forward rejection.

## Exercises

<Exercise />

## Playground

<Playground scenario="pull" />

<LessonProgress />
