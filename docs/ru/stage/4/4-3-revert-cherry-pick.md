---
title: git revert и git cherry-pick
exercises:
  - id: 4-3-e1
    question: Как git revert отменяет коммит?
    options:
      - Создаёт новый обратный коммит, история идёт вперёд
      - Напрямую удаляет этот коммит
      - Отводит назад указатель ветки
    correct: 0
    explanation: revert не переписывает историю — он гасит изменения целевого коммита новым обратным коммитом; подходит для уже отправленных (push) коммитов.
    anchor: "#git-revert-отмена-коммита"
  - id: 4-3-e2
    question: Для чего используется git cherry-pick?
    options:
      - Скопировать один коммит с какой-то ветки в текущую
      - Слить две ветки
      - Выбрать файлы для сравнения
    correct: 0
    explanation: cherry-pick переносит изменения указанного коммита в текущую ветку, создавая новый коммит — удобно, когда нужен только один чужой коммит.
    anchor: "#git-cherry-pick-копирование-коммита"
  - id: 4-3-e3
    question: В зоне практики ниже отмените плохой коммит.
    type: task
    scenario: revert
    goal: "Отмените недавний плохой коммит (fix: break hello) командой git revert, чтобы содержимое hello.txt снова стало правильным."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert создаёт новый коммит "Revert \"fix: break hello\"" — hello.txt возвращается к содержимому до поломки.'
    anchor: "#git-revert-отмена-коммита"
  - id: 4-3-e4
    question: В зоне практики ниже скопируйте коммит ветки feature на main.
    type: task
    scenario: cherry-pick
    goal: На ветке main выполните git cherry-pick <коммит feature>, чтобы перенести функциональность feature.txt на main.
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: После cherry-pick ветка feature остаётся нетронутой, а на main появляется коммит с тем же содержимым.
    anchor: "#git-cherry-pick-копирование-коммита"
---

# git revert и git cherry-pick

## Цели урока

- Отменять существующие коммиты командой git revert
- Копировать коммиты командой git cherry-pick
- Понимать, что обе команды не переписывают историю

## git revert: отмена коммита

```bash
git revert <коммит>
```

revert не «удаляет» коммит, а **создаёт новый обратный коммит**: изменения целевого коммита применяются наоборот, а история спокойно идёт вперёд:

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

Почему не reset? Потому что **revert не переписывает историю** — если другие уже сделали clone или pull, reset такого коммита сделает все копии несогласованными; revert просто «добавляет компенсирующий коммит», безопасный для всех. Правило простое: **неотправленную ошибку убираем reset, отправленную — revert**.

## git cherry-pick: копирование коммита

```bash
git cherry-pick <коммит>   # скопировать этот коммит в текущую ветку
```

cherry-pick переносит изменения **конкретного коммита** в текущую ветку, создавая новый коммит (содержимое то же, хеш другой). Типичный сценарий: на ветке feature кто-то починил баг, а вам на main нужен только этот фикс — без слияния всей ветки.

```
o  A ---- B (main) ---- B' (скопированный фикс)
     \
      C (фикс на feature)
```

## Отличия revert и cherry-pick

| | revert | cherry-pick |
| --- | --- | --- |
| Направление | отмена (обратное применение) | копирование (прямое применение) |
| Когда нужен | в коммите ошибка, её надо убрать | коммит хороший, хочется перенести |
| Результат | новый коммит гасит старый | новый коммит повторяет старый |

Обе команды не переписывают существующую историю, а при конфликте останавливаются и ждут вашего решения.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="revert" />

<LessonProgress />
