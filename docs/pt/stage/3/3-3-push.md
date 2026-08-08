---
title: "git push: enviando commits"
exercises:
  - id: 3-3-e1
    question: O que o git push envia para o remoto?
    options:
      - Os commits do branch atual que o remoto ainda não tem (junto com o histórico deles)
      - Todos os arquivos da área de trabalho
      - Todos os branches locais
    correct: 0
    explanation: O push envia os commits em que o branch local está à frente do remoto e faz o branch remoto avançar para a mesma posição.
    anchor: "#enviando-commits-com-git-push"
  - id: 3-3-e2
    question: Por que o git rejeita um push non-fast-forward (sem avanço direto)?
    options:
      - O remoto tem commits que o local não tem; sobrescrever jogaria fora o trabalho de outras pessoas
      - O repositório remoto está cheio
      - O nome do branch local é inválido
    correct: 0
    explanation: Se o remoto está à frente do local, o push sobrescreveria os commits novos do remoto — o git rejeita essa sobrescrita e exige um pull para mesclar antes do push.
    anchor: "#push-non-fast-forward-e-rejeitado"
  - id: 3-3-e3
    question: Na zona de prática abaixo, envie os commits locais para o remoto.
    type: task
    scenario: push
    goal: Execute o git push em main, enviando os commits em que o local está à frente do remoto.
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: "Após o push, a saída mostra To /origin e main -> main; o repositório remoto agora aponta para o mesmo commit que o local."
    anchor: "#enviando-commits-com-git-push"
---

# git push: enviando commits

## Objetivos da lição

- Usar o git push para enviar commits locais ao remoto
- Entender que o push só envia "a parte à frente"
- Entender a regra de rejeição non-fast-forward

## Enviando commits com git push

```bash
git push              # envia o branch atual para o origin
git push origin main  # especifica explicitamente o remoto e o branch
```

O push envia os commits **que o branch atual tem e o remoto ainda não**, e então faz o branch remoto avançar para a mesma posição do local. A saída tem esta forma:

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` indica que o branch remoto avançou do commit antigo para o novo. Após o push bem-sucedido, remoto e local compartilham o mesmo histórico.

**Atenção**: o push só envia os "commits à frente". Alterações que o remoto não tem e o local também não (bem como alterações ainda não commitadas) não são enviadas.

## Atualização fast-forward e a tracking branch

O push essencialmente faz o branch remoto **avançar (fast-forward)** até a posição do branch local (o conceito de fast-forward vem do merge da etapa 2). Após o push, a tracking branch local `origin/main` também avança junto — ela é o espelho de "onde o remoto está agora" e passa a bater com o remoto.

## Push non-fast-forward é rejeitado

Se **o remoto tem commits que o local não tem** (alguém enviou antes, ou o repositório remoto foi atualizado de outra forma), um push direto sobrescreveria esses commits — o git rejeita:

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

A solução é o que a dica diz: primeiro `git pull` para mesclar os commits novos do remoto, e então push.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="push" />

<LessonProgress />
