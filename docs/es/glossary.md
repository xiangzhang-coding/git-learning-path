# Glosario

Los términos conservan siempre su nombre en inglés; esta tabla da una breve explicación.

| Término | Significado | Primera aparición |
| --- | --- | --- |
| repository | El directorio que almacena historial y metadatos (contiene `.git`) | 0-2 |
| working tree | El área donde editas archivos | 0-2 |
| staging area | La lista de cambios preparados para el próximo commit (también llamada index) | 0-2 |
| commit | Un registro completo en forma de instantánea | 0-1 |
| snapshot | El estado completo del proyecto en un momento dado | 0-1 |
| SHA-1 | Hash de contenido; el identificador único de un commit | Etapa 1 |
| HEAD | Puntero al último commit de la rama actual | Etapa 2 |
| branch | Un puntero móvil a un commit | Etapa 2 |
| tag | Un nombre fijado a un commit concreto | Etapa 4 |
| remote | Una copia del repositorio alojada en otro lugar | Etapa 3 |
| origin | El nombre de remote por defecto tras un clone | Etapa 3 |
| clone | Copiar un repositorio remoto a tu máquina | Etapa 3 |
| fetch | Descargar commits remotos sin fusionar | Etapa 3 |
| push | Subir commits locales a un remote | Etapa 3 |
| pull | fetch + merge | Etapa 3 |
| merge | Integrar otra rama en la actual | Etapa 2 |
| rebase | Recolocar commits sobre una nueva base | Etapa 4 |
| conflict | Cambios solapados que exigen resolución manual | Etapa 2 |
| stash | Apartar temporalmente cambios sin commitear | Etapa 4 |
| checkout | Cambiar de rama o restaurar archivos | Etapa 2 |
| switch | Cambiar de rama (comando más reciente) | Etapa 2 |
| restore | Restaurar un archivo a una versión dada | Etapa 1 |
| reset | Mover HEAD y/o la staging area y el working tree | Etapa 4 |
| revert | Deshacer un commit antiguo con un commit nuevo | Etapa 4 |
| cherry-pick | Copiar un commit concreto a la rama actual | Etapa 4 |
| diff | El cambio entre dos estados | Etapa 1 |
| status | Resumen de las diferencias entre las tres áreas | Etapa 1 |
| log | La lista del historial de commits | Etapa 1 |
| tracking branch | Rama local asociada a una rama remota | Etapa 3 |
| upstream | La rama remota que sigue una rama local | Etapa 3 |
| fast-forward | Una fusión que simplemente avanza, sin divergencia | Etapa 2 |
| detached HEAD | HEAD que no apunta a ninguna rama | Etapa 4 |
| reflog | El registro completo de dónde ha estado HEAD | Etapa 4 |
| DAG | Grafo acíclico dirigido; la topología del historial | Etapa 2 |
| fork | Copiar el repositorio de otro a tu cuenta | Etapa 5 |
| pull request | Solicitud de fusión de tu rama (PR) | Etapa 5 |
| issue | Hilo de discusión para bugs, funciones o tareas | Etapa 5 |
| milestone | Agrupa un conjunto de issues en un objetivo de versión | Etapa 5 |
| release | Publicación oficial basada en un tag, con notas y adjuntos | Etapa 5 |
| workflow | Archivo YAML que define la automatización de GitHub Actions | Etapa 5 |
