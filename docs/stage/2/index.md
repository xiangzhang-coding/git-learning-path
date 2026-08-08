# Stage 2 — Branches and Merging

The principle thread of this stage: **the commit graph and HEAD**. A branch is just a pointer to a commit, and HEAD marks where you currently are; every branch operation (switch, merge, conflict) either moves pointers on the commit graph or folds forks back together.

## Lessons

- 2-1 [git branch and git switch](/stage/2/2-1-branch-switch): branches are pointers, HEAD is your current position
- 2-2 [Working on a branch](/stage/2/2-2-branch-workflow): commits only land on the current branch, history forks into a DAG
- 2-3 [git merge merges branches](/stage/2/2-3-merge): fast-forward merges and merge commits
- 2-4 [Resolving merge conflicts](/stage/2/2-4-merge-conflict): conflict markers and the resolution workflow

## New commands in this stage

| Command | What it does |
| --- | --- |
| `git branch` | List branches; the current branch is marked with `*` |
| `git branch <name>` | Create a branch (without switching) |
| `git switch <name>` | Switch to an existing branch |
| `git switch -c <name>` | Create a new branch and switch to it |
| `git merge <branch>` | Merge the target branch into the current branch |

<StageProgress stage="2" />
