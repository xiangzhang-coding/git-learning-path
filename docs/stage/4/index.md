# Chapter 4 — Fixing and Going Further

The principle thread of this chapter: **refs and reflog**. reset moves the branch pointer, revert/cherry-pick create new commits, rebase rewrites history — and reflog records every move of HEAD, so any "regret" can be recovered.

## Lessons

- 4-1 [git stash and git tag](/stage/4/4-1-stash-tag): park changes temporarily, pin versions with tags
- 4-2 [git reset and reflog](/stage/4/4-2-reset-reflog): the three modes of moving HEAD, reflog recovers commits
- 4-3 [git revert and git cherry-pick](/stage/4/4-3-revert-cherry-pick): undo in reverse and copy commits
- 4-4 [git rebase replays commits](/stage/4/4-4-rebase): straighten history, conflicts and abort

## New commands in this chapter

| Command | What it does |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | Temporarily put away uncommitted changes |
| `git tag <name>` / `git tag -a <name> -m <msg>` | Pin a fixed marker to a commit |
| `git reset [--hard\|--soft] <ref>` | Move HEAD (optionally the index/working tree) |
| `git reflog` | View HEAD's complete movement log |
| `git revert <ref>` | Undo a commit with a new reverse commit |
| `git cherry-pick <ref>` | Copy a commit onto the current branch |
| `git rebase <branch>` / `--continue` / `--abort` | Replay branch commits onto the target branch |

<StageProgress stage="4" />
