<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'
import { usePlayback } from '../lib/usePlayback'

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))
const t = computed(() => labels.value.snapshotVisual)

interface CommitRow {
  id: number
  files: Record<string, string>
}

const COMMITS: CommitRow[] = [
  { id: 1, files: { 'a.txt': '1', 'b.txt': '1', 'c.txt': '1' } },
  { id: 2, files: { 'a.txt': '1', 'b.txt': '2', 'c.txt': '1' } },
  { id: 3, files: { 'a.txt': '1', 'b.txt': '2', 'c.txt': '3' } }
]

const view = usePlayback(() => COMMITS.length, 2600)
const commit = computed(() => COMMITS[view.step.value])
const mode = ref<'snapshot' | 'diff'>('snapshot')

const fileRows = computed(() => {
  const prev = view.step.value === 0 ? null : COMMITS[view.step.value - 1]
  return Object.keys(commit.value.files).map((name) => ({
    name,
    changed: prev ? prev.files[name] !== commit.value.files[name] : true
  }))
})

</script>

<template>
  <figure class="teach-visual snapshot-visual">
    <figcaption class="teach-visual-title">{{ t.title }}</figcaption>
    <div class="snapshot-stage">
      <div class="snapshot-commit" v-for="c in COMMITS" :key="c.id" :class="{ current: c.id === commit.id }">
        <span class="snapshot-commit-label">{{ t.commit }} {{ c.id }}</span>
        <div class="snapshot-files">
          <span v-for="(content, name) in c.files" :key="name" class="snapshot-file">{{ name }}</span>
        </div>
      </div>
      <div class="snapshot-detail">
        <div class="snapshot-mode-toggle">
          <button
            type="button"
            class="teach-visual-mode"
            :class="{ active: mode === 'snapshot' }"
            @click="mode = 'snapshot'"
          >
            {{ t.snapshot }}
          </button>
          <button
            type="button"
            class="teach-visual-mode"
            :class="{ active: mode === 'diff' }"
            @click="mode = 'diff'"
          >
            {{ t.diff }}
          </button>
        </div>
        <div v-if="mode === 'snapshot'" class="snapshot-rows">
          <span v-for="f in fileRows" :key="f.name" class="snapshot-row">{{ f.name }}</span>
        </div>
        <div v-else class="snapshot-rows">
          <span v-for="f in fileRows" :key="f.name" class="snapshot-row" :class="{ changed: f.changed }">
            {{ f.changed ? `+ ${f.name}` : `  ${f.name}` }}
          </span>
        </div>
      </div>
    </div>
    <div class="teach-visual-controls">
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
    <p class="teach-visual-desc">{{ mode === 'snapshot' ? t.snapDesc : t.diffDesc }}</p>
  </figure>
</template>
