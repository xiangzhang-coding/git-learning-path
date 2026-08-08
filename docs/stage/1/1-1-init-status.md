---
title: git init and git status
exercises:
  - id: 1-1-e1
    question: What does git init do?
    options:
      - It downloads someone else's code
      - It creates a .git directory and turns the current directory into a repository
      - It creates a new file
    correct: 1
    explanation: git init initializes an empty git repository in the current directory (creating .git); from then on, the directory and its subdirectories are under version control.
    anchor: "#git-init-creates-a-repository"
  - id: 1-1-e2
    question: What does git status tell you?
    options:
      - The current branch and the differences between the three areas
      - File performance metrics
      - Server status
    correct: 0
    explanation: "git status is one of the most used commands: it shows the current branch, staged changes, unstaged changes and untracked files."
    anchor: "#git-status-shows-the-state"
  - id: 1-1-e3
    question: What does it mean for a file to be tracked by git?
    options:
      - It is listed in .gitignore
      - It exists in git's history or index, so git watches its changes
      - It is locked and cannot be modified
    correct: 1
    explanation: A tracked file is one git knows about (committed or staged); an untracked file is a new file in the working tree that git has never seen.
    anchor: "#git-status-shows-the-state"
  - id: 1-1-e4
    question: In the playground below, initialize a repository.
    type: task
    scenario: init
    goal: Use git init to turn the directory into a git repository, then confirm with git status.
    checks:
      - type: branchIs
        name: main
    explanation: After initialization, git status shows "On branch main". The playground has user.name and user.email preset, so you can commit right away.
    anchor: "#git-init-creates-a-repository"
---

# git init and git status

## Lesson goals

- Create a repository with git init
- Understand repository state with git status
- Distinguish tracked and untracked files

## git init creates a repository

The starting point of version control: tell git "this directory is yours to manage".

```bash
git init
```

It creates a `.git` directory holding the object database, index and refs — that is the repository itself. Your working files are untouched; from this moment on, every change can be recorded.

## git status shows the state

`git status` is the most-used command. It summarizes the differences between the three areas:

- current branch (On branch ...)
- staged changes (Changes to be committed)
- unstaged changes (Changes not staged for commit)
- untracked files (Untracked files)

One rule to remember: **git does not track new files automatically**. A new file must be `git add`ed first to enter the staging area, then git watches it.

## Exercises

<Exercise />

## Playground

<Playground scenario="init" />

<LessonProgress />
