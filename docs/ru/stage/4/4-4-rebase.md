---
title: "git rebase: переигровка коммитов"
exercises:
  - id: 4-4-e1
    question: Что делает git rebase?
    options:
      - Переносит коммиты текущей ветки, сделанные после точки расхождения, на вершину целевой ветки
      - Сливает две ветки в один коммит
      - Удаляет историю текущей ветки
    correct: 0
    explanation: rebase «переигрывает» коммиты после расхождения один за другим поверх целевой ветки — развилка превращается в прямую линию.
    anchor: "#git-rebase-переигровка-коммитов"
  - id: 4-4-e2
    question: Что происходит с хешами коммитов после rebase?
    options:
      - Переигранные коммиты получают новые хеши (содержимое то же, «личность» другая)
      - Они не меняются
      - Меняется только первый
    correct: 0
    explanation: Хеш включает родителя и время, поэтому переигровка создаёт совершенно новые объекты коммитов — так что не делайте rebase на уже отправленных (push) ветках.
    anchor: "#git-rebase-переигровка-коммитов"
  - id: 4-4-e3
    question: В зоне практики ниже перенесите ветку feature на main через rebase.
    type: task
    scenario: rebase
    goal: Переключитесь на feature и выполните git rebase main, чтобы коммиты feature оказались после коммитов main.
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: "После rebase граф коммитов — прямая: два коммита main идут первыми, за ними коммиты feature, merge-коммита нет."
    anchor: "#git-rebase-переигровка-коммитов"
  - id: 4-4-e4
    question: В зоне практики ниже прервите rebase после конфликта.
    type: task
    scenario: rebase-conflict
    goal: Переключитесь на feature, выполните git rebase main, чтобы спровоцировать конфликт, и отмените rebase командой git rebase --abort.
    checks:
      - type: branchIs
        name: feature
      - type: rebaseAborted
      - type: statusClean
    explanation: Когда обе стороны меняли одно и то же, возникает конфликт; --abort возвращает всё к состоянию до rebase.
    anchor: "#конфликты-rebase-и-прерывание-abort"
---

# git rebase: переигровка коммитов

## Цели урока

- Переносить коммиты ветки на целевую ветку командой git rebase
- Понимать, что rebase переписывает историю и создаёт новые хеши
- Понимать конфликты rebase и команду --abort

## git rebase: переигровка коммитов

```bash
git switch feature
git rebase main
```

rebase перекладывает каждый коммит текущей ветки, сделанный **после точки расхождения**, поверх последнего коммита целевой ветки:

```
до rebase (развилка):          после rebase (прямая линия):
o  A                           o  A
|\                             o  B (main)
| o  B (main)                  o  C' (feature, новый хеш)
o |  C (feature)               o  D' (feature, новый хеш)
 \|
  o  D (feature)
```

В выводе — `Successfully rebased and updated refs/heads/feature.`. Граф коммитов превращается из «ветки» в «прямую линию» — в этом суть rebase: **история чище**.

**Важно**: переигранные коммиты получают **новые хеши** (содержимое то же, «личность» другая). То есть rebase переписывает историю — поэтому никогда не делайте rebase с ветками, которые уже отправлены и используются другими.

## rebase или merge: что выбрать

| | merge | rebase |
| --- | --- | --- |
| История | сохраняет развилку + merge-коммит | линейная, без развилок |
| Хеши | не трогает | переписывает (новые хеши) |
| Отправленные ветки | безопасно | нельзя |
| Когда нужен | слияние общих веток | приведение в порядок локальных веток |

Частая связка в работе: локально rebase выстраивает историю в прямую линию, затем push на remote, а общую ветку вливают через merge.

## Конфликты rebase и прерывание (--abort)

При переигровке каждого коммита возможен конфликт (обе стороны меняли одно и то же) — тогда git останавливается:

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

Два пути решения:

```bash
git rebase --continue   # конфликт решён (после add) — продолжить переигровку
git rebase --abort      # отказаться от rebase и вернуть всё как было
```

Как и при merge-конфликте: редактируем файл, убираем маркеры, `git add`, затем `--continue`. Не хотите разбираться — `--abort`, и всё вернётся к состоянию до rebase.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="rebase" />

<LessonProgress />
