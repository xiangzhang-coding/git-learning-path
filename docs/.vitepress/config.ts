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

const stageLessons: Record<number, Record<LocaleKey, { slug: string; title: string }[]>> = {
  0: stage0Lessons,
  1: stage1Lessons,
  2: stage2Lessons
}

const stageOrder = [0, 1, 2]

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
