---
title: git log y git diff
exercises:
  - id: 1-3-e1
    question: ¿Qué muestra git log --oneline?
    options:
      - Un commit por línea, con hash corto + mensaje
      - El contenido completo de los archivos
      - El nombre de la rama actual
    correct: 0
    explanation: git log enumera el historial de commits; --oneline lo comprime a una línea (hash corto + mensaje) y es la forma de consulta más usada en el día a día.
    anchor: "#git-log-muestra-el-historial"
  - id: 1-3-e2
    question: ¿Qué muestra git diff?
    options:
      - La diferencia de contenido entre el working tree y la staging area
      - Las diferencias del historial de commits
      - Las diferencias de codificación de los archivos
    correct: 0
    explanation: git diff compara el working tree con la staging area (cambios sin preparar); git diff --staged compara la staging area con HEAD (cambios preparados).
    anchor: "#git-diff-muestra-los-cambios"
  - id: 1-3-e3
    question: En la zona de práctica de abajo, modifica src/a.js y haz un commit cuyo mensaje contenga "fix".
    type: task
    scenario: history
    goal: "Cambia const a = 2 por const a = 3 en src/a.js, luego añade y commitea con el mensaje \"fix: bump a\"."
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: Tras el commit, el historial pasa a tener 5 commits; la primera línea de git log --oneline es tu nuevo commit.
    anchor: "#git-log-muestra-el-historial"
---

# git log y git diff

## Objetivos de la lección

- Ver el historial de commits con git log
- Ver el contenido de los cambios con git diff
- Conocer el hash corto y el modelo de instantáneas

## git log muestra el historial

```bash
git log              # historial completo (autor, fecha)
git log --oneline    # un commit por línea: hash corto + mensaje
```

El hash SHA-1 de cada commit es su documento de identidad. En `git log --oneline` se muestra el hash corto (los primeros 7 caracteres), suficiente para identificar cualquier commit de forma inequívoca.

## git diff muestra los cambios

```bash
git diff             # working tree vs staging area (cambios aún no añadidos)
git diff --staged    # staging area vs HEAD (cambios añadidos sin commitear)
```

En la salida, las líneas que empiezan por `-` son las eliminadas y las que empiezan por `+` son las nuevas. Revisar con diff qué cambiaste antes de commitear es un hábito estándar.

## El modelo de instantáneas

Cada commit guarda una **instantánea completa**, no una diferencia. Git calcula el hash SHA-1 del contenido: a mismo contenido, mismo hash — por eso el hash permite verificar la integridad y deduplicar el almacenamiento. Es también la base de lo «distribuido»: el historial de cualquier clon está completo y es reconstruible.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="history" />

<LessonProgress />
