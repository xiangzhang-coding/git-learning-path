import { defineConfig } from 'vitepress'

const LANGS = ['zh', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru']

const locales = {
  root: {
    label: 'English',
    lang: 'en',
    title: 'Git Learning Path',
    description:
      'A six-stage course to master common Git and GitHub commands and the principles behind them.',
    themeConfig: {
      nav: [
        { text: 'Stage 0', link: '/stage/0/' }
      ]
    }
  },
  zh: {
    label: '中文',
    lang: 'zh',
    title: 'Git 学习路径',
    description: '六个阶段系统掌握 Git/GitHub 常用命令及其原理。',
    themeConfig: {
      nav: [
        { text: '阶段 0', link: '/zh/stage/0/' }
      ]
    }
  },
  ja: {
    label: '日本語',
    lang: 'ja',
    title: 'Git 学習パス',
    description: '6 つの段階で Git/GitHub のよく使うコマンドとその原理を体系的に学ぶ。',
    themeConfig: {
      nav: [
        { text: '段階 0', link: '/ja/stage/0/' }
      ]
    }
  },
  ko: {
    label: '한국어',
    lang: 'ko',
    title: 'Git 학습 경로',
    description: '여섯 단계로 Git/GitHub 자주 쓰는 명령어와 그 원리를 체계적으로 익힌다.',
    themeConfig: {
      nav: [
        { text: '단계 0', link: '/ko/stage/0/' }
      ]
    }
  },
  de: {
    label: 'Deutsch',
    lang: 'de',
    title: 'Git Lernpfad',
    description:
      'In sechs Stufen die gängigen Git/GitHub-Befehle und ihre Prinzipien systematisch lernen.',
    themeConfig: {
      nav: [
        { text: 'Stufe 0', link: '/de/stage/0/' }
      ]
    }
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    title: 'Parcours Git',
    description:
      'Six étapes pour maîtriser les commandes Git/GitHub courantes et les principes qui les sous-tendent.',
    themeConfig: {
      nav: [
        { text: 'Étape 0', link: '/fr/stage/0/' }
      ]
    }
  },
  es: {
    label: 'Español',
    lang: 'es',
    title: 'Ruta de aprendizaje de Git',
    description:
      'Seis etapas para dominar los comandos habituales de Git/GitHub y sus principios.',
    themeConfig: {
      nav: [
        { text: 'Etapa 0', link: '/es/stage/0/' }
      ]
    }
  },
  pt: {
    label: 'Português',
    lang: 'pt',
    title: 'Trilha de aprendizado de Git',
    description:
      'Seis etapas para dominar os comandos comuns do Git/GitHub e os princípios por trás deles.',
    themeConfig: {
      nav: [
        { text: 'Etapa 0', link: '/pt/stage/0/' }
      ]
    }
  },
  ru: {
    label: 'Русский',
    lang: 'ru',
    title: 'Путь изучения Git',
    description:
      'Шесть этапов системного освоения распространённых команд Git/GitHub и их принципов.',
    themeConfig: {
      nav: [
        { text: 'Этап 0', link: '/ru/stage/0/' }
      ]
    }
  }
}

const sidebar = {
  '/': [
    {
      text: 'Stage 0 — Concepts & Environment',
      items: [{ text: '0-1 Why version control?', link: '/stage/0/0-1-version-control' }]
    }
  ],
  '/zh/': [
    {
      text: '阶段 0 — 概念与环境',
      items: [{ text: '0-1 为什么需要版本控制', link: '/zh/stage/0/0-1-version-control' }]
    }
  ],
  '/ja/': [],
  '/ko/': [],
  '/de/': [],
  '/fr/': [],
  '/es/': [],
  '/pt/': [],
  '/ru/': []
}

const headScript = `(function () {
  var base = '/git-learning-path/'
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

export default defineConfig({
  lang: 'en',
  title: 'Git Learning Path',
  description:
    'A six-stage course to master common Git and GitHub commands and the principles behind them.',
  base: '/git-learning-path/',
  cleanUrls: true,
  appearance: false,
  head: [
    ['script', {}, headScript],
    ['pagefind-config', { 'base-url': '/git-learning-path/' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/git-learning-path/favicon.svg' }]
  ],
  locales,
  themeConfig: {
    outline: { level: [2, 3] },
    sidebar
  }
})
