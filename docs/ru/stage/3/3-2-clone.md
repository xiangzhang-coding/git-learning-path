---
title: git clone — клонирование репозитория
exercises:
  - id: 3-2-e1
    question: Что делает git clone?
    options:
      - Полностью копирует remote в локальный репозиторий (история + рабочий каталог) и автоматически настраивает origin
      - Скачивает только последний коммит
      - Загружает локальный репозиторий на remote
    correct: 0
    explanation: clone копирует всю историю, выполняет checkout рабочего каталога ветки по умолчанию и автоматически называет remote origin, настраивая tracking branch.
    anchor: "#git-clone-копия-в-один-шаг"
  - id: 3-2-e2
    question: Что такое origin/main после clone?
    options:
      - "Tracking branch: локальное зеркало того, «на какой коммит указывает main на remote»"
      - Папка внутри удалённого репозитория
      - Новая локальная ветка, на которую можно прямо коммитить
    correct: 0
    explanation: refs/remotes/origin/main — зеркало только для чтения, фиксирующее положение remote-ветки main на момент clone/fetch.
    anchor: "#tracking-branch-origin-main"
  - id: 3-2-e3
    question: В зоне практики ниже склонируйте remote и перейдите в склонированный каталог.
    type: task
    scenario: clone
    goal: Выполните git clone /origin, затем cd origin и проверьте git status — вы на main.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: После clone перейдите в новый каталог через cd — вы в полной копии истории, и remote origin уже настроен автоматически.
    anchor: "#git-clone-копия-в-один-шаг"
---

# git clone — клонирование репозитория

## Цели урока

- Скопировать remote в локальный репозиторий командой git clone
- Понять, что такое origin и tracking branch origin/main
- Понять, что после clone нужно перейти в новый каталог через cd

## git clone: копия в один шаг

```bash
git clone /origin          # создать каталог origin/ в текущей папке и склонировать в него
git clone /origin мой-проект  # можно указать своё имя каталога
cd origin                  # войти в склонированный репозиторий
```

`git clone <адрес>` делает четыре вещи за один раз:

1. Создаёт новый каталог (по умолчанию назван по последнему сегменту адреса)
2. Копирует **всю историю** remote
3. Выполняет checkout рабочего каталога ветки по умолчанию (обычно main)
4. Автоматически называет remote **origin** и настраивает tracking branch

clone — стандартный вход «в уже существующий проект»: `git init` не нужен, всё приходит с remote.

## Tracking branch origin/main

При clone git запоминает, на какой коммит указывала каждая ветка remote в тот момент, и хранит это как **tracking branch**:

```
refs/remotes/origin/main   # зеркало только для чтения: где сейчас main на remote
```

Она отличается от локальной ветки (`refs/heads/main`): **ваши коммиты её не двигают**, обновляют её только `git fetch` / `git pull` / `git push`. В любой момент можно посмотреть, «как выглядит remote», через `git log origin/main`.

## Копия vs связь

clone — это **копирование**: склонированный репозиторий полностью независим, и единственная связь с remote — это адрес origin. Ваши коммиты сами на remote не уедут, и новые коммиты remote сами не появятся — следующие три урока (fetch/push/pull) как раз про перенос в обе стороны.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="clone" />

<LessonProgress />
