---
title: "git rebase: reaplica commits"
exercises:
  - id: 4-4-e1
    question: ¿Qué hace git rebase?
    options:
      - Reaplica los commits de la rama actual (posteriores al punto de divergencia) encima del commit más nuevo de la rama destino
      - Fusiona dos ramas en un solo commit
      - Borra la historia de la rama actual
    correct: 0
    explanation: rebase «reaplica» uno a uno los commits posteriores al punto de divergencia encima de la rama destino; la historia pasa de ramificada a una línea recta.
    anchor: "#git-rebase-reaplica-commits"
  - id: 4-4-e2
    question: ¿Qué pasa con los hashes de los commits tras un rebase?
    options:
      - Los commits reaplicados tienen hash nuevo (mismo contenido, identidad distinta)
      - Se quedan igual
      - Solo cambia el primero
    correct: 0
    explanation: el hash incluye al commit padre y la fecha; reaplicar genera objetos de commit completamente nuevos — por eso no se hace rebase de ramas ya publicadas.
    anchor: "#git-rebase-reaplica-commits"
  - id: 4-4-e3
    question: En la zona de práctica de abajo, haz rebase de la rama feature sobre main.
    type: task
    scenario: rebase
    goal: Cambia a feature y ejecuta git rebase main para que los commits de feature queden después de los de main.
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: "tras el rebase el grafo es una línea recta: primero los dos commits de main, luego los de feature, sin commit de fusión."
    anchor: "#git-rebase-reaplica-commits"
  - id: 4-4-e4
    question: En la zona de práctica de abajo, aborta tras un conflicto de rebase.
    type: task
    scenario: rebase-conflict
    goal: Cambia a feature, ejecuta git rebase main para provocar el conflicto y luego git rebase --abort para volver al estado anterior.
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: si los dos lados tocaron el mismo sitio hay conflicto; --abort lo deja todo como estaba antes del rebase.
    anchor: "#conflictos-de-rebase-y-abort"
---

# git rebase: reaplica commits

## Objetivos de la lección

- Reaplicar los commits de tu rama sobre la rama destino con git rebase
- Entender que rebase reescribe la historia y crea hashes nuevos
- Entender los conflictos de rebase y --abort

## git rebase reaplica commits

```bash
git switch feature
git rebase main
```

rebase vuelve a aplicar cada commit de la rama actual **posterior al punto de divergencia**, encima del commit más nuevo de la rama destino:

```
Antes del rebase (ramificado):    Después del rebase (recta):
o  A                              o  A
|\                                o  B (main)
| o  B (main)                     o  C' (feature, hash nuevo)
o |  C (feature)                  o  D' (feature, hash nuevo)
 \|
  o  D (feature)
```

La salida es `Successfully rebased and updated refs/heads/feature.`. El grafo pasa de «rama» a «línea recta» — el valor central del rebase: **una historia más limpia**.

**Importante**: los commits reaplicados tienen **hash nuevo** (mismo contenido, identidad distinta). Es decir, rebase reescribe la historia — así que nunca hagas rebase de una rama ya publicada y en uso por otros.

## rebase o merge: cuál elegir

| | merge | rebase |
| --- | --- | --- |
| Historia | Conserva la ramificación + commit de fusión | Lineal, sin ramificación |
| Hashes | No cambian | Se reescriben (hash nuevo) |
| Rama publicada | Seguro | Prohibido |
| Cuándo | Fusionar ramas compartidas | Ordenar ramas locales |

Combinación habitual en el trabajo: con rebase ordenas la historia en línea recta localmente y, una vez publicada con push, usas merge para incorporarla a la rama compartida.

## Conflictos de rebase y --abort

rebase puede chocar con un conflicto al reaplicar cada commit (los dos lados tocaron el mismo sitio); entonces git se detiene:

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

Dos formas de resolverlo:

```bash
git rebase --continue   # tras resolver el conflicto (después del add), seguir reaplicando
git rebase --abort      # abandonar este rebase y volver al estado anterior
```

Igual que en un conflicto de merge: edita el archivo, quita las marcas, `git add`, y luego `--continue`. Si no quieres resolverlo, `--abort` y todo vuelve a estar como antes del rebase.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="rebase" />

<LessonProgress />
