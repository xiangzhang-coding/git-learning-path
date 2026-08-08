---
title: Resolving merge conflicts
exercises:
  - id: 2-4-e1
    question: When does a conflict happen?
    options:
      - Both sides modified the same spot of the same file
      - Both sides modified different files
      - Whenever you run git merge
    correct: 0
    explanation: git can auto-merge changes made to different spots; only when both sides touched the same spot and git cannot tell whose version to keep do you need to decide manually.
    anchor: "#how-conflicts-happen"
  - id: 2-4-e2
    question: What sits between the markers <<<<<<< HEAD and =======?
    options:
      - The current branch's (HEAD's) modification at this spot
      - The other branch's modification at this spot
      - The full file content
    correct: 0
    explanation: In a conflicted file, everything between <<<<<<< HEAD and ======= is "your side", and everything between ======= and >>>>>>> is "their side".
    anchor: "#conflict-markers"
  - id: 2-4-e3
    question: In the playground below, create and resolve a conflict.
    type: task
    scenario: conflict
    goal: "Run git merge feature to trigger the conflict; edit hello.txt to \"hello resolved\" and remove the conflict markers; git add hello.txt; then git commit to finish the merge."
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: "Resolving a conflict means making the decision git cannot make: edit the file, delete the markers, add, commit — and the merge commit is born."
    anchor: "#the-conflict-resolution-workflow"
  - id: 2-4-e4
    question: After resolving a conflict (and adding the file), which command finishes the merge?
    options:
      - git commit (commits the resolution and creates the merge commit)
      - git stash
      - git reset
    correct: 0
    explanation: "After the conflict is resolved and staged, git is still in the middle of a merge (MERGE_HEAD exists); git commit now creates the merge commit from the current content and ends the merge."
    anchor: "#the-conflict-resolution-workflow"
---

# Resolving merge conflicts

## Lesson goals

- Understand why conflicts happen
- Read conflict markers
- Master the standard resolution workflow: edit → add → commit

## How conflicts happen

When merging, git must combine both sides' changes into one. If both sides changed **different spots**, git can auto-merge; but if **both sides modified the same spot of the same file**, git cannot tell whose version to keep — it puts both versions into the file and leaves the decision to you.

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

The output tells you exactly which file:

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Conflict markers

Each conflicted hunk in the file comes with three markers:

| Marker | Meaning |
| --- | --- |
| `<<<<<<< HEAD` | Below this is your side (the current branch) |
| `=======` | The divider |
| `>>>>>>> feature` | Below this is the other branch (feature); the name is the other branch's name |

**Your job**: decide which version to keep (or write a new one), then delete all three markers.

## The conflict resolution workflow

The standard flow has four steps:

```bash
git merge feature          # 1. trigger the conflict
# edit the conflicted file: choose the content, delete the markers
git add hello.txt          # 2. tell git this file is resolved
git commit -m "merge: resolve"   # 3. finish the merge, creating a merge commit
```

During this, `git status` reminds you that a merge is in progress: with unresolved files it shows `You have unmerged paths`, and once everything is staged it shows `All conflicts fixed but you are still merging` — at which point you commit.

**The key point**: a conflict is not an error; git is handing the decision to you. What you produce after resolving is still an ordinary merge commit, and history records this merge as usual.

## Exercises

<Exercise />

## Playground

<Playground scenario="conflict" />

<LessonProgress />
