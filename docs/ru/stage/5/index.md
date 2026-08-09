# Глава 5 — Экосистема GitHub

Принципиальная линия этой главы: **цикл совместной работы вокруг GitHub**. fork создаёт вашу копию, upstream связывает вас с автором; PR — дверь для коммитов в основную ветку, issue ведёт обсуждения, release выпускает версии, а Actions и Pages автоматизируют тесты и развёртывание. Эта глава практикуется на настоящем GitHub — к каждому понятию прилагаются практические задания.

## Практический чек-лист

Выполните на настоящем GitHub полный цикл действий ниже, отмечая прогресс галочками:

<Checklist :tasks="[
  { text: 'Сделайте fork открытого репозитория, которым часто пользуетесь', link: '/ru/stage/5/5-1-fork-upstream' },
  { text: 'Клонируйте свой fork, добавьте upstream и выполните синхронизацию', link: '/ru/stage/5/5-1-fork-upstream' },
  { text: 'Запушьте функциональную ветку и откройте настоящий PR', link: '/ru/stage/5/5-2-pull-request' },
  { text: 'Проведите в PR одно обсуждение (review)', link: '/ru/stage/5/5-2-pull-request' },
  { text: 'Откройте issue, создайте label и milestone', link: '/ru/stage/5/5-3-issues' },
  { text: 'Отправьте PR, связанный с issue (fixes #номер)', link: '/ru/stage/5/5-3-issues' },
  { text: 'Поставьте тег v0.1.0 и создайте первый Release', link: '/ru/stage/5/5-4-releases' },
  { text: 'Выпустите патч-версию с описанием из трёх частей', link: '/ru/stage/5/5-4-releases' },
  { text: 'Напишите workflow для развёртывания статической страницы на Pages', link: '/ru/stage/5/5-5-actions-pages' },
  { text: 'Намеренно сломайте шаг сборки и посмотрите журнал ошибок Actions', link: '/ru/stage/5/5-5-actions-pages' }
]" />

## Уроки

- 5-1 [fork и синхронизация с upstream](/ru/stage/5/5-1-fork-upstream): fork создаёт копию, upstream принимает обновления автора
- 5-2 [Рабочий процесс Pull Request](/ru/stage/5/5-2-pull-request): открыть PR, review и обсуждение, три способа слияния
- 5-3 [Issues и совместная работа](/ru/stage/5/5-3-issues): обсуждение в issue, label и milestone, автозакрытие issue через PR
- 5-4 [Releases и выпуск версий](/ru/stage/5/5-4-releases): семантическое версионирование, push tag, публикация Release
- 5-5 [GitHub Actions и Pages](/ru/stage/5/5-5-actions-pages): автоматизация workflow, развёртывание Pages

## Ключевые функции главы

| Функция | Что делает |
| --- | --- |
| fork | Копирует репозиторий на GitHub в ваш аккаунт |
| pull request | Запрос на слияние коммитов вашей ветки в целевой репозиторий |
| issue | Обсуждение и трекинг багов, функций, задач |
| milestone | Объединяет группу issues под цель версии |
| release | Официальный выпуск на основе tag (с описанием и файлами) |
| GitHub Actions | Автоматизация CI/CD на событиях |
| GitHub Pages | Бесплатный хостинг статических сайтов (на нём живёт этот проект) |

<StageProgress stage="5" />
