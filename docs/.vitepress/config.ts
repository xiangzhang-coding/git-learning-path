import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const BASE = '/git-learning-path/'
const LANGS = ['zh', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru'] as const

type LocaleKey = 'root' | (typeof LANGS)[number]

const LOCALE_KEYS: LocaleKey[] = ['root', ...LANGS]

const stageTitles: Record<number, Record<LocaleKey, string>> = {
  0: {
    root: 'Stage 0 — Concepts & Environment',
    zh: '阶段 0 — 概念与环境',
    ja: '段階 0 — 概念と環境',
    ko: '단계 0 — 개념과 환경',
    de: 'Stufe 0 — Konzepte & Umgebung',
    fr: 'Étape 0 — Concepts et environnement',
    es: 'Etapa 0 — Conceptos y entorno',
    pt: 'Etapa 0 — Conceitos e ambiente',
    ru: 'Этап 0 — Понятия и окружение'
  },
  1: {
    root: 'Stage 1 — Local Basics',
    zh: '阶段 1 — 本地基础',
    ja: '段階 1 — ローカル基礎',
    ko: '단계 1 — 로컬 기초',
    de: 'Stufe 1 — Lokale Grundlagen',
    fr: 'Étape 1 — Les bases locales',
    es: 'Etapa 1 — Conceptos básicos locales',
    pt: 'Etapa 1 — Noções básicas locais',
    ru: 'Этап 1 — Локальные основы'
  },
  2: {
    root: 'Stage 2 — Branches & Merging',
    zh: '阶段 2 — 分支与合并',
    ja: '段階 2 — ブランチとマージ',
    ko: '단계 2 — 브랜치와 병합',
    de: 'Stufe 2 — Branches & Merging',
    fr: 'Étape 2 — Branches et fusions',
    es: 'Etapa 2 — Ramas y fusión',
    pt: 'Etapa 2 — Branches e merge',
    ru: 'Этап 2 — Ветки и слияния'
  },
  3: {
    root: 'Stage 3 — Remote Collaboration',
    zh: '阶段 3 — 远程协作',
    ja: '段階 3 — リモート協働',
    ko: '단계 3 — 원격 협업',
    de: 'Stufe 3 — Remote-Zusammenarbeit',
    fr: 'Étape 3 — Collaboration à distance',
    es: 'Etapa 3 — Colaboración remota',
    pt: 'Etapa 3 — Colaboração remota',
    ru: 'Этап 3 — Удалённая работа'
  },
  4: {
    root: 'Stage 4 — Repair & Advanced',
    zh: '阶段 4 — 修复与进阶',
    ja: '段階 4 — 修復と応用',
    ko: '단계 4 — 복구와 심화',
    de: 'Stufe 4 — Reparieren & Fortgeschritten',
    fr: 'Étape 4 — Réparation & avancé',
    es: 'Etapa 4 — Reparación y avanzado',
    pt: 'Etapa 4 — Reparo e avançado',
    ru: 'Этап 4 — Восстановление и продвинутый'
  },
  5: {
    root: 'Stage 5 — GitHub Ecosystem',
    zh: '阶段 5 — GitHub 生态',
    ja: '段階 5 — GitHub エコシステム',
    ko: '단계 5 — GitHub 생태계',
    de: 'Stufe 5 — GitHub-Ökosystem',
    fr: 'Étape 5 — Écosystème GitHub',
    es: 'Etapa 5 — Ecosistema GitHub',
    pt: 'Etapa 5 — Ecossistema GitHub',
    ru: 'Этап 5 — Экосистема GitHub'
  }
}

const stageNavText: Record<number, Record<LocaleKey, string>> = {
  0: {
    root: 'Stage 0',
    zh: '阶段 0',
    ja: '段階 0',
    ko: '단계 0',
    de: 'Stufe 0',
    fr: 'Étape 0',
    es: 'Etapa 0',
    pt: 'Etapa 0',
    ru: 'Этап 0'
  },
  1: {
    root: 'Stage 1',
    zh: '阶段 1',
    ja: '段階 1',
    ko: '단계 1',
    de: 'Stufe 1',
    fr: 'Étape 1',
    es: 'Etapa 1',
    pt: 'Etapa 1',
    ru: 'Этап 1'
  },
  2: {
    root: 'Stage 2',
    zh: '阶段 2',
    ja: '段階 2',
    ko: '단계 2',
    de: 'Stufe 2',
    fr: 'Étape 2',
    es: 'Etapa 2',
    pt: 'Etapa 2',
    ru: 'Этап 2'
  },
  3: {
    root: 'Stage 3',
    zh: '阶段 3',
    ja: '段階 3',
    ko: '단계 3',
    de: 'Stufe 3',
    fr: 'Étape 3',
    es: 'Etapa 3',
    pt: 'Etapa 3',
    ru: 'Этап 3'
  },
  4: {
    root: 'Stage 4',
    zh: '阶段 4',
    ja: '段階 4',
    ko: '단계 4',
    de: 'Stufe 4',
    fr: 'Étape 4',
    es: 'Etapa 4',
    pt: 'Etapa 4',
    ru: 'Этап 4'
  },
  5: {
    root: 'Stage 5',
    zh: '阶段 5',
    ja: '段階 5',
    ko: '단계 5',
    de: 'Stufe 5',
    fr: 'Étape 5',
    es: 'Etapa 5',
    pt: 'Etapa 5',
    ru: 'Этап 5'
  }
}

const glossaryTitle: Record<LocaleKey, string> = {
  root: 'Glossary',
  zh: '术语表',
  ja: '用語集',
  ko: '용어집',
  de: 'Glossar',
  fr: 'Glossaire',
  es: 'Glosario',
  pt: 'Glossário',
  ru: 'Глоссарий'
}

const stage0Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '0-1-version-control', title: '0-1 Why version control?' },
    { slug: '0-2-three-areas', title: '0-2 The three-areas model' },
    { slug: '0-3-config-help', title: '0-3 config and help' }
  ],
  zh: [
    { slug: '0-1-version-control', title: '0-1 为什么需要版本控制' },
    { slug: '0-2-three-areas', title: '0-2 三个区域模型' },
    { slug: '0-3-config-help', title: '0-3 config 与 help' }
  ],
  ja: [
    { slug: '0-1-version-control', title: '0-1 なぜバージョン管理が必要か' },
    { slug: '0-2-three-areas', title: '0-2 3つのエリアモデル' },
    { slug: '0-3-config-help', title: '0-3 config と help' }
  ],
  ko: [
    { slug: '0-1-version-control', title: '0-1 왜 버전 관리가 필요한가' },
    { slug: '0-2-three-areas', title: '0-2 3영역 모델' },
    { slug: '0-3-config-help', title: '0-3 config와 help' }
  ],
  de: [
    { slug: '0-1-version-control', title: '0-1 Warum Versionskontrolle?' },
    { slug: '0-2-three-areas', title: '0-2 Das Drei-Bereiche-Modell' },
    { slug: '0-3-config-help', title: '0-3 config und help' }
  ],
  fr: [
    { slug: '0-1-version-control', title: '0-1 Pourquoi le contrôle de version ?' },
    { slug: '0-2-three-areas', title: '0-2 Le modèle des trois zones' },
    { slug: '0-3-config-help', title: '0-3 config et help' }
  ],
  es: [
    { slug: '0-1-version-control', title: '0-1 ¿Por qué el control de versiones?' },
    { slug: '0-2-three-areas', title: '0-2 El modelo de tres áreas' },
    { slug: '0-3-config-help', title: '0-3 config y help' }
  ],
  pt: [
    { slug: '0-1-version-control', title: '0-1 Por que controle de versão?' },
    { slug: '0-2-three-areas', title: '0-2 O modelo de três áreas' },
    { slug: '0-3-config-help', title: '0-3 config e help' }
  ],
  ru: [
    { slug: '0-1-version-control', title: '0-1 Зачем нужен контроль версий?' },
    { slug: '0-2-three-areas', title: '0-2 Модель трёх областей' },
    { slug: '0-3-config-help', title: '0-3 config и help' }
  ]
}

