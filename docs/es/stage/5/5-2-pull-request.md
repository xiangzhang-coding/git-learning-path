---
title: 5-2 Flujo de trabajo de Pull Request
exercises:
  - id: 5-2-e1
    question: ¿Qué es un Pull Request (PR)?
    options:
      - una solicitud para fusionar los commits de una rama en otra rama del repositorio destino
      - sobrescribir el repositorio de otro directamente en tu máquina
      - la función de chat en grupo de GitHub
    correct: 0
    explanation: el PR es la solicitud formal «funde mis commits»; incluye la comparación de código, la discusión y el resultado de las comprobaciones automáticas.
    anchor: "#que-es-un-pull-request"
  - id: 5-2-e2
    question: Sobre las formas de fusionar un PR, ¿cuál afirmación es correcta?
    options:
      - Create a merge commit conserva la bifurcación y el commit de fusión; Rebase and merge deja la historia lineal
      - Squash and merge conserva cada commit original
      - la forma de fusionar no afecta a la historia
    correct: 0
    explanation: las tres formas producen historias distintas — el merge commit conserva la bifurcación, squash la comprime en un solo commit y rebase la reordena linealmente.
    anchor: "#fusionar-y-cerrar"
  - id: 5-2-e3
    question: Si el mantenedor pide cambios, ¿cómo se actualiza un PR ya abierto?
    options:
      - seguir haciendo commits en la rama del PR y hacer push; el PR se actualiza solo
      - crear un PR nuevo
      - basta con cambiar el título del PR
    correct: 0
    explanation: el PR es una ventana a la rama — en cuanto empujas commits nuevos a esa rama, la comparación del PR se actualiza automáticamente.
    anchor: "#actualizar-la-rama-del-pr"
---

# Flujo de trabajo de Pull Request

## Objetivos de la lección

- Entender el papel del PR en la colaboración
- Recorrer el flujo completo «abrir rama → push → abrir PR → discutir → fusionar»
- Conocer las tres formas de fusionar y la actualización de la rama del PR

## Qué es un pull request

Un Pull Request (PR) es la solicitud formal «funde mis commits en tu repositorio». No tienes permiso para escribir directamente en el repositorio de otro, pero sí puedes abrir un PR y que el mantenedor decida tras el review si se fusiona:

```
Rama de tu fork ──push──▶ tu fork
                            │ abrir PR
                            ▼
             main del repositorio del autor (a la espera de review y merge)
```

El PR no son solo commits: incluye la comparación de código (diff), la discusión y el resultado de las comprobaciones automáticas (CI) — es la unidad central de la colaboración open source.

## Abrir un PR

Requisito previo: empujar la rama de trabajo a tu fork:

```bash
git switch -c fix/login-bug
git commit -am "fix: login bug"
git push origin fix/login-bug
```

Vuelve a GitHub: en la página del repositorio aparece el botón Compare & pull request. Elige el base (la rama destino, por ejemplo main del repositorio del autor) y el compare (tu rama), escribe el título y la descripción y crea el PR.

## Review y discusión

El PR es el lugar de la discusión: el mantenedor puede dejar comentarios en líneas concretas de código (line comments), pedir cambios (request changes) o aprobar (approve). Cada commit nuevo que hagas entra en el hilo de la discusión y, cuando resolváis los comentarios, puedes mencionar a la otra parte con @ para que revise de nuevo.

## Fusionar y cerrar

Hay tres formas de fusionar, cada una con una historia distinta:

| Forma | Historia |
| --- | --- |
| Create a merge commit | Conserva la bifurcación y crea un commit de fusión |
| Squash and merge | Comprime todo en un solo commit |
| Rebase and merge | Reordenación lineal, sin commit de fusión |

Tras la fusión, GitHub suele sugerir eliminar la rama. Un PR también puede cerrarse (closed) sin fusionarse — por ejemplo si se abandona la idea.

## Actualizar la rama del PR

Cuando el mantenedor pide cambios no hace falta abrir otro PR: sigue haciendo commits en la rama y haz push; el PR se actualiza solo:

```bash
git commit -am "fix: address review feedback"
git push origin fix/login-bug
```

## Manos a la obra

- Empuja una rama de funcionalidad a GitHub y abre un PR real en un repositorio
- Deja un comentario en una línea de código dentro del PR y prueba el flujo de discusión
- Compara la historia que produce cada una de las tres formas de fusionar

## Ejercicios

<Exercise />

<LessonProgress />
