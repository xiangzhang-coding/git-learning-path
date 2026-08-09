---
title: 5-1 fork y sincronización con upstream
exercises:
  - id: 5-1-e1
    question: ¿Cuál es la diferencia entre fork y clone?
    options:
      - fork copia el repositorio a tu cuenta en GitHub; clone lo copia a tu ordenador
      - fork solo copia el código; clone copia también la historia
      - fork es un alias de clone
    correct: 0
    explanation: fork crea una copia en los servidores de GitHub (bajo tu cuenta); clone copia el repositorio completo a tu máquina. Tras el fork normalmente también hay que clonar para poder trabajar.
    anchor: "#que-es-un-fork"
  - id: 5-1-e2
    question: ¿Por qué conviene conservar dos remotes, origin y upstream, en la colaboración open source?
    options:
      - origin apunta a tu fork y upstream al repositorio del autor original; cada uno cumple su función
      - porque un solo remote no cabe con toda la historia
      - GitHub exige dos remotes
    correct: 0
    explanation: solo puedes hacer push a tu propio fork (origin); upstream sirve para recibir las actualizaciones del autor original y para enviar tus contribuciones mediante un PR.
    anchor: "#agregar-el-remote-upstream"
  - id: 5-1-e3
    question: Para sincronizar los commits nuevos del upstream con tu fork, ¿cuál es el orden correcto?
    options:
      - git fetch upstream, fusionar (o rebasar) upstream/main en el main local y después push origin
      - git push upstream para traer el upstream
      - basta con git pull origin; el upstream se sincroniza solo
    correct: 0
    explanation: fetch solo descarga los commits del upstream; merge/rebase incorpora las actualizaciones al main local y, por último, push las envía a tu fork para que la copia en GitHub también se actualice.
    anchor: "#sincronizarse-con-el-upstream"
---

# fork y sincronización con upstream

## Objetivos de la lección

- Entender el papel del fork en la colaboración open source
- Registrar el repositorio del autor original con git remote add upstream
- Sincronizar las actualizaciones del upstream con fetch + merge

## Qué es un fork

fork (derivación) es copiar el repositorio de otra persona a tu propia cuenta de GitHub:

```
Autor original: github.com/author/project
    │ fork
    ▼
Tú: github.com/you/project   ← puedes modificarlo a tu gusto
```

fork es una función de GitHub (no un comando de git). La diferencia con clone: fork crea una copia en los servidores de GitHub, clone copia el repositorio a tu ordenador. El flujo típico de open source es «primero fork y después clone de tu fork»: no tienes permiso de escritura sobre el repositorio del autor original, así que solo puedes trabajar en tu propia copia.

## Clona tu propio fork

Después de pulsar Fork en GitHub, clona la copia que está bajo tu cuenta:

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v` muestra un remote: `origin` apunta a tu fork. De momento solo puedes leer y escribir en origin — las actualizaciones del autor original todavía no aparecen solas.

## Agregar el remote upstream

Registra el repositorio del autor original como segundo remote; por convención se llama `upstream`:

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

Ahora hay dos remotes: `origin` (tu fork, lectura y escritura) y `upstream` (el repositorio del autor, solo lectura para recibir actualizaciones). Recordar el papel de cada uno es el núcleo del flujo de trabajo con fork.

## Sincronizarse con el upstream

El upstream se actualiza todo el tiempo; para que tu fork siga el ritmo:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream` descarga los commits del upstream (sin tocar tu trabajo)
- `git merge upstream/main` (o rebase) incorpora las actualizaciones al main local
- `git push origin main` sincroniza las actualizaciones con tu fork en GitHub

Así tu fork se mantiene a la par del repositorio del autor original y, después, puedes abrir una rama sobre el código más reciente para hacer tu contribución.

## Manos a la obra

- Haz fork de un repositorio open source que uses a menudo
- Clónalo, añade el upstream y completa una sincronización
- Observa en la pestaña Issues cómo colaboran los demás

## Ejercicios

<Exercise />

<LessonProgress />
