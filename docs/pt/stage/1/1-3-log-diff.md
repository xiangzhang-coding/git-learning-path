---
title: git log e git diff
exercises:
  - id: 1-3-e1
    question: O que o git log --oneline mostra?
    options:
      - "Um commit por linha: hash curto + mensagem"
      - O conteúdo completo dos arquivos
      - O nome do branch atual
    correct: 0
    explanation: O git log lista o histórico de commits; o --oneline compacta cada commit em uma linha (hash curto + mensagem) — a forma mais comum de consultar o histórico no dia a dia.
    anchor: "#git-log-mostra-o-historico"
  - id: 1-3-e2
    question: O que o git diff mostra?
    options:
      - As diferenças de conteúdo entre a área de trabalho e a área de stage
      - As diferenças do histórico de commits
      - As diferenças de codificação dos arquivos
    correct: 0
    explanation: O git diff compara a área de trabalho com a área de stage (alterações fora do stage); o git diff --staged compara a área de stage com o HEAD (alterações em stage).
    anchor: "#git-diff-mostra-as-mudancas"
  - id: 1-3-e3
    question: "Na zona de prática abaixo, modifique o src/a.js e faça commit com uma mensagem contendo \"fix\"."
    type: task
    scenario: history
    goal: "Troque \"const a = 2\" por \"const a = 3\" no src/a.js, depois faça add e commit com a mensagem \"fix: bump a\"."
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: Após o commit, o histórico passa a ter 5 commits; a primeira linha do git log --oneline é o seu novo commit.
    anchor: "#git-log-mostra-o-historico"
  - id: 1-3-e4
    question: O que o git show <commit> mostra?
    options:
      - Os detalhes completos do commit — autor, data, mensagem e o diff das alterações
      - A lista de todos os arquivos do repositório
      - O gráfico de commits do branch atual
    correct: 0
    explanation: O git show expande um commit — o cabeçalho mostra autor e data, e abaixo vem o diff contra o commit pai, a forma padrão de ver "o que esse commit realmente mudou".
    anchor: "#git-show-inspeciona-um-commit"
  - id: 1-3-e5
    question: Para que serve o git blame <arquivo>?
    options:
      - Marcar, linha por linha, por qual commit e autor cada linha foi modificada pela última vez
      - Apagar as linhas vazias do arquivo
      - Comparar as diferenças entre dois arquivos
    correct: 0
    explanation: O blame aponta a origem linha por linha — cada linha recebe o prefixo "hash curto do commit que a modificou por último + autor", muito útil para descobrir "quem mudou esta linha e por quê".
    anchor: "#git-blame-rastreia-a-origem-de-cada-linha"
---

# git log e git diff

## Objetivos da lição

- Consultar o histórico com o git log
- Ver as alterações com o git diff
- Ver os detalhes de um commit com o git show
- Rastrear a origem de cada linha com o git blame
- Conhecer o hash curto e o modelo de snapshot

## git log mostra o histórico

```bash
git log              # histórico completo (autor, data)
git log --oneline    # um commit por linha: hash curto + mensagem
```

O hash SHA-1 de cada commit é a sua identidade. O `git log --oneline` mostra os 7 primeiros caracteres — o hash curto, suficiente para identificar um commit de forma única.

## git diff mostra as mudanças

```bash
git diff             # área de trabalho vs área de stage (ainda não adicionado)
git diff --staged    # área de stage vs HEAD (adicionado, ainda não commitado)
```

Na saída, linhas que começam com `-` foram removidas e linhas que começam com `+` foram adicionadas. Conferir o diff antes de commitar é o hábito padrão.

## git show inspeciona um commit

```bash
git show <commit>    # ver os detalhes de um commit
git show HEAD        # o commit mais recente
```

O `git show` expande um commit — o cabeçalho traz o hash do commit, o autor, a data e a mensagem; abaixo, o diff contra o commit pai, exatamente o que responde "o que este commit mudou?". Combinado com o hash do git log, você consegue revisitar qualquer alteração.

## git blame rastreia a origem de cada linha

```bash
git blame <arquivo>   # marca a origem de cada linha
```

O blame adiciona um prefixo a cada linha do arquivo — **o hash curto do commit que modificou aquela linha pela última vez + o autor**. Quando você quer saber "quem mudou esta linha e em qual commit", o blame responde na hora — é o ponto de partida comum para investigar bugs em produção.

## O modelo de snapshot

Cada commit salva um **snapshot completo**, não um diff. O git gera o hash do conteúdo com SHA-1 — conteúdo idêntico gera hash idêntico, o que permite verificar a integridade e evitar duplicação no armazenamento. É também por isso que "distribuído" funciona: qualquer clone tem o histórico completo e reconstruível.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="history" />

<LessonProgress />
