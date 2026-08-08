<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const KEY = 'gitpath-theme'
const themes = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'retro', label: 'Retro' }
]

const current = ref('system')
const open = ref(false)
const wrapEl = ref<HTMLElement | null>(null)

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

function choose(value: string) {
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
      :aria-label="`Theme: ${current}`"
      @click="toggle"
    >
      <span class="theme-switcher-label">{{ current }}</span>
      <svg class="theme-switcher-arrow" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div v-if="open" class="theme-switcher-menu" role="listbox" aria-label="Theme">
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
