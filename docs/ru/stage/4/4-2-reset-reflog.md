---
title: git reset и reflog
exercises:
  - id: 4-2-e1
    question: Что делает git reset --hard?
    options:
      - Перемещает HEAD, staging area и working tree на целевой коммит, отбрасывая промежуточные коммиты и изменения
      - Отменяет только сообщение последнего коммита
      - Отправляет изменения на remote
    correct: 0
    explanation: "--hard — это общий откат всех трёх: указатель ветки, staging area и working tree возвращаются к состоянию целевого коммита — опасно, но часто нужно."
    anchor: "#git-reset-перемещение-head"
  - id: 4-2-e2
    question: Можно ли вернуть коммиты, отброшенные reset?
    options:
      - Да, найти их хеш в git reflog и снова сделать reset
      - Нет, они потеряны навсегда
      - Только склонировав заново с remote
    correct: 0
    explanation: git не удаляет объекты коммитов сразу; reflog записывает каждое перемещение HEAD — по старому хешу всё восстанавливается.
    anchor: "#git-reflog-поиск-потерянных-коммитов"
  - id: 4-2-e3
    question: В зоне практики ниже уберите последний коммит.
    type: task
    scenario: reset
    goal: Выполните git reset --hard HEAD~1, чтобы убрать последний коммит (вместе с его изменениями).
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1 отводит ветку на один шаг назад, working tree тоже возвращается к предыдущему состоянию.
    anchor: "#git-reset-перемещение-head"
  - id: 4-2-e4
    question: В зоне практики ниже найдите отброшенный reset коммит через reflog.
    type: task
    scenario: reset
    goal: С помощью git reflog найдите только что отброшенный reset коммит (сообщение содержит "break") и восстановите его командой git reset --hard.
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: reflog показывает всю историю HEAD; найдите хеш коммита, существовавшего до reset, и reset --hard вернёт всё на место.
    anchor: "#git-reflog-поиск-потерянных-коммитов"
---

# git reset и reflog

## Цели урока

- Перемещать HEAD и состояние репозитория командой git reset
- Различать режимы --hard / смешанный / --soft
- Находить отброшенные reset коммиты через git reflog

## git reset: перемещение HEAD

```bash
git reset --hard <коммит>   # откат HEAD, staging area и working tree
git reset <коммит>          # откат HEAD и staging area, working tree сохраняется
git reset --soft <коммит>   # движется только HEAD, остальное не трогается
```

**reset — это «шаг назад»**: указатель ветки перемещается на любой коммит. Три режима различаются «областью действия»:

| Режим | HEAD | staging area | working tree |
| --- | --- | --- | --- |
| `--soft` | движется | сохраняется | сохраняется |
| по умолчанию (mixed) | движется | сбрасывается | сохраняется |
| `--hard` | движется | сбрасывается | сбрасывается |

`--hard` — самый частый и самый опасный: все промежуточные коммиты и незакоммиченные изменения исчезают (working tree просто перезаписывается). После `--hard` вывод `HEAD is now at <короткий хеш> <сообщение>` показывает, где вы оказались.

## git reflog: поиск потерянных коммитов

```bash
git reflog
```

**reflog (reference log) — полный журнал перемещений HEAD**: не просто история текущей ветки, а «где побывал ваш HEAD»:

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

Отброшенные reset коммиты **не удаляются** — просто ни одна ветка на них больше не указывает. Найдите хеш в reflog, и `git reset --hard <хеш>` полностью всё восстановит. Это «лекарство от сожалений» git: пока операция произошла на этой машине, почти всё можно вернуть.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="reset" />

<LessonProgress />
