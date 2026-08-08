---
title: "git push: subir commits"
exercises:
  - id: 3-3-e1
    question: ¿Qué envía git push al remoto?
    options:
      - Los commits de la rama actual que el remoto aún no tiene (junto con su historia)
      - Todos los archivos del working tree
      - Todas las ramas locales
    correct: 0
    explanation: push envía los commits de la rama local que van por delante del remoto y hace avanzar la rama remota hasta la misma posición.
    anchor: "#git-push-enviar-commits"
  - id: 3-3-e2
    question: ¿Por qué git rechaza un push non-fast-forward (sin avance rápido)?
    options:
      - El remoto tiene commits que no tienes en local; sobrescribirlos perdería el trabajo de otra persona
      - El repositorio remoto está lleno
      - El nombre de la rama local no es válido
    correct: 0
    explanation: Si el remoto va por delante del local, el push sobrescribiría los commits nuevos del remoto — git rechaza esa sobrescritura y pide que primero hagas pull para fusionar y luego vuelvas a hacer push.
    anchor: "#el-push-non-fast-forward-se-rechaza"
  - id: 3-3-e3
    question: En la zona de práctica de abajo, sube tus commits locales al remoto.
    type: task
    scenario: push
    goal: Estando en main, ejecuta git push para subir al remoto los commits locales que van por delante.
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: Tras el push, la salida muestra To /origin y main -> main; el repositorio remoto apunta ahora al mismo commit que el local.
    anchor: "#git-push-enviar-commits"
---

# git push: subir commits

## Objetivos de la lección

- Subir commits locales al remoto con git push
- Entender que push solo sube «la parte que va por delante»
- Entender la regla de rechazo non-fast-forward

## git push: enviar commits

```bash
git push              # sube la rama actual a origin
git push origin main  # indica explícitamente el remoto y la rama
```

push envía **los commits de la rama actual que el remoto aún no tiene** y hace avanzar la rama remota hasta la misma posición que la local. La salida tiene esta forma:

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` indica que la rama remota avanzó del commit antiguo al nuevo. Cuando el push termina, el remoto y tu máquina comparten la misma historia.

**Ojo**: push solo sube «los commits que van por delante». Los cambios que no están ni en el remoto ni en tu historia, y los cambios sin commitear, no se envían.

## Actualización fast-forward y rama de seguimiento

push, en el fondo, **adelanta** la rama remota hasta la posición de la rama local (el concepto de avance rápido viene del merge de la etapa 2). Cuando el push termina, tu rama de seguimiento local `origin/main` también avanza en sincronía — es el espejo de «dónde está el remoto ahora», y coincide con él.

**Upstream (aguas arriba)**: cuando el push termina, tu rama local y la rama remota establecen una relación aguas arriba/aguas abajo — la rama remota es el upstream de tu rama local. Desde entonces, `git push` / `git pull` sin argumentos también saben con qué rama remota sincronizarse.

## El push non-fast-forward se rechaza

Si **el remoto tiene commits que no tienes en local** (porque otra persona empujó primero, o el repositorio remoto recibió actualizaciones por otro lado), empujar directamente sobrescribiría esos commits — git lo rechaza:

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

La solución es la que dice el propio mensaje: primero `git pull` para fusionar los commits nuevos del remoto, y luego push.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="push" />

<LessonProgress />
