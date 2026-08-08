<script setup lang="ts">
import { onMounted, ref } from 'vue'

const KEY = 'gitpath-theme'
const themes = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'retro', label: 'Retro' }
]

const current = ref('system')

function apply(theme: string) {
  const root = document.documentElement
  const isDark = theme === 'dark' || theme === 'terminal' || theme === 'retro'
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  root.classList.toggle('dark', theme === 'system' ? systemDark : isDark)
  if (theme === 'system') {
    delete root.dataset.theme
  } else {
    root.dataset.theme = theme
  }
}

onMounted(() => {
  const saved = localStorage.getItem(KEY)
  if (saved && themes.some((t) => t.value === saved)) {
    current.value = saved
    apply(saved)
  }
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (current.value === 'system') apply('system')
    })
})

function onChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  current.value = value
  localStorage.setItem(KEY, value)
  apply(value)
}
</script>

<template>
  <select
    class="theme-switcher"
    :value="current"
    aria-label="Theme"
    @change="onChange"
  >
    <option v-for="t in themes" :key="t.value" :value="t.value">{{ t.label }}</option>
  </select>
</template>
