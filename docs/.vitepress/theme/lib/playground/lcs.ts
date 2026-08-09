export const MAX_DIFF_CELLS = 4_000_000

export function lcsTable(a: string[], b: string[]): number[][] | null {
  const n = a.length
  const m = b.length
  if (n * m > MAX_DIFF_CELLS) return null
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  return dp
}
