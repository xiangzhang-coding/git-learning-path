---
title: git push — отправка коммитов
exercises:
  - id: 3-3-e1
    question: Что git push отправляет на remote?
    options:
      - Коммиты текущей ветки, которых ещё нет на remote (вместе с их историей)
      - Все файлы из рабочего каталога
      - Все локальные ветки
    correct: 0
    explanation: push отправляет коммиты, на которые локальная ветка ушла вперёд относительно remote, и продвигает ветку remote до того же положения.
    anchor: "#git-push-отправка-коммитов"
  - id: 3-3-e2
    question: Почему git отклоняет non-fast-forward (не быстрое продвижение) push?
    options:
      - На remote есть коммиты, которых нет локально, — перезапись потеряла бы чужую работу
      - Remote переполнен
      - Неверное имя локальной ветки
    correct: 0
    explanation: Если remote ушёл вперёд относительно локального репозитория, push перезапишет новые коммиты remote — git отказывается от такой перезаписи и требует сначала pull, затем push.
    anchor: "#non-fast-forward-push-отклоняется"
  - id: 3-3-e3
    question: В зоне практики ниже отправьте локальные коммиты на remote.
    type: task
    scenario: push
    goal: На ветке main выполните git push, чтобы отправить коммиты на remote.
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: После push в выводе появятся To /origin и main -> main; remote теперь указывает на тот же коммит, что и локальный репозиторий.
    anchor: "#git-push-отправка-коммитов"
---

# git push — отправка коммитов

## Цели урока

- Отправлять локальные коммиты на remote командой git push
- Понимать, что push отправляет только «ушедшие вперёд» коммиты
- Понимать правило отказа non-fast-forward

## git push: отправка коммитов

```bash
git push              # отправить текущую ветку в origin
git push origin main  # явно указать remote и ветку
```

push отправляет **коммиты текущей ветки, которых ещё нет на remote**, и продвигает ветку remote до того же положения, что и локальная. Вывод выглядит так:

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` означает, что ветка remote перешла со старого коммита на новый. После успешного push у remote и локального репозитория общая история.

**Обратите внимание**: push отправляет только «ушедшие вперёд» коммиты. Изменения, которых нет ни на remote, ни локально (незакоммиченные), не отправляются.

## Быстрое продвижение и tracking branch

По сути push — это **fast-forward** ветки remote до положения локальной ветки (понятие fast-forward — из этапа 2, merge). После успешного push локальная tracking branch `origin/main` тоже продвигается — она зеркалит «где сейчас remote» и теперь совпадает с ним.

## Non-fast-forward: push отклоняется

Если **на remote есть коммиты, которых нет локально** (например, кто-то запушил раньше или remote получил обновления), обычный push перезапишет их — git откажется:

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

Решение подсказывает само сообщение: сначала `git pull`, чтобы влить новые коммиты remote, затем push.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="push" />

<LessonProgress />
