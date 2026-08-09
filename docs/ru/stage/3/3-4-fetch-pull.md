---
title: git fetch и git pull
exercises:
  - id: 3-4-e1
    question: Что делает git fetch?
    options:
      - Скачивает новые коммиты remote и обновляет tracking branch, но не трогает рабочий каталог
      - Скачивает и сразу вливает в текущую ветку
      - Отправляет локальные коммиты на remote
    correct: 0
    explanation: fetch обновляет только «зеркало remote» (origin/main) — ваша ветка и рабочий каталог остаются как были; это безопасный способ посмотреть, что появилось на remote.
    anchor: "#git-fetch-только-смотреть-ничего-не-менять"
  - id: 3-4-e2
    question: Как связаны git pull и git fetch?
    options:
      - pull = fetch + merge (влить новые коммиты remote в текущую ветку)
      - pull = fetch + push
      - Это одно и то же
    correct: 0
    explanation: pull сначала выполняет fetch, обновляя зеркало, а затем вливает origin/main в текущую ветку (fast-forward или merge).
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: В зоне практики ниже получите новые коммиты remote.
    type: task
    scenario: pull-ff
    goal: На ветке main выполните git pull, чтобы быстро продвинуть её до новых коммитов remote.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: "Когда локально нет новых коммитов, pull делает fast-forward: новые файлы remote появляются в рабочем каталоге, история остаётся прямой."
    anchor: "#git-pull-fetch-merge"
---

# git fetch и git pull

## Цели урока

- Скачивать обновления remote командой git fetch, не меняя рабочий каталог
- Понимать, что pull = fetch + merge
- Наблюдать состояние remote через git log origin/main

## git fetch: только смотреть, ничего не менять

```bash
git fetch            # скачать все новые коммиты из origin
git fetch origin     # эквивалентная запись
```

fetch скачивает **новые объекты коммитов** remote в локальный репозиторий и обновляет tracking branch `origin/main` — но **не трогает вашу ветку и рабочий каталог**:

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

После fetch можно безопасно «смотреть» состояние remote и в любой момент сравнить remote с локалью:

```bash
git log origin/main --oneline   # что есть на remote
git log main..origin/main       # коммиты, которые есть на remote, но нет локально
```

## git pull = fetch + merge

```bash
git pull             # эквивалентно git fetch + git merge origin/main
```

pull — это объединение двух шагов: сначала fetch (обновить зеркало), затем влить `origin/main` в текущую ветку.

- **Локально нет новых коммитов**: fast-forward, рабочий каталог обновляется сразу, история остаётся прямой
- **Локально тоже есть новые коммиты**: появляется merge commit, истории двух веток объединяются
- **Обе стороны меняли одно и то же**: конфликт — порядок разрешения точно такой же, как в главе 2 (изменить → add → commit)

## Что когда использовать

| Сценарий | Команда |
| --- | --- |
| Хочу только посмотреть, что нового на remote | `git fetch` |
| Хочу сразу получить новые коммиты remote | `git pull` |
| Не пушится (отклонили) | Сначала `git pull`, затем `git push` |

**Золотое правило**: перед push — pull: сначала влейте обновления remote, потом отправляйте свои, и non-fast-forward-отказ не наступит.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="pull" />

<LessonProgress />
