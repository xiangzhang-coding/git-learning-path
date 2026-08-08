<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'

const commits = [
  { msg: 'init', files: { 'readme.txt': 'hello world' } },
  { msg: 'add login', files: { 'readme.txt': 'hello world', 'login.js': 'const user = login()' } },
  {
    msg: 'fix bug',
    files: { 'readme.txt': 'hello world', 'login.js': 'const user = login(); check(user)' }
  },
  {
    msg: 'add style',
    files: {
      'readme.txt': 'hello world',
      'login.js': 'const user = login(); check(user)',
      'style.css': '.btn { color: green }'
    }
  }
]

const current = ref(commits.length - 1)
const currentCommit = computed(() => commits[current.value])

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

function fileEntries(): [string, string][] {
  return Object.entries(currentCommit.value.files)
}
</script>

<template>
  <figure class="timeline-rewind">
    <div class="timeline-track">
      <button
        v-for="(c, i) in commits"
        :key="c.msg"
        type="button"
        class="timeline-node"
        :class="{ active: i === current }"
        :aria-label="c.msg"
        :style="{ left: (i / (commits.length - 1)) * 100 + '%' }"
        @click="current = i"
      ></button>
    </div>
    <input
      v-model.number="current"
      type="range"
      :min="0"
      :max="commits.length - 1"
      step="1"
      class="timeline-slider"
      :aria-label="labels.commitLabel"
    />
    <div class="timeline-files">
      <p class="timeline-msg">
        {{ labels.commitLabel }}: <code>{{ currentCommit.msg }}</code>
      </p>
      <pre v-for="[name, content] in fileEntries()" :key="name" class="timeline-file"><code><b>{{ name }}</b>
{{ content }}</code></pre>
    </div>
  </figure>
</template>
