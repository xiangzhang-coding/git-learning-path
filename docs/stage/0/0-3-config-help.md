---
title: config and help
exercises:
  - id: 0-3-e1
    question: What scope does git config --global user.name affect?
    options:
      - Only the current repository
      - All repositories of the current user
      - All users on this machine
    correct: 1
    explanation: --global writes to ~/.gitconfig and applies to every repository of the current user; without the flag it applies only to the current repository (local).
    anchor: "#configuration-before-your-first-commit"
  - id: 0-3-e2
    question: Which of the three config levels has the highest priority?
    options:
      - system
      - global
      - local
    correct: 2
    explanation: "The more specific the level, the higher the priority: local > global > system. local belongs only to the current repository."
    anchor: "#three-configuration-levels"
  - id: 0-3-e3
    question: Which command shows a quick usage summary of git commit?
    options:
      - git commit -h
      - git help commit
      - Both work
    correct: 2
    explanation: -h shows the usage summary and git help opens the full manual — both are official, pick the one you need.
    anchor: "#when-you-meet-an-unfamiliar-command"
  - id: 0-3-e4
    question: What does git config --list print?
    options:
      - All configuration in effect
      - Only the user configuration
      - A file listing of the repository
    correct: 0
    explanation: --list prints the effective configuration (the merged result of local > global > system) — the first step when debugging configuration problems.
    anchor: "#configuration-before-your-first-commit"
---

# config and help

## Lesson goals

- Set user.name and user.email
- Understand the system / global / local config levels
- Use help to look up commands

## Configuration before your first commit

Git needs to know who authored each commit, so configure once before starting:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

`--global` applies to every repository. Run `git config --list` to see all effective settings, or `git config user.name` for a single one.

## Three configuration levels

Configuration has three levels — **the more specific, the higher the priority**:

| Level | Scope | Stored in |
| --- | --- | --- |
| system | every user on the machine | `/etc/gitconfig` |
| global | all repositories of the current user | `~/.gitconfig` |
| local | the current repository | `.git/config` |

The effective value is resolved as local → global → system.

## When you meet an unfamiliar command

- `git help <command>`: opens the full manual
- `git <command> -h`: quick usage summary
- `git help --all`: lists every command

Forgetting a command is fine — knowing how to look it up is enough.

## Exercises

<Exercise />

<LessonProgress />
