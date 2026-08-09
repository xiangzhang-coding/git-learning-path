<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'
import VisualControls from './VisualControls.vue'

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const t = computed(() => labels.value.headVisual)

const BRANCHES = [
  { name: 'main', commits: ['A', 'B'] },
  { name: 'feature', commits: ['C', 'D'] }
]

const view = usePlayback(() => BRANCHES.length, 3000)

function select(i: number) {
  view.step.value = i
  view.pause()
}
const current = computed(() => BRANCHES[view.step.value])
</script>

<template>
  <figure class="teach-visual head-visual">
    <figcaption class="teach-visual-title">{{ t.title }}</figcaption>
    <div class="head-stage">
      <div
        v-for="b in BRANCHES"
        :key="b.name"
        class="head-branch"
        :class="{ current: b.name === current.name }"
      >
        <span class="head-branch-name">{{ b.name }}</span>
        <div class="head-line">
          <span v-for="c in b.commits" :key="c" class="head-commit">{{ c }}</span>
        </div>
      </div>
      <div class="head-pointer" :style="{ top: `calc(${view.step.value * (100 / BRANCHES.length)}% + 1.1rem)` }">
        {{ t.head }} →
      </div>
    </div>
    <VisualControls
      :play="labels.visualPlay"
      :pause="labels.visualPause"
      :replay="labels.visualReplay"
      :step="labels.visualStep"
      :playing="view.playing.value"
      :reduced="view.reduced.value"
      @toggle="view.toggle"
      @replay="view.replay"
      @next="view.next"
    >
      <button
        v-for="(b, i) in BRANCHES"
        :key="b.name"
        type="button"
        class="teach-visual-mode"
        :class="{ active: i === view.step.value }"
        :aria-pressed="i === view.step.value"
        @click="select(i)"
      >
        {{ t.switch }} {{ b.name }}
      </button>
    </VisualControls>
    <p class="teach-visual-desc">{{ t.switchDesc }}</p>
  </figure>
</template>
