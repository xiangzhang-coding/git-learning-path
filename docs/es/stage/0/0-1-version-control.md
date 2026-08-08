---
title: ¿Por qué el control de versiones?
exercises:
  - id: 0-1-e1
    question: ¿Cuál es el mayor problema de gestionar versiones copiando archivos y añadiendo fechas?
    options:
      - Los archivos ocupan demasiado espacio
      - "El historial no se puede consultar: no se puede volver de forma fiable a un estado anterior"
      - Los nombres de archivo son demasiado largos
    correct: 1
    explanation: "El defecto central no es el espacio ni los nombres, sino un historial irrecuperable: no puedes volver a una versión pasada ni saber cuál es la más reciente."
    anchor: "#qué-es-el-control-de-versiones"
  - id: 0-1-e2
    question: ¿Cuál NO es una capacidad básica de un sistema de control de versiones (VCS)?
    options:
      - Registrar cada cambio como una instantánea
      - Volver a cualquier versión histórica
      - Corregir automáticamente los errores del código
    correct: 2
    explanation: Un VCS registra, compara, revierte y facilita la colaboración; no corrige código. Eso es trabajo de quien escribe el código.
    anchor: "#qué-es-el-control-de-versiones"
  - id: 0-1-e3
    question: ¿Cuál es la diferencia clave entre el control centralizado (p. ej. SVN) y el distribuido (p. ej. Git)?
    options:
      - El centralizado exige red para hacer commit; el distribuido commitea en local
      - El distribuido no admite colaboración
      - No hay diferencia real
    correct: 0
    explanation: "En el centralizado, cada commit debe enviarse a un servidor central: sin red, sin commits. En el distribuido, cada clon es un repositorio completo y commiteas en local, incluso sin conexión."
    anchor: "#centralizado-vs-distribuido"
  - id: 0-1-e4
    question: ¿Qué guarda cada commit en Git?
    options:
      - Solo la diferencia con el commit anterior
      - Una instantánea completa de todo el proyecto
      - Solo las rutas de los archivos modificados
    correct: 1
    explanation: Un commit de Git guarda una instantánea completa (con compresión y deduplicación), no solo un diff; por eso se llama control de versiones «por instantáneas».
    anchor: "#centralizado-vs-distribuido"
---

# ¿Por qué el control de versiones?

## Objetivos de la lección

- Comprender qué resuelve un sistema de control de versiones (VCS)
- Comparar el control centralizado y el distribuido
- Saber a cuál pertenece Git

## El dolor de vivir sin control de versiones

Imagina un proyecto en marcha: a mitad de camino descubres que el enfoque no funciona y quieres volver al estado de ayer por la tarde — ¿dónde está ese archivo? Quizá en `final_v2_respaldo`, quizá ya sobrescrito. La colaboración es peor: dos personas editan el mismo archivo, gana quien guarde último y el trabajo de la otra desaparece en silencio.

Estos tres problemas — **registrar, volver atrás, colaborar** — son exactamente lo que Git resuelve.

## Qué es el control de versiones

Un sistema de control de versiones (VCS) registra cada cambio y guarda una **instantánea** completa del proyecto en cada momento, lo que permite:

- consultar cualquier versión histórica
- comparar las diferencias entre dos estados cualesquiera
- volver a cualquier estado anterior

No es una herramienta de copias de seguridad: la copia solo conserva la más reciente, mientras que un VCS mantiene todo el historial y cada versión es reconstruible.

## Centralizado vs distribuido

- **Centralizado (p. ej. SVN)**: un único repositorio central; todos hacen checkout desde él y cada commit debe viajar por la red. Si el servidor cae, nadie puede commitear.
- **Distribuido (p. ej. Git)**: cada clon es una copia completa del repositorio central. Los commits ocurren en local, incluso sin conexión; luego los empujas a los demás.

Como cada commit de Git guarda una instantánea completa en lugar de un diff, todo el historial es reconstruible desde cualquier clon — es precisamente lo que hace posible lo «distribuido».

## Animación: rebobinar la línea de tiempo

Mueve el deslizador o haz clic en un punto: el contenido de los archivos cambia con cada versión — «viajar al pasado» es exactamente lo que el control de versiones te da.

<TimelineRewind />

## Ejercicios

<Exercise />

## Zona de práctica

Esta lección no usa comandos; la zona de práctica llega en la etapa 1.

<LessonProgress />
