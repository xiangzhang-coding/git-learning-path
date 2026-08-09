---
title: git revert y git cherry-pick
exercises:
  - id: 4-3-e1
    question: ¿Cómo deshace git revert un commit?
    options:
      - Crea un commit inverso nuevo y la historia sigue hacia delante
      - Borra ese commit directamente
      - Mueve la punta de la rama hacia atrás
    correct: 0
    explanation: revert no reescribe la historia — contrarresta los cambios del commit objetivo con un commit inverso nuevo; ideal para commits ya publicados.
    anchor: "#git-revert-deshace-un-commit"
  - id: 4-3-e2
    question: ¿Para qué sirve git cherry-pick?
    options:
      - Copia el commit de una rama a la rama actual
      - Fusiona dos ramas
      - Elige archivos para compararlos
    correct: 0
    explanation: cherry-pick aplica los cambios de un commit concreto a la rama actual y crea un commit nuevo — perfecto para quedarte solo con un commit de otra persona.
    anchor: "#git-cherry-pick-copia-un-commit"
  - id: 4-3-e3
    question: En la zona de práctica de abajo, deshaz ese commit malo.
    type: task
    scenario: revert
    goal: "Usa git revert para deshacer el último commit malo (fix: break hello) y que hello.txt recupere el contenido correcto."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert crea un commit nuevo "Revert \"fix: break hello\"" y hello.txt vuelve al contenido de antes de romperse.'
    anchor: "#git-revert-deshace-un-commit"
  - id: 4-3-e4
    question: En la zona de práctica de abajo, copia el commit de la rama feature a main.
    type: task
    scenario: cherry-pick
    goal: En la rama main, ejecuta git cherry-pick <el commit de feature> para llevar la función de feature.txt a main.
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: tras el cherry-pick, la rama feature queda intacta y main gana un commit con el mismo contenido.
    anchor: "#git-cherry-pick-copia-un-commit"
---

# git revert y git cherry-pick

## Objetivos de la lección

- Deshacer un commit existente con git revert
- Copiar commits con git cherry-pick
- Entender que ninguno de los dos reescribe la historia

## git revert deshace un commit

```bash
git revert <commit>
```

revert no «borra» ese commit, sino que **crea un commit inverso nuevo**: aplica los cambios del commit objetivo en sentido contrario y la historia sigue hacia delante:

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

¿Por qué no reset? Porque **revert no reescribe la historia** — si el commit ya ha sido clonado o descargado por otros, un reset lo dejaría todo en versiones distintas; revert solo «añade un commit que compensa», seguro para todos. Por eso: **errores locales sin publicar → reset; errores ya publicados → revert**.

## git cherry-pick copia un commit

```bash
git cherry-pick <commit>   # copia ese commit a la rama actual
```

cherry-pick aplica los **cambios de un commit concreto** a la rama actual y crea un commit nuevo (mismo contenido, hash distinto). Caso típico: otra persona arregló un bug en la rama feature y tú quieres llevarte solo ese arreglo a main, sin fusionar toda la rama feature.

```
o  A ---- B (main) ---- B' (arreglo cherry-pickado)
     \
      C (arreglo en feature)
```

## Diferencia entre revert y cherry-pick

| | revert | cherry-pick |
| --- | --- | --- |
| Dirección | Deshacer (aplicar en inverso) | Copiar (aplicar en directo) |
| Cuándo | Un commit tiene un error que quitar | Un commit es bueno y quieres moverlo a otra rama |
| Resultado | Un commit nuevo que anula al anterior | Un commit nuevo que replica al anterior |

Ninguno de los dos reescribe la historia existente, y ambos se detienen ante un conflicto esperando a que lo resuelvas.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="revert" />

<LessonProgress />
