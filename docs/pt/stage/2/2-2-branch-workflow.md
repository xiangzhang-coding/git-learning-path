---
title: Trabalhando em branches
exercises:
  - id: 2-2-e1
    question: Depois de commitar no branch feature, ao voltar para main você verá esse commit?
    options:
      - "Não: o commit cai apenas no branch atual"
      - "Sim: todos os branches compartilham o mesmo histórico"
      - Depende da mensagem de commit
    correct: 0
    explanation: Cada commit cai no ponteiro do branch atual. Os commits de feature avançam apenas feature; o histórico de main não é afetado.
    anchor: "#commits-caem-apenas-no-branch-atual"
  - id: 2-2-e2
    question: Quando os dois branches commitaram cada um, qual é a forma do grafo de commits?
    options:
      - Um DAG (grafo acíclico dirigido) bifurcado a partir do ancestral comum
      - Sempre uma linha reta
      - Resta apenas o registro de um branch
    correct: 0
    explanation: Quando os branches avançam cada um por seu lado, o histórico se bifurca a partir de um commit comum, formando uma árvore ramificada — no mundo do git, um DAG.
    anchor: "#bifurcacao-e-grafo-de-commits"
  - id: 2-2-e3
    question: Na zona de prática abaixo, faça um commit no branch feature.
    type: task
    scenario: branching
    goal: Crie e troque para feature, crie feat.txt (com o conteúdo que quiser) e commite com uma mensagem que contenha a palavra feat.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: "Depois do commit, o grafo de commits abaixo da zona de prática se bifurca: o ponteiro de feature avança um passo e main fica parado."
    anchor: "#commits-caem-apenas-no-branch-atual"
  - id: 2-2-e4
    question: Na zona de prática abaixo, volte para main e mantenha a área de trabalho limpa.
    type: task
    scenario: branching
    goal: Use o git switch main para voltar para main, com o status clean.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: Ao voltar para main, os commits de feature não aparecem no histórico de main, mas o ponteiro do branch continua lá — você pode voltar quando quiser.
    anchor: "#commits-caem-apenas-no-branch-atual"
---

# Trabalhando em branches

## Objetivos da lição

- Commitar em um branch e entender que o commit cai apenas no branch atual
- Entender a bifurcação: o grafo de commits se divide a partir do ancestral comum
- Observar a estrutura de branches no grafo de commits da zona de prática

## Commits caem apenas no branch atual

Depois de criar um branch, **os commits caem apenas no branch atual**. Suponha que `main` esteja no commit A:

```bash
git switch -c feature
# altere o código
git commit -m "feat: login page"
```

Este commit faz apenas `feature` avançar; `main` continua em A. Ao voltar para main, você não vê esse commit nem esse arquivo — a área de trabalho volta ao snapshot de A.

**Este é o propósito central do branch**: experimente à vontade em feature, enquanto main permanece estável.

## Bifurcação e grafo de commits

Quando main e feature commitaram cada um, o histórico se bifurca a partir do ancestral comum:

```
o  A (ponto comum de main e feature)
|\
o |  B (novo commit de main)
| o  C (novo commit de feature)
```

Essa estrutura é chamada de **grafo de commits (commit graph)**; tecnicamente, é um DAG (grafo acíclico dirigido) — cada commit tem no máximo dois pais e não há ciclos. O grafo abaixo da zona de prática desenha isso em tempo real: o nome do branch aparece marcado na ponta dele.

## git log para observar o histórico

```bash
git log --oneline
```

O `git log` mostra apenas o histórico do **branch atual**. Troque para feature e ele mostra a linha de feature; volte para main e ele mostra a linha de main. Para ver os commits de todos os branches, o grafo da zona de prática é o mais intuitivo.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="branching" />

<LessonProgress />
