---
title: The three-areas model
exercises:
  - id: 0-2-e1
    question: Which area holds the files you are editing right now?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 0
    explanation: The working tree is where you edit files; the staging area is the list of changes you are preparing; the repository stores committed history.
    anchor: "#the-three-areas"
  - id: 0-2-e2
    question: What does git add move?
    options:
      - Changes from the working tree to the staging area
      - Changes from the staging area to the repository
      - Changes from the repository to the working tree
    correct: 0
    explanation: git add registers working-tree changes into the staging area; git commit is what writes history (staging area → repository).
    anchor: "#the-three-areas"
  - id: 0-2-e3
    question: What does git commit move?
    options:
      - Working tree → staging area
      - Staging area → repository
      - It discards the changes
    correct: 1
    explanation: commit packages the staged changes into one commit stored in the repository (the .git directory), creating a snapshot in history.
    anchor: "#the-three-areas"
  - id: 0-2-e4
    question: What is the biggest benefit of the staging area?
    options:
      - It makes committing more tedious
      - You can split changes into separate commits, keeping history clean
      - It fixes mistakes automatically
    correct: 1
    explanation: If you changed two unrelated features, you can add and commit the first, then add and commit the second — every commit stays readable and revertable.
    anchor: "#why-an-extra-staging-area"
---

# The three-areas model

## Lesson goals

- Know the working tree, staging area and repository
- Understand what git add and git commit move
- Know what git status shows

## The three areas

Git divides a repository into three areas:

- **Working tree**: the files you are editing — this is what your editor changes
- **Staging area (a.k.a. index)**: the list of changes you have picked for the next commit
- **Repository (the `.git` directory)**: committed history snapshots

`git status` shows exactly the differences between these areas: which files changed but were not added, which were added but not committed.

## Why an extra staging area

The staging area lets you **commit in pieces**: if you changed two unrelated features at once, add and commit the first, then add and commit the second — every commit in history stays clean, readable and revertable. Without it, one editing session means one monolithic commit ("more changes").

## Animation: the three areas

Click the buttons and watch the file move between areas: edits happen in the working tree, `git add` registers them into the staging area, and only `git commit` writes history.

<ThreeAreas />

## Exercises

<Exercise />

<LessonProgress />
