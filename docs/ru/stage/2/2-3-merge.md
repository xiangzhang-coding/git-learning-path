---
title: git merge — слияние веток
exercises:
  - id: 2-3-e1
    question: Когда происходит fast-forward (быстрое продвижение)?
    options:
      - Когда у текущей ветки нет новых коммитов, а все коммиты целевой ветки идут после неё
      - При любом слиянии
      - Когда обе ветки имеют новые коммиты
    correct: 0
    explanation: "Если main стоит на месте, а feature добавила коммиты после него, merge просто передвигает указатель main вперёд: история остаётся прямой, новых коммитов не появляется."
    anchor: "#fast-forward"
  - id: 2-3-e2
    question: Что создаёт git merge, когда обе ветки имеют новые коммиты?
    options:
      - Один merge commit (коммит слияния с двумя родителями)
      - Два новых коммита
      - Один тег
    correct: 0
    explanation: Когда история разошлась, git должен свести изменения обеих сторон воедино — появляется merge commit с двумя родителями.
    anchor: "#merge-commit"
  - id: 2-3-e3
    question: В зоне практики ниже влейте feature в main (fast-forward).
    type: task
    scenario: merge-ff
    goal: Находясь на main, выполните git merge feature; после слияния в рабочем каталоге должен появиться feature.txt.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "В выводе вы увидите Fast-forward: у main нет новых коммитов, указатель просто продвигается до feature, и в рабочем каталоге появляется feature.txt."
    anchor: "#fast-forward"
  - id: 2-3-e4
    question: В зоне практики ниже влейте feature в main (обе ветки разошлись).
    type: task
    scenario: merge
    goal: Находясь на main, выполните git merge feature, чтобы провести обычное слияние.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: В этот раз история разошлась, поэтому merge создаёт merge commit. На коммит-графе в зоне практики он будет соединён с обеими ветками.
    anchor: "#merge-commit"
---

# git merge — слияние веток

## Цели урока

- Вливать ветки в текущую с помощью git merge
- Различать fast-forward и merge commit
- Понимать, что у merge commit два родителя

## git merge: основной порядок действий

```bash
git switch main     # сначала вернитесь на ветку, принимающую изменения
git merge feature   # влейте feature в текущую ветку
```

`git merge <ветка>` вносит изменения целевой ветки в **текущую**. Сначала git находит **общего предка** двух веток, затем вычисляет различия по трём путям (общий предок → текущая ветка, общий предок → целевая ветка) и сводит изменения воедино.

## Fast-forward

Если у текущей ветки нет новых коммитов, а целевая просто «ушла вперёд»:

```
o  A ← main стоит здесь
|
o  B ← feature
|
o  C ← ещё один коммит feature
```

`git merge feature` достаточно просто **передвинуть указатель main** на C — это и есть fast-forward. В выводе появится `Fast-forward`, **новых коммитов не создаётся**, история остаётся прямой линией.

## Merge commit

Если обе ветки коммитили (история разошлась), «передвинуть указатель» уже нельзя — git должен собрать содержимое обеих сторон в новый коммит:

```
o  A
|\
| o  B (новый коммит main)
o |  C (новый коммит feature)
 \|
  o  M (merge commit, два родителя: B и C)
```

Особенность **merge commit** в том, что у него два родителя (parent). На коммит-графе в зоне практики merge commit будет соединён сразу с двумя ветками.

## Автоматическое слияние

Пока стороны меняли разные места, git сам сводит изменения воедино — от вас ничего не требуется; вывод выглядит так:

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

Если обе стороны меняли одно и то же место, наступает тема следующего урока: конфликт.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="merge" />

<LessonProgress />
