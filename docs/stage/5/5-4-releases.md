---
title: Releases and versioning
exercises:
  - id: 5-4-e1
    question: In the semantic version 2.4.1, what does each number mean?
    options:
      - 2 is the major version (breaking changes), 4 is the minor version (new features), 1 is the patch (bug fixes)
      - 2 is a patch, 4 is the major version, 1 is the minor version
      - The three numbers are interchangeable
    correct: 0
    explanation: "MAJOR.MINOR.PATCH: major breaks compatibility, minor adds features, patch fixes bugs. The bumping rules make version numbers carry compatibility information."
    anchor: "#semantic-versioning"
  - id: 5-4-e2
    question: How do you push an annotated tag to the remote?
    options:
      - git tag -a v1.0.0 -m "v1.0.0" first, then git push origin v1.0.0
      - git push automatically carries all tags
      - after git tag, no push is needed
    correct: 0
    explanation: Create the tag first, then push it explicitly; git push does not send tags by default (unless you use git push --tags).
    anchor: "#creating-and-pushing-tags"
  - id: 5-4-e3
    question: What is the relationship between a GitHub Release and a git tag?
    options:
      - A Release sits on top of a tag, adding release notes and attachments
      - A Release is unrelated to tags
      - A Release is a branch
    correct: 0
    explanation: You create a Release from an existing tag, then attach release notes and binary artifacts to form an official version.
    anchor: "#creating-a-release"
---

# Releases and versioning

## Lesson goals

- Understand the rules of semantic versioning
- Create tags and push them to GitHub
- Create a Release with notes and attachments

## semantic versioning

Version numbers are MAJOR.MINOR.PATCH (e.g. 2.4.1):

| Position | Bump when |
| --- | --- |
| MAJOR | breaking change, incompatible with older versions |
| MINOR | new feature, backward compatible |
| PATCH | bug fix, no new features |

The rules are simple: a major bump explains "why your program suddenly broke", a patch bump means "safe to upgrade".

## creating and pushing tags

Before publishing, create the tag locally (learned in Chapter 4):

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

Note that `git push` does not push tags by default; push explicitly with `git push origin <tag>` (or all at once with `git push --tags`).

## creating a release

On GitHub, go to Releases → Draft a new release:

1. Choose (or create) a tag, e.g. v1.0.0
2. Write a title and release notes
3. Optionally attach binary artifacts (installers, build outputs)
4. Click Publish release

A Release is "a tag with documentation": users download versions and read changes there, instead of digging through git log.

## how to write release notes

Good release notes group changes for the reader:

- **Features**: what is new, link to PRs
- **Bug fixes**: what was fixed, link to issues
- **Breaking changes**: what to pay attention to when upgrading

## Practice on real GitHub

- Tag your project v0.1.0 and push it
- Create your first Release with three-section notes
- Publish a patch version and watch the Releases list grow

## Exercise

<Exercise />

<LessonProgress />
