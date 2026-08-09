---
title: "git fetch y git pull"
exercises:
  - id: 3-4-e1
    question: ¿Qué hace git fetch?
    options:
      - Descarga los commits nuevos del remoto y actualiza la rama de seguimiento, sin tocar tu working tree
      - Descarga y fusiona directamente en la rama actual
      - Envía tus commits locales al remoto
    correct: 0
    explanation: fetch solo actualiza el «espejo del remoto» (origin/main); tu rama y tu working tree quedan igual — una forma segura de ver qué hay en el remoto.
    anchor: "#git-fetch-solo-mira-sin-tocar"
  - id: 3-4-e2
    question: ¿Qué relación hay entre git pull y git fetch?
    options:
      - pull = fetch + merge (fusiona los commits nuevos del remoto en la rama actual)
      - pull = fetch + push
      - Son exactamente iguales
    correct: 0
    explanation: pull primero hace fetch para actualizar el espejo y luego fusiona (o hace fast-forward) origin/main en la rama actual.
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: En la zona de práctica de abajo, baja los commits nuevos del remoto.
    type: task
    scenario: pull-ff
    goal: Estando en main, ejecuta git pull para fusionar en fast-forward los commits nuevos del remoto.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: "Cuando el local no tiene commits nuevos, pull hace un fast-forward: los archivos nuevos del remoto aparecen directamente en el working tree y la historia se mantiene en línea recta."
    anchor: "#git-pull-fetch-merge"
---

# git fetch y git pull

## Objetivos de la lección

- Descargar las actualizaciones del remoto con git fetch sin tocar el working tree
- Entender que pull = fetch + merge
- Observar el estado del remoto con git log origin/main

## git fetch: solo mira, sin tocar

```bash
git fetch            # descarga todos los commits nuevos de origin
git fetch origin     # escritura equivalente
```

fetch descarga a tu máquina los **objetos de commit nuevos** del remoto y actualiza la rama de seguimiento `origin/main` — pero **no toca tu rama ni tu working tree**:

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

Después del fetch puedes «mirar» el estado del remoto con seguridad, y ver cuánta diferencia hay entre el remoto y tu máquina:

```bash
git log origin/main --oneline   # qué hay del lado del remoto
git log main..origin/main       # commits que tiene el remoto y tú no
```

## git pull: fetch + merge

```bash
git pull             # equivale a git fetch + git merge origin/main
```

pull es la combinación de dos pasos: primero hace fetch (actualiza el espejo) y luego fusiona `origin/main` en la rama actual.

- **El local no tiene commits nuevos**: fusión fast-forward, el working tree se actualiza directamente y la historia se mantiene en línea recta
- **El local también tiene commits nuevos**: se produce un merge commit y las historias de las dos ramas se fusionan
- **Ambos lados tocaron el mismo sitio**: conflicto — el proceso de resolución es idéntico al del capítulo 2 (editar → add → commit)

## Cuándo usar cada uno

| Situación | Comando |
| --- | --- |
| Solo quieres ver qué hay de nuevo en el remoto | `git fetch` |
| Quieres traerte directamente los commits nuevos del remoto | `git pull` |
| No te deja hacer push (rechazado) | Primero `git pull` y luego `git push` |

**Regla de oro**: antes de hacer push, haz pull — primero fusiona las actualizaciones del remoto y luego empuja las tuyas; así nunca te rechaza el non-fast-forward.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="pull" />

<LessonProgress />
