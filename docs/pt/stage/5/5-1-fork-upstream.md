---
title: fork e sincronização com upstream
exercises:
  - id: 5-1-e1
    question: Qual é a diferença entre fork e clone?
    options:
      - O fork copia o repositório para a sua conta no GitHub; o clone copia para o seu computador
      - O fork copia só o código; o clone copia também o histórico
      - fork é um apelido de clone
    correct: 0
    explanation: O fork cria uma cópia no servidor do GitHub (na sua conta); o clone copia o repositório completo para o local. Depois do fork, normalmente ainda é preciso clonar para poder trabalhar.
    anchor: "#o-que-e-fork"
  - id: 5-1-e2
    question: Por que manter dois remotes (origin e upstream) na colaboração open source?
    options:
      - origin aponta para o seu fork e upstream para o repositório do autor original — cada um com sua função
      - Porque um remote não comporta todo o histórico
      - Dois remotes são exigência do GitHub
    correct: 0
    explanation: O push só pode ir para o seu fork (origin); o upstream serve para receber as atualizações do autor original, e a contribuição volta pelo PR.
    anchor: "#adicionar-o-remote-upstream"
  - id: 5-1-e3
    question: Para sincronizar os commits novos do upstream com o seu fork, qual é a ordem correta?
    options:
      - git fetch upstream, mesclar (ou fazer rebase) o upstream/main no main local e depois push origin
      - git push upstream traz as atualizações do upstream
      - um git pull origin direto já sincroniza com o upstream
    correct: 0
    explanation: O fetch só baixa os commits do upstream; o merge/rebase conecta as atualizações ao main local; por fim, o push leva tudo ao seu fork, atualizando também a cópia no GitHub.
    anchor: "#sincronizar-com-o-upstream"
---

# fork e sincronização com upstream

## Objetivos da lição

- Entender o papel do fork na colaboração open source
- Usar o git remote add upstream para registrar o repositório do autor original
- Sincronizar as atualizações do upstream com fetch + merge

## O que é fork

fork (derivação) é copiar o repositório de outra pessoa para a sua conta no GitHub:

```
autor original: github.com/author/project
    │ fork
    ▼
você: github.com/you/project   ← você pode alterar à vontade
```

O fork é um recurso do GitHub (não é um comando do git). A diferença para o clone: o fork cria uma cópia no servidor do GitHub, o clone copia o repositório para o seu computador. O fluxo típico em open source é "primeiro fork, depois clone do seu fork" — você não tem permissão de escrita no repositório do autor original, então trabalha na sua cópia.

## Clonar o seu fork

Depois de clicar em Fork no GitHub, clone o repositório que está na sua conta:

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v` mostra um remote: `origin` aponta para o seu fork. Nesse momento você só pode ler e escrever em origin — as atualizações do repositório do autor original ainda não aparecem sozinhas.

## Adicionar o remote upstream

Registre o repositório do autor original como segundo remote; por convenção ele se chama `upstream`:

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

Agora há dois remotes: `origin` (o seu fork, leitura e escrita) e `upstream` (o repositório do autor original, só leitura para receber atualizações). Lembrar a função de cada um é o coração do fluxo de trabalho com fork.

## Sincronizar com o upstream

O upstream está sempre sendo atualizado; para o fork acompanhar o ritmo:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream` baixa os commits do upstream (sem mexer no local)
- `git merge upstream/main` (ou rebase) conecta as atualizações ao main local
- `git push origin main` sincroniza as atualizações com o fork no GitHub

Assim o fork fica alinhado com o repositório do autor original e você pode abrir branchs e contribuir sobre o código mais recente.

## Mão na massa

- Faça fork de um repositório open source que você usa
- Clone-o, adicione o upstream e faça uma sincronização completa
- Observe na aba Issues como as outras pessoas colaboram

## Exercícios

<Exercise />

<LessonProgress />
