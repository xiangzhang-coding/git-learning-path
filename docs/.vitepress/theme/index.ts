import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import Layout from './components/Layout.vue'
import Exercise from './components/Exercise.vue'
import LessonProgress from './components/LessonProgress.vue'
import StageProgress from './components/StageProgress.vue'
import TimelineRewind from './components/TimelineRewind.vue'
import ThreeAreas from './components/ThreeAreas.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('Exercise', Exercise)
    app.component('LessonProgress', LessonProgress)
    app.component('StageProgress', StageProgress)
    app.component('TimelineRewind', TimelineRewind)
    app.component('ThreeAreas', ThreeAreas)
  }
}
