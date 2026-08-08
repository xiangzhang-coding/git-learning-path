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
---

# git log e git diff

## Objetivos da lição

- Consultar o histórico com o git log
- Ver as alterações com o git diff
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

## O modelo de snapshot

Cada commit salva um **snapshot completo**, não um diff. O git gera o hash do conteúdo com SHA-1 — conteúdo idêntico gera hash idêntico, o que permite verificar a integridade e evitar duplicação no armazenamento. É também por isso que "distribuído" funciona: qualquer clone tem o histórico completo e reconstruível.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="history" />

<LessonProgress />
