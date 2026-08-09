---
title: fork and upstream sync
exercises:
  - id: 5-1-e1
    question: What is the difference between fork and clone?
    options:
      - fork copies a repository to your GitHub account, clone copies it to your computer
      - fork copies only code, clone copies history too
      - fork is an alias for clone
    correct: 0
    explanation: fork creates a copy on GitHub's servers (under your account), while clone copies the repository to your machine. You usually fork first, then clone your own fork.
    anchor: "#what-is-a-fork"
  - id: 5-1-e2
    question: Why keep two remotes in the fork workflow?
    options:
      - origin points to your fork, upstream points to the original author's repository
      - one remote cannot hold the full history
      - two remotes are mandatory on GitHub
    correct: 0
    explanation: You push to your own fork (origin); upstream receives updates from the original author and is the base for sending contributions back via PR.
    anchor: "#adding-the-upstream-remote"
  - id: 5-1-e3
    question: What is the correct sequence to sync upstream changes into your fork?
    options:
      - git fetch upstream, then merge (or rebase) upstream/main into your local main, then push origin
      - git push upstream pulls upstream changes in
      - git pull origin syncs upstream automatically
    correct: 0
    explanation: fetch only downloads upstream commits; merge/rebase attaches them to your local main; push origin updates the copy on GitHub.
    anchor: "#syncing-with-upstream"
---

# fork and upstream sync

## Lesson goals

- Understand the role of fork in open-source collaboration
- Attach the original author's repository with git remote add upstream
- Sync upstream updates with fetch + merge

## what is a fork

A fork copies someone else's repository into your own GitHub account:

```mermaid
flowchart TD
  A["original author<br/>github.com/author/project"] -->|fork| B["you<br/>github.com/you/project<br/>(you can change anything)"]
```

fork is a GitHub feature (not a git command). The difference from clone: a fork creates a copy on GitHub's servers, a clone copies the repository to your local computer. The typical open-source flow is "fork first, then clone your own fork" — you have no write access to the original author's repository, so you work on your own copy.

## cloning your own fork

After clicking Fork on GitHub, clone the copy under your account:

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v` shows one remote: `origin`, pointing to your fork. You can read and write origin — but updates from the original author will not appear automatically.

## adding the upstream remote

Register the original author's repository as a second remote, conventionally called `upstream`:

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

Now you have two remotes: `origin` (your fork, read/write) and `upstream` (the original repository, read-only for receiving updates). Knowing what each role is for is the heart of the fork workflow.

## syncing with upstream

The upstream keeps moving. To keep your fork in step:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream` downloads upstream commits (without touching your work)
- `git merge upstream/main` (or rebase) attaches the updates to your local main
- `git push origin main` syncs the copy on GitHub

Now your fork matches the original repository, and you can start new branches from the latest code.

## Practice on real GitHub

- Fork an open-source repository you use often
- Clone it, add upstream, and complete one sync
- Browse its Issues page and observe how people collaborate

## Exercise

<Exercise />

<LessonProgress />
