# Stage 3 — Remote Collaboration

The principle thread of this stage: **two repositories and the tracking branch**. A remote is the address of another repository; clone copies it, fetch updates "the remote's mirror" (origin/main), push sends your local commits over, and pull = fetch + merge.

## Lessons

- 3-1 [git remote: the remote repository](/stage/3/3-1-remote): what a remote is, adding and viewing
- 3-2 [git clone clones a repository](/stage/3/3-2-clone): complete copy in one command, origin and the tracking branch
- 3-3 [git push pushes commits](/stage/3/3-3-push): send local commits, non-fast-forward rejection
- 3-4 [git fetch and git pull](/stage/3/3-4-fetch-pull): fetch looks but doesn't touch, pull = fetch + merge

## New commands in this stage

| Command | What it does |
| --- | --- |
| `git remote add <name> <url>` | Register a remote repository's address |
| `git remote -v` | List all remotes' names and addresses |
| `git clone <url> [<dir>]` | Copy the remote repository completely to your local machine |
| `git push` | Push the current branch's leading commits to the remote |
| `git fetch` | Download new remote commits and update tracking branches |
| `git pull` | fetch + merge: fetch remote updates and merge them in |
| `git log origin/main` | View the history the remote branch currently points to |
| `cd <dir>` | Switch directories in the playground (enter the new repo after clone) |

<StageProgress stage="3" />
