# Capítulo 5 — Ecossistema GitHub

A linha de princípios deste capítulo: **o circuito de colaboração em torno do GitHub**. O fork cria a sua cópia; o upstream conecta o autor original; o PR é a porta de entrada dos commits no branch principal; a issue carrega as discussões; o release publica versões; Actions e Pages automatizam testes e deploy. Este capítulo se pratica no GitHub real — cada conceito tem tarefas para mão na massa.

## Lista prática

Complete o fluxo completo de exercícios abaixo no GitHub real, marcando o progresso:

<Checklist :tasks="[
  { text: 'Fork um repositório open source que você usa', link: '/pt/stage/5/5-1-fork-upstream' },
  { text: 'Clone seu fork, adicione o upstream e faça uma sincronização', link: '/pt/stage/5/5-1-fork-upstream' },
  { text: 'Envie um branch de funcionalidade e abra um PR real', link: '/pt/stage/5/5-2-pull-request' },
  { text: 'Participe de uma discussão de review em um PR', link: '/pt/stage/5/5-2-pull-request' },
  { text: 'Abra uma issue e crie labels e milestones', link: '/pt/stage/5/5-3-issues' },
  { text: 'Envie um PR vinculado a uma issue (fixes #número)', link: '/pt/stage/5/5-3-issues' },
  { text: 'Crie a tag v0.1.0 e o primeiro Release', link: '/pt/stage/5/5-4-releases' },
  { text: 'Publique uma versão de patch com uma descrição de três partes', link: '/pt/stage/5/5-4-releases' },
  { text: 'Escreva um workflow que publica um site estático no Pages', link: '/pt/stage/5/5-5-actions-pages' },
  { text: 'Erre de propósito no passo de build e observe o log de falha do Actions', link: '/pt/stage/5/5-5-actions-pages' }
]" />

## Lições

- 5-1 [fork e sincronização com upstream](/pt/stage/5/5-1-fork-upstream): o fork cria a cópia, o upstream recebe as atualizações do autor
- 5-2 [Fluxo de trabalho de Pull Request](/pt/stage/5/5-2-pull-request): abrir PR, discussão de review, as três formas de merge
- 5-3 [Issues e colaboração](/pt/stage/5/5-3-issues): discussão em issues, labels e milestones, PR que fecha issue
- 5-4 [Releases e versionamento](/pt/stage/5/5-4-releases): versionamento semântico, push de tags, publicação de Release
- 5-5 [GitHub Actions e Pages](/pt/stage/5/5-5-actions-pages): automação com workflows, deploy no Pages

## Recursos principais deste capítulo

| Recurso | Função |
| --- | --- |
| fork | Copiar o repositório para a sua conta no GitHub |
| pull request | Pedido para mesclar os commits de um branch no repositório de destino |
| issue | Discussão e acompanhamento de bugs, funcionalidades e tarefas |
| milestone | Reunir um grupo de issues sob um objetivo de versão |
| release | Publicação oficial baseada em um tag (com notas e artefatos) |
| GitHub Actions | Automação de CI/CD orientada a eventos |
| GitHub Pages | Hospedagem gratuita de sites estáticos (é o caso deste projeto) |

<StageProgress stage="5" />
