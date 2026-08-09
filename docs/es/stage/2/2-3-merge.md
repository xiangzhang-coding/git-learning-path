---
title: "git merge: fusionar ramas"
exercises:
  - id: 2-3-e1
    question: ¿Cuándo ocurre una fusión fast-forward (avance rápido)?
    options:
      - Cuando la rama actual no tiene commits nuevos y los de la rama objetivo van todos por delante
      - En cualquier momento
      - Cuando las dos ramas tienen commits nuevos
    correct: 0
    explanation: Si main se quedó quieta y feature añadió commits por delante, el merge solo adelanta el puntero de main; la historia sigue una línea recta y no se crea ningún commit nuevo.
    anchor: "#fusion-fast-forward"
  - id: 2-3-e2
    question: Cuando las dos ramas tienen commits nuevos, ¿qué produce git merge?
    options:
      - Un merge commit (con dos commits padre)
      - Dos commits nuevos
      - Una etiqueta (tag)
    correct: 0
    explanation: Cuando la historia se bifurcó, git tiene que juntar los cambios de ambos lados y produce un merge commit con dos commits padre.
    anchor: "#merge-commit"
  - id: 2-3-e3
    question: En la zona de práctica de abajo, fusiona feature en main (fusión fast-forward).
    type: task
    scenario: merge-ff
    goal: Ejecuta git merge feature estando en main; tras la fusión, el working tree debe contener feature.txt.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "En la salida aparece Fast-forward: main no tiene commits nuevos, el puntero avanza hasta feature y en el working tree aparece feature.txt."
    anchor: "#fusion-fast-forward"
  - id: 2-3-e4
    question: En la zona de práctica de abajo, fusiona feature en main (las dos ramas ya se bifurcaron).
    type: task
    scenario: merge
    goal: Ejecuta git merge feature estando en main para completar una fusión normal.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: Esta vez la historia se bifurcó, así que el merge produce un merge commit. En el grafo de la zona de práctica se ve cómo el merge commit conecta con las dos ramas.
    anchor: "#merge-commit"
---

# git merge: fusionar ramas

## Objetivos de la lección

- Fusionar ramas en la rama actual con git merge
- Distinguir la fusión fast-forward del merge commit
- Entender que el merge commit tiene dos commits padre

## El flujo básico de git merge

```bash
git switch main     # primero vuelve a la rama que va a recibir los cambios
git merge feature   # fusiona feature en la actual
```

`git merge <rama>` integra los cambios de la rama objetivo en la **rama actual**. Primero busca el **ancestro común** de las dos ramas, luego calcula las diferencias de las dos rutas (ancestro común → rama actual, ancestro común → rama objetivo) y combina los cambios en una sola pieza.

## Fusión fast-forward

Si la rama actual no tiene commits nuevos y la objetivo solo «avanzó unos pasos por delante»:

```
o  A ← main se quedó aquí
|
o  B ← feature
|
o  C ← feature cometió otra vez
```

`git merge feature` solo necesita **adelantar el puntero** de `main` hasta C — eso es el fast-forward (avance rápido). La salida muestra `Fast-forward` y **no crea ningún commit nuevo**; la historia sigue una línea recta.

<MergeVisual />

## Merge commit

Si las dos ramas hicieron commits propios (la historia se bifurcó), no hay forma de «adelantar el puntero»: git tiene que combinar el contenido de ambos lados en un commit nuevo:

```
o  A
|\
| o  B (commit nuevo de main)
o |  C (commit nuevo de feature)
 \|
  o  M (merge commit; sus dos commits padre son B y C)
```

La peculiaridad de este **merge commit**: tiene dos commits padre (parent). En el grafo de la zona de práctica, el merge commit conecta con las dos ramas a la vez.

## Fusión automática

Mientras cada lado haya tocado sitios distintos, git combina los cambios de ambos lados sin que tengas que hacer nada — la salida se parece a esto:

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

Si ambos lados tocaron el mismo sitio, entra en juego el tema de la próxima lección: el conflicto.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="merge" />

<LessonProgress />
