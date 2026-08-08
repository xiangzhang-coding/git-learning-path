<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { Session } from '../lib/playground/scenarios'
import { runChecks, sessionSnapshot } from '../lib/playground/checks'
import { runGit } from '../lib/playground/commands'
import type { ScenarioName } from '../lib/playground/scenarios'
import type { Check } from '../lib/playground/checks'
import type { GraphCommit } from '../lib/playground/graph'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'

const props = defineProps<{
  scenario: ScenarioName
  goal?: string
  checks?: Check[]
}>()

const emit = defineEmits<{ complete: []; checked: [pass: boolean] }>()

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

type PlaygroundSession = Awaited<ReturnType<typeof Session.create>>

let session: PlaygroundSession | null = null
const input = ref('')
const output = ref<{ text: string; kind: string; cmd?: string }[]>([])
const history = ref<string[]>([])
const historyIndex = ref(-1)
const branch = ref<string | null>(null)
const commitCount = ref(0)
const dirtyCount = ref(0)
const files = ref<string[]>([])
const graph = ref<GraphCommit[]>([])
const checking = ref(false)
const checkResult = ref<'pass' | 'fail' | null>(null)
const checkDetail = ref('')
const termEl = ref<HTMLElement | null>(null)

const QUICK: Record<ScenarioName, string[]> = {
  init: ['git status', 'git add .', 'git log --oneline', 'git diff'],
  'add-commit': ['git status', 'git add .', 'git log --oneline', 'git diff'],
  history: ['git status', 'git log --oneline', 'git diff', 'git diff --staged'],
  local: ['git status', 'git add .', 'git log --oneline', 'git restore hello.txt'],
  branching: ['git branch', 'git log --oneline', 'git switch -c feature', 'git switch main'],
  'merge-ff': ['git status', 'git branch', 'git log --oneline', 'git merge feature'],
  merge: ['git status', 'git branch', 'git log --oneline', 'git merge feature'],
  conflict: ['git status', 'git branch', 'git log --oneline', 'git merge feature']
}

function laneCells(row: GraphCommit): { char: string; isDot: boolean }[] {
  const cells: { char: string; isDot: boolean }[] = []
  for (let i = 0; i < row.laneCount; i++) {
    const isDot = i === row.lane
    const connected = row.mergeConnections.some(
      (c) => i > Math.min(c.from, c.to) && i < Math.max(c.from, c.to)
    )
    const isEndpoint = row.mergeConnections.some((c) => i === c.from || i === c.to)
    if (isDot) cells.push({ char: '●', isDot: true })
    else if (connected) cells.push({ char: '─', isDot: false })
    else if (isEndpoint) cells.push({ char: '─', isDot: false })
    else cells.push({ char: ' ', isDot: false })
  }
  return cells
}

async function refresh() {
  if (!session) return
  const snap = await sessionSnapshot(session)
  branch.value = snap.branch
  commitCount.value = snap.commits.length
  dirtyCount.value = snap.dirty
  files.value = snap.files
  graph.value = snap.graph
}

function outputKind(text: string): string {
  if (text.startsWith('fatal')) return 'err'
  if (text.startsWith('diff --git') || text.startsWith('@@') || text.startsWith('--- a') || text.startsWith('+++ b')) return 'meta'
  if (text.startsWith('+') && !text.startsWith('+++')) return 'add'
  if (text.startsWith('-') && !text.startsWith('---')) return 'del'
  if (text.startsWith('On branch') || text.includes('working tree clean')) return 'branch'
  if (text.includes('nothing to commit')) return 'clean'
  return 'out'
}

async function run(raw: string) {
  const commands = raw
    .split('&&')
    .map((c) => c.trim())
    .filter(Boolean)
  if (!commands.length || !session) return
  for (const cmd of commands) {
    output.value.push({ text: `$ ${cmd}`, kind: 'cmd' })
    history.value.push(cmd)
    historyIndex.value = -1
    const result = await runGit(session, cmd)
    for (const line of result.out) {
      output.value.push({ text: line, kind: outputKind(line) })
    }
    if (result.changed) await refresh()
    if (props.checks && checkResult.value !== 'pass') {
      const res = await runChecks(session, props.checks)
      checkResult.value = res.pass ? 'pass' : 'fail'
      checkDetail.value = res.detail
      emit('checked', res.pass)
      if (res.pass) emit('complete')
    }
  }
  input.value = ''
  await nextTick()
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      input.value = history.value[history.value.length - 1 - historyIndex.value]
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIndex.value > 0) {
      historyIndex.value--
      input.value = history.value[history.value.length - 1 - historyIndex.value]
    } else {
      historyIndex.value = -1
      input.value = ''
    }
  }
}

