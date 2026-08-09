import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const BASE = '/git-learning-path/'
import { LANGS, LOCALE_KEYS, stageLessons, type LocaleKey } from './theme/lib/stages'
import { DARK_THEMES } from './theme/lib/themes'

const stageTitles: Record<number, Record<LocaleKey, string>> = {
  0: {
    root: 'Chapter 0 — Concepts & Environment',
    zh: '章节 0 — 概念与环境',
    ja: '章 0 — 概念と環境',
    ko: '챕터 0 — 개념과 환경',
    de: 'Kapitel 0 — Konzepte & Umgebung',
    fr: 'Chapitre 0 — Concepts et environnement',
    es: 'Capítulo 0 — Conceptos y entorno',
    pt: 'Capítulo 0 — Conceitos e ambiente',
    ru: 'Глава 0 — Понятия и окружение'
  },
  1: {
    root: 'Chapter 1 — Local Basics',
    zh: '章节 1 — 本地基础',
    ja: '章 1 — ローカル基礎',
    ko: '챕터 1 — 로컬 기초',
    de: 'Kapitel 1 — Lokale Grundlagen',
    fr: 'Chapitre 1 — Les bases locales',
    es: 'Capítulo 1 — Conceptos básicos locales',
    pt: 'Capítulo 1 — Noções básicas locais',
    ru: 'Глава 1 — Локальные основы'
  },
  2: {
    root: 'Chapter 2 — Branches & Merging',
    zh: '章节 2 — 分支与合并',
    ja: '章 2 — ブランチとマージ',
    ko: '챕터 2 — 브랜치와 병합',
    de: 'Kapitel 2 — Branches & Merging',
    fr: 'Chapitre 2 — Branches et fusions',
    es: 'Capítulo 2 — Ramas y fusión',
    pt: 'Capítulo 2 — Branches e merge',
    ru: 'Глава 2 — Ветки и слияния'
  },
  3: {
    root: 'Chapter 3 — Remote Collaboration',
    zh: '章节 3 — 远程协作',
    ja: '章 3 — リモート協働',
    ko: '챕터 3 — 원격 협업',
    de: 'Kapitel 3 — Remote-Zusammenarbeit',
    fr: 'Chapitre 3 — Collaboration à distance',
    es: 'Capítulo 3 — Colaboración remota',
    pt: 'Capítulo 3 — Colaboração remota',
    ru: 'Глава 3 — Удалённая работа'
  },
  4: {
    root: 'Chapter 4 — Repair & Advanced',
    zh: '章节 4 — 修复与进阶',
    ja: '章 4 — 修復と応用',
    ko: '챕터 4 — 복구와 심화',
    de: 'Kapitel 4 — Reparieren & Fortgeschritten',
    fr: 'Chapitre 4 — Réparation & avancé',
    es: 'Capítulo 4 — Reparación y avanzado',
    pt: 'Capítulo 4 — Reparo e avançado',
    ru: 'Глава 4 — Восстановление и продвинутый'
  },
  5: {
    root: 'Chapter 5 — GitHub Ecosystem',
    zh: '章节 5 — GitHub 生态',
    ja: '章 5 — GitHub エコシステム',
    ko: '챕터 5 — GitHub 생태계',
    de: 'Kapitel 5 — GitHub-Ökosystem',
    fr: 'Chapitre 5 — Écosystème GitHub',
    es: 'Capítulo 5 — Ecosistema GitHub',
    pt: 'Capítulo 5 — Ecossistema GitHub',
    ru: 'Глава 5 — Экосистема GitHub'
  }
}


const curriculumTitle: Record<LocaleKey, string> = {
  root: 'Curriculum',
  zh: '课程',
  ja: 'カリキュラム',
  ko: '커리큘럼',
  de: 'Kurs',
  fr: 'Cours',
  es: 'Curso',
  pt: 'Currículo',
  ru: 'Программа'
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
      {
        text: curriculumTitle[key],
        items: [
          ...stageOrder.map((stage) => ({
            text: stageTitles[stage][key],
            link: `${prefix}/stage/${stage}/`
          })),
          { text: glossaryTitle[key], link: `${prefix}/glossary` }
        ]
      }
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
      'A six-chapter course to master common Git and GitHub commands and the principles behind them.',
    themeConfig: { nav: nav['/'] }
  },
  zh: {
    label: '中文',
    lang: 'zh',
    title: 'Git 学习路径',
    description: '六个章节系统掌握 Git/GitHub 常用命令及其原理。',
    themeConfig: { nav: nav['/zh/'] }
  },
  ja: {
    label: '日本語',
    lang: 'ja',
    title: 'Git 学習パス',
    description: '6 つの章で Git/GitHub のよく使うコマンドとその原理を体系的に学ぶ。',
    themeConfig: { nav: nav['/ja/'] }
  },
  ko: {
    label: '한국어',
    lang: 'ko',
    title: 'Git 학습 경로',
    description: '여섯 챕터로 Git/GitHub 자주 쓰는 명령어와 그 원리를 체계적으로 익힌다.',
    themeConfig: { nav: nav['/ko/'] }
  },
  de: {
    label: 'Deutsch',
    lang: 'de',
    title: 'Git Lernpfad',
    description:
      'In sechs Kapiteln die gängigen Git/GitHub-Befehle und ihre Prinzipien systematisch lernen.',
    themeConfig: { nav: nav['/de/'] }
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    title: 'Parcours Git',
    description:
      'Six chapitres pour maîtriser les commandes Git/GitHub courantes et les principes qui les sous-tendent.',
    themeConfig: { nav: nav['/fr/'] }
  },
  es: {
    label: 'Español',
    lang: 'es',
    title: 'Ruta de aprendizaje de Git',
    description:
      'Seis capítulos para dominar los comandos habituales de Git/GitHub y sus principios.',
    themeConfig: { nav: nav['/es/'] }
  },
  pt: {
    label: 'Português',
    lang: 'pt',
    title: 'Trilha de aprendizado de Git',
    description:
      'Seis capítulos para dominar os comandos comuns do Git/GitHub e os princípios por trás deles.',
    themeConfig: { nav: nav['/pt/'] }
  },
  ru: {
    label: 'Русский',
    lang: 'ru',
    title: 'Путь изучения Git',
    description:
      'Шесть глав системного освоения распространённых команд Git/GitHub и их принципов.',
    themeConfig: { nav: nav['/ru/'] }
  }
}

const headScript = `(function () {
  var base = ${JSON.stringify(BASE)}
  var rootPath = base.replace(/\\/$/, '')
  try {
    var saved = localStorage.getItem('gitpath-theme')
    var darkThemes = ${JSON.stringify(DARK_THEMES)}
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
    } else if (cookieLang === 'en') {
      target = ''
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
    'A six-chapter course to master common Git and GitHub commands and the principles behind them.',
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
