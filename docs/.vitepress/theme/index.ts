import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import Layout from './components/Layout.vue'
import BackToTop from './components/BackToTop.vue'
import Checklist from './components/Checklist.vue'
import Exercise from './components/Exercise.vue'
import HeadVisual from './components/HeadVisual.vue'
import LessonProgress from './components/LessonProgress.vue'
import MergeVisual from './components/MergeVisual.vue'
import Playground from './components/Playground.vue'
import RemoteFlow from './components/RemoteFlow.vue'
import VisualControls from './components/VisualControls.vue'
import ResetVisual from './components/ResetVisual.vue'
import SnapshotVisual from './components/SnapshotVisual.vue'
import StageProgress from './components/StageProgress.vue'
import TimelineRewind from './components/TimelineRewind.vue'
import ThreeAreas from './components/ThreeAreas.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('Exercise', Exercise)
    app.component('Checklist', Checklist)
    app.component('HeadVisual', HeadVisual)
    app.component('MergeVisual', MergeVisual)
    app.component('RemoteFlow', RemoteFlow)
    app.component('VisualControls', VisualControls)
    app.component('ResetVisual', ResetVisual)
    app.component('SnapshotVisual', SnapshotVisual)
    app.component('LessonProgress', LessonProgress)
    app.component('Playground', Playground)
    app.component('StageProgress', StageProgress)
    app.component('TimelineRewind', TimelineRewind)
    app.component('ThreeAreas', ThreeAreas)
  }
}
