---
title: git stash e git tag
exercises:
  - id: 4-1-e1
    question: O que o git stash guarda?
    options:
      - Alterações ainda não commitadas (arquivos rastreados staged e unstaged)
      - O histórico já commitado
      - Todo o conteúdo do repositório remoto
    correct: 0
    explanation: O stash guarda temporariamente as alterações não commitadas da área de trabalho, deixando-a limpa — depois você as recupera com o pop.
    anchor: "#git-stash-guardar-alteracoes"
  - id: 4-1-e2
    question: Qual é a diferença entre tag e branch?
    options:
      - O branch se move com os commits; a tag fica fixa apontando para um commit
      - A tag se move com os commits; o branch fica fixo
      - Os dois são exatamente iguais
    correct: 0
    explanation: A tag é um nome fixado em um commit; depois disso, nenhum commit novo a move — ideal para marcar números de versão.
    anchor: "#git-tag-marcar-versoes"
  - id: 4-1-e3
    question: Na zona de prática abaixo, faça stash das alterações ainda não commitadas.
    type: task
    scenario: stash
    goal: Execute o git stash para deixar a área de trabalho limpa.
    checks:
      - type: statusClean
    explanation: Depois do stash a área de trabalho fica limpa e as alterações ficam salvas na lista de stash (stash@{0}).
    anchor: "#git-stash-guardar-alteracoes"
  - id: 4-1-e4
    question: Na zona de prática abaixo, recupere as alterações que estavam no stash.
    type: task
    scenario: stash
    goal: Execute o git stash pop para que as alterações em hello.txt voltem para a área de trabalho.
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: O pop devolve as alterações de stash@{0} para a área de trabalho e apaga essa entrada do stash.
    anchor: "#git-stash-list-e-git-stash-pop"
  - id: 4-1-e5
    question: Na zona de prática abaixo, coloque uma tag no commit atual.
    type: task
    scenario: tag
    goal: Execute o git tag v1.0 e depois o git tag para confirmar que a tag existe.
    checks:
      - type: tagExists
        name: v1.0
    explanation: A tag fica fixada no HEAD atual; não importa quantos commits venham depois, ela não se move.
    anchor: "#git-tag-marcar-versoes"
---

# git stash e git tag

## Objetivos da lição

- Usar o git stash para guardar temporariamente alterações não commitadas
- Usar o git stash list / pop para gerenciar o stash
- Usar o git tag para marcar versões

## git stash: guardar alterações

```bash
git stash          # guarda todas as alterações não commitadas atuais
git stash list     # mostra a lista de stash
git stash pop      # recupera o stash mais recente
```

No dia a dia é comum esta situação: você está no meio de uma alteração e precisa trocar de branch para resolver outra coisa, mas a troca é recusada (há alterações não commitadas). O **stash** é o "guarda-volumes temporário": guarda as alterações, deixa a área de trabalho limpa e devolve tudo quando você quiser.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list e git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

O `git stash pop` devolve para a área de trabalho as alterações do stash mais recente e apaga essa entrada (a saída mostra `Dropped stash@{0}`). Atenção: o stash só guarda arquivos **já rastreados pelo git**; arquivos novos untracked não entram no stash.

## git tag: marcar versões

```bash
git tag v1.0              # tag leve: dá um nome ao commit atual
git tag -a v1.0 -m "descrição" # tag anotada: com texto de descrição
git tag                   # lista todas as tags
```

Ao publicar uma versão, você precisa de um nome que "aponte para sempre para este commit" — a **tag** é uma marca fixada no commit. Diferente do branch, a tag não se move com os commits novos. Depois você pode voltar àquela versão com `git switch <tag>` (nesse momento o HEAD fica em estado detached, assunto das próximas lições da etapa 4).
**Alternar para uma tag e o detached HEAD**: `git switch <tag>` faz o HEAD apontar para o commit da tag — mas nesse momento o HEAD não está pendurado em nenhum branch; isso é o detached HEAD (cabeça desanexada). Ao commitar nesse estado, o novo commit não pertence a nenhum branch e, depois de trocar de branch, você pode não conseguir recuperá-lo. Então, só para olhar não há problema; se quiser commitar, crie antes um branch novo com `git switch -c <nome do novo branch>`.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="stash" />

<LessonProgress />
