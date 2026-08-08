export const PROGRESS_KEY = 'gitpath-progress'

export function pagePath(routePath: string): string {
  const stripped = routePath.replace(import.meta.env.BASE_URL, '')
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}

export function loadProgress(): string[] {
  try {
    const list = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function setProgress(done: boolean, path: string): void {
  const list = loadProgress()
  const next = done ? [...list, path] : list.filter((p) => p !== path)
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
}