const stage1Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '1-1-init-status', title: '1-1 git init and git status' },
    { slug: '1-2-add-commit', title: '1-2 git add and git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log and git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm and git mv' }
  ],
  zh: [
    { slug: '1-1-init-status', title: '1-1 git init 与 git status' },
    { slug: '1-2-add-commit', title: '1-2 git add 与 git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log 与 git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore、git rm 与 git mv' }
  ],
  ja: [
    { slug: '1-1-init-status', title: '1-1 git init と git status' },
    { slug: '1-2-add-commit', title: '1-2 git add と git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log と git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore、git rm と git mv' }
  ],
  ko: [
    { slug: '1-1-init-status', title: '1-1 git init와 git status' },
    { slug: '1-2-add-commit', title: '1-2 git add와 git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log와 git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm와 git mv' }
  ],
  de: [
    { slug: '1-1-init-status', title: '1-1 git init und git status' },
    { slug: '1-2-add-commit', title: '1-2 git add und git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log und git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm und git mv' }
  ],
  fr: [
    { slug: '1-1-init-status', title: '1-1 git init et git status' },
    { slug: '1-2-add-commit', title: '1-2 git add et git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log et git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm et git mv' }
  ],
  es: [
    { slug: '1-1-init-status', title: '1-1 git init y git status' },
    { slug: '1-2-add-commit', title: '1-2 git add y git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log y git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm y git mv' }
  ],
  pt: [
    { slug: '1-1-init-status', title: '1-1 git init e git status' },
    { slug: '1-2-add-commit', title: '1-2 git add e git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log e git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm e git mv' }
  ],
  ru: [
    { slug: '1-1-init-status', title: '1-1 git init и git status' },
    { slug: '1-2-add-commit', title: '1-2 git add и git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log и git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm и git mv' }
  ]
}

