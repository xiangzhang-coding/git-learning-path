<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { loadProgress } from '../lib/progress'
import { stageLessons, type LocaleKey } from '../lib/stages'

const props = defineProps<{
  stage?: number
  lessons?: { text: string; path: string }[]
}>()

const { localeIndex } = useData()

const items = computed(() => {
  if (props.lessons) return props.lessons
  const locale = (localeIndex.value || 'root') as LocaleKey
  const prefix = locale === 'root' ? '' : `/${locale}`
  const stage = props.stage ?? 0
  return stageLessons[stage][locale].map((lesson) => ({
    text: lesson.title,
    path: `${prefix}/stage/${stage}/${lesson.slug}`
  }))
})

const donePaths = ref<string[]>([])

onMounted(() => {
  donePaths.value = loadProgress()
})
</script>

<template>
  <ul class="stage-progress">
    <li v-for="lesson in items" :key="lesson.path">
      <a :href="withBase(lesson.path)">{{ lesson.text }}</a>
      <span v-if="donePaths.includes(lesson.path)" class="stage-progress-done">✓</span>
    </li>
  </ul>
</template>
