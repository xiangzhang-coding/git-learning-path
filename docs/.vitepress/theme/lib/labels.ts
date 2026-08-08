export function langOfLocaleIndex(localeIndex: string): string {
  return localeIndex === 'root' ? 'en' : localeIndex
}

export interface Labels {
  correct: string
  wrong: string
  review: string
  done: string
  mark: string
  commitLabel: string
  filesLabel: string
  edit: string
  add: string
  commit: string
  reset: string
  saved: string
}

export const LABELS: Record<string, Labels> = {
  en: {
    correct: 'Correct',
    wrong: 'Wrong',
    review: 'Review this section →',
    done: 'Lesson complete ✓',
    mark: 'Mark lesson complete',
    commitLabel: 'commit',
    filesLabel: 'Files',
    edit: 'Edit file',
    add: 'git add',
    commit: 'git commit',
    reset: 'Reset',
    saved: 'Saved as a commit ✓'
  },
  zh: {
    correct: '正确',
    wrong: '错误',
    review: '复习本课相关内容 →',
    done: '本课已完成 ✓',
    mark: '标记本课完成',
    commitLabel: '提交',
    filesLabel: '文件',
    edit: '编辑文件',
    add: 'git add',
    commit: 'git commit',
    reset: '重置',
    saved: '已保存为一次提交 ✓'
  },
  ja: {
    correct: '正解',
    wrong: '不正解',
    review: 'この課の関連部分を復習 →',
    done: 'この課を完了 ✓',
    mark: '完了にする',
    commitLabel: 'コミット',
    filesLabel: 'ファイル',
    edit: 'ファイルを編集',
    add: 'git add',
    commit: 'git commit',
    reset: 'リセット',
    saved: 'コミットとして保存 ✓'
  },
  ko: {
    correct: '정답',
    wrong: '오답',
    review: '이번 과의 관련 내용 복습 →',
    done: '이번 과 완료 ✓',
    mark: '완료로 표시',
    commitLabel: '커밋',
    filesLabel: '파일',
    edit: '파일 편집',
    add: 'git add',
    commit: 'git commit',
    reset: '초기화',
    saved: '커밋으로 저장됨 ✓'
  },
  de: {
    correct: 'Richtig',
    wrong: 'Falsch',
    review: 'Abschnitt dieser Lektion wiederholen →',
    done: 'Lektion abgeschlossen ✓',
    mark: 'Lektion abschließen',
    commitLabel: 'Commit',
    filesLabel: 'Dateien',
    edit: 'Datei bearbeiten',
    add: 'git add',
    commit: 'git commit',
    reset: 'Zurücksetzen',
    saved: 'Als Commit gespeichert ✓'
  },
  fr: {
    correct: 'Correct',
    wrong: 'Incorrect',
    review: 'Revoir la section de cette leçon →',
    done: 'Leçon terminée ✓',
    mark: 'Marquer la leçon comme terminée',
    commitLabel: 'commit',
    filesLabel: 'Fichiers',
    edit: 'Modifier le fichier',
    add: 'git add',
    commit: 'git commit',
    reset: 'Réinitialiser',
    saved: 'Enregistré comme commit ✓'
  },
  es: {
    correct: 'Correcto',
    wrong: 'Incorrecto',
    review: 'Repasar esta sección →',
    done: 'Lección completada ✓',
    mark: 'Marcar lección como completada',
    commitLabel: 'commit',
    filesLabel: 'Archivos',
    edit: 'Editar archivo',
    add: 'git add',
    commit: 'git commit',
    reset: 'Reiniciar',
    saved: 'Guardado como commit ✓'
  },
  pt: {
    correct: 'Correto',
    wrong: 'Incorreto',
    review: 'Rever esta seção →',
    done: 'Lição concluída ✓',
    mark: 'Marcar lição como concluída',
    commitLabel: 'commit',
    filesLabel: 'Arquivos',
    edit: 'Editar arquivo',
    add: 'git add',
    commit: 'git commit',
    reset: 'Reiniciar',
    saved: 'Salvo como commit ✓'
  },
  ru: {
    correct: 'Верно',
    wrong: 'Неверно',
    review: 'Повторить раздел урока →',
    done: 'Урок завершён ✓',
    mark: 'Отметить урок завершённым',
    commitLabel: 'коммит',
    filesLabel: 'Файлы',
    edit: 'Изменить файл',
    add: 'git add',
    commit: 'git commit',
    reset: 'Сбросить',
    saved: 'Сохранено как коммит ✓'
  }
}

export function labelsFor(lang: string): Labels {
  return LABELS[lang] ?? LABELS.en
}
