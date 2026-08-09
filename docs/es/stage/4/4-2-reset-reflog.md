---
title: git reset y reflog
exercises:
  - id: 4-2-e1
    question: ¿Qué hace git reset --hard?
    options:
      - Mueve HEAD, el índice y el working tree al commit de destino y descarta los commits y cambios intermedios
      - Solo cancela la información del último commit
      - Empuja los cambios al remoto
    correct: 0
    explanation: "--hard es la vuelta atrás de los tres a la vez: la punta de la rama, el área de staging y el working tree vuelven al estado del commit de destino — peligroso, pero muy usado."
    anchor: "#git-reset-mueve-head"
  - id: 4-2-e2
    question: ¿Se pueden recuperar los commits descartados con reset?
    options:
      - Sí, con git reflog encuentro su hash y hago reset de nuevo a él
      - No, desaparecen para siempre
      - Solo clonando desde el remoto
    correct: 0
    explanation: git no borra los objetos de commit al momento; reflog registra cada movimiento de HEAD, así que con el hash antiguo se recupera todo.
    anchor: "#git-reflog-recupera-commits-perdidos"
  - id: 4-2-e3
    question: En la zona de práctica de abajo, quita el último commit.
    type: task
    scenario: reset
    goal: Ejecuta git reset --hard HEAD~1 para quitar el último commit (con sus cambios).
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1 hace retroceder la rama un paso y deja el working tree en el estado anterior.
    anchor: "#git-reset-mueve-head"
  - id: 4-2-e4
    question: En la zona de práctica de abajo, recupera con reflog el commit descartado.
    type: task
    scenario: reset
    goal: "Usa git reflog para encontrar el commit que acabas de descartar (su mensaje contiene \"break\") y recupéralo con git reset --hard."
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: reflog muestra la historia completa de HEAD; encuentra el hash del commit anterior al reset y haz git reset --hard para recuperarlo todo.
    anchor: "#git-reflog-recupera-commits-perdidos"
---

# git reset y reflog

## Objetivos de la lección

- Mover HEAD y el estado del repositorio con git reset
- Distinguir entre --hard, mixed y --soft
- Recuperar commits descartados con git reflog

## git reset mueve HEAD

```bash
git reset --hard <commit>   # retrocede HEAD, índice y working tree
git reset <commit>          # retrocede HEAD e índice, el working tree se queda
git reset --soft <commit>   # solo mueve HEAD; índice y working tree intactos
```

**reset es «volver atrás»**: mueve la punta de la rama a cualquier commit. La diferencia entre los tres modos está en el «alcance»:

| Modo | HEAD | Índice (staging) | Working tree |
| --- | --- | --- | --- |
| `--soft` | Se mueve | Se queda | Se queda |
| Por defecto (mixed) | Se mueve | Se reinicia | Se queda |
| `--hard` | Se mueve | Se reinicia | Se reinicia |

`--hard` es el más usado y el más peligroso: todos los commits y cambios sin commitear intermedios desaparecen (el working tree se sobrescribe directamente). Tras el `--hard`, el mensaje `HEAD is now at <hash corto> <mensaje>` te dice dónde estás.

## git reflog recupera commits perdidos

```bash
git reflog
```

**reflog (reference log) es el registro completo de movimientos de HEAD** — no solo la historia de la rama actual, sino «dónde ha estado tu HEAD»:

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

Los commits descartados con reset **no se borran**: solo se quedan sin ninguna rama que apunte a ellos. Busca su hash en el reflog y `git reset --hard <hash>` los recupera por completo. Es el «antídoto del arrepentimiento» de git: si la operación pasó en tu máquina, casi siempre se puede recuperar.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="reset" />

<LessonProgress />
