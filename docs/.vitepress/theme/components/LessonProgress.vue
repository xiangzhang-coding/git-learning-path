<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { loadProgress, pagePath, setProgress } from '../lib/progress'

const { localeIndex } = useData()
const route = useRoute()
const done = ref(false)

const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

function path() {
  return pagePath(route.path)
}

function load() {
  done.value = loadProgress().includes(path())
}

onMounted(load)

function toggle() {
  done.value = !done.value
  setProgress(done.value, path())
}
</script>

<template>
  <button
    class="lesson-progress"
    :class="{ done }"
    type="button"
    :aria-pressed="done"
    @click="toggle"
  >
    {{ done ? labels.done : labels.mark }}
  </button>
</template>
