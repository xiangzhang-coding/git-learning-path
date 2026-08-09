---
title: Issues y colaboración
exercises:
  - id: 5-3-e1
    question: ¿Cuál es el uso típico de una GitHub Issue?
    options:
      - reportar bugs, proponer funciones y discutir tareas concretas
      - almacenar copias de seguridad del código
      - escribir el registro de los commits
    correct: 0
    explanation: una issue es un hilo de discusión en torno a un problema concreto; puede asignarse a una persona, etiquetarse, incluirse en un milestone y enlazarse con un PR.
    anchor: "#que-es-una-issue"
  - id: 5-3-e2
    question: Para que una issue se cierre automáticamente al fusionar un PR, ¿qué hay que hacer?
    options:
      - escribir «fixes #12» en la descripción del PR o en el mensaje del commit asociado
      - mencionar el número del PR en un comentario de la issue
      - la issue solo puede cerrarse a mano
    correct: 0
    explanation: GitHub reconoce las palabras clave closes, fixes y resolves seguidas del número de issue y, al fusionar el PR, cierra la issue correspondiente automáticamente.
    anchor: "#cerrar-una-issue-con-un-pr"
  - id: 5-3-e3
    question: ¿Cuál es la función de label y de milestone?
    options:
      - label clasifica las issues (por ejemplo bug, feature); milestone agrupa un conjunto de issues en un objetivo de versión
      - label es una marca de permisos y milestone una línea de tiempo
      - ambos sirven para dar una estrella al repositorio
    correct: 0
    explanation: los labels facilitan el filtrado y la clasificación; los milestones expresan «qué debe estar listo en esta versión» y suelen corresponderse con un Release.
    anchor: "#labels-y-milestones"
---

# Issues y colaboración

## Objetivos de la lección

- Entender qué es una issue y cómo abrirla
- Organizar tareas con labels y milestones
- Enlazar un PR con una issue usando «fixes #número»

## Qué es una issue

Una issue es un hilo de discusión dentro del repositorio: reportar bugs, proponer funciones, discutir tareas concretas. Cada issue tiene un número (por ejemplo #12), título, descripción y comentarios; además puede asignarse a una persona, etiquetarse e incluirse en un milestone.

## Abrir una issue

En la página del repositorio, pulsa Issues → New issue. Una buena descripción incluye: qué problema hay, cómo reproducirlo y qué comportamiento se espera. Muchos repositorios ofrecen plantillas de issue (bug report / feature request): rellenarlas acelera mucho la gestión.

## Labels y milestones

- **label (etiqueta)**: clasifica las issues, por ejemplo bug, enhancement, good first issue. Filtrar por labels es la forma principal en que el mantenedor organiza el trabajo.
- **milestone (hito)**: agrupa un conjunto de issues bajo el mismo objetivo de versión, por ejemplo v1.2.0. El milestone muestra el progreso (x/y issues completadas).

## Cerrar una issue con un PR

En la descripción del PR (o en el mensaje del commit asociado) escribe:

```
fixes #12
```

GitHub enlaza ese PR con la issue 12 y, al fusionarse el PR, la issue se cierra automáticamente. Las palabras clave equivalentes son closes y resolves. Así, «qué cambio resolvió qué problema» queda trazable en la historia.

## Un vistazo al flujo de colaboración

```
descubrir un bug → abrir una issue (#12) → el mantenedor añade label + milestone
  → un colaborador abre una rama y arregla el bug → el PR escribe «fixes #12»
  → merge → la issue se cierra sola, el milestone suma +1
```

## Manos a la obra

- Abre una issue en tu propio repositorio y crea un label y un milestone
- Arregla un bug, abre un PR y enlaza la issue en la descripción
- Comprueba si la issue se cierra sola después de la fusión

## Ejercicios

<Exercise />

<LessonProgress />
