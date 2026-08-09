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
  - id: 4-3-e5
    question: ¿Para qué sirve git bisect?
    options:
      - Localiza con búsqueda binaria el primer commit que introdujo un bug
      - Fusiona el historial de dos ramas
      - Deshace el último commit
    correct: 0
    explanation: bisect marca un commit «bad» y uno «good»; luego hace checkout repetido del punto intermedio para que lo pruebes y, con búsqueda binaria, acota en pocas pasadas «desde qué commit empezó a ir mal».
    anchor: "#git-bisect-localiza-el-commit-defectuoso"
  - id: 4-3-e6
    question: En la zona de práctica de abajo, localiza con bisect el commit que introdujo el bug.
    type: task
    scenario: bisect
    goal: Ejecuta git bisect start, git bisect bad y git bisect good HEAD~3; cada vez que pase a un commit intermedio, revisa la función add de calc.js — si está bien, haz git bisect good; si tiene el bug, haz git bisect bad, hasta que quede localizado.
    checks:
      - type: bisectDone
    explanation: 'bisect localizará «fix: typo in add» — la función add empieza a fallar en él; al terminar, usa git bisect reset para volver a la rama original.'
    anchor: "#git-bisect-localiza-el-commit-defectuoso"
---

# git revert y git cherry-pick

## Objetivos de la lección

- Deshacer un commit existente con git revert
- Copiar commits con git cherry-pick
- Localizar el commit defectuoso con git bisect
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

## git bisect localiza el commit defectuoso

```bash
git bisect start          # iniciar
git bisect bad            # el HEAD actual es bad
git bisect good <commit>   # marca un commit bueno conocido
# bucle: checkout al punto intermedio → prueba → git bisect good / git bisect bad
git bisect reset          # terminar y volver a la rama original
```

«Una función está rota, pero no sé en qué commit empezó a romperse» — revisar la historia a mano commit a commit es demasiado lento. bisect usa **búsqueda binaria**: tras marcar un commit «bad» y uno «good», git hace checkout automático del commit intermedio; tú lo pruebas y dices good o bad, y el rango se reduce a la mitad. Con unas pocas pasadas queda localizado el primer commit que introdujo el bug.

## Ejercicios

<Exercise />

## Zona de práctica

<Playground scenario="revert" />

<LessonProgress />
