<script setup lang="ts">
defineProps<{
  play: string
  pause: string
  replay: string
  step: string
  playing: boolean
  reduced: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
  (e: 'replay'): void
  (e: 'next'): void
}>()
</script>

<template>
  <div class="teach-visual-controls">
    <slot />
    <span class="teach-visual-spacer"></span>
    <button type="button" class="teach-visual-btn" @click="$emit('toggle')">
      {{ playing ? pause : play }}
    </button>
    <button type="button" class="teach-visual-btn" @click="$emit('replay')">
      {{ replay }}
    </button>
    <button v-if="reduced" type="button" class="teach-visual-btn" @click="$emit('next')">
      {{ step }}
    </button>
  </div>
</template>
