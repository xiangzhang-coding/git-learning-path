# Capítulo 3 — Colaboración remota

El hilo de principios de este capítulo: **dos repositorios y las ramas de seguimiento**. Un remote es la dirección de otro repositorio; clone lo copia, fetch actualiza el «espejo del remoto» (origin/main), push envía tus commits locales y pull = fetch + merge.

## Lecciones

- 3-1 [git remote: el repositorio remoto](/es/stage/3/3-1-remote): qué es un remote, añadirlo y verlo
- 3-2 [git clone: clonar un repositorio](/es/stage/3/3-2-clone): una copia completa de una vez, origin y las ramas de seguimiento
- 3-3 [git push: subir commits](/es/stage/3/3-3-push): envía tus commits locales, el rechazo non-fast-forward
- 3-4 [git fetch y git pull](/es/stage/3/3-4-fetch-pull): fetch solo mira sin tocar nada, pull = fetch + merge

## Comandos nuevos de este capítulo

| Comando | Qué hace |
| --- | --- |
| `git remote add <name> <url>` | Registra la dirección de un repositorio remoto |
| `git remote -v` | Muestra el nombre y la dirección de todos los remotes |
| `git clone <url> [<dir>]` | Copia el repositorio remoto completo a tu máquina |
| `git push` | Sube al remoto los commits de la rama actual que le faltan |
| `git fetch` | Descarga los commits nuevos del remoto y actualiza la rama de seguimiento |
| `git pull` | fetch + merge: descarga y fusiona las actualizaciones del remoto |
| `git log origin/main` | Ver la historia a la que apunta la rama remota en este momento |
| `cd <dir>` | Cambiar de directorio en la zona de práctica (entrar en el repo clonado) |

<StageProgress stage="3" />
