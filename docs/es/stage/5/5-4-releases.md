---
title: Releases y versionado
exercises:
  - id: 5-4-e1
    question: En el versionado semántico 2.4.1, ¿qué representa cada número?
    options:
      - 2 es la versión principal (cambio que rompe), 4 la menor (funciones nuevas) y 1 el parche (bug fixes)
      - 2 es el parche, 4 la principal y 1 la menor
      - los tres números no se distinguen
    correct: 0
    explanation: MAJOR.MINOR.PATCH — la principal rompe la compatibilidad, la menor añade funciones y el parche corrige bugs. La regla de incremento hace que el número de versión transmita información de compatibilidad.
    anchor: "#versionado-semantico"
  - id: 5-4-e2
    question: Para subir un tag anotado al remote, ¿qué es correcto?
    options:
      - primero git tag -a v1.0.0 -m "v1.0.0" y después git push origin v1.0.0
      - git push ya sube todos los tags automáticamente
      - con crear el tag basta, no hace falta push
    correct: 0
    explanation: primero se crea el tag y luego se sube explícitamente; git push no sube tags por defecto (a menos que uses git push --tags).
    anchor: "#crear-un-tag-y-subirlo"
  - id: 5-4-e3
    question: ¿Qué relación hay entre un GitHub Release y un git tag?
    options:
      - el Release se apoya en un tag y además ofrece las notas de la versión y adjuntos
      - el Release no tiene relación con el tag
      - el Release es una rama
    correct: 0
    explanation: el Release se crea a partir de un tag existente y le añade el texto de las release notes y adjuntos binarios, dando forma a la versión oficial.
    anchor: "#crear-un-release"
---

# Releases y versionado

## Objetivos de la lección

- Entender las reglas del versionado semántico
- Crear un tag y subirlo a GitHub
- Crear un Release con notas y adjuntos

## Versionado semántico

El número de versión MAJOR.MINOR.PATCH (por ejemplo 2.4.1):

| Posición | Cuándo sube |
| --- | --- |
| MAJOR versión principal | Cambio que rompe, incompatible con versiones anteriores |
| MINOR versión menor | Funciones nuevas, retrocompatible |
| PATCH parche | Corrige bugs, sin funciones nuevas |

La regla es simple: subir la versión principal explica «por qué tu programa se rompió de repente»; subir el parche significa «puedes actualizar con tranquilidad».

## Crear un tag y subirlo

Antes de publicar, crea el tag en local (lo viste en la etapa 4):

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

Ojo: `git push` no sube tags por defecto; hay que subirlos explícitamente con `git push origin <tag>` (o todos de una vez con `git push --tags`).

## Crear un Release

En GitHub, página del repositorio → Releases → Draft a new release:

1. Elige (o crea) el tag, por ejemplo v1.0.0
2. Escribe el título y las notas de la versión (release notes)
3. Puedes adjuntar los binarios (instaladores, artefactos de build)
4. Pulsa Publish release

Un Release es «un tag con notas»: los usuarios descargan versiones y ven los cambios aquí, sin tener que rebuscar en el git log.

## Cómo escribir las release notes

Una buena nota de versión agrupa por lector:

- **Nuevo** (Features): funciones nuevas, pueden enlazar al PR
- **Correcciones** (Bug fixes): qué se ha arreglado, pueden enlazar a la issue
- **Cambios que rompen** (Breaking changes): avisos importantes para actualizar

## Manos a la obra

- Crea el tag v0.1.0 en tu proyecto y súbelo
- Publica el primer Release con una nota en tres secciones
- Publica una versión de parche y observa la lista de Releases

## Ejercicios

<Exercise />

<LessonProgress />
