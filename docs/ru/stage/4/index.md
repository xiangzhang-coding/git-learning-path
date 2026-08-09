# Глава 4 — Исправление и продвинутые приёмы

Принципиальная линия этой главы: **refs и reflog**. reset перемещает указатель ветки, revert/cherry-pick создают новые коммиты, rebase переписывает историю — а reflog записывает каждое перемещение HEAD, так что любое «жалко» можно отыграть назад.

## Уроки

- 4-1 [git stash и git tag](/ru/stage/4/4-1-stash-tag): временно спрятать изменения, навесить метку версии
- 4-2 [git reset и reflog](/ru/stage/4/4-2-reset-reflog): три режима перемещения HEAD, reflog возвращает коммиты
- 4-3 [git revert и git cherry-pick](/ru/stage/4/4-3-revert-cherry-pick): обратная отмена и копирование коммитов
- 4-4 [git rebase: переигровка коммитов](/ru/stage/4/4-4-rebase): линейная история, конфликты и прерывание

## Новые команды главы

| Команда | Что делает |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | Временно спрятать незакоммиченные изменения |
| `git tag <name>` / `git tag -a <name> -m <msg>` | Навесить на коммит фиксированную метку |
| `git reset [--hard\|--soft] <ref>` | Переместить HEAD (можно вместе со staging area и working tree) |
| `git reflog` | Показать полный журнал перемещений HEAD |
| `git revert <ref>` | Отменить коммит новым обратным коммитом |
| `git cherry-pick <ref>` | Скопировать коммит в текущую ветку |
| `git rebase <branch>` / `--continue` / `--abort` | Переиграть коммиты ветки на целевую ветку |

<StageProgress stage="4" />
