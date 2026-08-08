---
title: "git remote: el repositorio remoto"
exercises:
  - id: 3-1-e1
    question: ¿Qué es un remote?
    options:
      - Una ubicación remota con una copia del repositorio (otro repositorio, normalmente en un servidor)
      - Una carpeta local
      - Un comando interno de git para comprimir repositorios
    correct: 0
    explanation: Un remote es la ubicación de «otra copia del repositorio». git lo usa para subir y bajar commits; origin es el nombre de remote por defecto tras un clone.
    anchor: "#que-es-un-remote"
  - id: 3-1-e2
    question: ¿Qué muestra git remote -v?
    options:
      - El nombre y la dirección de todos los remotes
      - La lista de todas las ramas
      - Todos los commits del remoto
    correct: 0
    explanation: git remote -v lista el nombre, la dirección y la configuración de fetch y push de cada remote.
    anchor: "#git-remote-ver-y-anadir"
  - id: 3-1-e3
    question: En la zona de práctica de abajo, añade un remote llamado origin.
    type: task
    scenario: remote
    goal: Registra el repositorio remoto con git remote add origin /origin y compruébalo con git remote -v.
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: remote add solo registra la dirección, no envía ningún dato. A partir de ahí, fetch, push y pull ya saben adónde ir.
    anchor: "#git-remote-ver-y-anadir"
---

# git remote: el repositorio remoto

## Objetivos de la lección

- Entender el concepto de remote: la ubicación de otra copia del repositorio
- Registrar un repositorio remoto con git remote add
- Ver la configuración con git remote -v

## Qué es un remote

Hasta ahora, todos tus commits viven solo en **una copia del repositorio en tu máquina**. Un proyecto real necesita colaboración: cada persona tiene su copia, y hay un «repositorio compartido» que sirve de punto de intercambio — ese es el remote.

Un remote (repositorio remoto) es, en esencia, **la dirección de otro repositorio git**. git no tiene ninguna «nube»: cualquier máquina (o directorio) puede hacer de remote. Tu repositorio lo referencia por nombre; el nombre por defecto es **origin** (se asigna automáticamente en el clone).

En la zona de práctica de esta lección, `/origin` es la ubicación de ese repositorio remoto — un repositorio en memoria independiente del `/repo` local.

## git remote: ver y añadir

```bash
git remote            # lista los nombres de los remotes
git remote -v         # lista nombre + dirección (una línea de fetch y otra de push)
git remote add <nombre> <dirección>   # registra un remote nuevo
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add` solo registra la dirección, **no envía ningún dato**. Escribe la configuración en `.git/config`:

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## Recuerda los dos roles

| Nombre | Qué significa |
| --- | --- |
| Rama local | `refs/heads/main`, aquí caen tus commits |
| remote | La dirección del repositorio remoto, p. ej. `/origin` |
| Rama de seguimiento (tracking branch) | `refs/remotes/origin/main`, el espejo local de «a qué apunta main en el remoto» |

La rama de seguimiento es la clave del clone/fetch de las próximas lecciones: te permite ver «cómo está el remoto» sin estar conectado.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="remote" />

<LessonProgress />
