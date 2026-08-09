---
title: git log and git diff
exercises:
  - id: 1-3-e1
    question: What does git log --oneline show?
    options:
      - "One commit per line: short hash + message"
      - The full content of files
      - The current branch name
    correct: 0
    explanation: git log lists commit history; --oneline compresses each commit to one line (short hash + message) — the everyday way to view history.
    anchor: "#git-log-views-history"
  - id: 1-3-e2
    question: What does git diff show?
    options:
      - Content differences between the working tree and the staging area
      - Differences across commit history
      - File encoding differences
    correct: 0
    explanation: git diff compares the working tree against the staging area (unstaged changes); git diff --staged compares the staging area against HEAD (staged changes).
    anchor: "#git-diff-views-changes"
  - id: 1-3-e3
    question: In the playground below, modify src/a.js and commit with a message containing "fix".
    type: task
    scenario: history
    goal: "Change \"const a = 2\" to \"const a = 3\" in src/a.js, then add and commit with message \"fix: bump a\"."
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: The history now has 5 commits; the first line of git log --oneline is your new commit.
    anchor: "#git-log-views-history"
  - id: 1-3-e4
    question: What does git show <commit> display?
    options:
      - "The commit's full details: author, date, message, and the diff of changes"
      - A list of all files in the repository
      - The commit graph of the current branch
    correct: 0
    explanation: "git show expands one commit: the header carries the author and date, below it the diff against its parent — the standard way to see what a single commit changed."
    anchor: "#git-show-inspects-a-commit"
  - id: 1-3-e5
    question: What is git blame <file> for?
    options:
      - Annotating each line with the commit and author that last changed it
      - Removing empty lines from a file
      - Comparing the differences between two files
    correct: 0
    explanation: 'blame works line by line: each line is prefixed with the short hash and author of the commit that last touched it — great for answering "who changed this line and why".'
    anchor: "#git-blame-traces-lines"
---

# git log and git diff

## Lesson goals

- View history with git log
- View changes with git diff
- Inspect a single commit with git show
- Trace the source of each line with git blame
- Know the short hash and the snapshot model

## git log views history

```bash
git log              # full history (author, date)
git log --oneline    # one line per commit: short hash + message
```

The SHA-1 hash of each commit is its ID. `git log --oneline` shows the first 7 characters — short enough to identify a commit uniquely.

## git diff views changes

```bash
git diff             # working tree vs staging area (not yet added)
git diff --staged    # staging area vs HEAD (added, not yet committed)
```

Lines starting with `-` were removed, lines starting with `+` were added. Reviewing your diff before committing is the standard habit.

## git show inspects a commit

```bash
git show <commit>    # details of a single commit
git show HEAD       # the most recent commit
```

`git show` expands one commit: the header shows the hash, author, date, and message, and below it the diff against its parent — exactly the answer to "what did this commit change". Combined with hashes from git log, you can trace any change back through history.

## git blame traces lines

```bash
git blame <file>     # annotate each line with its origin
```

blame prefixes every line of a file with the **short hash and author of the commit that last changed it**. When you need to know "who changed this line, and in which commit", blame answers immediately — a common starting point when investigating bugs.

## The snapshot model

Each commit saves a **complete snapshot**, not a diff. git hashes the content with SHA-1 — identical content yields identical hashes, which gives integrity checking and deduplication. This is also why "distributed" works: the full history is reconstructable from any clone.


<SnapshotVisual />

## Exercises

<Exercise />

## Playground

<Playground scenario="history" />

<LessonProgress />
