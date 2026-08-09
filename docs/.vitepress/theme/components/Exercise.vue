<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { checkAnswer, type Exercise } from '../lib/exercises'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import Playground from './Playground.vue'

const { frontmatter, localeIndex } = useData()
const route = useRoute()
const exercises = computed(() => (frontmatter.value.exercises ?? []) as Exercise[])

const selected = ref<Record<string, number | null>>({})
const answered = ref<Record<string, boolean>>({})
const taskPassed = ref<Record<string, boolean>>({})
const taskChecked = ref<Record<string, boolean>>({})

const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

function choose(ex: Exercise, index: number) {
  if (selected.value[ex.id] !== undefined) return
  selected.value[ex.id] = index
  answered.value[ex.id] = checkAnswer(ex, index)
}

function reviewHref(anchor: string): string {
  return route.path.replace(/\.html$/, '') + anchor
}

function isTask(ex: Exercise): boolean {
  return ex.type === 'task'
}

function onTaskComplete(id: string) {
  taskPassed.value[id] = true
  taskChecked.value[id] = true
}

function onTaskChecked(id: string, pass: boolean) {
  taskChecked.value[id] = true
  if (pass) taskPassed.value[id] = true
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
          isTask(ex)
            ? taskPassed[ex.id]
              ? 'correct'
              : taskChecked[ex.id]
                ? 'wrong'
                : 'unanswered'
            : selected[ex.id] === undefined
              ? 'unanswered'
              : answered[ex.id]
                ? 'correct'
                : 'wrong'
        "
      >
        <p class="exercise-question">
          <span class="exercise-index">{{ i + 1 }}.</span>
          {{ ex.question }}
        </p>

          <div v-if="isTask(ex)" class="exercise-task">
            <Playground
              :scenario="ex.scenario!"
              :goal="ex.goal"
              :checks="ex.checks"
              @complete="onTaskComplete(ex.id)"
              @checked="(pass: boolean) => onTaskChecked(ex.id, pass)"
            />
            <div
              v-if="taskPassed[ex.id]"
              class="exercise-feedback is-correct"
              data-task-passed
            >
              <span class="feedback-mark">{{ labels.taskPassed }}</span>
              <p class="feedback-explanation">{{ ex.explanation }}</p>
              <a class="feedback-anchor" :href="reviewHref(ex.anchor)">{{ labels.review }}</a>
            </div>
            <div v-else-if="taskChecked[ex.id]" class="exercise-feedback is-wrong">
              <span class="feedback-mark">{{ labels.taskNotDone }}</span>
              <a class="feedback-anchor" :href="reviewHref(ex.anchor)">{{ labels.review }}</a>
            </div>
          </div>

        <template v-else>
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
        </template>
      </li>
    </ol>
  </div>
</template>
