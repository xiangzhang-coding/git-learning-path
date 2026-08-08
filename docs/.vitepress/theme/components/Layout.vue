<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { useData } from 'vitepress'
import ThemeSwitcher from './ThemeSwitcher.vue'
import SearchBox from './SearchBox.vue'
import { langOfLocaleIndex } from '../lib/labels'

const { Layout } = DefaultTheme
const { localeIndex } = useData()

watch(
  () => localeIndex.value,
  (index) => {
    const lang = langOfLocaleIndex(index)
    document.cookie = `gitpath_lang=${lang === 'en' ? '' : lang}; path=/; max-age=31536000; samesite=lax`
  },
  { immediate: true }
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
