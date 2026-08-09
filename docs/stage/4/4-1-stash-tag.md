---
title: git stash and git tag
exercises:
  - id: 4-1-e1
    question: What does git stash save?
    options:
      - Uncommitted changes (staged and unstaged tracked files)
      - Already committed history
      - Everything on the remote repository
    correct: 0
    explanation: stash temporarily puts away the uncommitted changes in the working tree, leaving it clean — pop brings them back later.
    anchor: "#git-stash-temporarily-stores-changes"
  - id: 4-1-e2
    question: What is the difference between a tag and a branch?
    options:
      - A branch moves with commits; a tag points at one commit, fixed
      - A tag moves with commits; a branch is fixed
      - They are exactly the same
    correct: 0
    explanation: a tag is a name pinned to one commit — however you commit afterwards, it never moves, which makes it perfect for marking version numbers.
    anchor: "#git-tag-marks-versions"
  - id: 4-1-e3
    question: In the playground below, stash the current uncommitted changes.
    type: task
    scenario: stash
    goal: Run git stash so the working tree goes back to a clean state.
    checks:
      - type: statusClean
    explanation: After stash the working tree is clean, and the changes are stored in the stash list (stash@{0}).
    anchor: "#git-stash-temporarily-stores-changes"
  - id: 4-1-e4
    question: In the playground below, restore the stashed changes.
    type: task
    scenario: stash
    goal: Run git stash pop so the hello.txt changes come back into the working tree.
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop puts stash@{0}'s changes back into the working tree and deletes that stash entry.
    anchor: "#git-stash-list-and-git-stash-pop"
---

# git stash and git tag

## Lesson goals

- Temporarily put away uncommitted changes with git stash
- Manage stashes with git stash list / pop
- Mark versions with git tag

## git stash temporarily stores changes

```bash
git stash          # put away all current uncommitted changes
git stash list     # list the stash entries
git stash pop      # restore the most recent stash
```

This happens all the time: you're halfway through a change when you suddenly need to switch branches to handle something else — but the switch is refused (uncommitted changes exist). **stash** is the "temporary storage": it puts the changes away, the working tree becomes clean again, and you can take them back out at any time.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list and git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` puts the most recent stash's changes back into the working tree and deletes that entry (it prints `Dropped stash@{0}`). Note: stash only saves files git **already tracks**; newly created untracked files are not stashed.

## git tag marks versions

```bash
git tag v1.0              # lightweight tag: give the current commit a name
git tag -a v1.0 -m "note" # annotated tag: carries a message
git tag                   # list all tags
```

When you ship a version, you want a name that "always points to this commit" — a **tag** is a marker pinned to a commit. Unlike a branch, a tag doesn't move as new commits are made. Later you can `git switch <tag>` any time to return to that version (HEAD then enters detached state, which Stage 4 covers later).

## Exercises

<Exercise />

## Playground

<Playground scenario="stash" />

<LessonProgress />
