---
title: "git merge: mesclando branches"
exercises:
  - id: 2-3-e1
    question: Quando ocorre um fast-forward?
    options:
      - Quando o branch atual não tem commits novos e os commits do branch alvo vêm todos depois dele
      - Sempre
      - Quando os dois branches têm commits novos
    correct: 0
    explanation: Se main está parado e feature tem commits novos à frente, o merge só precisa avançar o ponteiro de main; o histórico permanece uma linha reta, sem gerar um commit novo.
    anchor: "#fast-forward"
  - id: 2-3-e2
    question: Quando os dois branches têm commits novos, o que o git merge produz?
    options:
      - Um merge commit (com dois pais)
      - Dois commits novos
      - Uma tag
    correct: 0
    explanation: Depois da bifurcação do histórico, o git precisa reunir as alterações dos dois lados em um só lugar, gerando um merge commit com dois pais.
    anchor: "#merge-commit"
  - id: 2-3-e3
    question: Na zona de prática abaixo, mescle feature em main (fast-forward).
    type: task
    scenario: merge-ff
    goal: Execute o git merge feature em main; após o merge, a área de trabalho contém feature.txt.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "A saída mostra Fast-forward: main não tinha commits novos, o ponteiro avançou direto para feature e a área de trabalho ganhou feature.txt."
    anchor: "#fast-forward"
  - id: 2-3-e4
    question: Na zona de prática abaixo, mescle feature em main (os dois branches já se bifurcaram).
    type: task
    scenario: merge
    goal: Execute o git merge feature em main, concluindo um merge normal.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: Desta vez o histórico já se bifurcou, e o merge gera um merge commit. No grafo da zona de prática você vê o merge commit conectado aos dois branches.
    anchor: "#merge-commit"
---

# git merge: mesclando branches

## Objetivos da lição

- Usar o git merge para mesclar um branch no branch atual
- Distinguir fast-forward de merge commit
- Entender que o merge commit tem dois pais

## O fluxo básico do git merge

```bash
git switch main     # primeiro, volte para o lado que vai receber as mudanças
git merge feature   # traga feature para cá
```

O `git merge <branch>` incorpora as alterações do branch alvo no **branch atual**. Ele primeiro encontra o **ancestral comum** dos dois branches, calcula as diferenças dos três caminhos (ancestral comum → branch atual, ancestral comum → branch alvo) e então combina as alterações em uma única versão.

## Fast-forward

Se o branch atual não tem commits novos e o branch alvo apenas andou alguns passos à frente:

```
o  A ← main parado aqui
|
o  B ← feature
|
o  C ← feature commita de novo
```

O `git merge feature` só precisa **avançar o ponteiro de `main`** até C — isso é o fast-forward. A saída mostra `Fast-forward`, **não gera commit novo** e o histórico permanece uma linha reta.

## Merge commit

Se os dois branches commitaram cada um (o histórico se bifurcou), não existe o caminho de avançar o ponteiro: o git precisa combinar o conteúdo dos dois lados em um commit novo:

```
o  A
|\
| o  B (commit novo de main)
o |  C (commit novo de feature)
 \|
  o  M (merge commit, dois pais: B e C)
```

O que torna esse **merge commit** especial: ele tem dois pais (parents). No grafo da zona de prática, o commit de merge se conecta aos dois branches.

## Merge automático

Enquanto os dois lados alteraram trechos diferentes, o git combina as alterações sozinho — você não precisa fazer nada; a saída fica assim:

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

Se os dois lados alteraram o mesmo trecho, entra o tema da próxima lição: o conflito.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="merge" />

<LessonProgress />
