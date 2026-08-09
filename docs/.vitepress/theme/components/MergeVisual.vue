<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'
import VisualControls from './VisualControls.vue'

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
      <div v-if="end === 'ff'" class="merge-line main-line">
        <span class="merge-node lit">A</span>
        <span class="merge-link lit"></span>
        <span class="merge-node lit">B</span>
        <span class="merge-link lit"></span>
        <span class="merge-node lit">C</span>
        <span class="merge-link lit"></span>
        <span class="merge-node lit tip">D</span>
        <span class="merge-branch-label">{{ t.main }} = {{ t.feature }}</span>
      </div>
      <template v-else>
        <div class="merge-line main-line">
          <span class="merge-node">A</span>
          <span class="merge-link"></span>
          <span class="merge-node fork">B</span>
          <span class="merge-link"></span>
          <span class="merge-node" :class="{ lit: end === 'merge' }">C</span>
          <span class="merge-link" :class="{ lit: end === 'merge' }"></span>
          <span class="merge-node tip merge-point" :class="end === 'merge' ? 'lit' : 'conflict'">
            {{ end === 'conflict' ? '✕' : 'M' }}
          </span>
          <span class="merge-branch-label">{{ t.main }}</span>
        </div>
        <div class="merge-line feature-line">
          <span class="merge-node dimmed">A</span>
          <span class="merge-link"></span>
          <span class="merge-node dimmed fork">B</span>
          <span class="merge-link"></span>
          <span class="merge-node dimmed">D</span>
          <span class="merge-link" :class="{ lit: end === 'merge' }"></span>
          <span class="merge-node dimmed tip" :class="{ lit: end === 'merge' }">E</span>
          <span class="merge-branch-label">{{ t.feature }}</span>
        </div>
      </template>
      <div v-if="end === 'conflict'" class="merge-conflict-mark">
        &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD<br />{{ t.main }}<br />=======<br />{{ t.feature }}<br />&gt;&gt;&gt;&gt;&gt;&gt;&gt;
      </div>
    </div>
    <VisualControls
      :play="labels.visualPlay"
      :pause="labels.visualPause"
      :replay="labels.visualReplay"
      :step="labels.visualStep"
      :playing="endIndex.playing.value"
      :reduced="endIndex.reduced.value"
      @toggle="endIndex.toggle"
      @replay="endIndex.replay"
      @next="endIndex.next"
    >
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
    </VisualControls>
    <p class="teach-visual-desc">{{ desc }}</p>
  </figure>
</template>
