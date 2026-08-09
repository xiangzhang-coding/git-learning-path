---
title: "git rebase: reaplicar commits"
exercises:
  - id: 4-4-e1
    question: O que o git rebase faz?
    options:
      - Reaplica os commits do branch atual (depois do ponto de divergência) sobre o commit mais recente do branch de destino
      - Mescla dois branches em um único commit
      - Apaga o histórico do branch atual
    correct: 0
    explanation: O rebase "replay" os commits posteriores à divergência um a um sobre o topo do branch de destino; o histórico sai da divergência e vira uma linha reta.
    anchor: "#git-rebase-reaplicar-commits"
  - id: 4-4-e2
    question: Depois do rebase, o que acontece com os hashes dos commits?
    options:
      - Os commits reaplicados ganham hashes novos (mesmo conteúdo, identidade diferente)
      - Ficam iguais
      - Só o primeiro muda
    correct: 0
    explanation: O hash inclui o pai do commit e o momento da criação; a reaplicação gera objetos de commit inteiramente novos — por isso não se faz rebase em branch já enviado.
    anchor: "#git-rebase-reaplicar-commits"
  - id: 4-4-e3
    question: Na zona de prática abaixo, faça rebase da branch feature sobre a main.
    type: task
    scenario: rebase
    goal: Troque para a feature, execute o git rebase main e deixe os commits da feature depois dos commits da main.
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: "Depois do rebase o grafo vira uma linha reta: os dois commits da main vêm primeiro e os da feature depois, sem commit de merge."
    anchor: "#git-rebase-reaplicar-commits"
  - id: 4-4-e4
    question: Na zona de prática abaixo, aborte depois de um conflito de rebase.
    type: task
    scenario: rebase-conflict
    goal: Troque para a feature, execute o git rebase main para provocar o conflito e depois o git rebase --abort para restaurar o estado original.
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: Quando os dois lados alteram o mesmo trecho, há conflito; o --abort devolve tudo ao estado anterior ao rebase.
    anchor: "#conflitos-no-rebase-e-abort"
---

# git rebase: reaplicar commits

## Objetivos da lição

- Usar o git rebase para reaplicar os commits do branch sobre o branch de destino
- Entender que o rebase reescreve o histórico e gera hashes novos
- Entender conflitos de rebase e o --abort

## git rebase: reaplicar commits

```bash
git switch feature
git rebase main
```

O rebase reaplica cada commit do branch atual que está **depois do ponto de divergência** sobre o commit mais recente do branch de destino:

```
antes do rebase (divergência):   depois do rebase (linha reta):
o  A                              o  A
|\                                o  B (main)
| o  B (main)                     o  C' (feature, hash novo)
o |  C (feature)                  o  D' (feature, hash novo)
 \|
  o  D (feature)
```

A saída mostra `Successfully rebased and updated refs/heads/feature.` O grafo de commits sai da forma "galho" e vira "linha reta" — esse é o valor central do rebase: **histórico mais limpo**.

**Importante**: os commits reaplicados ganham **hashes novos** (mesmo conteúdo, identidade diferente). Ou seja, o rebase reescreve o histórico — por isso nunca se faz rebase de um branch já enviado e que outras pessoas estejam usando.

## rebase vs. merge: como escolher

| | merge | rebase |
| --- | --- | --- |
| Histórico | mantém a divergência + commit de merge | linear, sem divergência |
| Hashes | intactos | reescritos (hashes novos) |
| Branch já enviado | seguro | proibido |
| Uso | mesclar branchs compartilhados | organizar branchs locais |

Um combo comum de fluxo de trabalho: no local você usa o rebase para deixar o histórico em linha reta e, depois de enviar, usa o merge para entrar em branchs compartilhados.

## Conflitos no rebase e abort

Ao reaplicar cada commit, o rebase pode encontrar conflito (os dois lados alteraram o mesmo trecho) — nesse momento o git para:

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually...
```

Há duas formas de resolver:

```bash
git rebase --continue   # se o conflito foi resolvido (depois do add), continua a reaplicação
git rebase --abort      # desiste deste rebase e restaura o estado original
```

Assim como no conflito de merge: edite o arquivo, remova os marcadores, `git add` e então `--continue`. Se não quiser resolver, `--abort` devolve tudo ao estado anterior ao rebase.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="rebase" />

<LessonProgress />
