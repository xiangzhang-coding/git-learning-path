---
title: git restore, git rm y git mv
exercises:
  - id: 1-4-e1
    question: ¿Qué efecto tiene git restore hello.txt?
    options:
      - Restaurar hello.txt a la versión de HEAD, descartando los cambios del working tree
      - Eliminar hello.txt
      - Añadir hello.txt a la staging area
    correct: 0
    explanation: git restore devuelve el archivo a la versión que hay en el repositorio (por defecto desde HEAD) y descarta las modificaciones del working tree. Ojo, solo actúa sobre archivos rastreados; los archivos sin rastrear no se ven afectados.
    anchor: "#git-restore-descarta-los-cambios"
  - id: 1-4-e2
    question: En la zona de práctica de abajo, restaura hello.txt con git restore.
    type: task
    scenario: local
    goal: hello.txt se ha modificado; usa git restore hello.txt para devolverlo a su estado original.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: Tras restaurarlo, hello.txt vuelve a contener «hello world», el working tree queda limpio y git status muestra nothing to commit.
    anchor: "#git-restore-descarta-los-cambios"
  - id: 1-4-e3
    question: En la zona de práctica de abajo, elimina notes.txt (que se conserva en el historial).
    type: task
    scenario: local
    goal: Usa git rm notes.txt para eliminar el archivo y preparar la eliminación.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: git rm hace dos cosas a la vez, elimina el archivo del working tree y prepara la eliminación. Tras el commit, el archivo desaparece de la versión más reciente, pero sigue siendo recuperable en el historial.
    anchor: "#git-rm-elimina-archivos"
  - id: 1-4-e4
    question: En la zona de práctica de abajo, renombra notes.txt a diary.txt.
    type: task
    scenario: local
    goal: Usa git mv notes.txt diary.txt para hacer el cambio de nombre y dejarlo preparado.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv combina «mover + preparar»; tras el cambio de nombre, git status muestra la eliminación del nombre antiguo y la adición del nuevo.
    anchor: "#git-mv-mueve-archivos"
---

# git restore, git rm y git mv

## Objetivos de la lección

- Descartar cambios del working tree con git restore
- Eliminar archivos con git rm
- Mover o renombrar archivos con git mv

## git restore descarta los cambios

¿Lo rompiste y quieres volver al último commit?

```bash
git restore <archivo>
```

`git restore` devuelve el archivo a la versión que hay en HEAD y **descarta las modificaciones del working tree**. Ojo: solo actúa sobre archivos rastreados (tracked) — a un archivo nuevo, que Git aún no conoce, restore no le hace nada.

## git rm elimina archivos

```bash
git rm <archivo>
```

Hace dos cosas en un solo paso: elimina el archivo del working tree y registra la eliminación en la staging area. Tras el commit, el archivo desaparece de la versión más reciente, pero sigue en el historial — se puede recuperar en cualquier momento.

## git mv mueve archivos

```bash
git mv nombre_antiguo nombre_nuevo
```

Mueve (renombra) el archivo y lo deja preparado. Git no «recuerda» el cambio de nombre en sí: lo detecta comparando contenidos — el archivo antiguo desaparece + un archivo nuevo con el mismo contenido = un cambio de nombre. Por eso, tras un mv, status muestra un deleted y un new file.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="local" />

<LessonProgress />
