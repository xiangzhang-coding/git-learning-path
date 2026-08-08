<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { PagefindUI } from '@pagefind/default-ui'
import { langOfLocaleIndex } from '../lib/labels'
import '@pagefind/default-ui/css/ui.css'

const { localeIndex } = useData()
const base = import.meta.env.BASE_URL

let ui: { destroy?: () => void } | null = null

function init() {
  try {
    ui = new PagefindUI({
      element: '#gitpath-search',
      bundlePath: base + 'pagefind/',
      languages: [langOfLocaleIndex(localeIndex.value)],
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
