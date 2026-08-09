# Chapter 5 — GitHub Ecosystem

The principle thread of this chapter: **the collaboration loop around GitHub**. A fork gives you your own copy, upstream connects you to the original author; a PR is the door through which commits enter the mainline, issues carry discussion, releases publish versions, and Actions with Pages automate testing and deployment. This chapter is practiced on real GitHub — every concept comes with hands-on tasks.

## Hands-on checklist

Work through the full real-GitHub flow below and tick items as you go:

<Checklist :tasks="[
  { text: 'Fork an open-source repository you use often', link: '/stage/5/5-1-fork-upstream' },
  { text: 'Clone your fork, add upstream, complete one sync', link: '/stage/5/5-1-fork-upstream' },
  { text: 'Push a feature branch and open a real PR', link: '/stage/5/5-2-pull-request' },
  { text: 'Experience a review discussion on a PR', link: '/stage/5/5-2-pull-request' },
  { text: 'Open an issue; create a label and a milestone', link: '/stage/5/5-3-issues' },
  { text: 'Submit a PR that references an issue (fixes #number)', link: '/stage/5/5-3-issues' },
  { text: 'Tag v0.1.0 and create your first Release', link: '/stage/5/5-4-releases' },
  { text: 'Publish a patch release with three-section notes', link: '/stage/5/5-4-releases' },
  { text: 'Write a workflow that deploys a static page to Pages', link: '/stage/5/5-5-actions-pages' },
  { text: 'Break the build step on purpose and watch the failure log', link: '/stage/5/5-5-actions-pages' }
]" />

## Lessons

- 5-1 [fork and upstream sync](/stage/5/5-1-fork-upstream): fork creates your copy, upstream receives upstream updates
- 5-2 [Pull Request workflow](/stage/5/5-2-pull-request): open PRs, review discussion, three merge methods
- 5-3 [Issues and collaboration](/stage/5/5-3-issues): issue discussion, labels and milestones, PRs closing issues
- 5-4 [Releases and versioning](/stage/5/5-4-releases): semantic versioning, pushing tags, publishing Releases
- 5-5 [GitHub Actions and Pages](/stage/5/5-5-actions-pages): workflow automation, Pages deployment

## Core features of this chapter

| Feature | Purpose |
| --- | --- |
| fork | copy a repository into your GitHub account |
| pull request | request to merge branch commits into a target repository |
| issue | discuss and track bugs, features, tasks |
| milestone | group issues under a version goal |
| release | official release on top of a tag (notes and assets) |
| GitHub Actions | event-driven CI/CD automation |
| GitHub Pages | free static site hosting (this project is one) |

<StageProgress stage="5" />
