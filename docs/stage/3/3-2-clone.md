---
title: git clone clones a repository
exercises:
  - id: 3-2-e1
    question: What does git clone do?
    options:
      - Copies the remote repository completely to your machine (history + working tree) and sets up origin automatically
      - Downloads only the latest commit
      - Uploads your local repository to the remote
    correct: 0
    explanation: clone copies the entire history, checks out the default branch's working tree, names the remote origin automatically, and sets up tracking branches.
    anchor: "#git-clone-full-copy-in-one-command"
  - id: 3-2-e2
    question: After cloning, what is origin/main?
    options:
      - "A tracking branch: a local mirror recording which commit the remote main points to"
      - A folder inside the remote repository
      - A new local branch you can commit to directly
    correct: 0
    explanation: refs/remotes/origin/main is a read-only tracking mirror recording where the remote main pointed at clone or fetch time.
    anchor: "#tracking-branch-origin-main"
  - id: 3-2-e3
    question: In the playground below, clone the remote repository and enter the cloned directory.
    type: task
    scenario: clone
    goal: Run git clone /origin, then cd origin to enter the cloned repository, and use git status to confirm you are on main.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: After cloning, cd into the new directory and you are inside a full copy of the history — the remote origin is already configured.
    anchor: "#git-clone-full-copy-in-one-command"
---

# git clone clones a repository

## Lesson goals

- Copy a remote repository to your machine with git clone
- Understand origin and the tracking branch origin/main
- Understand that you need to cd into the new directory after cloning

## git clone: full copy in one command

```bash
git clone /origin          # creates an origin/ subdirectory in the current directory and clones into it
git clone /origin my-project  # you can also give the directory a name
cd origin                  # enter the cloned repository
```

`git clone <address>` does four things in one go:

1. Creates a new directory locally (named after the last segment of the address by default)
2. Copies the remote's **entire history**
3. Checks out the default branch's (usually main) working tree
4. Names the remote **origin** automatically and sets up tracking branches

clone is the standard way to "join an existing project" — no need for `git init`, everything comes from the remote.

## Tracking branch origin/main

When cloning, git records the commit each remote branch points to at that moment as a **tracking branch**:

```
refs/remotes/origin/main   # read-only mirror: where the remote main is right now
```

It differs from a local branch (`refs/heads/main`): **your commits don't move it** — only `git fetch` / `git pull` / `git push` update it. Afterwards you can look at "what the remote looks like" anytime with `git log origin/main`.

## Copy vs connection

clone is a **copy**: the cloned repository is completely independent, its only link to the remote is the origin address. Your commits don't travel to the remote on their own, and new remote commits don't appear on their own — fetch/push/pull, taught in the next three lessons, carry changes in both directions.

## Exercises

<Exercise />

## Playground

<Playground scenario="clone" />

<LessonProgress />
