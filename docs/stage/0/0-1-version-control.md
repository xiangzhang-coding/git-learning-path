---
title: Why version control?
exercises:
  - id: 0-1-e1
    question: What is the biggest problem with managing versions by copying files and appending dates?
    options:
      - Files take up too much disk space
      - History cannot be revisited — you cannot reliably go back to a past state
      - The filenames are too long to remember
    correct: 1
    explanation: The core flaw is not space or names but unrecoverable history — you cannot reliably return to any past version, or even tell which file is newest.
    anchor: "#what-is-version-control"
  - id: 0-1-e2
    question: Which of the following is NOT a core capability of a version control system (VCS)?
    options:
      - Recording every change as a snapshot
      - Reverting to any historical version
      - Automatically fixing code bugs
    correct: 2
    explanation: A VCS records, compares, reverts and supports collaboration — it does not fix code. That is the developer's job.
    anchor: "#what-is-version-control"
  - id: 0-1-e3
    question: What is the key difference between centralized (e.g. SVN) and distributed (e.g. Git) version control?
    options:
      - Centralized requires a network to commit; distributed commits locally
      - Distributed does not support collaboration
      - There is no real difference
    correct: 0
    explanation: Centralized systems must send every commit to a central server, so going offline blocks all commits; in distributed systems every clone is a full repository, so you commit locally and offline.
    anchor: "#centralized-vs-distributed"
  - id: 0-1-e4
    question: What does each commit store in Git?
    options:
      - Only the difference from the previous commit
      - A complete snapshot of the whole project
      - Just the paths of changed files
    correct: 1
    explanation: A Git commit stores a complete snapshot (with compression and deduplication), not just a diff — which is why Git is called snapshot-based.
    anchor: "#centralized-vs-distributed"
---

# Why version control?

## Lesson goals

- Understand what a version control system (VCS) solves
- Compare centralized and distributed version control
- Know which kind Git is

## The pain without version control

Imagine working on a project: halfway through you realize the approach will not work and you want to return to yesterday afternoon's state — where is that file? It might be buried in `final_v2_backup`, or already overwritten. Collaboration is worse: two people edit the same file, whoever saves last wins, and the other person's work silently disappears.

These three problems — **record, revert, collaborate** — are exactly what Git solves.

## What is version control

A version control system (VCS) records every change and saves a complete **snapshot** of the project at each point in time, so you can:

- View any historical version
- Compare the differences between any two states
- Revert to any past version

It is not a backup tool: backups keep only the newest copy, while a VCS keeps the whole history, and every version can be rebuilt.

## Centralized vs distributed

- **Centralized (e.g. SVN)**: one central repository; everyone checks out from it, and every commit must be sent over the network. If the server goes down, nobody can commit.
- **Distributed (e.g. Git)**: every clone is a full copy of the central repository. Commits happen locally and offline; you push them to others later.

Because each Git commit stores a complete snapshot rather than a diff, the entire history is fully reconstructable from any clone — which is exactly why "distributed" works at all.

## Animation: rewinding the timeline

Drag the slider or click a node and watch the files change with each version — "going back in time" is what version control gives you.

<TimelineRewind />

## Exercises

<Exercise />

## Playground

This lesson involves no commands; the playground arrives in Stage 1.

<LessonProgress />