async function reset() {
  if (!session) return
  await session.reset(props.scenario)
  output.value = []
  checkResult.value = null
  checkDetail.value = ''
  await refresh()
}

async function checkNow() {
  if (!session || !props.checks) return
  checking.value = true
  const res = await runChecks(session, props.checks)
  checkResult.value = res.pass ? 'pass' : 'fail'
  checkDetail.value = res.detail
  emit('checked', res.pass)
  if (res.pass) emit('complete')
  checking.value = false
}

onMounted(async () => {
  session = await Session.create(props.scenario)
  await refresh()
  output.value.push({ text: `$ git status`, kind: 'cmd' })
  const r = await runGit(session, 'git status')
  for (const line of r.out) output.value.push({ text: line, kind: outputKind(line) })
})

onBeforeUnmount(() => {
  session = null
})

watch(
  () => props.scenario,
  () => {
    if (session) reset()
  }
)
</script>

<template>
  <div class="playground">
    <div class="playground-toolbar">
      <span class="playground-branch">main: {{ branch ?? '-' }}</span>
      <span class="playground-stat" :class="{ dirty: dirtyCount > 0 }">
        {{ labels.commitsLabel }} {{ commitCount }} · {{ labels.dirtyLabel }} {{ dirtyCount }}
      </span>
      <button type="button" class="playground-reset" @click="reset">{{ labels.reset }}</button>
    </div>

    <div v-if="goal" class="playground-goal">
      <strong>{{ labels.taskLabel }}:</strong>
      {{ goal }}
      <button
        v-if="checks && checks.length"
        type="button"
        class="playground-check"
        :disabled="checking"
        @click="checkNow"
      >
        {{ labels.checkLabel }}
      </button>
      <p v-if="checkResult === 'pass'" class="playground-check-result pass">
        {{ labels.taskPassed }}
      </p>
      <p v-else-if="checkResult === 'fail'" class="playground-check-result fail">
        {{ labels.taskNotDone }}<span v-if="checkDetail"> — {{ checkDetail }}</span>
      </p>
    </div>

    <div ref="termEl" class="playground-term" role="log">
      <p v-for="(line, i) in output" :key="i" class="playground-line" :class="`is-${line.kind}`">
        {{ line.text }}
      </p>
    </div>

    <div class="playground-input-row">
      <span class="playground-prompt">$</span>
      <input
        v-model="input"
        class="playground-input"
        :placeholder="labels.typeCommandLabel"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        @keydown.enter="run(input)"
        @keydown="onKeydown"
      />
    </div>

    <div class="playground-quick">
      <button v-for="q in QUICK[props.scenario]" :key="q" type="button" @click="run(q)">{{ q }}</button>
    </div>

    <div class="playground-files">
      <span class="playground-files-label">{{ labels.filesLabel }}:</span>
      <code v-for="f in files" :key="f">{{ f }}</code>
    </div>

    <div v-if="graph.length" class="playground-graph" role="list">
      <div
        v-for="(c, i) in graph"
        :key="c.oid"
        class="playground-graph-row"
        :class="{ head: i === 0 && branch && c.branches.includes(branch) }"
        role="listitem"
      >
        <span class="playground-graph-lanes" aria-hidden="true">
          <span
            v-for="(cell, k) in laneCells(c)"
            :key="k"
            class="playground-graph-cell"
            :class="cell.isDot ? 'is-dot' : ''"
          >{{ cell.char }}</span>
        </span>
        <span class="playground-graph-sha">{{ c.short }}</span>
        <span class="playground-graph-msg">{{ c.message }}</span>
        <span
          v-for="b in c.branches"
          :key="b"
          class="playground-graph-tag"
          :class="{ 'is-head': branch === b }"
        >{{ b }}</span>
      </div>
    </div>
  </div>
</template>
