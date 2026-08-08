---
title: git restore, git rm и git mv
exercises:
  - id: 1-4-e1
    question: Что делает git restore hello.txt?
    options:
      - Восстанавливает hello.txt до версии из HEAD, отбрасывая изменения working tree
      - Удаляет hello.txt
      - Добавляет hello.txt в staging area
    correct: 0
    explanation: "git restore возвращает файл к версии из репозитория (по умолчанию из HEAD), отбрасывая изменения working tree. Обратите внимание: восстанавливаются только отслеживаемые файлы, неотслеживаемые не затрагиваются."
    anchor: "#git-restore-отменяет-изменения"
  - id: 1-4-e2
    question: В тренажёре ниже восстановите hello.txt с помощью git restore.
    type: task
    scenario: local
    goal: hello.txt испорчен — верните исходное содержимое командой git restore hello.txt.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: После восстановления hello.txt снова содержит «hello world», рабочая область чиста — git status покажет nothing to commit.
    anchor: "#git-restore-отменяет-изменения"
  - id: 1-4-e3
    question: В тренажёре ниже удалите notes.txt (в истории версий он сохранится).
    type: task
    scenario: local
    goal: Удалите файл и подготовьте удаление командой git rm notes.txt.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: git rm делает два дела сразу — удаляет файл из working tree и подготавливает удаление. После коммита файл исчезает из последней версии, но его можно вернуть из истории.
    anchor: "#git-rm-удаляет-фаилы"
  - id: 1-4-e4
    question: В тренажёре ниже переименуйте notes.txt в diary.txt.
    type: task
    scenario: local
    goal: Выполните переименование с подготовкой командой git mv notes.txt diary.txt.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv — комбинированная команда «переместить + подготовить»; после переименования git status покажет удаление старого имени и добавление нового.
    anchor: "#git-mv-перемещает-фаилы"
---

# git restore, git rm и git mv

## Цели урока

- Отбрасывать изменения working tree с помощью git restore
- Удалять файлы с помощью git rm
- Перемещать и переименовывать файлы с помощью git mv

## git restore отменяет изменения

Испортили? Хотите вернуться к состоянию последнего коммита:

```bash
git restore <имя файла>
```

`git restore` возвращает файл к версии из HEAD, **отбрасывая изменения working tree**. Обратите внимание: работает только с отслеживаемыми (tracked) файлами — новые файлы git ещё не знает, и restore их не касается.

## git rm удаляет файлы

```bash
git rm <имя файла>
```

Один шаг — два дела: удалить файл из working tree и зарегистрировать удаление в staging area. После коммита файл исчезает из последней версии, но история сохраняется — вернуть его можно в любой момент.

## git mv перемещает файлы

```bash
git mv <старое имя> <новое имя>
```

Перемещает (переименовывает) файл и подготавливает изменение. git не «запоминает» само переименование — он распознаёт его по содержимому: старый файл исчез + новый файл с тем же содержимым = переименование. Поэтому после mv в status видно deleted + new file.

## Упражнения

<Exercise />

## Тренажёр

<Playground scenario="local" />

<LessonProgress />
