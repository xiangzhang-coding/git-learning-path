import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { validateExercises } from '../docs/.vitepress/theme/lib/exercises'
import { DOCS_ROOT, LOCALES, frontmatterOf, headingTexts, markdownFilesUnder } from './helpers'

const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g
const rControl = /[\u0000-\u001f]/g

function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}

function allLessonFiles(): string[] {
  const out: string[] = []
  for (const locale of LOCALES) {
    out.push(...markdownFilesUnder(path.join(DOCS_ROOT, locale, 'stage')).filter((f) => !f.endsWith('/index.md')))
  }
  out.push(...markdownFilesUnder(path.join(DOCS_ROOT, 'stage')).filter((f) => !f.endsWith('/index.md')))
  return out
}

describe('exercise data across all locales', () => {
  for (const lesson of allLessonFiles()) {
    const rel = path.relative(DOCS_ROOT, lesson)

    it(`${rel} has valid exercises`, () => {
      const fm = frontmatterOf(lesson)
      expect(validateExercises(fm.exercises), rel).toEqual([])
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
