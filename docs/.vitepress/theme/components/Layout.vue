<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import ThemeSwitcher from './ThemeSwitcher.vue'
import SearchBox from './SearchBox.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const LANGS = ['zh', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru']

watch(
  () => route.path,
  (path) => {
    const m = path.match(/^\/([a-z]{2})(?:\/|$)/)
    const lang = m && LANGS.includes(m[1]) ? m[1] : ''
    document.cookie = `gitpath_lang=${lang}; path=/; max-age=31536000; samesite=lax`
  }
)
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <SearchBox />
      <ThemeSwitcher />
    </template>
  </Layout>
</template>
