<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { DARK_THEMES, isDarkTheme } from '../lib/themes'

const KEY = 'gitpath-theme'
const themeValues = ['system', 'light', ...DARK_THEMES] as const
type ThemeValue = (typeof themeValues)[number]

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const themes = computed(() => themeValues.map((value) => ({ value, label: labels.value.theme[value] })))

const current = ref<ThemeValue>('system')
const open = ref(false)
const wrapEl = ref<HTMLElement | null>(null)
let media: MediaQueryList | null = null
const onMediaChange = () => {
  if (current.value === 'system') apply('system')
}

function apply(theme: ThemeValue) {
  const root = document.documentElement
  const isDark = isDarkTheme(theme)
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  root.classList.toggle('dark', theme === 'system' ? systemDark : isDark)
  if (theme === 'system') {
    delete root.dataset.theme
  } else {
    root.dataset.theme = theme
  }
}

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function writeStoredTheme(theme: string): void {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // storage unavailable (private mode, quotas)
  }
}

onMounted(() => {
  const saved = readStoredTheme()
  if (saved && themeValues.some((t) => t === saved)) {
    current.value = saved as ThemeValue
    apply(current.value)
  }
  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onMediaChange)
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', onMediaChange)
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
  if (!open.value) return
  const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
  if (!keys.includes(e.key)) {
    if (e.key === 'Escape') open.value = false
    return
  }
  e.preventDefault()
  const items = [...wrapEl.value!.querySelectorAll<HTMLButtonElement>('.theme-switcher-menu button')]
  if (!items.length) return
  const currentIdx = items.indexOf(document.activeElement as HTMLButtonElement)
  let next: number
  if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = items.length - 1
  else if (e.key === 'ArrowDown') next = currentIdx === -1 ? 0 : (currentIdx + 1) % items.length
  else next = currentIdx === -1 ? items.length - 1 : (currentIdx - 1 + items.length) % items.length
  items[next].focus()
}

function toggle() {
  open.value = !open.value
}

function choose(value: ThemeValue) {
  current.value = value
  writeStoredTheme(value)
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
