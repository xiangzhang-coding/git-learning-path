# Capítulo 4 — Reparación y avanzar

El hilo de principios de este capítulo: **refs y reflog**. reset mueve la punta de la rama, revert/cherry-pick crean commits nuevos, rebase reescribe la historia — y reflog registra cada movimiento de HEAD, para que cualquier «me arrepiento» se pueda recuperar.

## Lecciones

- 4-1 [git stash y git tag](/es/stage/4/4-1-stash-tag): guarda temporalmente los cambios sin commitear y marca versiones
- 4-2 [git reset y reflog](/es/stage/4/4-2-reset-reflog): los tres modos de mover HEAD, reflog recupera commits
- 4-3 [git revert y git cherry-pick](/es/stage/4/4-3-revert-cherry-pick): deshacer con un commit inverso y copiar commits
- 4-4 [git rebase: reaplica commits](/es/stage/4/4-4-rebase): historia lineal, conflictos y abort
- 4-5 [git worktree](/es/stage/4/4-5-worktree): varios directorios de trabajo para un repositorio

## Comandos nuevos de este capítulo

| Comando | Qué hace |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | Guarda temporalmente los cambios sin commitear |
| `git tag <name>` / `git tag -a <name> -m <msg>` | Marca un commit con una etiqueta fija |
| `git reset [--hard\|--soft] <ref>` | Mueve HEAD (con el índice y el working tree opcional) |
| `git reflog` | Muestra el registro completo de movimientos de HEAD |
| `git revert <ref>` | Deshace un commit con un commit inverso nuevo |
| `git cherry-pick <ref>` | Copia un commit a la rama actual |
| `git rebase <branch>` / `--continue` / `--abort` | Reaplica los commits de tu rama sobre la rama destino |
| `git worktree add/list/remove` | Adjuntar directorios de trabajo adicionales a un repositorio |

<StageProgress stage="4" />
