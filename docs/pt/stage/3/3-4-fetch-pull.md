---
title: "git fetch e git pull"
exercises:
  - id: 3-4-e1
    question: O que o git fetch faz?
    options:
      - Baixa os commits novos do remoto, atualiza a tracking branch, mas não mexe na sua área de trabalho
      - Baixa e mescla direto no branch atual
      - Envia os commits locais para o remoto
    correct: 0
    explanation: O fetch atualiza apenas o "espelho do remoto" (origin/main); o seu branch e a sua área de trabalho ficam intactos — uma forma segura de ver o que há no remoto.
    anchor: "#git-fetch-so-ver-sem-mexer"
  - id: 3-4-e2
    question: Qual é a relação entre git pull e git fetch?
    options:
      - pull = fetch + merge (mescla os commits novos do remoto no branch atual)
      - pull = fetch + push
      - Os dois são idênticos
    correct: 0
    explanation: O pull primeiro faz o fetch para atualizar o espelho e depois mescla (ou faz fast-forward de) origin/main no branch atual.
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: Na zona de prática abaixo, traga os commits novos do remoto.
    type: task
    scenario: pull-ff
    goal: Execute o git pull em main para mesclar em fast-forward os commits novos do remoto.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: "Quando o local não tem commits novos, o pull faz fast-forward: os arquivos novos do remoto aparecem direto na área de trabalho e o histórico segue uma linha reta."
    anchor: "#git-pull-fetch-merge"
---

# git fetch e git pull

## Objetivos da lição

- Usar o git fetch para baixar atualizações remotas sem mexer na área de trabalho
- Entender que pull = fetch + merge
- Usar o git log origin/main para observar o estado do remoto

## git fetch: só ver, sem mexer

```bash
git fetch            # baixa todos os commits novos do origin
git fetch origin     # mesma coisa, escrito por extenso
```

O fetch baixa os **objetos de commit novos** do remoto para o local e atualiza a tracking branch `origin/main` — mas **não mexe no seu branch nem na sua área de trabalho**:

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

Depois do fetch, você pode "olhar" o estado do remoto com segurança e comparar quanto ele difere do local:

```bash
git log origin/main --oneline   # o que há do lado remoto
git log main..origin/main       # commits que o remoto tem e o local não
```

<RemoteFlow />

## git pull = fetch + merge

```bash
git pull             # equivale a git fetch + git merge origin/main
```

O pull é a junção de dois passos: primeiro o fetch (atualiza o espelho) e depois a mesclagem de `origin/main` no branch atual.

- **O local não tem commits novos**: mesclagem em fast-forward, a área de trabalho é atualizada direto e o histórico segue em linha reta
- **O local também tem commits novos**: gera um merge commit, unindo os históricos dos dois branches
- **Os dois lados mudaram o mesmo trecho**: conflito — o fluxo de resolução é igual ao do capítulo 2 (editar → add → commit)

## Quando usar cada um

| Situação | Comando |
| --- | --- |
| Só quer ver o que há de novo no remoto | `git fetch` |
| Quer já receber os commits novos do remoto | `git pull` |
| Não consegue enviar (rejeitado) | primeiro `git pull`, depois `git push` |

**Regra de ouro**: pull antes de push — mescle primeiro as atualizações do remoto e depois envie as suas; assim o non-fast-forward não te rejeita.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="pull" />

<LessonProgress />
