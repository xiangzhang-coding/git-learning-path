---
title: git branch y git switch
exercises:
  - id: 2-1-e1
    question: ¿Qué muestra git branch?
    options:
      - Una lista de todas las ramas, con la rama actual marcada con *
      - Una lista de todos los commits
      - Los cambios sin commitear
    correct: 0
    explanation: git branch lista las ramas del repositorio y marca con * la rama en la que estás.
    anchor: "#git-branch-ver-y-crear-ramas"
  - id: 2-1-e2
    question: ¿Qué es una rama en esencia?
    options:
      - Un puntero móvil a un commit
      - Una copia completa del código
      - Una carpeta independiente
    correct: 0
    explanation: Una rama es solo un puntero a un commit. Crear una rama no copia ningún archivo, por eso es tan ligera.
    anchor: "#la-rama-es-un-puntero"
  - id: 2-1-e3
    question: En la zona de práctica de abajo, crea la rama feature y cambia a ella.
    type: task
    scenario: branching
    goal: Usa git switch -c feature para crear y cambiar de rama en un solo paso.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature equivale a dos pasos, «crear la rama feature + cambiarte a ella». HEAD ahora apunta a feature.
    anchor: "#git-switch-cambiar-de-rama"
  - id: 2-1-e4
    question: En la zona de práctica de abajo, vuelve a la rama main.
    type: task
    scenario: branching
    goal: Usa git switch main para volver a main.
    checks:
      - type: branchIs
        name: main
    explanation: Cambiar de rama solo mueve HEAD y el contenido del working tree; los commits siguen cada uno en su rama.
    anchor: "#git-switch-cambiar-de-rama"
---

# git branch y git switch

## Objetivos de la lección

- Ver y crear ramas con git branch
- Cambiar de rama con git switch
- Entender que la rama es un puntero y que HEAD señala tu posición actual

## La rama es un puntero

Una **rama (branch)** es, en esencia, un **puntero móvil a un commit**. Crear una rama no copia ningún archivo; solo añade un nombre que apunta al commit actual:

```bash
git branch feature
```

Este comando registra en el repositorio un nombre, `feature`, que apunta al commit donde está HEAD. Cuando luego haces commits en `feature`, el puntero de `feature` avanza con ellos.

**Concepto clave: las ramas no tienen «código propio»**; son solo una marca de posición dentro de la historia. En el mismo working tree, al cambiar el nombre de la rama ves los archivos de la instantánea a la que apunta el puntero de esa rama.

## git branch: ver y crear ramas

```bash
git branch          # lista todas las ramas; la rama actual lleva *
git branch <nombre> # crea una rama (sin cambiar a ella)
```

Al listar, la salida se parece a esto:

```
* main
  feature
```

Crear una rama solo registra un puntero; **no cambia a ella**. Para irte a ella, usa switch.

## git switch: cambiar de rama

```bash
git switch <nombre>    # cambia a una rama existente
git switch -c <nombre> # crea y cambia a la vez (el más usado)
```

- `git switch feature`: HEAD se mueve a `feature` y los archivos del working tree se reemplazan por la instantánea a la que apunta esa rama
- `git switch -c feature`: crea una rama nueva y cambia a ella al instante; equivale a `git branch feature` + `git switch feature`

**Sintaxis antigua**: `git checkout <nombre>` y `git checkout -b <nombre>` son los comandos antiguos equivalentes; `git switch` es el comando nuevo recomendado, y la zona de práctica soporta ambos. `git checkout` también tenía el uso de «restaurar archivos», que hoy cubre `git restore` (capítulo 1).

Si el working tree tiene cambios sin commitear, git se niega a cambiar y te pide commitearlos o apartarlos con stash — porque al cambiar de instantánea, esos cambios no tendrían dónde quedarse.

## HEAD señala tu posición actual

**HEAD** es un puntero especial que marca «en qué rama y en qué commit estás». El `On branch feature` que aparece al principio de `git status` es la respuesta de HEAD. Cambiar de rama es mover el puntero de HEAD.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="branching" />

<LessonProgress />
