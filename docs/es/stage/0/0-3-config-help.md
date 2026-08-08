---
title: config y help
exercises:
  - id: 0-3-e1
    question: ¿Qué alcance tiene git config --global user.name?
    options:
      - Solo el repositorio actual
      - Todos los repositorios del usuario actual
      - Todos los usuarios de la máquina
    correct: 1
    explanation: --global escribe en ~/.gitconfig y se aplica a todos los repositorios del usuario actual; sin la opción, solo al repositorio actual (local).
    anchor: "#configuración-antes-del-primer-commit"
  - id: 0-3-e2
    question: ¿Cuál de los tres niveles de configuración tiene mayor prioridad?
    options:
      - system
      - global
      - local
    correct: 2
    explanation: "Cuanto más específico es el nivel, mayor es la prioridad: local > global > system. local solo pertenece al repositorio actual."
    anchor: "#tres-niveles-de-configuración"
  - id: 0-3-e3
    question: ¿Qué comando muestra rápido un resumen de uso de git commit?
    options:
      - git commit -h
      - git help commit
      - Ambos funcionan
    correct: 2
    explanation: -h muestra el resumen de uso y git help abre el manual completo; ambos son oficiales, usa el que necesites.
    anchor: "#cuando-te-encuentras-un-comando-desconocido"
  - id: 0-3-e4
    question: ¿Qué imprime git config --list?
    options:
      - Toda la configuración vigente
      - Solo la configuración de usuario
      - La lista de archivos del repositorio
    correct: 0
    explanation: --list imprime la configuración efectiva (el resultado fusionado de local > global > system) — el primer paso para diagnosticar problemas de configuración.
    anchor: "#configuración-antes-del-primer-commit"
---

# config y help

## Objetivos de la lección

- Definir user.name y user.email
- Entender los niveles system / global / local
- Usar help para consultar comandos

## Configuración antes del primer commit

Git necesita saber quién escribió cada commit — configura una vez:

```bash
git config --global user.name "Tu nombre"
git config --global user.email "tu@example.com"
```

`--global` se aplica a todos los repositorios. `git config --list` muestra toda la configuración vigente; `git config user.name`, una sola entrada.

## Tres niveles de configuración

La configuración tiene tres niveles — **cuanto más específico, más prioridad**:

| Nivel | Alcance | Ubicación |
| --- | --- | --- |
| system | todos los usuarios de la máquina | `/etc/gitconfig` |
| global | todos los repositorios del usuario | `~/.gitconfig` |
| local | el repositorio actual | `.git/config` |

El valor efectivo se resuelve en el orden local → global → system.

## Cuando te encuentras un comando desconocido

- `git help <comando>`: abre el manual completo
- `git <comando> -h`: resumen de uso rápido
- `git help --all`: lista todos los comandos

Olvidar un comando no es un problema — saber buscarlo es suficiente.

## Ejercicios

<Exercise />

<LessonProgress />
