---
title: Issues and collaboration
exercises:
  - id: 5-3-e1
    question: What is a GitHub Issue typically used for?
    options:
      - Reporting bugs, suggesting features, and discussing concrete tasks
      - Storing code backups
      - Writing commit logs
    correct: 0
    explanation: An Issue is a discussion thread around one concrete problem; it can be assigned, labeled, put into a milestone, and linked to a PR.
    anchor: "#what-is-an-issue"
  - id: 5-3-e2
    question: How do you make a PR close an issue automatically when merged?
    options:
      - Write "fixes #12" in the PR description or a linked commit message
      - Mention the PR number in an issue comment
      - Issues can only be closed manually
    correct: 0
    explanation: GitHub recognizes the keywords closes, fixes, and resolves plus an issue number, and closes the issue automatically when the PR merges.
    anchor: "#closing-an-issue-with-a-pr"
  - id: 5-3-e3
    question: What are labels and milestones for?
    options:
      - Labels categorize issues (bug, feature); milestones group issues under one version goal
      - Labels are permission marks, milestones are timelines
      - Both are ways to star a repository
    correct: 0
    explanation: Labels make issues filterable; milestones express "what this version should ship", often matching a Release.
    anchor: "#labels-and-milestones"
---

# Issues and collaboration

## Lesson goals

- Understand what an Issue is and how to open one
- Organize work with labels and milestones
- Link PRs to issues with "fixes #number"

## what is an issue

An Issue is a discussion thread in a repository: report bugs, suggest features, discuss concrete tasks. Every issue has a number (e.g. #12), a title, a description, and comments; it can also be assigned to someone, labeled, and placed into a milestone.

## opening an issue

Go to Issues → New issue on the repository page. A good issue description covers: what the problem is, how to reproduce it, and the expected behavior. Many repositories provide issue templates (bug report / feature request); filling them out improves how quickly the maintainer can act.

## labels and milestones

- **labels**: categorize issues, e.g. bug, enhancement, good first issue. Filtering by label is a maintainer's main way of organizing work.
- **milestones**: group issues under one version goal, e.g. v1.2.0. A milestone shows progress (x/y issues done).

## closing an issue with a PR

Write in the PR description (or a linked commit message):

```
fixes #12
```

GitHub links the PR to issue 12; when the PR merges, the issue closes automatically. The keywords closes and resolves work the same way. This makes "which change fixed which problem" traceable in history.

## a glance at the collaboration flow

```
bug found → open issue (#12) → maintainer adds label + milestone
  → contributor creates a branch to fix it → PR description says "fixes #12"
  → merged → issue closes automatically, milestone +1
```

## Practice on real GitHub

- Open an issue in your own repository; create a label and a milestone
- Fix a bug and submit a PR that references the issue in its description
- Watch the issue close automatically after the merge

## Exercise

<Exercise />

<LessonProgress />
