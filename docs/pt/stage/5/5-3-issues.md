---
title: 5-3 Issues e colaboração
exercises:
  - id: 5-3-e1
    question: Qual é o uso típico de uma issue no GitHub?
    options:
      - Relatar bugs, sugerir funcionalidades e discutir tarefas específicas
      - Guardar backup do código
      - Escrever o log dos commits
    correct: 0
    explanation: A issue é um tópico de discussão em torno de um problema específico; é possível atribuir um responsável, aplicar labels, colocar em um milestone e associar a um PR.
    anchor: "#o-que-e-uma-issue"
  - id: 5-3-e2
    question: "Para fechar a issue automaticamente ao mesclar o PR, a forma correta é:"
    options:
      - 'Escrever "fixes #12" na descrição do PR ou na mensagem de um commit associado'
      - Mencionar o número do PR em um comentário da issue
      - Só é possível fechar a issue manualmente
    correct: 0
    explanation: O GitHub reconhece as palavras-chave closes, fixes e resolves seguidas do número da issue e, quando o PR é mesclado, fecha a issue correspondente automaticamente.
    anchor: "#fechar-uma-issue-com-um-pr"
  - id: 5-3-e3
    question: Quais são as funções de label e milestone?
    options:
      - "label classifica a issue (ex.: bug, feature); milestone reúne um grupo de issues sob um objetivo de versão"
      - label é uma marca de permissão; milestone é uma linha do tempo
      - os dois servem para dar estrela no repositório
    correct: 0
    explanation: 'Os labels facilitam filtrar e classificar; os milestones representam "o que esta versão precisa entregar" e costumam corresponder a um Release.'
    anchor: "#labels-e-milestones"
---

# Issues e colaboração

## Objetivos da lição

- Entender o que é uma issue e como abrir uma
- Organizar o trabalho com labels e milestones
- Associar um PR a uma issue com "fixes #número"

## O que é uma issue

A issue é um tópico de discussão no repositório: relatar bug, sugerir funcionalidade, discutir uma tarefa específica. Cada issue tem número (ex.: #12), título, descrição e comentários; ainda dá para atribuir responsáveis, aplicar labels e colocar em milestones.

## Abrir uma issue

Na página do repositório: Issues → New issue. Uma boa descrição de issue inclui: qual é o problema, como reproduzi-lo e o comportamento esperado. Muitos repositórios oferecem templates de issue (bug report / feature request); preencher o template acelera bastante o tratamento.

## Labels e milestones

- **label (etiqueta)**: classifica a issue, ex.: bug, enhancement, good first issue. Filtrar por label é o principal jeito de o mantenedor organizar o trabalho.
- **milestone (marco)**: reúne um grupo de issues sob o mesmo objetivo de versão, ex.: v1.2.0. O milestone mostra o progresso (x/y issues concluídas).

## Fechar uma issue com um PR

Na descrição do PR (ou na mensagem de um commit associado), escreva:

```
fixes #12
```

O GitHub associa o PR à issue 12; quando o PR é mesclado, a issue fecha sozinha. As palavras-chave equivalentes são closes e resolves. Isso deixa rastreável no histórico "qual mudança resolveu qual problema".

## Um vislumbre do fluxo de colaboração

```
bug encontrado → abrir issue (#12) → mantenedor aplica label + milestone
  → contribuidor abre branch e corrige o bug → descrição do PR com "fixes #12"
  → merge → issue fecha sozinha, milestone +1
```

## Mão na massa

- Abra uma issue no seu próprio repositório e crie um label e um milestone
- Corrija um bug e envie um PR associando a issue na descrição
- Observe se a issue fecha sozinha depois do merge

## Exercícios

<Exercise />

<LessonProgress />
