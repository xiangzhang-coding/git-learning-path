---
title: Fluxo de trabalho de Pull Request
exercises:
  - id: 5-2-e1
    question: O que é um Pull Request (PR)?
    options:
      - Um pedido para mesclar os commits do seu branch no outro branch do repositório de destino
      - Sobrescrever o repositório de outra pessoa direto no seu computador
      - O bate-papo em grupo do GitHub
    correct: 0
    explanation: 'O PR é um pedido formal de "mescle os meus commits", acompanhado do diff, da discussão e do resultado das verificações automáticas.'
    anchor: "#o-que-e-um-pull-request"
  - id: 5-2-e2
    question: Sobre as formas de merge de um PR, qual afirmação está correta?
    options:
      - Create a merge commit preserva a divergência com um commit de merge; Rebase and merge deixa o histórico linear
      - Squash and merge preserva cada commit original
      - A forma de merge não afeta o histórico
    correct: 0
    explanation: "As três formas geram históricos diferentes: o merge commit preserva a divergência, o squash junta tudo em um commit e o rebase reproduz o histórico linearmente."
    anchor: "#merge-e-fechamento"
  - id: 5-2-e3
    question: Depois que o mantenedor pede alterações, como atualizar um PR já aberto?
    options:
      - Continuar commitando no branch do PR e fazer push — o PR se atualiza sozinho
      - Criar um PR novo
      - Basta alterar o título do PR
    correct: 0
    explanation: "O PR é uma janela para o branch: qualquer commit novo enviado para esse branch atualiza automaticamente o diff do PR."
    anchor: "#atualizar-o-branch-do-pr"
---

# Fluxo de trabalho de Pull Request

## Objetivos da lição

- Entender o papel do PR na colaboração
- Percorrer o fluxo completo: abrir branch → push → abrir PR → discutir → mesclar
- Conhecer as três formas de merge e a atualização do branch do PR

## O que é um pull request

O Pull Request (PR) é um pedido formal de "mescle os meus commits no seu repositório". Você não tem permissão para escrever direto no repositório de outra pessoa, mas pode enviar um PR — o mantenedor revisa e decide se faz o merge:

```
branch no seu fork ──push──▶ seu fork
                             │ abre PR
                             ▼
                main do repositório do autor (aguarda review e merge)
```

O PR não é só um commit: ele reúne o diff, a discussão e o resultado das verificações automáticas (CI) — é a unidade central da colaboração open source.

## Abrir um PR

Pré-requisito: enviar o branch de trabalho para o seu fork:

```bash
git switch -c fix/login-bug
git commit -am "fix: login bug"
git push origin fix/login-bug
```

De volta ao GitHub, a página do repositório mostra o botão Compare & pull request. Escolha o base (branch de destino, por exemplo o main do repositório do autor original) e o compare (o seu branch), escreva o título e a descrição e crie o PR.

## Review e discussão

O PR é um espaço de discussão: o mantenedor pode comentar linhas específicas do código (line comments), pedir alterações (request changes) ou aprovar (approve). Cada commit novo seu entra no fluxo da conversa; depois de resolver as pendências, você pode marcar a pessoa com @ para rever.

## Merge e fechamento

O merge tem três formas, cada uma com um histórico diferente:

| Forma | Histórico |
| --- | --- |
| Create a merge commit | Preserva a divergência e cria um commit de merge |
| Squash and merge | Junta tudo em um único commit |
| Rebase and merge | Reproduz linearmente, sem commit de merge |

Depois do merge, o GitHub costuma sugerir excluir o branch. O PR também pode ser simplesmente fechado (closed) sem merge — por exemplo quando a ideia foi abandonada.

## Atualizar o branch do PR

Quando o mantenedor pede alterações, não é preciso abrir outro PR: continue commitando no branch e faça push — o PR se atualiza sozinho:

```bash
git commit -am "fix: address review feedback"
git push origin fix/login-bug
```

## Mão na massa

- Envie um branch de funcionalidade e abra um PR de verdade no GitHub
- Comente uma linha de código no PR para vivenciar o fluxo de discussão
- Compare os históricos diferentes gerados pelas três formas de merge

## Exercícios

<Exercise />

<LessonProgress />
