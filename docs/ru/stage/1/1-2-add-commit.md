---
title: git add и git commit
exercises:
  - id: 1-2-e1
    question: В какую область git add помещает изменения?
    options:
      - Working tree
      - Staging area (зона подготовки)
      - Repository (репозиторий)
    correct: 1
    explanation: git add регистрирует изменения working tree в staging area — «эти изменения готовы к коммиту».
    anchor: "#git-add-подготавливает-изменения"
  - id: 1-2-e2
    question: Для чего нужен параметр -m у git commit?
    options:
      - Объединяет две ветки
      - Добавляет к коммиту пояснение
      - Меняет автора коммита
    correct: 1
    explanation: -m задаёт сообщение коммита (commit message), в котором записано, что сделано. Хорошее сообщение пишут для других, включая будущего вас.
    anchor: "#git-commit-сохраняет-снимок"
  - id: 1-2-e3
    question: В тренажёре ниже подготовьте файл todo.txt.
    type: task
    scenario: add-commit
    goal: С помощью git add todo.txt добавьте файл в staging area.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: После подготовки todo.txt появится в выводе git status в разделе «Changes to be committed».
    anchor: "#git-add-подготавливает-изменения"
  - id: 1-2-e4
    question: В тренажёре ниже закоммитьте todo.txt; сообщение должно содержать «todo».
    type: task
    scenario: add-commit
    goal: 'После git add todo.txt выполните git commit -m "feat: add todo".'
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: "После коммита todo.txt попадёт в историю репозитория; обратите внимание: изменения hello.txt остались в working tree и не закоммичены — commit упаковывает только содержимое staging area."
    anchor: "#git-commit-сохраняет-снимок"
---

# git add и git commit

## Цели урока

- Добавлять изменения в staging area с помощью git add
- Сохранять снимок с помощью git commit
- Понимать, что commit включает только содержимое staging area

## git add подготавливает изменения

```bash
git add <имя файла>   # подготовить один файл
git add .             # подготовить все изменения в текущем каталоге
```

`git add` регистрирует изменения working tree в **staging area (зоне подготовки)**. Подготавливать можно выборочно: изменили три фичи — подготовьте и закоммитьте одну, и история останется чистой.

## git commit сохраняет снимок

```bash
git commit -m "feat: add login page"
```

`git commit` упаковывает содержимое **staging area** в коммит (commit) и записывает его в историю репозитория. Каждый коммит:

- сохраняет полный **снимок** всех файлов проекта (не разницу)
- получает уникальный идентификатор через SHA-1-хеш (например `4a2b9c1`)
- фиксирует автора, время и сообщение

**Ключевое правило: commit включает только содержимое staging area.** Изменения, внесённые в working tree, но не добавленные через add, в этот коммит не попадут.

## Как писать сообщения коммитов

Одной фразой объясните, «что сделано»: глагол в начале, единое время, до 50 символов. Например `fix: correct the login validation`.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="add-commit" />

<LessonProgress />
