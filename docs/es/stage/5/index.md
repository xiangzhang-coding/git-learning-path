# Capítulo 5 — Ecosistema GitHub

El hilo de principios de este capítulo: **el circuito de colaboración en torno a GitHub**. fork crea tu copia, upstream conecta con el autor original; el PR es la puerta por la que los commits entran en main, la issue acoge la discusión, la release publica versiones, y Actions y Pages automatizan las pruebas y el despliegue. Este capítulo se practica en GitHub real — cada concepto viene con tareas para hacer a mano.

## Lista de práctica

Completa el flujo completo de abajo en GitHub real y marca las casillas para seguir el progreso:

<Checklist :tasks="[
  { text: 'Haz fork de un repositorio de código abierto que uses a menudo', link: '/es/stage/5/5-1-fork-upstream' },
  { text: 'Clona tu fork, añade upstream y completa una sincronización', link: '/es/stage/5/5-1-fork-upstream' },
  { text: 'Empuja una rama de función y abre un PR real', link: '/es/stage/5/5-2-pull-request' },
  { text: 'Vive una discusión de review dentro de un PR', link: '/es/stage/5/5-2-pull-request' },
  { text: 'Abre una issue y crea un label y un milestone', link: '/es/stage/5/5-3-issues' },
  { text: 'Envía un PR que enlace una issue (fixes #número)', link: '/es/stage/5/5-3-issues' },
  { text: 'Crea el tag v0.1.0 y publica la primera Release', link: '/es/stage/5/5-4-releases' },
  { text: 'Publica una versión de parche y escribe notas en tres partes', link: '/es/stage/5/5-4-releases' },
  { text: 'Escribe un workflow que despliegue una página estática en Pages', link: '/es/stage/5/5-5-actions-pages' },
  { text: 'Equivócate a propósito en el paso de build y observa los logs de fallo de Actions', link: '/es/stage/5/5-5-actions-pages' }
]" />

## Lecciones

- 5-1 [fork y sincronización con upstream](/es/stage/5/5-1-fork-upstream): fork crea la copia, upstream recibe las actualizaciones del autor original
- 5-2 [Flujo de trabajo de Pull Request](/es/stage/5/5-2-pull-request): abrir un PR, review y discusión, las tres formas de fusionar
- 5-3 [Issues y colaboración](/es/stage/5/5-3-issues): discutir con issues, labels y milestones, cerrar una issue con un PR
- 5-4 [Releases y versionado](/es/stage/5/5-4-releases): versionado semántico, subir tags, publicar Releases
- 5-5 [GitHub Actions y Pages](/es/stage/5/5-5-actions-pages): automatizar con workflows, desplegar con Pages

## Funciones clave de este capítulo

| Función | Qué hace |
| --- | --- |
| fork | Copia el repositorio a tu cuenta en GitHub |
| pull request | Solicitud para fusionar los commits de una rama en el repositorio destino |
| issue | Discutir y seguir bugs, funciones y tareas |
| milestone | Agrupa un conjunto de issues en un objetivo de versión |
| release | Publicación oficial basada en un tag (con notas y adjuntos) |
| GitHub Actions | Automatización de CI/CD dirigida por eventos |
| GitHub Pages | Alojamiento gratuito de sitios estáticos (este proyecto lo usa) |

<StageProgress stage="5" />
