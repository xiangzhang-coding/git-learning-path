---
title: fork и синхронизация с upstream
exercises:
  - id: 5-1-e1
    question: В чём разница между fork и clone?
    options:
      - fork копирует репозиторий на GitHub в ваш аккаунт, а clone — на ваш компьютер
      - fork копирует только код, а clone — ещё и историю
      - fork — это синоним clone
    correct: 0
    explanation: fork создаёт копию на сервере GitHub (в вашем аккаунте), а clone полностью копирует репозиторий на локальную машину. После fork обычно нужно ещё сделать clone, чтобы работать локально.
    anchor: "#что-такое-fork"
  - id: 5-1-e2
    question: Зачем в open source держать два remote — origin и upstream?
    options:
      - origin указывает на ваш fork, upstream — на репозиторий автора, у каждого своя роль
      - Потому что один remote не вмещает всю историю
      - Два remote — обязательное требование GitHub
    correct: 0
    explanation: push можно делать только в свой fork (origin), а upstream служит для получения обновлений и отправки вклада через PR.
    anchor: "#добавление-upstream-remote"
  - id: 5-1-e3
    question: Чтобы синхронизировать свой fork с новыми коммитами из upstream, какой порядок действий правильный?
    options:
      - git fetch upstream, слить (или перебазировать) upstream/main в локальную main, затем push origin
      - git push upstream вытянет обновления из upstream
      - Достаточно git pull origin, upstream синхронизируется сам
    correct: 0
    explanation: fetch только скачивает коммиты upstream, merge/rebase подключает обновления к локальной main, а push обновляет копию на GitHub.
    anchor: "#синхронизация-с-upstream"
---

# fork и синхронизация с upstream

## Цели урока

- Понять роль fork в open source
- Подключить репозиторий автора через git remote add upstream
- Синхронизировать обновления через fetch + merge

## Что такое fork

fork — это копия чужого репозитория в вашем аккаунте на GitHub:

```mermaid
flowchart TD
    A["Автор: github.com/author/project"] -- fork --> B["Вы: github.com/you/project<br/>можете менять как угодно"]
```

fork — это функция GitHub (а не команда git). Отличие от clone: fork создаёт копию на сервере GitHub, а clone копирует репозиторий на локальный компьютер. Типичный open source процесс — «сначала fork, потом clone своего fork»: у вас нет права записи в репозиторий автора, поэтому работать можно только в своей копии.

## Клонирование своего fork

После нажатия Fork на GitHub клонируйте репозиторий из своего аккаунта:

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v` показывает один remote: `origin` указывает на ваш fork. Пока вы можете читать и писать только в origin — обновления репозитория автора сами не появятся.

## Добавление upstream remote

Зарегистрируйте репозиторий автора как второй remote, по традиции он называется `upstream`:

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

Теперь два remote: `origin` (ваш fork, чтение и запись) и `upstream` (репозиторий автора, только приём обновлений). Помнить, кто чем занимается, — ядро fork-процесса.

## Синхронизация с upstream

Upstream постоянно обновляется, чтобы fork не отставал:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream` скачивает коммиты из upstream (локально ничего не меняет)
- `git merge upstream/main` (или rebase) подключает обновления к локальной main
- `git push origin main` синхронизирует fork на GitHub

Так fork остаётся на уровне репозитория автора — после этого можно создавать ветки и делать вклад на базе свежего кода.

## Практика на реальном GitHub

- Сделайте fork часто используемого вами open source репозитория
- Склонируйте его, добавьте upstream, выполните одну синхронизацию
- Посмотрите на странице Issues, как сотрудничают другие

## Упражнения

<Exercise />

<LessonProgress />
