---
title: git branch e git switch
exercises:
  - id: 2-1-e1
    question: O que o git branch exibe?
    options:
      - A lista de todos os branches, com * no branch atual
      - A lista de todos os commits
      - As alterações não commitadas
    correct: 0
    explanation: O git branch lista os branches do repositório e marca com * o branch em que você está.
    anchor: "#git-branch-mostra-e-cria-branches"
  - id: 2-1-e2
    question: O que é um branch, essencialmente?
    options:
      - Um ponteiro móvel que aponta para um commit
      - Uma cópia completa do código
      - Uma pasta separada
    correct: 0
    explanation: Um branch é apenas um ponteiro para um commit. Criar um branch não copia nenhum arquivo, por isso ele é muito leve.
    anchor: "#branches-sao-ponteiros"
  - id: 2-1-e3
    question: Na zona de prática abaixo, crie o branch feature e troque para ele.
    type: task
    scenario: branching
    goal: Use o git switch -c feature para criar e trocar em um único passo.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: O git switch -c feature equivale a criar o branch feature e trocar para ele. O HEAD agora aponta para feature.
    anchor: "#git-switch-troca-de-branch"
  - id: 2-1-e4
    question: Na zona de prática abaixo, volte para o branch main.
    type: task
    scenario: branching
    goal: Use o git switch main para voltar para main.
    checks:
      - type: branchIs
        name: main
    explanation: Trocar de branch apenas move o HEAD e o conteúdo da área de trabalho; os commits continuam nos seus próprios branches.
    anchor: "#git-switch-troca-de-branch"
---

# git branch e git switch

## Objetivos da lição

- Usar o git branch para ver e criar branches
- Usar o git switch para trocar de branch
- Entender que o branch é um ponteiro e que o HEAD marca a posição atual

## Branches são ponteiros

Um branch é, essencialmente, um **ponteiro móvel que aponta para um commit**. Criar um branch não copia nenhum arquivo — apenas acrescenta um nome apontando para o commit atual:

```bash
git branch feature
```

Esse comando registra no repositório um nome `feature` apontando para o commit onde o HEAD está. Depois, quando você faz commits em `feature`, o ponteiro avança junto.

**Conceito-chave: o branch não tem "código próprio"** — é apenas uma marca de posição no histórico. Com a mesma área de trabalho, ao trocar de nome de branch, os arquivos que você vê são o snapshot apontado por aquele branch.

## git branch mostra e cria branches

```bash
git branch        # lista todos os branches, com * no atual
git branch <nome> # cria um branch (sem trocar)
```

A listagem produz algo como:

```
* main
  feature
```

Criar um branch apenas registra um ponteiro — **não troca para ele**. Para ir até lá, use o switch.

## git switch troca de branch

```bash
git switch <nome>     # troca para um branch existente
git switch -c <nome>  # cria e troca (o mais usado)
```

- `git switch feature`: o HEAD vai para `feature` e os arquivos da área de trabalho são substituídos pelo snapshot apontado por esse branch
- `git switch -c feature`: cria um novo branch e troca imediatamente, equivalente a `git branch feature` + `git switch feature`

**Sintaxe antiga**: `git checkout <nome>` e `git checkout -b <nome>` são os comandos antigos equivalentes; `git switch` é o comando novo recomendado, e a zona de prática suporta ambos. `git checkout` também tinha o uso de «restaurar arquivos», hoje coberto por `git restore` (capítulo 1).

Ao trocar, se houver alterações não commitadas na área de trabalho, o git recusa e pede para você commitar ou guardar com stash — porque, ao trocar de snapshot, as alterações não teriam onde ficar.

## HEAD aponta para a posição atual

**HEAD** é um ponteiro especial que marca em qual branch e em qual commit você está agora. O `On branch feature` no início do `git status` é a resposta do HEAD. Trocar de branch é mover esse ponteiro do HEAD.

<HeadVisual />

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="branching" />

<LessonProgress />
