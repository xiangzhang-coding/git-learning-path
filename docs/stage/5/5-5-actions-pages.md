---
title: GitHub Actions and Pages
exercises:
  - id: 5-5-e1
    question: Where do GitHub Actions workflow files live?
    options:
      - In the .github/workflows/ directory of the repository, as YAML
      - Any .yml file in any directory
      - Only at the root, and it must be called main.yml
    correct: 0
    explanation: Workflows are defined in .github/workflows/*.yml and are triggered by events such as push and pull_request.
    anchor: "#the-workflow-file"
  - id: 5-5-e2
    question: What is the relationship between jobs and steps in a workflow?
    options:
      - Jobs are tasks (parallel, each on its own machine); steps are the individual actions inside a job
      - Jobs are actions, steps are machines
      - They are the same thing
    correct: 0
    explanation: A workflow is made of jobs, and each job is made of steps (a run command or a reused action); jobs can declare dependencies on each other.
    anchor: "#the-workflow-file"
  - id: 5-5-e3
    question: What kind of scenario is the deployment of this course site (GitHub Pages)?
    options:
      - Pushing triggers Actions to build the site and publish it to Pages
      - You need to buy your own server
      - You upload files manually every time
    correct: 0
    explanation: Commits trigger Actions to build and deploy to Pages automatically — that is exactly how this site is deployed.
    anchor: "#deploying-github-pages"
---

# GitHub Actions and Pages

## Lesson goals

- Understand what Actions is and how events trigger workflows
- Read the structure of a workflow file
- Learn to deploy GitHub Pages with Actions

## what is Actions

GitHub Actions is built-in CI/CD: events in your repository (push, pull_request, schedule, manual) trigger automated jobs — running tests, building, publishing, deploying. The course site you are reading right now is built by Actions and deployed to Pages.

## the workflow file

Workflows live in `.github/workflows/` as YAML files (e.g. deploy.yml):

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
```

Structure: `on` declares the triggering events; `jobs` defines tasks (they run in parallel, each on its own machine); `steps` are the individual actions inside a job (`run` executes commands, `uses` reuses a community-maintained action).

## common trigger events

- `push`: on push (can be limited to specific branches)
- `pull_request`: when a PR is opened or updated
- `schedule`: on a timer (cron syntax)
- `workflow_dispatch`: manual trigger via a button

## deploying github pages

There are two ways to deploy Pages: publish a branch directly from repository settings, or publish build artifacts via Actions. The latter is more common (tests and build first, then publish the artifact to Pages):

```mermaid
flowchart LR
  A["push"] --> B["workflow triggers"] --> C["install deps"] --> D["build"] --> E["publish artifact to Pages"]
```

Deployment status, logs, and failures live in the Actions tab of the repository. The little green check (✓/✗) next to commits is the entry point to check results.

## Practice on real GitHub

- Create `.github/workflows/deploy.yml` in a repository and deploy a static page
- Break the build step on purpose and watch the failure log
- Add a test-running workflow to your practice repository

## Exercise

<Exercise />

<LessonProgress />
