# Глава 3 — Удалённая работа

Принципиальная линия этой главы: **две копии репозитория и tracking branch**. remote — это адрес другой копии репозитория; clone копирует её, fetch обновляет «зеркало remote» (origin/main), push отправляет туда локальные коммиты, pull = fetch + merge.

## Уроки

- 3-1 [git remote — удалённый репозиторий](/ru/stage/3/3-1-remote): что такое remote, добавление и просмотр
- 3-2 [git clone — клонирование репозитория](/ru/stage/3/3-2-clone): копия в один шаг, origin и tracking branch
- 3-3 [git push — отправка коммитов](/ru/stage/3/3-3-push): отправка локальных коммитов, отказ non-fast-forward
- 3-4 [git fetch и git pull](/ru/stage/3/3-4-fetch-pull): fetch только смотрит, pull = fetch + merge

## Новые команды главы

| Команда | Что делает |
| --- | --- |
| `git remote add <name> <url>` | Зарегистрировать адрес удалённого репозитория |
| `git remote -v` | Показать имена и адреса всех remote |
| `git clone <url> [<dir>]` | Полностью скопировать remote в локальный репозиторий |
| `git push` | Отправить на remote коммиты, на которые текущая ветка ушла вперёд |
| `git fetch` | Скачать новые коммиты remote, обновить tracking branch |
| `git pull` | fetch + merge: получить и объединить обновления remote |
| `git log origin/main` | Показать историю, на которую сейчас указывает remote branch |
| `cd <dir>` | Переключить каталог в зоне практики (после clone — войти в новый репозиторий) |

<StageProgress stage="3" />
