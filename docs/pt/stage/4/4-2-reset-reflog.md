---
title: git reset e reflog
exercises:
  - id: 4-2-e1
    question: O que o git reset --hard faz?
    options:
      - Move HEAD, índice e área de trabalho para o commit de destino, descartando os commits e alterações do meio
      - Só desfaz a mensagem do último commit
      - Envia as alterações para o remoto
    correct: 0
    explanation: "O --hard é o recuo completo dos três: o ponteiro do branch, o índice e a área de trabalho voltam ao estado do commit de destino — perigoso, mas muito usado."
    anchor: "#git-reset-mover-o-head"
  - id: 4-2-e2
    question: Um commit descartado pelo reset ainda pode ser recuperado?
    options:
      - Sim, com o git reflog encontro o hash dele e faço reset de volta
      - Não, desaparece para sempre
      - Só clonando do remoto
    correct: 0
    explanation: O git não deleta os objetos de commit na hora; o reflog registra cada movimento do HEAD — com o hash antigo dá para restaurar.
    anchor: "#git-reflog-recuperar-commits-perdidos"
  - id: 4-2-e3
    question: Na zona de prática abaixo, desfaça o commit mais recente.
    type: task
    scenario: reset
    goal: Execute o git reset --hard HEAD~1 para desfazer o commit mais recente (junto com as alterações dele).
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: O reset --hard HEAD~1 recua o branch um passo e a área de trabalho também volta ao estado anterior.
    anchor: "#git-reset-mover-o-head"
  - id: 4-2-e4
    question: Na zona de prática abaixo, use o reflog para recuperar o commit descartado pelo reset.
    type: task
    scenario: reset
    goal: 'Use o git reflog para encontrar o commit descartado pelo reset (mensagem contém "break") e o git reset --hard para restaurá-lo.'
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: O reflog mostra o histórico completo do HEAD; encontre o hash do commit anterior ao reset e faça reset --hard de volta — tudo se recupera.
    anchor: "#git-reflog-recuperar-commits-perdidos"
---

# git reset e reflog

## Objetivos da lição

- Usar o git reset para mover o HEAD e o estado
- Distinguir --hard / padrão (mixed) / --soft
- Usar o git reflog para recuperar commits descartados pelo reset

## git reset: mover o HEAD

```bash
git reset --hard <commit>   # recua HEAD, índice e área de trabalho
git reset <commit>          # recua HEAD e o índice; a área de trabalho é mantida
git reset --soft <commit>   # só move o HEAD; índice e área de trabalho ficam intactos
```

**O reset é "andar para trás"**: move o ponteiro do branch para qualquer commit. A diferença entre os três modos é o "raio de alcance":

| Modo | HEAD | Índice (staging) | Área de trabalho |
| --- | --- | --- | --- |
| `--soft` | move | mantém | mantém |
| padrão (mixed) | move | zera | mantém |
| `--hard` | move | zera | zera |

O `--hard` é o mais usado e o mais perigoso: todos os commits do meio e as alterações não commitadas somem juntos (a área de trabalho é sobrescrita). Depois do `--hard`, a saída `HEAD is now at <hash curto> <mensagem>` mostra onde você está agora.

## git reflog: recuperar commits perdidos

```bash
git reflog
```

O **reflog (reference log) é o registro completo dos movimentos do HEAD** — não só o histórico do branch atual, mas "por onde o seu HEAD passou":

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

O commit descartado pelo reset **não foi deletado** — só não há mais nenhum branch apontando para ele. No reflog você encontra o hash dele e o `git reset --hard <hash>` restaura tudo. Esse é o "remédio contra arrependimentos" do git: qualquer operação feita na sua própria máquina é quase sempre recuperável.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="reset" />

<LessonProgress />
