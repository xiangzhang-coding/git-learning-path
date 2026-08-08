---
title: "git clone: clonar un repositorio"
exercises:
  - id: 3-2-e1
    question: ¿Qué hace git clone?
    options:
      - Copia el repositorio remoto completo a tu máquina (historia + working tree) y configura origin automáticamente
      - Solo descarga el último commit
      - Sube el repositorio local al remoto
    correct: 0
    explanation: clone copia toda la historia, hace checkout del working tree de la rama por defecto, nombra el remoto origin y crea la rama de seguimiento.
    anchor: "#git-clone-una-copia-completa-de-una-vez"
  - id: 3-2-e2
    question: Tras el clone, ¿qué es origin/main?
    options:
      - "Una rama de seguimiento: el espejo local de «a qué commit apunta main en el remoto»"
      - Una carpeta dentro del repositorio remoto
      - Una rama local nueva en la que puedes hacer commits directamente
    correct: 0
    explanation: refs/remotes/origin/main es el espejo de seguimiento de solo lectura que registra dónde estaba main en el remoto en el momento del clone o del fetch.
    anchor: "#rama-de-seguimiento-origin-main"
  - id: 3-2-e3
    question: En la zona de práctica de abajo, clona el repositorio remoto y entra en el directorio clonado.
    type: task
    scenario: clone
    goal: Ejecuta git clone /origin y luego cd origin para entrar en el repositorio clonado; comprueba con git status que estás en main.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: Tras el clone entras en el directorio nuevo (cd) y te encuentras en una copia completa de la historia — el remote origin ya viene configurado.
    anchor: "#git-clone-una-copia-completa-de-una-vez"
---

# git clone: clonar un repositorio

## Objetivos de la lección

- Copiar un repositorio remoto a tu máquina con git clone
- Entender origin y la rama de seguimiento origin/main
- Entender que tras el clone hay que entrar con cd en el directorio nuevo

## git clone: una copia completa de una vez

```bash
git clone /origin          # crea un subdirectorio origin/ en el directorio actual y clona ahí dentro
git clone /origin mi-proyecto   # también puedes indicar el nombre del directorio
cd origin                  # entra en el repositorio clonado
```

`git clone <dirección>` hace cuatro cosas de una vez:

1. Crea un directorio nuevo en tu máquina (por defecto, con el último tramo de la dirección)
2. Copia la **historia completa** del remoto
3. Hace checkout del working tree de la rama por defecto (normalmente main)
4. Nombra el remoto **origin** automáticamente y crea la rama de seguimiento

clone es la entrada estándar para «unirse a un proyecto existente» — no necesitas `git init`; todo viene del remoto.

## Rama de seguimiento origin/main

Al clonar, git registra a qué commit apuntaba cada rama del remoto en ese momento y lo guarda como **rama de seguimiento (tracking branch)**:

```
refs/remotes/origin/main   # espejo de solo lectura: dónde está main en el remoto ahora mismo
```

Se diferencia de tu rama local (`refs/heads/main`): **tus commits no la mueven**; solo la actualizan `git fetch`, `git pull` y `git push`. Después puedes usar `git log origin/main` en cualquier momento para ver «cómo está el remoto».

## Copia vs. conexión

clone es una **copia**: el repositorio clonado es completamente independiente y su única conexión con el remoto es la dirección origin. Tus commits no llegan solos al remoto, ni los commits nuevos del remoto aparecen solos en tu máquina — fetch/push/pull, las tres lecciones siguientes, son el traslado en esos dos sentidos.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="clone" />

<LessonProgress />
