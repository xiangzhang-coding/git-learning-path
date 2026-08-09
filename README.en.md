# Git Learning Path

A VitePress-based static course site that teaches common Git/GitHub **commands** and how they work, in six chapters from basics to advanced. Available in 9 languages (English + 8), with an in-browser **playground** (run real git commands and watch the commit graph render live) and instant-feedback **exercises**. Deployed to GitHub Pages.

[中文](README.md) · English

Live site: https://xiangzhang-coding.github.io/git-learning-path/

## Features

- **9 language versions**: English + Simplified Chinese / Japanese / Korean / German / French / Spanish / Portuguese / Russian, entered automatically from the browser language (choice remembered via cookie)
- **In-browser playground**: an isomorphic-git engine runs real git commands in the browser and draws the commit DAG and repository state live, covering chapters 1–4
- **Instant-feedback exercises**: answers are graded immediately, and every explanation links back to the relevant section of the lesson
- **Teaching visualizations**: 5 auto-playing diagrams (snapshot model, HEAD pointer, three merge outcomes, remote data flow, reset modes) with pause/replay, degrading to manual stepping under `prefers-reduced-motion`
- **Chapter 5 hands-on checklist**: ten real-GitHub tasks from fork → PR → Issue → Release → Actions → Pages
- **Site search**: Pagefind full-text index across all 9 languages
- **5 themes**: system / light / dark / terminal / retro terminal
- **Mermaid flowcharts**: chapter 5 flow diagrams switch between light and dark automatically

## Local development

```bash
npm install
npm run dev      # local preview
npm run build    # build + PageFind index (output in docs/.vitepress/dist)
```

The playground runs in the browser on isomorphic-git; no backend required.

## Testing

```bash
npm test                  # unit tests (vitest, ~600)
npx playwright test       # browser end-to-end tests (requires npm run build first)
```

- `tests/`: git command semantics of the playground engine (commit/branch/merge/rebase/reset…) and course-content validation (exercise data, byte-exact anchor matching, structural consistency across 9 locales)
- `e2e/`: real-browser behavior (exercise feedback, theme switching, search, mermaid rendering, teaching visuals, anchor navigation)

CI (`.github/workflows/ci.yml`) runs type checking, unit tests, build, and e2e on every PR.

## Directory structure

```
docs/
├─ .vitepress/
│  ├─ config.ts            # i18n 9-locale config, themes, navigation
│  └─ theme/               # theme system, search, language follow, teaching components
│     └─ lib/playground/   # in-browser git engine (isomorphic-git wrapper + scenarios)
├─ adr/                    # architecture decision records
├─ index.md                # English homepage (root locale)
└─ zh|ja|ko|de|fr|es|pt|ru/  # per-locale content
tests/                     # unit tests (engine semantics + content validation)
e2e/                       # browser end-to-end tests
.github/workflows/         # CI (PR checks) and deploy (main push → GitHub Pages)
```

## Course structure

Chapters 0–5: concepts & environment → local basics → branching & merging → remote collaboration → fixing & going further → the GitHub ecosystem. Each lesson covers 2–4 common commands with a principle thread, exercises, and playground scenarios.

See [`CONTEXT.md`](CONTEXT.md) for the writing and terminology conventions (章节/课/练习/练手区 wording rules).

## Tech stack

| Purpose | Technology |
| --- | --- |
| Static site | VitePress |
| In-browser git engine | isomorphic-git |
| Flowcharts | Mermaid (vitepress-plugin-mermaid) |
| Site search | Pagefind |
| Unit tests | Vitest |
| End-to-end tests | Playwright |

## Deployment

`.github/workflows/deploy.yml`: pushing to main triggers GitHub Actions to build and publish to GitHub Pages (project site at `/git-learning-path/`).

## License

[MIT](LICENSE)
