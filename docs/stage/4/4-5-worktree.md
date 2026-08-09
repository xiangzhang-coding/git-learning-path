---
title: git worktree multiple working trees
exercises:
  - id: 4-5-e1
    question: What is a git worktree?
    options:
      - An extra working directory that shares the same repository's objects and refs
      - A copy of the repository with its own history
      - A temporary branch for experiments
    correct: 0
    explanation: "git worktree add creates another working directory that reads and writes the same repository (shared objects and refs), but keeps its own HEAD and index."
    anchor: "#one-repository-one-working-tree"
  - id: 4-5-e2
    question: Can the same branch be checked out in two worktrees at once?
    options:
      - "No, git refuses: a branch can be checked out in only one worktree"
      - Yes, both can work on it and merge later
      - Only if the branch is not pushed yet
    correct: 0
    explanation: each branch can be checked out in exactly one worktree — otherwise two worktrees would overwrite each other's commits for the same branch.
    anchor: "#git-worktree-add-a-second-worktree"
  - id: 4-5-e3
    question: What happens if you git worktree remove a worktree with uncommitted changes?
    options:
      - git refuses and keeps the worktree until you handle the changes
      - git deletes the changes together with the worktree
      - git commits the changes automatically
    correct: 0
    explanation: "as a safety guard, remove refuses while changes are uncommitted — commit, stash, or pass -f (force) if you really want to discard them."
    anchor: "#git-worktree-remove-clean-up"
---

# git worktree multiple working trees

## Lesson goals

- Create extra working directories for the same repository with git worktree
- Understand that all worktrees share objects and refs but keep separate HEADs
- List and clean up worktrees; know why agents use them

## One repository, one working tree

By default, one repository means one working directory. You check out one branch, edit files, commit — and when you need another branch, you `git switch` and the whole directory changes contents.

That switching has a cost: work in progress on the current branch must be committed or stashed first, and both branches share the same directory, so you can never see two branches at once.

`git worktree` breaks that one-to-one rule. A **worktree** is an extra working directory attached to the same repository:

```
your project/            <- main working tree (the original one)
├── .git/                <- shared: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- second worktree (added by git worktree add)
└── src/  (branch hotfix)   <- different branch, different directory
```

All worktrees **share the same object database and refs** — a commit made in one worktree is visible in all of them — but each worktree has **its own HEAD and index**, so each can sit on a different branch without disturbing the others.

## git worktree add: a second worktree

```bash
git worktree add <path> <branch>
```

Creates a new working directory at `<path>` and checks out `<branch>` there. A few common forms:

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

Useful details:

- If the branch already exists, the path must be empty — git won't overwrite a directory that has files.
- A branch can be checked out in **only one worktree**. Trying to check out the same branch in a second worktree fails with `fatal: '<branch>' is already checked out at ...`.
- When you `git clone`, the clone is a full separate repository; a worktree is **not** a clone — it has no `.git` directory of its own, it points at the parent repository's.

## git worktree list: see all worktrees

```bash
git worktree list
```

Shows every worktree attached to the repository, with its path, the branch checked out, and which one is the main worktree:

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

The main worktree is the directory where the repository was originally cloned or created — it can't be removed.

## git worktree remove: clean up

```bash
git worktree remove <path>
```

Removes the working directory and unregisters the worktree. Two guard rails:

- The directory must not contain untracked or modified files — otherwise git refuses and tells you to commit, stash, or use `-f`.
- `git worktree remove -f <path>` deletes even with changes, discarding them.

A removed worktree leaves the branch (and its commits) alone: the branch pointer still exists in the repository, ready to be checked out in the main worktree later.

## Why agents love worktrees

AI coding agents (Claude Code, Cursor, and similar) frequently work on several tasks at once. Without worktrees, an agent switching tasks has to commit or stash, switch branches, and later untangle the changes — and a mistake can mix one task's edits into another branch's commit.

With `git worktree add`, each task gets its **own directory and branch**, fully isolated:

- Task A's agent edits `../task-a` on branch `feature/login`
- Task B's agent edits `../task-b` on branch `fix/typo`
- Both commits land in the same repository; neither can touch the other's files

When you review the result, each branch is a clean unit — and you still get one shared history to push. That isolation is why worktree-based workflows have become the norm for agent-driven development.

## When to use worktrees

Use them when:

- You need to work on two branches at the same time (a hotfix while feature work continues)
- You run long tests or a dev server in one worktree and keep editing in another
- Agents or team tools run parallel isolated tasks

Skip them when: a single task at a time is the norm — the extra directories add bookkeeping without benefit.

## Exercises

<Exercise />

<LessonProgress />
