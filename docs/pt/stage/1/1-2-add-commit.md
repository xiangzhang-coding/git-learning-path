---
title: git add e git commit
exercises:
  - id: 1-2-e1
    question: Em qual área o git add coloca as alterações?
    options:
      - Área de trabalho (working tree)
      - Área de stage (staging area)
      - Repositório
    correct: 1
    explanation: O git add registra as alterações da área de trabalho na área de stage, marcando-as como "prontas para o commit".
    anchor: "#git-add-prepara-as-mudancas"
  - id: 1-2-e2
    question: Para que serve o parâmetro -m do git commit?
    options:
      - Faz merge de dois branches
      - Escreve a mensagem de commit
      - Altera o autor do commit
    correct: 1
    explanation: O -m fornece a mensagem de commit, que registra o que este commit fez. Uma boa mensagem é escrita para os outros — inclusive para você no futuro.
    anchor: "#git-commit-salva-um-instantaneo"
  - id: 1-2-e3
    question: Na zona de prática abaixo, coloque o todo.txt em stage.
    type: task
    scenario: add-commit
    goal: Use o git add todo.txt para colocar o arquivo na área de stage.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: Depois do stage, o todo.txt aparece em "Changes to be committed" no git status.
    anchor: "#git-add-prepara-as-mudancas"
  - id: 1-2-e4
    question: "Na zona de prática abaixo, faça commit do todo.txt com uma mensagem contendo \"todo\"."
    type: task
    scenario: add-commit
    goal: "git add todo.txt, e depois git commit -m \"feat: add todo\"."
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: Após o commit, o todo.txt entra no histórico do repositório; note que a alteração no hello.txt continua na área de trabalho — o commit empacota apenas o que está em stage.
    anchor: "#git-commit-salva-um-instantaneo"
---

# git add e git commit

## Objetivos da lição

- Colocar alterações em stage com o git add
- Salvar snapshots com o git commit
- Entender que o commit inclui apenas o que está em stage

## git add prepara as mudanças

```bash
git add <nome-do-arquivo>     # coloca um arquivo em stage
git add .            # coloca em stage todas as alterações do diretório atual
```

O `git add` registra as alterações da área de trabalho na **área de stage (staging area)**. Você pode escolher o que preparar: alterou três funcionalidades? Coloque apenas uma em stage, faça o commit, e o histórico fica limpo.

## git commit salva um instantâneo

```bash
git commit -m "feat: add login page"
```

O `git commit` empacota o conteúdo da **área de stage** em um commit e o grava no histórico. Cada commit:

- salva um **snapshot** completo do projeto naquele momento (não um diff)
- ganha um ID único, o hash SHA-1 (ex.: `4a2b9c1`)
- registra autor, data e mensagem de commit

**Regra-chave: o commit inclui apenas o que está em stage.** Alterações da área de trabalho que nunca passaram pelo add não entram neste commit.

## Como escrever mensagens de commit

Uma frase que diga o que foi feito: comece com verbo, mantenha o tempo verbal consistente e fique abaixo de 50 caracteres. Ex.: `fix: correct the login validation`.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="add-commit" />

<LessonProgress />
