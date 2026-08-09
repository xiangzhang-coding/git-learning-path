---
title: git stash y git tag
exercises:
  - id: 4-1-e1
    question: ¿Qué guarda git stash?
    options:
      - Los cambios sin commitear (archivos tracked, staged y unstaged)
      - La historia ya commiteada
      - Todo el contenido del repositorio remoto
    correct: 0
    explanation: stash guarda temporalmente los cambios sin commitear del working tree y lo deja limpio — después los recuperas con pop.
    anchor: "#git-stash-guarda-cambios"
  - id: 4-1-e2
    question: ¿Cuál es la diferencia entre tag y branch?
    options:
      - branch se mueve con cada commit; tag apunta fijo a un commit
      - tag se mueve con cada commit; branch queda fijo
      - Son exactamente iguales
    correct: 0
    explanation: "tag es un nombre clavado en un commit: no se mueve aunque sigas haciendo commits — ideal para marcar números de versión."
    anchor: "#git-tag-marca-versiones"
  - id: 4-1-e3
    question: En la zona de práctica de abajo, guarda los cambios sin commitear con stash.
    type: task
    scenario: stash
    goal: Ejecuta git stash para que el working tree vuelva a estar limpio.
    checks:
      - type: statusClean
    explanation: Tras el stash el working tree queda limpio y los cambios quedan guardados en la lista de stashes (stash@{0}).
    anchor: "#git-stash-guarda-cambios"
  - id: 4-1-e4
    question: En la zona de práctica de abajo, recupera los cambios guardados con stash.
    type: task
    scenario: stash
    goal: Ejecuta git stash pop para que la modificación de hello.txt vuelva al working tree.
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop devuelve los cambios de stash@{0} al working tree y borra esa entrada de la lista de stashes.
    anchor: "#git-stash-list-y-git-stash-pop"
---

# git stash y git tag

## Objetivos de la lección

- Guardar los cambios sin commitear con git stash
- Gestionar los stashes con git stash list / pop
- Marcar versiones con git tag

## git stash guarda cambios

```bash
git stash          # guarda todos los cambios sin commitear
git stash list     # ver la lista de stashes
git stash pop      # recupera el stash más reciente
```

En el trabajo diario pasa mucho esto: llevas un cambio a medias y de repente necesitas cambiarte de rama para otra cosa, pero el switch se niega (hay cambios sin commitear). **stash** es el «depósito temporal»: guarda los cambios, deja el working tree limpio y los recuperas cuando quieras.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list y git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` devuelve al working tree los cambios del stash más reciente y borra esa entrada (aparece `Dropped stash@{0}`). Ojo: stash solo guarda los archivos que **ya sigue git**; los archivos untracked nuevos no se guardan.

## git tag marca versiones

```bash
git tag v1.0              # etiqueta ligera: le pone nombre al commit actual
git tag -a v1.0 -m "descripción" # etiqueta anotada: con mensaje
git tag                   # lista todas las etiquetas
```

Cuando lanzas una versión necesitas un nombre que «apunte siempre a este commit» — **tag** es la marca clavada en el commit. Al contrario que branch, tag no se mueve con los commits nuevos. Después puedes volver a esa versión cuando quieras con `git switch <tag>` (en ese momento HEAD queda en estado detached — lo verás más adelante en esta etapa).

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="stash" />

<LessonProgress />
