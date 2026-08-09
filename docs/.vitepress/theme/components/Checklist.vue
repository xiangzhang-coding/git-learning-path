<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'

const props = defineProps<{ tasks: { text: string; link?: string }[] }>()

const KEY = 'gitpath-checklist-stage5'
const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

const done = ref<boolean[]>([])

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    done.value = props.tasks.map((_, i) => Array.isArray(raw) && raw[i] === true)
  } catch {
    done.value = props.tasks.map(() => false)
  }
}

function toggle(i: number) {
  done.value[i] = !done.value[i]
  try {
    localStorage.setItem(KEY, JSON.stringify(done.value))
  } catch {
    // storage unavailable (private mode, quotas)
  }
}

function reset() {
  done.value = props.tasks.map(() => false)
  try {
    localStorage.removeItem(KEY)
  } catch {
    // storage unavailable (private mode, quotas)
  }
}

onMounted(load)
</script>

<template>
  <div class="checklist">
    <ul class="checklist-list">
      <li v-for="(task, i) in props.tasks" :key="i" :class="{ done: done[i] }">
        <label>
          <input type="checkbox" :checked="done[i]" @change="toggle(i)" />
          <span class="checklist-text">
            <a v-if="task.link" :href="task.link">{{ task.text }}</a>
            <template v-else>{{ task.text }}</template>
          </span>
        </label>
      </li>
    </ul>
    <button v-if="done.some(Boolean)" type="button" class="checklist-reset" @click="reset">
      {{ labels.checklistReset }}
    </button>
  </div>
</template>
