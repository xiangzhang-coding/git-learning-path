---
title: git restore, git rm and git mv
exercises:
  - id: 1-4-e1
    question: What does git restore hello.txt do?
    options:
      - Restores hello.txt to the HEAD version, discarding working-tree changes
      - Deletes hello.txt
      - Stages hello.txt
    correct: 0
    explanation: git restore puts the file back to the version in the repository (from HEAD by default), discarding working-tree edits. It only applies to tracked files.
    anchor: "#git-restore-discards-changes"
  - id: 1-4-e2
    question: In the playground below, restore hello.txt with git restore.
    type: task
    scenario: local
    goal: hello.txt was messed up; use git restore hello.txt to put it back.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: After restoring, hello.txt is back to "hello world" and git status reports nothing to commit.
    anchor: "#git-restore-discards-changes"
  - id: 1-4-e3
    question: In the playground below, delete notes.txt (keeping it in history).
    type: task
    scenario: local
    goal: Use git rm notes.txt to delete the file and stage the deletion.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: "git rm does two things at once: deletes the working-tree file and stages the deletion. After committing, the file is gone from the latest version but still recoverable from history."
    anchor: "#git-rm-deletes-files"
  - id: 1-4-e4
    question: In the playground below, rename notes.txt to diary.txt.
    type: task
    scenario: local
    goal: Use git mv notes.txt diary.txt to rename and stage the change.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv is a combined move-and-stage command; git status then shows the old name deleted and the new name added.
    anchor: "#git-mv-moves-files"
---

# git restore, git rm and git mv

## Lesson goals

- Discard working-tree changes with git restore
- Delete files with git rm
- Move or rename files with git mv

## git restore discards changes

Broke something? Want to go back to the last commit's version:

```bash
git restore <filename>
```

`git restore` puts the file back to its HEAD version, **discarding working-tree edits**. It only affects tracked files — new files are unknown to git, so restore cannot help there.

## git rm deletes files

```bash
git rm <filename>
```

One command, two actions: delete the working-tree file and stage the deletion. After committing, the file disappears from the latest version — but history still holds it, and it can always be recovered.

## git mv moves files

```bash
git mv old-name new-name
```

Move (rename) a file and stage it. git does not "remember" renames — it detects them by content: an old file disappears and a new file with identical content appears. That is why status shows deleted + new file after a move.

## Exercises

<Exercise />

## Playground

<Playground scenario="local" />

<LessonProgress />
