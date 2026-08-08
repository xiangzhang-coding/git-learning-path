<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { labelsFor, langOfLocaleIndex } from '../lib/labels'

type Zone = 'tree' | 'staging' | 'repo'

const zones: Zone[] = ['tree', 'staging', 'repo']
const zone = ref<Zone>('tree')
const dirty = ref(true)

const { localeIndex } = useData()
const labels = computed(() => labelsFor(langOfLocaleIndex(localeIndex.value)))

function edit() {
  if (zone.value === 'tree') dirty.value = true
}

function add() {
  if (zone.value === 'tree' && dirty.value) {
    zone.value = 'staging'
    dirty.value = false
  }
}

function commit() {
  if (zone.value === 'staging') zone.value = 'repo'
}

function reset() {
  zone.value = 'tree'
  dirty.value = true
}
</script>

<template>
  <div class="three-areas">
    <div class="areas-row">
      <div
        v-for="z in zones"
        :key="z"
        class="area"
        :class="[z, { active: zone === z }]"
      >
        <span class="area-name">{{ z }}</span>
        <div v-if="zone === z" class="area-chip" :class="{ dirty }">hello.txt</div>
      </div>
    </div>
    <div class="areas-actions">
      <button type="button" :disabled="zone !== 'tree'" @click="edit">{{ labels.edit }}</button>
      <button type="button" :disabled="zone !== 'tree' || !dirty" @click="add">{{ labels.add }}</button>
      <button type="button" :disabled="zone !== 'staging'" @click="commit">{{ labels.commit }}</button>
      <button type="button" @click="reset">{{ labels.reset }}</button>
    </div>
    <p v-if="zone === 'repo'" class="areas-note">{{ labels.saved }}</p>
  </div>
</template>
