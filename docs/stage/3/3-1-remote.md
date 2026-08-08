---
title: "git remote: the remote repository"
exercises:
  - id: 3-1-e1
    question: What is a remote?
    options:
      - A remote location holding a copy of the repository (another repository, usually on a server)
      - A local folder
      - A built-in git command that compresses the repository
    correct: 0
    explanation: A remote is the location of "another copy of the repository". git uses it to push commits up and pull them down; origin is the default remote name after clone.
    anchor: "#what-is-a-remote"
  - id: 3-1-e2
    question: What does git remote -v show?
    options:
      - All remotes' names and addresses
      - The list of all branches
      - All commits on the remote
    correct: 0
    explanation: git remote -v lists each remote's name, address, and the fetch/push configuration tied to it.
    anchor: "#git-remote-view-and-add"
  - id: 3-1-e3
    question: In the playground below, add a remote named origin.
    type: task
    scenario: remote
    goal: Register the remote repository with git remote add origin /origin and confirm with git remote -v.
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: remote add only registers an address, it transfers no data. Afterwards fetch/push/pull know where to go.
    anchor: "#git-remote-view-and-add"
---

# git remote: the remote repository

## Lesson goals

- Understand the concept of a remote: the location of another copy of the repository
- Register a remote with git remote add
- Inspect the configuration with git remote -v

## What is a remote

So far, all your commits live in **one repository on your machine**. Real projects need collaboration: everyone has their own repository, plus a "shared repository" that acts as the exchange point — that's the remote.

A remote is essentially **the address of another git repository**. git itself has no "cloud"; any machine (or directory) can act as a remote. Your repository refers to it by name, and the default name is **origin** (named automatically by clone).

In this lesson's playground, `/origin` is that remote's location — an in-memory repository fully independent from the local `/repo`.

## git remote: view and add

```bash
git remote            # list remote names
git remote -v         # list names + addresses (one line for fetch, one for push)
git remote add <name> <address>   # register a new remote
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add` only registers the address, it **transfers no data**. It writes the configuration into `.git/config`:

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## Remember the two roles

| Name | Meaning |
| --- | --- |
| Local branch | `refs/heads/main`, where your commits land |
| Remote | The remote repository's address, e.g. `/origin` |
| Tracking branch | `refs/remotes/origin/main`, a local mirror recording "where the remote's main points" |

The tracking branch is the key to the next lessons on clone/fetch: it lets you see "what the remote looks like" even when you're offline.

## Exercises

<Exercise />

## Playground

<Playground scenario="remote" />

<LessonProgress />
