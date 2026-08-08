import fs from 'node:fs'
import path from 'node:path'
import { load as loadYaml } from 'js-yaml'

export const DOCS_ROOT = path.join(import.meta.dirname, '..', 'docs')

export function frontmatterOf(filePath: string): Record<string, unknown> {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  return loadYaml(match[1]) as Record<string, unknown>
}

export function headingTexts(filePath: string): string[] {
  const raw = fs.readFileSync(filePath, 'utf8')
  return raw
    .split(/\r?\n/)
    .filter((line) => /^#{1,6}\s+/.test(line))
    .map((line) => line.replace(/^#{1,6}\s+/, '').replace(/[#\s]+$/, '').trim())
}

export function markdownFilesUnder(dir: string): string[] {
  const out: string[] = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...markdownFilesUnder(full))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

export const LOCALES = ['zh', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru']

export function relativeUnder(dir: string, file: string): string {
  return path.relative(dir, file)
}
