# Capítulo 2 — Ramas y fusiones

El hilo de principios de este capítulo: **el grafo de commits y HEAD**. Una rama es solo un puntero a un commit; HEAD marca tu posición actual; todas las operaciones con ramas (switch, merge, conflictos) son, en el fondo, mover punteros por el grafo de commits o volver a cerrar las bifurcaciones.

## Lecciones

- 2-1 [git branch y git switch](/es/stage/2/2-1-branch-switch): la rama es un puntero, HEAD es la posición actual
- 2-2 [Trabajar en una rama](/es/stage/2/2-2-branch-workflow): los commits solo caen en la rama actual, la historia se bifurca en un DAG
- 2-3 [git merge: fusionar ramas](/es/stage/2/2-3-merge): fusión fast-forward y merge commit
- 2-4 [Resolver conflictos de fusión](/es/stage/2/2-4-merge-conflict): marcadores de conflicto y el proceso de resolución

## Comandos nuevos de este capítulo

| Comando | Qué hace |
| --- | --- |
| `git branch` | Ver la lista de ramas; la rama actual lleva `*` |
| `git branch <name>` | Crear una rama (sin cambiar a ella) |
| `git switch <name>` | Cambiar a una rama existente |
| `git switch -c <name>` | Crear y cambiar a una rama nueva |
| `git merge <branch>` | Fusionar la rama objetivo en la rama actual |

<StageProgress stage="2" />
