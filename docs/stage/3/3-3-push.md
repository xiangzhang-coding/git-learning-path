---
title: git push pushes commits
exercises:
  - id: 3-3-e1
    question: What does git push send to the remote?
    options:
      - The commits on the current branch that the remote doesn't have yet (along with their history)
      - All files in the working tree
      - All local branches
    correct: 0
    explanation: push sends the commits where your local branch is ahead of the remote and advances the remote branch to the same position.
    anchor: "#git-push-sends-commits"
  - id: 3-3-e2
    question: Why does git reject a non-fast-forward push?
    options:
      - The remote has commits you don't have locally; overwriting them would throw away someone else's work
      - The remote repository is full
      - The local branch name is invalid
    correct: 0
    explanation: If the remote is ahead of your local branch, pushing would overwrite the remote's new commits — git refuses the overwrite and asks you to pull and merge first.
    anchor: "#non-fast-forward-pushes-are-rejected"
  - id: 3-3-e3
    question: In the playground below, push your local commits to the remote.
    type: task
    scenario: push
    goal: Run git push on main to send the local commits the remote is missing.
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: push prints To /origin and main -> main; the remote repository now points to the same commit as your local branch.
    anchor: "#git-push-sends-commits"
---

# git push pushes commits

## Lesson goals

- Push local commits to the remote with git push
- Understand that push only sends "the leading part"
- Understand the non-fast-forward rejection rule

## git push sends commits

```bash
git push              # push the current branch to origin
git push origin main  # explicitly name the remote and branch
```

push sends the commits **on the current branch that the remote doesn't have yet** and then advances the remote branch to the same position as your local one. The output looks like:

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` means the remote branch advanced from the old commit to the new one. After a successful push, the remote and your local repository share the same history.

**Note**: push only sends "the leading commits". Changes that exist in the remote but not locally, and uncommitted local changes, are not sent.

## Fast-forward updates and the tracking branch

Push is essentially **fast-forwarding** the remote branch to your local branch's position (fast-forward comes from Stage 2's merge). After a successful push, your local tracking branch `origin/main` advances too — it's the mirror of "where the remote is right now", and now it agrees with the remote.

**Upstream**: after a successful push, the local branch and the remote branch have an upstream relationship — the remote branch is the local branch's upstream. From then on, bare `git push` / `git pull` know which remote branch to sync with.

## Non-fast-forward pushes are rejected

If the **remote has commits you don't have locally** (someone pushed first, or the remote received other updates), pushing directly would overwrite those commits — git rejects it:

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

The fix is what the hint says: run `git pull` first to merge the remote's new commits, then push.

## Exercises

<Exercise />

## Playground

<Playground scenario="push" />

<LessonProgress />
