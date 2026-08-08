import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { validateExercises } from '../docs/.vitepress/theme/lib/exercises'
import { DOCS_ROOT, LOCALES, frontmatterOf, headingTexts, markdownFilesUnder } from './helpers'

function lessonFiles(): string[] {
  return markdownFilesUnder(path.join(DOCS_ROOT, 'zh', 'stage')).filter(
    (f) => !f.endsWith('/index.md')
  )
}

describe('exercise data across all locales', () => {
  for (const lesson of lessonFiles()) {
    const rel = path.relative(path.join(DOCS_ROOT, 'zh'), lesson)

    it(`${rel} has valid exercises in every locale`, () => {
      const localesToCheck = ['zh', ...LOCALES.filter((l) => l !== 'zh')]
      for (const locale of localesToCheck) {
        const dir = locale === 'zh' ? path.join(DOCS_ROOT, 'zh') : path.join(DOCS_ROOT, locale)
        const file = path.join(dir, rel)
        const fm = frontmatterOf(file)
        expect(validateExercises(fm.exercises), `${locale}/${rel}`).toEqual([])
      }
    })

    it(`${rel} exercises link anchors to real headings in the same lesson`, () => {
      const fm = frontmatterOf(lesson)
      if (!Array.isArray(fm.exercises)) return
      const headings = headingTexts(lesson).map(slugify)
      for (const raw of fm.exercises) {
        const anchor = (raw as { anchor?: string }).anchor ?? ''
        const text = slugify(anchor.replace(/^#/, ''))
        expect(headings, `anchor "${anchor}" must match a heading in ${rel}`).toContain(text)
      }
    })
  }
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}
