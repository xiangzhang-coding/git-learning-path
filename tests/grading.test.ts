import { describe, expect, it } from 'vitest'
import { checkAnswer, validateExercises, type Exercise } from '../docs/.vitepress/theme/lib/exercises'

const valid: Exercise = {
  id: 'e1',
  question: 'q?',
  options: ['a', 'b'],
  correct: 1,
  explanation: 'because',
  anchor: '#section'
}

describe('checkAnswer', () => {
  it('returns true for the correct index', () => {
    expect(checkAnswer(valid, 1)).toBe(true)
  })

  it('returns false for a wrong index', () => {
    expect(checkAnswer(valid, 0)).toBe(false)
  })
})

describe('validateExercises', () => {
  it('accepts a valid exercise list', () => {
    expect(validateExercises([valid])).toEqual([])
  })

  it('rejects a non-array payload', () => {
    expect(validateExercises(null).length).toBeGreaterThan(0)
  })

  it('rejects duplicate ids', () => {
    const problems = validateExercises([valid, { ...valid }])
    expect(problems.some((p) => p.includes('duplicate'))).toBe(true)
  })

  it('rejects a correct index outside the option range', () => {
    const problems = validateExercises([{ ...valid, correct: 5 }])
    expect(problems.some((p) => p.includes('correct'))).toBe(true)
  })

  it('rejects fewer than two options', () => {
    const problems = validateExercises([{ ...valid, options: ['only'] }])
    expect(problems.some((p) => p.includes('options'))).toBe(true)
  })

  it('rejects an anchor that does not start with #', () => {
    const problems = validateExercises([{ ...valid, anchor: 'section' }])
    expect(problems.some((p) => p.includes('anchor'))).toBe(true)
  })
})