const stage2Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '2-1-branch-switch', title: '2-1 git branch and git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Working on branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Resolving merge conflicts' }
  ],
  zh: [
    { slug: '2-1-branch-switch', title: '2-1 git branch 与 git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 在分支上工作' },
    { slug: '2-3-merge', title: '2-3 git merge 合并分支' },
    { slug: '2-4-merge-conflict', title: '2-4 解决合并冲突' }
  ],
  ja: [
    { slug: '2-1-branch-switch', title: '2-1 git branch と git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 ブランチ上での作業' },
    { slug: '2-3-merge', title: '2-3 git merge によるマージ' },
    { slug: '2-4-merge-conflict', title: '2-4 マージコンフリクトの解決' }
  ],
  ko: [
    { slug: '2-1-branch-switch', title: '2-1 git branch와 git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 브랜치에서 작업하기' },
    { slug: '2-3-merge', title: '2-3 git merge 병합' },
    { slug: '2-4-merge-conflict', title: '2-4 병합 충돌 해결하기' }
  ],
  de: [
    { slug: '2-1-branch-switch', title: '2-1 git branch und git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Arbeiten auf Branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Merge-Konflikte lösen' }
  ],
  fr: [
    { slug: '2-1-branch-switch', title: '2-1 git branch et git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Travailler sur des branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Résoudre les conflits de fusion' }
  ],
  es: [
    { slug: '2-1-branch-switch', title: '2-1 git branch y git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Trabajar en ramas' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Resolver conflictos de fusión' }
  ],
  pt: [
    { slug: '2-1-branch-switch', title: '2-1 git branch e git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Trabalhando em branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Resolvendo conflitos de merge' }
  ],
  ru: [
    { slug: '2-1-branch-switch', title: '2-1 git branch и git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Работа в ветках' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Разрешение конфликтов слияния' }
  ]
}

const stage3Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch and git pull' }
  ],
  zh: [
    { slug: '3-1-remote', title: '3-1 git remote 远程仓库' },
    { slug: '3-2-clone', title: '3-2 git clone 克隆仓库' },
    { slug: '3-3-push', title: '3-3 git push 推送提交' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch 与 git pull' }
  ],
  ja: [
    { slug: '3-1-remote', title: '3-1 git remote リモート' },
    { slug: '3-2-clone', title: '3-2 git clone でクローン' },
    { slug: '3-3-push', title: '3-3 git push でプッシュ' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch と git pull' }
  ],
  ko: [
    { slug: '3-1-remote', title: '3-1 git remote 원격 저장소' },
    { slug: '3-2-clone', title: '3-2 git clone 복제' },
    { slug: '3-3-push', title: '3-3 git push 푸시' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch와 git pull' }
  ],
  de: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch und git pull' }
  ],
  fr: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch et git pull' }
  ],
  es: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch y git pull' }
  ],
  pt: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch e git pull' }
  ],
  ru: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch и git pull' }
  ]
}

