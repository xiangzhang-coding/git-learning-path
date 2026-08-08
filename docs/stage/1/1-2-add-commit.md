---
title: git add and git commit
exercises:
  - id: 1-2-e1
    question: Which area does git add move changes into?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 1
    explanation: git add registers working-tree changes into the staging area, marking them as "ready to commit".
    anchor: "#git-add-stages-changes"
  - id: 1-2-e2
    question: What does the -m flag of git commit do?
    options:
      - Merges two branches
      - Writes the commit message
      - Changes the author
    correct: 1
    explanation: -m provides the commit message that records what this commit does. Good messages are for others — including future you.
    anchor: "#git-commit-saves-a-snapshot"
  - id: 1-2-e3
    question: In the playground below, stage todo.txt.
    type: task
    scenario: add-commit
    goal: Use git add todo.txt to put the file into the staging area.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: After staging, todo.txt appears under "Changes to be committed" in git status.
    anchor: "#git-add-stages-changes"
  - id: 1-2-e4
    question: In the playground below, commit todo.txt with a message containing "todo".
    type: task
    scenario: add-commit
    goal: "git add todo.txt, then git commit -m \"feat: add todo\"."
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: After the commit, todo.txt is in repository history; note that the hello.txt modification stays in the working tree — commit only packages what is staged.
    anchor: "#git-commit-saves-a-snapshot"
---

# git add and git commit

## Lesson goals

- Stage changes with git add
- Save snapshots with git commit
- Understand that commit only includes staged content

## git add stages changes

```bash
git add <filename>   # stage one file
git add .            # stage all changes in this directory
```

`git add` registers working-tree changes into the **staging area**. You can stage selectively: changed three features, stage and commit one at a time, and history stays clean.

## git commit saves a snapshot

```bash
git commit -m "feat: add login page"
```

`git commit` packages the **staged** content into a commit and writes it into history. Each commit:

- saves a complete **snapshot** of the project (not a diff)
- gets a unique SHA-1 hash ID (e.g. `4a2b9c1`)
- records author, time and message

**The key rule: commit only includes what is staged.** Changes in the working tree that were never added stay out of this commit.

## Writing commit messages

Say what you did in one line: verb first, consistent tense, under 50 characters. For example `fix: correct the login validation`.

## Exercises

<Exercise />

## Playground

<Playground scenario="add-commit" />

<LessonProgress />
