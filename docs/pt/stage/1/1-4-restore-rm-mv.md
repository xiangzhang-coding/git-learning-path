---
title: git restore, git rm e git mv
exercises:
  - id: 1-4-e1
    question: O que o git restore hello.txt faz?
    options:
      - Restaura o hello.txt para a versão do HEAD, descartando as alterações da área de trabalho
      - Exclui o hello.txt
      - Coloca o hello.txt em stage
    correct: 0
    explanation: "O git restore devolve o arquivo à versão do repositório (do HEAD por padrão), descartando as alterações da área de trabalho. Atenção: isso vale apenas para arquivos rastreados (tracked); arquivos não rastreados não são afetados."
    anchor: "#git-restore-descarta-as-mudancas"
  - id: 1-4-e2
    question: Na zona de prática abaixo, restaure o hello.txt com o git restore.
    type: task
    scenario: local
    goal: O hello.txt foi bagunçado; use o git restore hello.txt para devolvê-lo ao original.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: "Após a restauração, o hello.txt volta a ser \"hello world\" e o git status mostra nothing to commit."
    anchor: "#git-restore-descarta-as-mudancas"
  - id: 1-4-e3
    question: Na zona de prática abaixo, exclua o notes.txt (mantendo-o no histórico).
    type: task
    scenario: local
    goal: Use o git rm notes.txt para excluir o arquivo e registrar a exclusão em stage.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: "O git rm faz duas coisas ao mesmo tempo: exclui o arquivo da área de trabalho e registra a exclusão em stage. Após o commit, o arquivo some da versão mais recente, mas continua recuperável no histórico."
    anchor: "#git-rm-remove-arquivos"
  - id: 1-4-e4
    question: Na zona de prática abaixo, renomeie o notes.txt para diary.txt.
    type: task
    scenario: local
    goal: Use o git mv notes.txt diary.txt para renomear e registrar a mudança em stage.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: O git mv é um comando combinado de mover e colocar em stage; depois do rename, o git status mostra o nome antigo como excluído e o nome novo como adicionado.
    anchor: "#git-mv-move-arquivos"
---

# git restore, git rm e git mv

## Objetivos da lição

- Descartar alterações da área de trabalho com o git restore
- Excluir arquivos com o git rm
- Mover ou renomear arquivos com o git mv

## git restore descarta as mudanças

Bagunçou alguma coisa? Quer voltar à versão do último commit:

```bash
git restore <nome-do-arquivo>
```

O `git restore` devolve o arquivo à versão do HEAD, **descartando as alterações da área de trabalho**. Atenção: ele só atua em arquivos rastreados (tracked) — arquivos novos ainda são desconhecidos do git, então o restore não tem o que fazer com eles.

## git rm remove arquivos

```bash
git rm <nome-do-arquivo>
```

Um comando, duas ações: excluir o arquivo da área de trabalho e registrar a exclusão em stage. Depois do commit, o arquivo desaparece da versão mais recente — mas o histórico continua com ele, e dá para recuperá-lo sempre que quiser.

## git mv move arquivos

```bash
git mv nome-antigo nome-novo
```

Move (renomeia) um arquivo e o coloca em stage. O git não "decora" renomes — ele os detecta pela comparação de conteúdo: o arquivo antigo some e aparece um arquivo novo com conteúdo idêntico. É por isso que, depois de um mv, o status mostra deleted + new file.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="local" />

<LessonProgress />
