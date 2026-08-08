---
title: Trabajar en una rama
exercises:
  - id: 2-2-e1
    question: Tras hacer un commit en la rama feature, ¿lo verás si vuelves a main?
    options:
      - No; los commits solo caen en la rama actual
      - Sí; todas las ramas comparten la misma historia
      - Depende del mensaje del commit
    correct: 0
    explanation: Cada commit cae sobre el puntero de la rama actual. El commit hecho en feature solo avanza a feature; la historia de main no se ve afectada.
    anchor: "#los-commits-solo-caen-en-la-rama-actual"
  - id: 2-2-e2
    question: Cuando dos ramas han hecho sus propios commits, ¿qué forma tiene el grafo de commits?
    options:
      - Un DAG (grafo acíclico dirigido) que se bifurca desde el ancestro común
      - Siempre una línea recta
      - Solo el registro de una de las ramas
    correct: 0
    explanation: Cuando las ramas avanzan por separado, la historia se bifurca desde un commit compartido y forma un árbol bifurcado, un DAG en el mundo de git.
    anchor: "#bifurcacion-y-grafo-de-commits"
  - id: 2-2-e3
    question: En la zona de práctica de abajo, haz un commit en la rama feature.
    type: task
    scenario: branching
    goal: "Crea y cambia a feature, crea feat.txt (con el contenido que quieras) y haz un commit cuyo mensaje contenga \"feat\"."
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: "Tras el commit, el grafo de la zona de práctica se bifurca: el puntero de feature avanzó un paso y main se quedó donde estaba."
    anchor: "#los-commits-solo-caen-en-la-rama-actual"
  - id: 2-2-e4
    question: En la zona de práctica de abajo, vuelve a main y deja el working tree limpio.
    type: task
    scenario: branching
    goal: Usa git switch main para volver a main; el estado debe quedar limpio.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: Al volver a main, el commit de feature no aparece en su historia, pero el puntero de la rama sigue ahí; puedes volver a feature cuando quieras.
    anchor: "#los-commits-solo-caen-en-la-rama-actual"
---

# Trabajar en una rama

## Objetivos de la lección

- Hacer commits en una rama y entender que solo caen en la rama actual
- Entender la bifurcación: el grafo de commits se divide desde el ancestro común
- Observar la estructura de las ramas con el grafo de la zona de práctica

## Los commits solo caen en la rama actual

Tras crear una rama, **los commits solo caen en la rama actual**. Supón que `main` está en el commit A y luego:

```bash
git switch -c feature
# cambia el código
git commit -m "feat: login page"
```

Este commit solo hace avanzar a `feature`; `main` sigue en A. Si vuelves a main, no ves ese commit ni ese archivo — el working tree vuelve a ser la instantánea de A.

**Para eso sirve una rama**: experimentar con libertad en feature mientras main se mantiene estable.

## Bifurcación y grafo de commits

Cuando main y feature hacen commits cada una, la historia se bifurca desde el ancestro común:

```
o  A (el punto de partida común de main y feature)
|\
o |  B (commit nuevo de main)
| o  C (commit nuevo de feature)
```

Esta estructura se llama **grafo de commits (commit graph)** y técnicamente es un DAG (grafo acíclico dirigido) — cada commit tiene como máximo dos commits padre y no hay ciclos. El grafo de la zona de práctica lo dibuja en tiempo real: el nombre de cada rama aparece directamente sobre la punta de la rama.

## git log: observar la historia

```bash
git log --oneline
```

`git log` solo muestra la historia de la **rama actual**. Al cambiar a feature, muestra la línea de feature; al volver a main, la de main. Si quieres ver los commits de todas las ramas, lo más claro es el grafo de la zona de práctica.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="branching" />

<LessonProgress />