const stage4Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '4-1-stash-tag', title: '4-1 git stash and git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset and git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert and git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  zh: [
    { slug: '4-1-stash-tag', title: '4-1 git stash 与 git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset 与 reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert 与 git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase 重放提交' }
  ],
  ja: [
    { slug: '4-1-stash-tag', title: '4-1 git stash と git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset と git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert と git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  ko: [
    { slug: '4-1-stash-tag', title: '4-1 git stash와 git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset과 git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert와 git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  de: [
    { slug: '4-1-stash-tag', title: '4-1 git stash und git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset und git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert und git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  fr: [
    { slug: '4-1-stash-tag', title: '4-1 git stash et git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset et git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert et git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  es: [
    { slug: '4-1-stash-tag', title: '4-1 git stash y git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset y git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert y git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  pt: [
    { slug: '4-1-stash-tag', title: '4-1 git stash e git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset e git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert e git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ],
  ru: [
    { slug: '4-1-stash-tag', title: '4-1 git stash и git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset и git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert и git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' }
  ]
}

const stage5Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '5-1-fork-upstream', title: '5-1 fork and upstream sync' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request workflow' },
    { slug: '5-3-issues', title: '5-3 Issues and collaboration' },
    { slug: '5-4-releases', title: '5-4 Releases and versioning' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions and Pages' }
  ],
  zh: [
    { slug: '5-1-fork-upstream', title: '5-1 fork 与 upstream 同步' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request 工作流' },
    { slug: '5-3-issues', title: '5-3 Issues 与协作' },
    { slug: '5-4-releases', title: '5-4 Releases 与版本发布' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions 与 Pages' }
  ],
  ja: [
    { slug: '5-1-fork-upstream', title: '5-1 fork と upstream の同期' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request の流れ' },
    { slug: '5-3-issues', title: '5-3 Issues と協働' },
    { slug: '5-4-releases', title: '5-4 Releases とバージョン公開' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions と Pages' }
  ],
  ko: [
    { slug: '5-1-fork-upstream', title: '5-1 fork와 upstream 동기화' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request 워크플로' },
    { slug: '5-3-issues', title: '5-3 Issues와 협업' },
    { slug: '5-4-releases', title: '5-4 Releases와 버전 출시' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions와 Pages' }
  ],
  de: [
    { slug: '5-1-fork-upstream', title: '5-1 fork und upstream synchronisieren' },
    { slug: '5-2-pull-request', title: '5-2 Pull-Request-Workflow' },
    { slug: '5-3-issues', title: '5-3 Issues und Zusammenarbeit' },
    { slug: '5-4-releases', title: '5-4 Releases und Versionierung' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions und Pages' }
  ],
  fr: [
    { slug: '5-1-fork-upstream', title: '5-1 fork et synchronisation upstream' },
    { slug: '5-2-pull-request', title: '5-2 Flux de travail Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues et collaboration' },
    { slug: '5-4-releases', title: '5-4 Releases et versions' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions et Pages' }
  ],
  es: [
    { slug: '5-1-fork-upstream', title: '5-1 fork y sincronización con upstream' },
    { slug: '5-2-pull-request', title: '5-2 Flujo de trabajo de Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues y colaboración' },
    { slug: '5-4-releases', title: '5-4 Releases y versionado' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions y Pages' }
  ],
  pt: [
    { slug: '5-1-fork-upstream', title: '5-1 fork e sincronização com upstream' },
    { slug: '5-2-pull-request', title: '5-2 Fluxo de trabalho de Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues e colaboração' },
    { slug: '5-4-releases', title: '5-4 Releases e versionamento' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions e Pages' }
  ],
  ru: [
    { slug: '5-1-fork-upstream', title: '5-1 fork и синхронизация с upstream' },
    { slug: '5-2-pull-request', title: '5-2 Рабочий процесс Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues и совместная работа' },
    { slug: '5-4-releases', title: '5-4 Releases и выпуск версий' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions и Pages' }
  ]
}

const stageLessons: Record<number, Record<LocaleKey, { slug: string; title: string }[]>> = {
  0: stage0Lessons,
  1: stage1Lessons,
  2: stage2Lessons,
  3: stage3Lessons,
  4: stage4Lessons,
  5: stage5Lessons
}

const stageOrder = [0, 1, 2, 3, 4, 5]

function localePrefix(key: LocaleKey): string {
  return key === 'root' ? '' : `/${key}`
}

function buildSidebar(): Record<string, DefaultTheme.SidebarItem[]> {
  const out: Record<string, DefaultTheme.SidebarItem[]> = {}
  for (const key of LOCALE_KEYS) {
    const prefix = localePrefix(key)
    out[`${prefix}/`] = [
      ...stageOrder.map((stage) => ({
        text: stageTitles[stage][key],
        items: stageLessons[stage][key].map((lesson) => ({
          text: lesson.title,
          link: `${prefix}/stage/${stage}/${lesson.slug}`
        }))
      })),
      { text: glossaryTitle[key], link: `${prefix}/glossary` }
    ]
  }
  return out
}

function buildNav(): Record<string, DefaultTheme.NavItem[]> {
  const out: Record<string, DefaultTheme.NavItem[]> = {}
  for (const key of LOCALE_KEYS) {
    const prefix = localePrefix(key)
    out[`${prefix}/`] = [
      ...stageOrder.map((stage) => ({
        text: stageNavText[stage][key],
        link: `${prefix}/stage/${stage}/`
      })),
      { text: glossaryTitle[key], link: `${prefix}/glossary` }
    ]
  }
  return out
}

const nav = buildNav()
const locales = {
  root: {
    label: 'English',
    lang: 'en',
    title: 'Git Learning Path',
    description:
      'A six-stage course to master common Git and GitHub commands and the principles behind them.',
    themeConfig: { nav: nav['/'] }
  },
  zh: {
    label: '中文',
    lang: 'zh',
    title: 'Git 学习路径',
    description: '六个阶段系统掌握 Git/GitHub 常用命令及其原理。',
    themeConfig: { nav: nav['/zh/'] }
  },
  ja: {
    label: '日本語',
    lang: 'ja',
    title: 'Git 学習パス',
    description: '6 つの段階で Git/GitHub のよく使うコマンドとその原理を体系的に学ぶ。',
    themeConfig: { nav: nav['/ja/'] }
  },
  ko: {
    label: '한국어',
    lang: 'ko',
    title: 'Git 학습 경로',
    description: '여섯 단계로 Git/GitHub 자주 쓰는 명령어와 그 원리를 체계적으로 익힌다.',
    themeConfig: { nav: nav['/ko/'] }
  },
  de: {
    label: 'Deutsch',
    lang: 'de',
    title: 'Git Lernpfad',
    description:
      'In sechs Stufen die gängigen Git/GitHub-Befehle und ihre Prinzipien systematisch lernen.',
    themeConfig: { nav: nav['/de/'] }
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    title: 'Parcours Git',
    description:
      'Six étapes pour maîtriser les commandes Git/GitHub courantes et les principes qui les sous-tendent.',
    themeConfig: { nav: nav['/fr/'] }
  },
  es: {
    label: 'Español',
    lang: 'es',
    title: 'Ruta de aprendizaje de Git',
    description:
      'Seis etapas para dominar los comandos habituales de Git/GitHub y sus principios.',
    themeConfig: { nav: nav['/es/'] }
  },
  pt: {
    label: 'Português',
    lang: 'pt',
    title: 'Trilha de aprendizado de Git',
    description:
      'Seis etapas para dominar os comandos comuns do Git/GitHub e os princípios por trás deles.',
    themeConfig: { nav: nav['/pt/'] }
  },
  ru: {
    label: 'Русский',
    lang: 'ru',
    title: 'Путь изучения Git',
    description:
      'Шесть этапов системного освоения распространённых команд Git/GitHub и их принципов.',
    themeConfig: { nav: nav['/ru/'] }
  }
}

const headScript = `(function () {
  var base = ${JSON.stringify(BASE)}
  var rootPath = base.replace(/\\/$/, '')
  try {
    var saved = localStorage.getItem('gitpath-theme')
    var darkThemes = ['dark', 'terminal', 'retro']
    if (saved && darkThemes.indexOf(saved) > -1) {
      document.documentElement.dataset.theme = saved
      document.documentElement.classList.add('dark')
    } else if (saved === 'light') {
      document.documentElement.dataset.theme = 'light'
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  } catch (e) {}
  var path = window.location.pathname
  if (path === rootPath || path === base || path === '/') {
    var cookieLang = ''
    try {
      var m = document.cookie.match(/(?:^|;\\s*)gitpath_lang=([a-z]+)/)
      cookieLang = (m && m[1]) || ''
    } catch (e) {}
    var navLang = (navigator.language || 'en').toLowerCase()
    var map = ${JSON.stringify(LANGS)}
    var target = ''
    if (map.indexOf(cookieLang) > -1) {
      target = cookieLang
    } else {
      for (var i = 0; i < map.length; i++) {
        if (navLang.indexOf(map[i]) === 0) {
          target = map[i]
          break
        }
      }
    }
    if (target) window.location.replace(base + target + '/')
  }
})()`

const sidebar = buildSidebar()

export default defineConfig({
  lang: 'en',
  title: 'Git Learning Path',
  description:
    'A six-stage course to master common Git and GitHub commands and the principles behind them.',
  base: BASE,
  cleanUrls: true,
  appearance: false,
  head: [
    ['script', {}, headScript],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }]
  ],
  locales,
  themeConfig: {
    outline: { level: [2, 3] },
    sidebar
  }
})
