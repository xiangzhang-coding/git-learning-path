---
title: O modelo de três áreas
exercises:
  - id: 0-2-e1
    question: Em que área estão os arquivos que você está editando agora?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 0
    explanation: O working tree é onde você edita arquivos; a staging area é a lista de mudanças preparadas; o repository guarda o histórico commitado.
    anchor: "#as-três-áreas"
  - id: 0-2-e2
    question: O que o git add move?
    options:
      - Mudanças do working tree para a staging area
      - Mudanças da staging area para o repository
      - Mudanças do repository para o working tree
    correct: 0
    explanation: git add registra mudanças do working tree na staging area; é o git commit que escreve o histórico (staging area → repository).
    anchor: "#as-três-áreas"
  - id: 0-2-e3
    question: O que o git commit move?
    options:
      - Working tree → staging area
      - Staging area → repository
      - Ele descarta as mudanças
    correct: 1
    explanation: commit agrupa as mudanças preparadas num commit guardado no repository (o diretório .git) — um instantâneo no histórico.
    anchor: "#as-três-áreas"
  - id: 0-2-e4
    question: Qual é a maior vantagem da staging area?
    options:
      - Torna o commit mais trabalhoso
      - Permite dividir os commits e manter o histórico limpo
      - Corrige erros automaticamente
    correct: 1
    explanation: Mudou duas funções sem relação? Adicione e commite primeiro uma, depois a outra — cada commit continua legível e reversível.
    anchor: "#por-que-uma-área-extra"
---

# O modelo de três áreas

## Objetivos da lição

- Conhecer o working tree, a staging area e o repository
- Entender o que movem o git add e o git commit
- Saber o que o git status mostra

## As três áreas

O Git divide um repositório em três áreas:

- **Working tree**: os arquivos que você edita — é o que o seu editor modifica
- **Staging area (também chamada index)**: a lista de mudanças escolhidas para o próximo commit
- **Repository (o diretório `.git`)**: instantâneos do histórico commitado

`git status` mostra exatamente as diferenças entre essas áreas: arquivos modificados mas não adicionados, adicionados mas não commitados.

## Por que uma área extra

A staging area permite **commits em partes**: você mudou duas funções sem relação, adicione e commite primeiro a primeira, depois a segunda — cada commit do histórico fica limpo, legível e reversível. Sem ela, uma sessão de edição vira um único commit «mais mudanças».

## Animação: as três áreas

Clique nos botões e veja o arquivo se mover entre as áreas: a edição acontece no working tree, `git add` registra na staging area e só `git commit` escreve o histórico.

<ThreeAreas />

## Exercícios

<Exercise />

<LessonProgress />
