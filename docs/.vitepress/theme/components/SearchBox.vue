<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { PagefindUI } from '@pagefind/default-ui'
import { langOfLocaleIndex } from '../lib/labels'
import '@pagefind/default-ui/css/ui.css'

const { localeIndex } = useData()
const base = import.meta.env.BASE_URL

const SEARCH_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    placeholder: 'Search',
    clear_search: 'Clear',
    search_label: 'Search this site',
    load_more: 'Load more results',
    zero_results: 'No results for [SEARCH_TERM]',
    total_zero_results: 'No results',
    loading: 'Loading'
  },
  zh: {
    placeholder: '搜索',
    clear_search: '清除',
    search_label: '站内搜索',
    load_more: '加载更多结果',
    zero_results: '未找到 [SEARCH_TERM] 的相关结果',
    total_zero_results: '无结果',
    loading: '加载中'
  },
  ja: {
    placeholder: '検索',
    clear_search: 'クリア',
    search_label: 'サイト内検索',
    load_more: 'さらに結果を読み込む',
    zero_results: '[SEARCH_TERM] の結果はありません',
    total_zero_results: '結果はありません',
    loading: '読み込み中'
  },
  ko: {
    placeholder: '검색',
    clear_search: '지우기',
    search_label: '사이트 검색',
    load_more: '더 많은 결과 불러오기',
    zero_results: '[SEARCH_TERM]에 대한 결과가 없습니다',
    total_zero_results: '결과가 없습니다',
    loading: '불러오는 중'
  },
  de: {
    placeholder: 'Suchen',
    clear_search: 'Leeren',
    search_label: 'Seite durchsuchen',
    load_more: 'Weitere Ergebnisse laden',
    zero_results: 'Keine Ergebnisse für [SEARCH_TERM]',
    total_zero_results: 'Keine Ergebnisse',
    loading: 'Wird geladen'
  },
  fr: {
    placeholder: 'Rechercher',
    clear_search: 'Effacer',
    search_label: 'Rechercher sur le site',
    load_more: 'Charger plus de résultats',
    zero_results: 'Aucun résultat pour [SEARCH_TERM]',
    total_zero_results: 'Aucun résultat',
    loading: 'Chargement'
  },
  es: {
    placeholder: 'Buscar',
    clear_search: 'Borrar',
    search_label: 'Buscar en el sitio',
    load_more: 'Cargar más resultados',
    zero_results: 'No hay resultados para [SEARCH_TERM]',
    total_zero_results: 'No hay resultados',
    loading: 'Cargando'
  },
  pt: {
    placeholder: 'Pesquisar',
    clear_search: 'Limpar',
    search_label: 'Pesquisar no site',
    load_more: 'Carregar mais resultados',
    zero_results: 'Nenhum resultado para [SEARCH_TERM]',
    total_zero_results: 'Nenhum resultado',
    loading: 'Carregando'
  },
  ru: {
    placeholder: 'Поиск',
    clear_search: 'Очистить',
    search_label: 'Поиск по сайту',
    load_more: 'Загрузить ещё результаты',
    zero_results: 'Нет результатов для [SEARCH_TERM]',
    total_zero_results: 'Нет результатов',
    loading: 'Загрузка'
  }
}

let ui: { destroy?: () => void } | null = null

function init() {
  try {
    ui = new PagefindUI({
      element: '#gitpath-search',
      bundlePath: base + 'pagefind/',
      languages: [langOfLocaleIndex(localeIndex.value)],
      translations: SEARCH_TRANSLATIONS[langOfLocaleIndex(localeIndex.value)] ?? SEARCH_TRANSLATIONS.en,
      processResult: (result: { url: string }) => {
        result.url = result.url.replace(/\.html$/, '')
        return result
      }
    })
  } catch (e) {
    console.warn('Pagefind init failed (index exists only after a build)', e)
  }
}

onMounted(init)

watch(
  () => localeIndex.value,
  (index, oldIndex) => {
    if (index !== oldIndex) {
      try {
        ui?.destroy?.()
      } catch (e) {
        console.warn(e)
      }
      init()
    }
  }
)
</script>

<template>
  <div id="gitpath-search" class="gitpath-search"></div>
</template>
