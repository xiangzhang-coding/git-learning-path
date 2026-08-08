---
title: git add y git commit
exercises:
  - id: 1-2-e1
    question: ¿En qué área deja git add los cambios?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 1
    explanation: git add registra los cambios del working tree en la staging area — es la forma de decir «estos cambios están listos para commitear».
    anchor: "#git-add-prepara-los-cambios"
  - id: 1-2-e2
    question: ¿Qué hace el parámetro -m de git commit?
    options:
      - Fusionar dos ramas
      - Escribir el mensaje de esta entrega
      - Modificar el autor del commit
    correct: 1
    explanation: -m aporta el mensaje de commit, que registra qué hizo esta entrega. Un buen mensaje está escrito para los demás, incluido tu yo del futuro.
    anchor: "#git-commit-guarda-una-instantanea"
  - id: 1-2-e3
    question: En la zona de práctica de abajo, prepara todo.txt.
    type: task
    scenario: add-commit
    goal: Usa git add todo.txt para llevar el archivo a la staging area.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: Tras prepararlo, todo.txt aparecerá bajo «Changes to be committed» en git status.
    anchor: "#git-add-prepara-los-cambios"
  - id: 1-2-e4
    question: En la zona de práctica de abajo, haz un commit de todo.txt cuyo mensaje contenga "todo".
    type: task
    scenario: add-commit
    goal: "Añade todo.txt con git add y haz el commit con git commit -m \"feat: add todo\"."
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: Tras el commit, todo.txt entra en el historial del repositorio; fíjate en que la modificación de hello.txt sigue en el working tree, sin commitear — el commit solo empaqueta el contenido de la staging area.
    anchor: "#git-commit-guarda-una-instantanea"
---

# git add y git commit

## Objetivos de la lección

- Llevar cambios a la staging area con git add
- Guardar una instantánea con git commit
- Entender que el commit solo empaqueta el contenido de la staging area

## git add prepara los cambios

```bash
git add <archivo>    # prepara un único archivo
git add .            # prepara todos los cambios del directorio actual
```

`git add` registra los cambios del working tree en la **staging area**. Puedes preparar de forma selectiva: si cambiaste tres funcionalidades, añade solo una y haz el commit — el historial queda limpio.

## git commit guarda una instantánea

```bash
git commit -m "feat: add login page"
```

`git commit` empaqueta el contenido de la **staging area** en un commit y lo escribe en el historial del repositorio. Cada commit:

- guarda una **instantánea** completa de todos los archivos del proyecto (no una diferencia)
- recibe un ID único generado con el hash SHA-1 (p. ej. `4a2b9c1`)
- registra el autor, la fecha y el mensaje

**Regla clave: el commit solo contiene lo que está en la staging area.** Los cambios del working tree que no hayas añadido no entran en este commit.

## Cómo escribir el mensaje de commit

Di en una frase qué hiciste: empieza con un verbo, mantén el tiempo verbal consistente y no superes los 50 caracteres. Por ejemplo, `fix: correct the login validation`.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="add-commit" />

<LessonProgress />
