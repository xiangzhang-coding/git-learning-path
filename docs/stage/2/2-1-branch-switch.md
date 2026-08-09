---
title: git branch and git switch
exercises:
  - id: 2-1-e1
    question: What does git branch show?
    options:
      - A list of all branches, with * marking the current branch
      - A list of all commits
      - Uncommitted changes
    correct: 0
    explanation: git branch lists the branches in the repository and marks your current branch with *.
    anchor: "#git-branch-views-and-creates-branches"
  - id: 2-1-e2
    question: What is a branch, fundamentally?
    options:
      - A movable pointer that points to a commit
      - A full copy of the code
      - A separate folder
    correct: 0
    explanation: A branch is just a pointer to a commit. Creating a branch copies no files, which is why it is so lightweight.
    anchor: "#branches-are-pointers"
  - id: 2-1-e3
    question: In the playground below, create branch feature and switch to it.
    type: task
    scenario: branching
    goal: Use git switch -c feature to create and switch in one step.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature is the two steps "create branch feature + switch to it" combined. HEAD now points to feature.
    anchor: "#git-switch-switches-branches"
  - id: 2-1-e4
    question: In the playground below, switch back to the main branch.
    type: task
    scenario: branching
    goal: Use git switch main to switch back to main.
    checks:
      - type: branchIs
        name: main
    explanation: Switching branches only moves HEAD and the working-tree contents; the commits stay on their own branches.
    anchor: "#git-switch-switches-branches"
---

# git branch and git switch

## Lesson goals

- View and create branches with git branch
- Switch branches with git switch
- Understand that a branch is a pointer and HEAD marks your current position

## Branches are pointers

A branch is essentially a **movable pointer to a commit**. Creating a branch copies no files — it just adds a name pointing at the current commit:

```bash
git branch feature
```

This command records a name `feature` in the repository, pointing at the commit where HEAD is. As you commit on `feature`, the `feature` pointer moves forward with you.

**Key concept: a branch has no "code of its own"** — it is just a position marker in history. The same working tree, under a different branch name, shows the snapshot that branch's pointer points to.

## git branch views and creates branches

```bash
git branch        # list all branches; the current one gets a *
git branch <name> # create a branch (without switching)
```

The list looks like:

```
* main
  feature
```

Creating a branch only records a pointer — it does **not switch to it**. To get there, use switch.

## git switch switches branches

```bash
git switch <name>    # switch to an existing branch
git switch -c <name> # create and switch (the most common form)
```

- `git switch feature`: HEAD moves to `feature`, and the working-tree files are replaced with the snapshot that branch points to
- `git switch -c feature`: creates a new branch and switches immediately — equivalent to `git branch feature` + `git switch feature`

**Older syntax**: `git checkout <name>` and `git checkout -b <name>` are the legacy commands that do the same thing; `git switch` is the newer recommended one, and the playground supports both. `git checkout` also has a "restore files" use, now covered by `git restore` (Chapter 1).

If the working tree has uncommitted changes, git refuses to switch and asks you to commit or stash first — because the snapshot changes, and there would be nowhere for those changes to sit.

## HEAD points to your current position

**HEAD** is a special pointer that marks "which branch, and which commit on it, you are on right now". The `On branch feature` line at the top of `git status` is HEAD's answer. Switching branches means moving the HEAD pointer.

## Exercises

<Exercise />

## Playground

<Playground scenario="branching" />

<LessonProgress />
