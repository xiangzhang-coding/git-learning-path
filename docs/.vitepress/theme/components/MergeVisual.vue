<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const t = computed(() => labels.value.mergeVisual)

const ends = ['ff', 'merge', 'conflict'] as const
type End = (typeof ends)[number]

const endIndex = usePlayback(() => ends.length, 3200)
const end = computed(() => ends[endIndex.step.value])

const desc = computed(() => t.value[`${end.value}Desc` as 'ffDesc' | 'mergeDesc' | 'conflictDesc'])

function select(i: number) {
  endIndex.step.value = i
  endIndex.pause()
}
</script>

<template>
  <figure class="teach-visual merge-visual">
    <figcaption class="teach-visual-title">{{ t.title }}</figcaption>
    <div class="merge-stage" :data-end="end">
      <div class="merge-line main-line">
        <span class="merge-node" :class="{ lit: end === 'ff', dimmed: end === 'conflict' }">A</span>
        <span class="merge-link"></span>
        <span class="merge-node" :class="{ lit: end === 'ff', dimmed: end === 'conflict' }">B</span>
        <span class="merge-link" :class="{ lit: end === 'ff' }"></span>
        <span class="merge-node tip" :class="{ lit: end === 'ff' }">C</span>
        <span class="merge-branch-label">{{ t.main }}</span>
      </div>
      <div class="merge-line feature-line">
        <span class="merge-node dimmed">A</span>
        <span class="merge-link"></span>
        <span class="merge-node" :class="{ conflict: end === 'conflict', lit: end === 'merge' }">
          {{ end === 'conflict' ? '✕' : 'C' }}
        </span>
        <span class="merge-link" :class="{ lit: end === 'merge' }"></span>
        <span class="merge-node merge-point" :class="{ lit: end === 'merge' }">M</span>
        <span class="merge-branch-label">{{ t.feature }}</span>
      </div>
      <div v-if="end === 'conflict'" class="merge-conflict-mark">
        &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD<br />{{ t.main }}<br />=======<br />{{ t.feature }}<br />&gt;&gt;&gt;&gt;&gt;&gt;&gt;
      </div>
    </div>
    <div class="teach-visual-controls">
      <button
        v-for="(e, i) in ends"
        :key="e"
        type="button"
        class="teach-visual-mode"
        :class="{ active: end === e }"
        :aria-pressed="end === e"
        @click="select(i)"
      >
        {{ t[e] }}
      </button>
      <span class="teach-visual-spacer"></span>
      <button type="button" class="teach-visual-btn" @click="endIndex.toggle">
        {{ endIndex.playing ? labels.visualPause : labels.visualPlay }}
      </button>
      <button type="button" class="teach-visual-btn" @click="endIndex.replay">
        {{ labels.visualReplay }}
      </button>
      <button v-if="endIndex.reduced" type="button" class="teach-visual-btn" @click="endIndex.next">
        {{ labels.visualStep }}
      </button>
    </div>
    <p class="teach-visual-desc">{{ desc }}</p>
  </figure>
</template>
