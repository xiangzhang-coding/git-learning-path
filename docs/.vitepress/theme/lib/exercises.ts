export interface Exercise {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
  anchor: string
}

export function checkAnswer(exercise: Exercise, selected: number): boolean {
  return selected === exercise.correct
}

export function validateExercises(exercises: unknown): string[] {
  const problems: string[] = []
  if (!Array.isArray(exercises)) {
    return ['exercises must be an array']
  }
  const ids = new Set<string>()
  exercises.forEach((raw, i) => {
    if (!raw || typeof raw !== 'object') {
      problems.push(`exercise[${i}] is not an object`)
      return
    }
    const e = raw as Partial<Exercise>
    const label = typeof e.id === 'string' && e.id ? `"${e.id}"` : `[${i}]`
    if (typeof e.id !== 'string' || !e.id.trim()) {
      problems.push(`${label}: id missing`)
    } else if (ids.has(e.id)) {
      problems.push(`${label}: duplicate id`)
    } else {
      ids.add(e.id)
    }
    if (typeof e.question !== 'string' || !e.question.trim()) {
      problems.push(`${label}: question missing`)
    }
    if (!Array.isArray(e.options) || e.options.length < 2 || !e.options.every((o) => typeof o === 'string' && o.trim())) {
      problems.push(`${label}: options must contain at least 2 non-empty strings`)
    }
    const optionCount = Array.isArray(e.options) ? e.options.length : 0
    if (typeof e.correct !== 'number' || !Number.isInteger(e.correct) || e.correct < 0 || e.correct >= optionCount) {
      problems.push(`${label}: correct must be a valid option index`)
    }
    if (typeof e.explanation !== 'string' || !e.explanation.trim()) {
      problems.push(`${label}: explanation missing`)
    }
    if (typeof e.anchor !== 'string' || !e.anchor.startsWith('#')) {
      problems.push(`${label}: anchor must start with "#"`)
    }
  })
  return problems
}
