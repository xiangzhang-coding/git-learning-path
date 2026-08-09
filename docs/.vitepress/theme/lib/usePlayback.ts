import { onBeforeUnmount, onMounted, ref } from 'vue'

export function usePlayback(stepCount: () => number, intervalMs = 2400) {
  const step = ref(0)
  const playing = ref(false)
  const reduced = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  function stopTimer() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function start() {
    playing.value = true
    stopTimer()
    timer = setInterval(() => {
      step.value = (step.value + 1) % stepCount()
    }, intervalMs)
  }

  function pause() {
    playing.value = false
    stopTimer()
  }

  function toggle() {
    if (playing.value) pause()
    else start()
  }

  function replay() {
    step.value = 0
    if (!reduced.value) start()
  }

  function next() {
    step.value = (step.value + 1) % stepCount()
  }

  onMounted(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = media.matches
    media.addEventListener('change', onChange)
    if (!reduced.value) start()
  })

  function onChange(e: MediaQueryListEvent) {
    reduced.value = e.matches
    if (e.matches) pause()
    else if (!playing.value) start()
  }

  onBeforeUnmount(() => {
    stopTimer()
    window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', onChange)
  })

  return { step, playing, reduced, toggle, replay, pause, next }
}
