<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'

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
    <div class="teach-visual-controls">
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
      <span class="teach-visual-spacer"></span>
      <button type="button" class="teach-visual-btn" @click="view.toggle">
        {{ view.playing ? labels.visualPause : labels.visualPlay }}
      </button>
      <button type="button" class="teach-visual-btn" @click="view.replay">
        {{ labels.visualReplay }}
      </button>
      <button v-if="view.reduced" type="button" class="teach-visual-btn" @click="view.next">
        {{ labels.visualStep }}
      </button>
    </div>
    <p class="teach-visual-desc">{{ t.switchDesc }}</p>
  </figure>
</template>
