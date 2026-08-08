<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { checkAnswer, type Exercise } from '../lib/exercises'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'

const { frontmatter, localeIndex } = useData()
const route = useRoute()
const exercises = computed(() => (frontmatter.value.exercises ?? []) as Exercise[])

const selected = ref<Record<string, number | null>>({})
const answered = ref<Record<string, boolean>>({})

const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

function choose(ex: Exercise, index: number) {
  if (selected.value[ex.id] !== undefined) return
  selected.value[ex.id] = index
  answered.value[ex.id] = checkAnswer(ex, index)
}

function reviewHref(anchor: string): string {
  return route.path.replace(/\.html$/, '') + anchor
}
</script>

<template>
  <div v-if="exercises.length" class="exercises">
    <ol class="exercise-list">
      <li
        v-for="(ex, i) in exercises"
        :key="ex.id"
        class="exercise"
        :data-state="
          selected[ex.id] === undefined ? 'unanswered' : answered[ex.id] ? 'correct' : 'wrong'
        "
      >
        <p class="exercise-question">
          <span class="exercise-index">{{ i + 1 }}.</span>
          {{ ex.question }}
        </p>
        <div class="exercise-options">
          <button
            v-for="(opt, j) in ex.options"
            :key="j"
            type="button"
            class="exercise-option"
            :class="{
              'is-correct': selected[ex.id] === j && answered[ex.id],
              'is-wrong': selected[ex.id] === j && !answered[ex.id],
              'is-dimmed': selected[ex.id] !== undefined && selected[ex.id] !== j
            }"
            :disabled="selected[ex.id] !== undefined"
            @click="choose(ex, j)"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + j) }}</span>
            {{ opt }}
          </button>
        </div>
        <div
          v-if="selected[ex.id] !== undefined"
          class="exercise-feedback"
          :class="answered[ex.id] ? 'is-correct' : 'is-wrong'"
        >
          <span class="feedback-mark">{{ answered[ex.id] ? labels.correct : labels.wrong }}</span>
          <p class="feedback-explanation">{{ ex.explanation }}</p>
          <a class="feedback-anchor" :href="reviewHref(ex.anchor)">{{ labels.review }}</a>
        </div>
      </li>
    </ol>
  </div>
</template>
