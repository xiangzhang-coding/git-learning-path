---
title: git init y git status
exercises:
  - id: 1-1-e1
    question: ¿Qué hace git init?
    options:
      - Descargar el código de otra persona
      - Crear el directorio .git en el directorio actual y convertirlo en un repositorio
      - Crear un archivo nuevo
    correct: 1
    explanation: git init inicializa un repositorio de Git vacío en el directorio actual (crea el directorio .git); a partir de entonces, este directorio y sus subdirectorios quedan bajo control de versiones.
    anchor: "#git-init-crea-un-repositorio"
  - id: 1-1-e2
    question: ¿Qué te dice git status?
    options:
      - La rama actual y las diferencias entre las tres áreas
      - Las métricas de rendimiento de los archivos
      - El estado del servidor
    correct: 0
    explanation: git status es uno de los comandos más usados — muestra la rama actual, los cambios preparados, los cambios sin preparar y los archivos sin rastrear.
    anchor: "#git-status-muestra-el-estado"
  - id: 1-1-e3
    question: ¿Qué significa que un archivo está tracked (rastreado) por Git?
    options:
      - Que está en .gitignore
      - Que aparece en el historial o en la staging area de Git, que vigila sus cambios de forma continua
      - Que está bloqueado y no se puede modificar
    correct: 1
    explanation: Un archivo tracked es un archivo que Git conoce (ya commiteado o en la staging area); untracked es un archivo que acaba de aparecer en el working tree y Git aún no ha visto.
    anchor: "#git-status-muestra-el-estado"
  - id: 1-1-e4
    question: En la zona de práctica de abajo, inicializa un repositorio.
    type: task
    scenario: init
    goal: Usa git init para convertir el directorio actual en un repositorio de Git y luego confírmalo con git status.
    checks:
      - type: branchIs
        name: main
    explanation: Tras inicializar, git status mostrará «On branch main». La zona de práctica ya trae preconfigurados user.name y user.email, así que puedes commitear directamente.
    anchor: "#git-init-crea-un-repositorio"
---

# git init y git status

## Objetivos de la lección

- Crear un repositorio con git init
- Entender el estado del repositorio con git status
- Distinguir los archivos tracked y untracked

## git init crea un repositorio

El punto de partida del control de versiones: decirle a Git «este directorio queda bajo tu control».

```bash
git init
```

Crea el directorio `.git` en el directorio actual, donde viven la base de datos de objetos, el índice, las referencias y demás — es decir, el repositorio en sí. Los archivos del working tree no se ven afectados; a partir de este momento, cada cambio que hagas en ellos puede quedar registrado.

## git status muestra el estado

`git status` es el comando más usado: te resume las diferencias entre las tres áreas:

- En qué rama estás (On branch ...)
- Cambios preparados (Changes to be committed)
- Cambios sin preparar (Changes not staged for commit)
- Archivos sin rastrear (Untracked files)

Recuerda una regla clave: **Git no rastrea archivos nuevos automáticamente**. Un archivo recién creado solo entra en la staging area después de un `git add`; a partir de ahí, Git vigila sus cambios.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="init" />

<LessonProgress />
