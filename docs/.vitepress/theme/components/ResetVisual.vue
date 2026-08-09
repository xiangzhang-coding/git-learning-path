<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const t = computed(() => labels.value.resetVisual)

const modes = ['hard', 'mixed', 'soft'] as const
type Mode = (typeof modes)[number]

const modeIndex = usePlayback(() => modes.length, 3000)

function select(i: number) {
  modeIndex.step.value = i
  modeIndex.pause()
}
const mode = computed(() => modes[modeIndex.step.value])

interface Layer {
  key: string
  label: string
  pos: (m: Mode) => number
  state: (m: Mode) => string
}

const LAYERS: Layer[] = [
  { key: 'head', label: '', pos: () => 1, state: () => t.value.move },
  { key: 'index', label: '', pos: (m) => (m === 'soft' ? 2 : 1), state: (m) => (m === 'soft' ? t.value.keep : t.value.reset) },
  { key: 'work', label: '', pos: (m) => (m === 'hard' ? 1 : 2), state: (m) => (m === 'hard' ? t.value.reset : t.value.keep) }
]

const COMMITS = ['A', 'B', 'C']

const desc = computed(() => t.value[`step${mode.value[0].toUpperCase()}${mode.value.slice(1)}` as 'stepHard' | 'stepMixed' | 'stepSoft'])
</script>

<template>
  <figure class="teach-visual reset-visual">
    <figcaption class="teach-visual-title">{{ t.title }}</figcaption>
    <div class="reset-stage">
      <div
        v-for="layer in LAYERS"
        :key="layer.key"
        class="reset-layer"
        :class="layer.key"
      >
        <span class="reset-layer-label">
          {{ layer.key === 'head' ? t.head : layer.key === 'index' ? t.index : t.work }}
        </span>
        <div class="reset-track">
          <div
            v-for="c in COMMITS"
            :key="c"
            class="reset-commit"
            :class="{ target: c === 'B' }"
          >
            {{ c }}
          </div>
          <div
            class="reset-cursor"
            :style="{ left: `calc(${layer.pos(mode) * 33.333 + 16.667}% - 0.75rem)` }"
            :data-state="layer.state(mode)"
          >
            {{ layer.state(mode) }}
          </div>
        </div>
      </div>
    </div>
    <div class="teach-visual-controls">
      <button
        v-for="m in modes"
        :key="m"
        type="button"
        class="teach-visual-mode"
        :class="{ active: mode === m }"
        :aria-pressed="mode === m"
        @click="select(modes.indexOf(m))"
      >
        {{ t[m] }}
      </button>
      <span class="teach-visual-spacer"></span>
      <button type="button" class="teach-visual-btn" @click="modeIndex.toggle">
        {{ modeIndex.playing ? labels.visualPause : labels.visualPlay }}
      </button>
      <button type="button" class="teach-visual-btn" @click="modeIndex.replay">
        {{ labels.visualReplay }}
      </button>
      <button v-if="modeIndex.reduced" type="button" class="teach-visual-btn" @click="modeIndex.next">
        {{ labels.visualStep }}
      </button>
    </div>
    <p class="teach-visual-desc">{{ desc }}</p>
  </figure>
</template>
