---
title: Resolvendo conflitos de merge
exercises:
  - id: 2-4-e1
    question: Quando ocorre um conflito (conflict)?
    options:
      - Quando os dois lados alteraram o mesmo trecho do mesmo arquivo
      - Quando os dois lados alteraram arquivos diferentes
      - Sempre que você executa o git merge
    correct: 0
    explanation: Quando alteram trechos diferentes, o git consegue mesclar sozinho; apenas quando os dois lados alteram o mesmo trecho, sem jeito de saber qual versão manter, é preciso decidir manualmente.
    anchor: "#como-o-conflito-acontece"
  - id: 2-4-e2
    question: O que fica entre os marcadores <<<<<<< HEAD e =======?
    options:
      - A alteração do branch atual (HEAD) naquele trecho
      - A alteração do outro branch naquele trecho
      - O conteúdo completo do arquivo
    correct: 0
    explanation: No arquivo em conflito, entre <<<<<<< HEAD e ======= fica a versão do seu lado; entre ======= e >>>>>>> fica a versão do outro lado.
    anchor: "#marcadores-de-conflito"
  - id: 2-4-e3
    question: Na zona de prática abaixo, provoque e resolva um conflito.
    type: task
    scenario: conflict
    goal: Execute o git merge feature para disparar o conflito; altere o conteúdo de hello.txt para hello resolved e remova os marcadores de conflito; git add hello.txt; depois git commit para concluir o merge.
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: "Resolver um conflito é essencialmente tomar a decisão que o git não pode tomar: edite o arquivo, remova os marcadores, faça o add e o commit — e o merge commit nasce."
    anchor: "#fluxo-de-resolucao-de-conflitos"
  - id: 2-4-e4
    question: Depois de resolver o conflito (após o add), qual comando conclui o merge?
    options:
      - git commit (commita o resultado da resolução, gerando o merge commit)
      - git stash
      - git reset
    correct: 0
    explanation: Após resolver e fazer o add, o git ainda está no meio do merge (existe MERGE_HEAD); nesse ponto, o git commit usa o conteúdo atual para gerar o merge commit e encerrar o merge.
    anchor: "#fluxo-de-resolucao-de-conflitos"
---

# Resolvendo conflitos de merge

## Objetivos da lição

- Entender o que gera um conflito
- Ler os marcadores de conflito
- Dominar o fluxo padrão de resolução: editar → add → commit

## Como o conflito acontece

Ao mesclar, o git precisa combinar as alterações dos dois lados. Se os dois lados alteraram **trechos diferentes**, o git mescla automaticamente; mas se **os dois lados alteraram o mesmo trecho do mesmo arquivo**, o git não tem como decidir qual versão manter — ele coloca as duas versões no arquivo e deixa a decisão com você.

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

A saída diz claramente qual é o arquivo:

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Marcadores de conflito

Cada trecho em conflito do arquivo tem três marcadores:

| Marcador | Significado |
| --- | --- |
| `<<<<<<< HEAD` | A seguir está o conteúdo do seu lado (branch atual) |
| `=======` | Linha de separação |
| `>>>>>>> feature` | A seguir está o conteúdo do outro lado (o branch feature; o nome do marcador é o nome do outro branch) |

**Sua tarefa**: decidir qual versão fica (ou escrever uma nova) e apagar os três marcadores.

## Fluxo de resolução de conflitos

O fluxo padrão tem quatro passos:

```bash
git merge feature          # 1. dispara o conflito
# edite o arquivo em conflito: escolha o conteúdo e apague os marcadores
git add hello.txt          # 2. diz ao git que este arquivo está resolvido
git commit -m "merge: resolve"   # 3. conclui o merge, gerando o merge commit
```

Durante o processo, o `git status` avisa que você está no meio de um merge: com arquivos pendentes, mostra `You have unmerged paths`; depois de dar add em tudo, mostra `All conflicts fixed but you are still merging` — então é só commitar.

**Ponto-chave**: conflito não é erro; é o git devolvendo a decisão a você. Depois de resolvido, o resultado continua sendo um merge commit normal, e o histórico registra o merge normalmente.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="conflict" />

<LessonProgress />
