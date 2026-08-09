---
title: "git worktree: múltiples árboles de trabajo"
exercises:
  - id: 4-5-e1
    question: ¿Qué es un git worktree?
    options:
      - Un directorio de trabajo adicional que comparte los objetos y refs del mismo repositorio
      - Una copia del repositorio con su propia historia
      - Una branch temporal para experimentos
    correct: 0
    explanation: "git worktree add crea otro directorio de trabajo que lee y escribe el mismo repositorio (objetos y refs compartidos), pero con su propio HEAD e index."
    anchor: "#un-repositorio-un-arbol-de-trabajo"
  - id: 4-5-e2
    question: ¿Se puede dejar la misma branch checked out en dos worktrees a la vez?
    options:
      - "No, git se niega: una branch solo puede estar checked out en un worktree"
      - Sí, ambos pueden trabajar en ella y fusionarla después
      - Solo si la branch aún no se ha pusheado
    correct: 0
    explanation: cada branch solo puede estar checked out en un worktree — de lo contrario dos worktrees sobrescribirían los commits del otro en la misma branch.
    anchor: "#git-worktree-add-un-segundo-worktree"
  - id: 4-5-e3
    question: ¿Qué pasa si ejecutas git worktree remove sobre un worktree con cambios sin commitear?
    options:
      - git se niega y conserva el worktree hasta que resuelvas los cambios
      - git borra los cambios junto con el worktree
      - git commitea los cambios automáticamente
    correct: 0
    explanation: "como medida de seguridad, remove se niega mientras haya cambios sin commitear — haz commit, stash, o pasa -f (force) si de verdad quieres descartarlos."
    anchor: "#git-worktree-remove-limpieza"
---

# git worktree: múltiples árboles de trabajo

## Objetivos de la lección

- Crear directorios de trabajo adicionales para el mismo repositorio con git worktree
- Entender que todos los worktrees comparten objetos y refs, pero tienen HEADs separados
- Listar y limpiar worktrees; saber por qué los agentes los usan

## Un repositorio, un árbol de trabajo

Por defecto, un repositorio significa un directorio de trabajo. Haces checkout de una branch, editas archivos, commiteas — y cuando necesitas otra branch, ejecutas `git switch` y el directorio entero cambia de contenido.

Ese cambio tiene un coste: el trabajo en curso de la branch actual debe commitearse o guardarse con stash primero, y ambas branches comparten el mismo directorio, así que nunca puedes ver dos branches a la vez.

`git worktree` rompe esa regla de uno a uno. Un **worktree** es un directorio de trabajo adicional conectado al mismo repositorio:

```
your project/            <- árbol de trabajo principal (el original)
├── .git/                <- compartido: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- segundo worktree (añadido con git worktree add)
└── src/  (branch hotfix)   <- otra branch, otro directorio
```

Todos los worktrees **comparten la misma base de datos de objetos y los mismos refs** — un commit hecho en un worktree es visible en todos —, pero cada worktree tiene **su propio HEAD e index**, así que cada uno puede estar en una branch distinta sin molestar a las demás.

## git worktree add: un segundo worktree

```bash
git worktree add <path> <branch>
```

Crea un nuevo directorio de trabajo en `<path>` y hace checkout de `<branch>` allí. Algunas formas habituales:

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

Detalles útiles:

- Si la branch ya existe, la ruta debe estar vacía — git no sobrescribe un directorio que tenga archivos.
- Una branch solo puede estar checked out en **un worktree**. Intentar hacer checkout de la misma branch en un segundo worktree falla con `fatal: '<branch>' is already checked out at ...`.
- Cuando ejecutas `git clone`, el clon es un repositorio separado completo; un worktree **no** es un clon — no tiene `.git` propio, apunta al del repositorio padre.

## git worktree list: ver todos los worktrees

```bash
git worktree list
```

Muestra todos los worktrees conectados al repositorio, con su ruta, la branch con checkout y cuál es el worktree principal:

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

El worktree principal es el directorio donde se clonó o creó originalmente el repositorio — no se puede eliminar.

## git worktree remove: limpieza

```bash
git worktree remove <path>
```

Elimina el directorio de trabajo y desregistra el worktree. Dos protecciones:

- El directorio no debe contener archivos sin trackear o modificados — si no, git se niega y te dice que hagas commit, stash o uses `-f`.
- `git worktree remove -f <path>` borra igualmente aunque haya cambios, descartándolos.

Un worktree eliminado deja la branch (y sus commits) intacta: el puntero de la branch sigue existiendo en el repositorio, listo para volver a hacerle checkout en el worktree principal más adelante.

## Por qué los agentes adoran los worktrees

Los agentes de codificación con IA (Claude Code, Cursor y similares) trabajan a menudo en varias tareas a la vez. Sin worktrees, un agente que cambia de tarea tiene que hacer commit o stash, cambiar de branch y luego desenredar los cambios — y un error puede mezclar las ediciones de una tarea en el commit de otra branch.

Con `git worktree add`, cada tarea tiene **su propio directorio y branch**, totalmente aislados:

- El agente de la tarea A edita `../task-a` en la branch `feature/login`
- El agente de la tarea B edita `../task-b` en la branch `fix/typo`
- Ambos commits caen en el mismo repositorio; ninguno puede tocar los archivos del otro

Cuando revisas el resultado, cada branch es una unidad limpia — y sigues teniendo una historia compartida que pushear. Esa separación es la razón por la que los flujos de trabajo basados en worktrees se han convertido en la norma para el desarrollo con agentes.

## Cuándo usar worktrees

Úsalos cuando:

- Necesitas trabajar en dos branches a la vez (un hotfix mientras el trabajo de la feature continúa)
- Ejecutas tests largos o un dev server en un worktree y sigues editando en otro
- Los agentes o las herramientas del equipo ejecutan tareas paralelas aisladas

No los uses cuando: una sola tarea a la vez es la norma — los directorios extra añaden papeleo sin beneficio.

## Ejercicios

<Exercise />

<LessonProgress />
