import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { DOCS_ROOT, LOCALES, markdownFilesUnder, relativeUnder } from './helpers'

describe('locale file parity', () => {
  const zhFiles = markdownFilesUnder(path.join(DOCS_ROOT, 'zh'))

  it('every zh content file exists in all locales and the root locale', () => {
    const paths = zhFiles.map((f) => relativeUnder(path.join(DOCS_ROOT, 'zh'), f))
    for (const rel of paths) {
      for (const locale of LOCALES) {
        expect(fs.existsSync(path.join(DOCS_ROOT, locale, rel)), `${locale}/${rel}`).toBe(true)
      }
      expect(fs.existsSync(path.join(DOCS_ROOT, rel)), `root/${rel}`).toBe(true)
    }
  })

  it('no locale has files the zh locale lacks', () => {
    for (const locale of LOCALES) {
      const files = markdownFilesUnder(path.join(DOCS_ROOT, locale))
      for (const f of files) {
        const rel = relativeUnder(path.join(DOCS_ROOT, locale), f)
        expect(
          fs.existsSync(path.join(DOCS_ROOT, 'zh', rel)),
          `zh/${rel} (from ${locale})`
        ).toBe(true)
      }
    }
  })

  it('every locale ships a glossary and a stage 0 index', () => {
    for (const locale of LOCALES) {
      expect(fs.existsSync(path.join(DOCS_ROOT, locale, 'glossary.md')), `${locale}/glossary.md`).toBe(true)
      expect(fs.existsSync(path.join(DOCS_ROOT, locale, 'stage', '0', 'index.md')), `${locale}/stage/0/index.md`).toBe(true)
    }
    expect(fs.existsSync(path.join(DOCS_ROOT, 'glossary.md'))).toBe(true)
    expect(fs.existsSync(path.join(DOCS_ROOT, 'stage', '0', 'index.md'))).toBe(true)
  })
})
