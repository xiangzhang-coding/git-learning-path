<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { loadProgress } from '../lib/progress'

const props = defineProps<{ lessons: { text: string; path: string }[] }>()

const donePaths = ref<string[]>([])

onMounted(() => {
  donePaths.value = loadProgress()
})
</script>

<template>
  <ul class="stage-progress">
    <li v-for="lesson in props.lessons" :key="lesson.path">
      <a :href="withBase(lesson.path)">{{ lesson.text }}</a>
      <span v-if="donePaths.includes(lesson.path)" class="stage-progress-done">✓</span>
    </li>
  </ul>
</template>
