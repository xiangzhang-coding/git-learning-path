<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'

const KEY = 'gitpath-theme'
const themeValues = ['system', 'light', 'dark', 'terminal', 'retro'] as const
type ThemeValue = (typeof themeValues)[number]

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const themes = computed(() => themeValues.map((value) => ({ value, label: labels.value.theme[value] })))

const current = ref<ThemeValue>('system')
const open = ref(false)
const wrapEl = ref<HTMLElement | null>(null)

function apply(theme: ThemeValue) {
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
  if (saved && themeValues.some((t) => t === saved)) {
    current.value = saved as ThemeValue
    apply(current.value)
  }
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (current.value === 'system') apply('system')
    })
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})

function onDocumentClick(e: Event) {
  if (!open.value) return
  if (!wrapEl.value || !wrapEl.value.contains(e.target as Node)) {
    open.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

function toggle() {
  open.value = !open.value
}

function choose(value: ThemeValue) {
  current.value = value
  localStorage.setItem(KEY, value)
  apply(value)
  open.value = false
}
</script>

<template>
  <div ref="wrapEl" class="theme-switcher-wrap">
    <button
      type="button"
      class="theme-switcher"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="`${labels.themeLabel}: ${labels.theme[current]}`"
      @click="toggle"
    >
      <span class="theme-switcher-label">{{ labels.theme[current] }}</span>
      <svg class="theme-switcher-arrow" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div v-if="open" class="theme-switcher-menu" role="listbox" :aria-label="labels.themeLabel">
      <button
        v-for="t in themes"
        :key="t.value"
        type="button"
        role="option"
        :aria-selected="t.value === current"
        :class="{ 'is-active': t.value === current }"
        @click="choose(t.value)"
      >
        {{ t.label }}
      </button>
    </div>
  </div>
</template>
