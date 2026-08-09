---
title: 5-2 Pull Request workflow
exercises:
  - id: 5-2-e1
    question: What is a Pull Request (PR)?
    options:
      - A request to merge the commits on your branch into another branch of the target repository
      - A way to overwrite your local repository with someone else's
      - A group chat feature on GitHub
    correct: 0
    explanation: A PR is a formal "please merge my commits" request, with a code diff, discussion, and automated checks attached.
    anchor: "#what-is-a-pull-request"
  - id: 5-2-e2
    question: Which statement about merge options is correct?
    options:
      - Create a merge commit keeps the fork and a merge commit; Rebase and merge makes history linear
      - Squash and merge keeps every original commit
      - The merge method does not affect history
    correct: 0
    explanation: "The three methods produce different histories: merge commit keeps the fork, squash collapses everything into one commit, rebase replays linearly."
    anchor: "#merging-and-closing"
  - id: 5-2-e3
    question: How do you update an open PR after the maintainer asks for changes?
    options:
      - Commit on the PR branch and push; the PR updates automatically
      - Create a new PR from scratch
      - Change the PR title
    correct: 0
    explanation: "A PR is a window onto a branch: push new commits to that branch and the PR diff updates automatically."
    anchor: "#updating-the-pr-branch"
---

# Pull Request workflow

## Lesson goals

- Understand the role of a PR in collaboration
- Walk the full flow: branch → push → open PR → discuss → merge
- Know the three merge methods and how PR branches update

## what is a pull request

A Pull Request (PR) is a formal "please merge my commits into your repository" request. You cannot write directly to someone else's repository, but you can open a PR and let the maintainer review and decide:

```
branch on your fork ──push──▶ your fork
                               │ open PR
                               ▼
                    original repository's main (awaiting review & merge)
```

A PR is more than commits: it carries the code diff, the discussion, and automated check (CI) results. It is the core unit of open-source collaboration.

## opening a PR

Prerequisite: push your working branch to your fork:

```bash
git switch -c fix/login-bug
git commit -am "fix: login bug"
git push origin fix/login-bug
```

Back on GitHub, a Compare & pull request button appears on the repository page. Choose base (the target branch, e.g. main of the original repository) and compare (your branch), write a title and description, and create the PR.

## review and discussion

A PR is a discussion venue: maintainers can comment on specific lines, request changes, or approve. Every new commit you push joins the conversation; after addressing feedback you can @ mention them to re-review.

## merging and closing

There are three merge methods with different histories:

| Method | History |
| --- | --- |
| Create a merge commit | keeps the fork, adds a merge commit |
| Squash and merge | collapses everything into one commit |
| Rebase and merge | linear replay, no merge commit |

After merging, GitHub usually suggests deleting the branch. A PR can also be closed without merging — for example when the approach is abandoned.

## updating the PR branch

When the maintainer asks for changes, do not open a new PR: keep committing on the branch and push, the PR updates automatically:

```bash
git commit -am "fix: address review feedback"
git push origin fix/login-bug
```

## Practice on real GitHub

- Push a feature branch and open a real PR on a repository you have access to
- Leave a line comment in the PR to experience the discussion flow
- Compare how the three merge methods shape history differently

## Exercise

<Exercise />

<LessonProgress />
