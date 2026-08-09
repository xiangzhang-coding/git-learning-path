<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const t = computed(() => labels.value.remoteVisual)

const acts = ['push', 'pull', 'fetch'] as const
type Act = (typeof acts)[number]

const actIndex = usePlayback(() => acts.length, 3200)

function select(i: number) {
  actIndex.step.value = i
  actIndex.pause()
}
const act = computed(() => acts[actIndex.step.value])

const desc = computed(() => t.value[`${act.value}Desc` as 'pushDesc' | 'pullDesc' | 'fetchDesc'])
const direction = computed(() => (act.value === 'push' ? 'to-remote' : 'to-local'))
const moves = computed(() => act.value !== 'fetch')
</script>

<template>
  <figure class="teach-visual remote-visual">
    <figcaption class="teach-visual-title">{{ t.title }}</figcaption>
    <div class="remote-stage">
      <div class="remote-repo local">
        <span class="remote-repo-name">{{ t.local }}</span>
        <div class="remote-commits">
          <span class="remote-commit" :class="{ moving: direction === 'to-remote' && moves }">c1</span>
          <span class="remote-commit" :class="{ moving: direction === 'to-remote' && moves }">c2</span>
          <span class="remote-tracking" :class="{ fetching: act === 'fetch' }">{{ t.tracking }}</span>
        </div>
      </div>
      <div class="remote-gap" :class="direction">
        <span class="remote-arrow" v-if="moves">{{ direction === 'to-remote' ? '→' : '←' }}</span>
        <span class="remote-arrow" v-else>⇣</span>
      </div>
      <div class="remote-repo origin">
        <span class="remote-repo-name">{{ t.remote }}</span>
        <div class="remote-commits">
          <span class="remote-commit" :class="{ moving: direction === 'to-local' && moves }">c1</span>
        </div>
      </div>
    </div>
    <div class="teach-visual-controls">
      <button
        v-for="a in acts"
        :key="a"
        type="button"
        class="teach-visual-mode"
        :class="{ active: act === a }"
        :aria-pressed="act === a"
        @click="select(acts.indexOf(a))"
      >
        {{ t[a] }}
      </button>
      <span class="teach-visual-spacer"></span>
      <button type="button" class="teach-visual-btn" @click="actIndex.toggle">
        {{ actIndex.playing ? labels.visualPause : labels.visualPlay }}
      </button>
      <button type="button" class="teach-visual-btn" @click="actIndex.replay">
        {{ labels.visualReplay }}
      </button>
      <button v-if="actIndex.reduced" type="button" class="teach-visual-btn" @click="actIndex.next">
        {{ labels.visualStep }}
      </button>
    </div>
    <p class="teach-visual-desc">{{ desc }}</p>
  </figure>
</template>
