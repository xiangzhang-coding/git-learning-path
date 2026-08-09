# Glosario

Los términos conservan siempre su nombre en inglés; esta tabla da una breve explicación.

| Término | Significado | Primera aparición |
| --- | --- | --- |
| repository | El directorio que almacena historial y metadatos (contiene `.git`) | 0-2 |
| working tree | El área donde editas archivos | 0-2 |
| staging area | La lista de cambios preparados para el próximo commit (también llamada index) | 0-2 |
| commit | Un registro completo en forma de instantánea | 0-1 |
| snapshot | El estado completo del proyecto en un momento dado | 0-1 |
| SHA-1 | Hash de contenido; el identificador único de un commit | Capítulo 1 |
| HEAD | Puntero al último commit de la rama actual | Capítulo 2 |
| branch | Un puntero móvil a un commit | Capítulo 2 |
| tag | Un nombre fijado a un commit concreto | Capítulo 4 |
| remote | Una copia del repositorio alojada en otro lugar | Capítulo 3 |
| origin | El nombre de remote por defecto tras un clone | Capítulo 3 |
| clone | Copiar un repositorio remoto a tu máquina | Capítulo 3 |
| fetch | Descargar commits remotos sin fusionar | Capítulo 3 |
| push | Subir commits locales a un remote | Capítulo 3 |
| pull | fetch + merge | Capítulo 3 |
| merge | Integrar otra rama en la actual | Capítulo 2 |
| rebase | Recolocar commits sobre una nueva base | Capítulo 4 |
| conflict | Cambios solapados que exigen resolución manual | Capítulo 2 |
| stash | Apartar temporalmente cambios sin commitear | Capítulo 4 |
| checkout | Cambiar de rama o restaurar archivos | Capítulo 2 |
| switch | Cambiar de rama (comando más reciente) | Capítulo 2 |
| restore | Restaurar un archivo a una versión dada | Capítulo 1 |
| reset | Mover HEAD y/o la staging area y el working tree | Capítulo 4 |
| revert | Deshacer un commit antiguo con un commit nuevo | Capítulo 4 |
| cherry-pick | Copiar un commit concreto a la rama actual | Capítulo 4 |
| diff | El cambio entre dos estados | Capítulo 1 |
| status | Resumen de las diferencias entre las tres áreas | Capítulo 1 |
| log | La lista del historial de commits | Capítulo 1 |
| tracking branch | Rama local asociada a una rama remota | Capítulo 3 |
| upstream | La rama remota que sigue una rama local | Capítulo 3 |
| fast-forward | Una fusión que simplemente avanza, sin divergencia | Capítulo 2 |
| detached HEAD | HEAD que no apunta a ninguna rama | Capítulo 4 |
| reflog | El registro completo de dónde ha estado HEAD | Capítulo 4 |
| DAG | Grafo acíclico dirigido; la topología del historial | Capítulo 2 |
| fork | Copiar el repositorio de otro a tu cuenta | Capítulo 5 |
| pull request | Solicitud de fusión de tu rama (PR) | Capítulo 5 |
| issue | Hilo de discusión para bugs, funciones o tareas | Capítulo 5 |
| label | Etiqueta que clasifica una issue (p. ej. bug, enhancement) | Capítulo 5 |
| milestone | Agrupa un conjunto de issues en un objetivo de versión | Capítulo 5 |
| release | Publicación oficial basada en un tag, con notas y adjuntos | Capítulo 5 |
| workflow | Flujo de trabajo, el proceso automatizado de GitHub Actions | Capítulo 5 |
