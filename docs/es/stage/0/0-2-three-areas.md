---
title: El modelo de tres áreas
exercises:
  - id: 0-2-e1
    question: ¿En qué área se encuentran los archivos que estás editando ahora mismo?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 0
    explanation: El working tree es donde editas archivos; la staging area es la lista de cambios preparados; el repository guarda el historial commiteado.
    anchor: "#las-tres-áreas"
  - id: 0-2-e2
    question: ¿Qué mueve git add?
    options:
      - Cambios del working tree a la staging area
      - Cambios de la staging area al repository
      - Cambios del repository al working tree
    correct: 0
    explanation: git add registra los cambios del working tree en la staging area; es git commit quien escribe el historial (staging area → repository).
    anchor: "#las-tres-áreas"
  - id: 0-2-e3
    question: ¿Qué mueve git commit?
    options:
      - Working tree → staging area
      - Staging area → repository
      - Descarta los cambios
    correct: 1
    explanation: commit agrupa los cambios preparados en un commit guardado en el repository (el directorio .git) — una instantánea en el historial.
    anchor: "#las-tres-áreas"
  - id: 0-2-e4
    question: ¿Cuál es la mayor ventaja de la staging area?
    options:
      - Hace el commit más tedioso
      - Permite separar los commits y mantener el historial limpio
      - Corrige errores automáticamente
    correct: 1
    explanation: ¿Cambiaste dos funciones sin relación? Añade y commitea primero una, luego la otra — cada commit sigue siendo legible y reversible.
    anchor: "#por-qué-una-área-extra"
---

# El modelo de tres áreas

## Objetivos de la lección

- Conocer el working tree, la staging area y el repository
- Entender qué mueven git add y git commit
- Saber qué muestra git status

## Las tres áreas

Git divide un repositorio en tres áreas:

- **Working tree**: los archivos que estás editando — es lo que modifica tu editor
- **Staging area (también llamada index)**: la lista de cambios elegidos para el próximo commit
- **Repository (el directorio `.git`)**: instantáneas del historial commiteado

`git status` muestra exactamente las diferencias entre estas áreas: archivos modificados pero no añadidos, añadidos pero no commiteados.

## Por qué un área extra

La staging area permite **commits por partes**: cambiaste dos funciones sin relación, añade y commitea primero la primera y luego la segunda — cada commit del historial queda limpio, legible y reversible. Sin ella, una sesión de edición se convierte en un único commit todo-terreno («más cambios»).

## Animación: las tres áreas

Pulsa los botones y observa cómo el archivo se mueve entre áreas: la edición ocurre en el working tree, `git add` lo registra en la staging area y solo `git commit` escribe el historial.

<ThreeAreas />

## Ejercicios

<Exercise />

<LessonProgress />
