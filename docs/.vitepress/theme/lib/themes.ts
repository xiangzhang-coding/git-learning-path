export const DARK_THEMES = ['dark', 'terminal', 'retro'] as const

export type ThemeName = 'system' | 'light' | (typeof DARK_THEMES)[number]

export function isDarkTheme(theme: string): boolean {
  return (DARK_THEMES as readonly string[]).includes(theme)
}
