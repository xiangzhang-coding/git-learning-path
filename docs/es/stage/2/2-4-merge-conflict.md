---
title: Resolver conflictos de fusión
exercises:
  - id: 2-4-e1
    question: ¿Cuándo se produce un conflicto (conflict)?
    options:
      - Cuando ambas partes modificaron el mismo sitio del mismo archivo
      - Cuando ambas partes modificaron archivos distintos
      - Siempre que se ejecuta git merge
    correct: 0
    explanation: Si los cambios están en sitios distintos, git los fusiona solo; solo cuando ambos lados tocaron el mismo sitio y git no puede decidir de quién quedarse te toca decidir a ti.
    anchor: "#como-se-produce-un-conflicto"
  - id: 2-4-e2
    question: ¿Qué contenido hay entre los marcadores <<<<<<< HEAD y =======?
    options:
      - La modificación de la rama actual (HEAD) en ese sitio
      - La modificación de la otra rama en ese sitio
      - El contenido completo del archivo
    correct: 0
    explanation: En el archivo con conflicto, entre <<<<<<< HEAD y ======= está la versión «de tu lado», y entre ======= y >>>>>>>, la del otro lado.
    anchor: "#los-marcadores-de-conflicto"
  - id: 2-4-e3
    question: En la zona de práctica de abajo, provoca un conflicto y resuélvelo.
    type: task
    scenario: conflict
    goal: "Ejecuta git merge feature para provocar el conflicto; cambia el contenido de hello.txt a \"hello resolved\" y elimina los marcadores de conflicto; haz git add hello.txt y, por último, git commit para completar la fusión."
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: "Resolver un conflicto es, en el fondo, «tomar tú la decisión que git no pudo tomar»: edita el archivo, borra los marcadores, haz add y commit — así nace el merge commit."
    anchor: "#el-proceso-para-resolver-el-conflicto"
  - id: 2-4-e4
    question: Tras resolver el conflicto (después del add), ¿qué comando completa la fusión?
    options:
      - git commit (convierte el resultado en un merge commit)
      - git stash
      - git reset
    correct: 0
    explanation: Tras resolver y hacer add, git sigue en plena fusión (existe MERGE_HEAD); en ese momento git commit genera el merge commit con el contenido actual y termina la fusión.
    anchor: "#el-proceso-para-resolver-el-conflicto"
---

# Resolver conflictos de fusión

## Objetivos de la lección

- Entender por qué se producen los conflictos
- Leer los marcadores de conflicto
- Dominar el proceso estándar para resolverlos: editar → add → commit

## Cómo se produce un conflicto

Al fusionar, git tiene que combinar los cambios de ambos lados en una sola pieza. Si ambos lados tocaron **sitios distintos**, git fusiona en automático; pero si **ambas partes modificaron el mismo sitio del mismo archivo**, git no sabe de quién quedarse — solo puede meter las dos versiones en el archivo y dejarte la decisión a ti.

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

La salida te dice claramente en qué archivo está:

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Los marcadores de conflicto

Cada bloque en conflicto de un archivo tiene tres marcadores:

| Marcador | Significado |
| --- | --- |
| `<<<<<<< HEAD` | Debajo está tu versión (la de la rama actual) |
| `=======` | Línea separadora |
| `>>>>>>> feature` | Debajo está la versión de la otra rama (feature); el nombre del marcador es el de la otra rama |

**Tu tarea**: decide qué versión se queda (o escribe una nueva) y borra los tres marcadores.

## El proceso para resolver el conflicto

El proceso estándar tiene cuatro pasos:

```bash
git merge feature          # 1. provoca el conflicto
# edita el archivo: elige el contenido y borra los marcadores
git add hello.txt          # 2. dile a git que este archivo está resuelto
git commit -m "merge: resolve"   # 3. completa la fusión y crea el merge commit
```

Mientras tanto, `git status` te recuerda que estás en plena fusión: con archivos sin resolver muestra `You have unmerged paths`; cuando ya los has añadido todos, `All conflicts fixed but you are still merging` — entonces toca commitear.

**La idea clave**: un conflicto no es un error; es git entregándote la decisión. Al resolverlo se genera igualmente un merge commit normal y la historia registra la fusión como siempre.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="conflict" />

<LessonProgress />
