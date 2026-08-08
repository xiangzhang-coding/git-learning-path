<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { PagefindUI } from '@pagefind/default-ui'
import '@pagefind/default-ui/css/ui.css'

const route = useRoute()
const base = '/git-learning-path'
const LOCALES = ['zh', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru', 'en']

function localeOf(path: string): string {
  const m = path.match(/^\/([a-z]{2})(?:\/|$)/)
  return m && LOCALES.includes(m[1]) ? m[1] : 'en'
}

let ui: { destroy?: () => void } | null = null

function init() {
  try {
    ui = new PagefindUI({
      element: '#gitpath-search',
      bundlePath: base + '/pagefind/',
      languages: [localeOf(route.path)]
    })
  } catch (e) {
    console.warn('Pagefind init failed (index exists only after a build)', e)
  }
}

onMounted(init)

watch(
  () => route.path,
  (path, oldPath) => {
    if (localeOf(path) !== localeOf(oldPath)) {
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
