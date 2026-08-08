---
title: "git clone: clonando repositórios"
exercises:
  - id: 3-2-e1
    question: O que o git clone faz?
    options:
      - Copia o repositório remoto completo para o local (histórico + área de trabalho) e configura o origin automaticamente
      - Baixa apenas o último commit
      - Envia o repositório local para o remoto
    correct: 0
    explanation: O clone copia todo o histórico, faz o checkout da área de trabalho no branch padrão e ainda nomeia o remote como origin, criando a tracking branch.
    anchor: "#git-clone-a-copia-completa-em-um-passo"
  - id: 3-2-e2
    question: Depois do clone, o que é origin/main?
    options:
      - "Uma tracking branch: o espelho local que registra \"para qual commit o main do remoto aponta\""
      - Uma pasta dentro do repositório remoto
      - Um branch local novo, em que você pode commitar diretamente
    correct: 0
    explanation: refs/remotes/origin/main é um espelho de tracking somente leitura que registra a posição do main do remoto no momento do clone/fetch.
    anchor: "#a-tracking-branch-origin-main"
  - id: 3-2-e3
    question: Na zona de prática abaixo, clone o repositório remoto e entre no diretório clonado.
    type: task
    scenario: clone
    goal: Execute o git clone /origin, depois entre no diretório clonado com cd origin e confirme com git status que você está em main.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: "Após o clone, entre no novo diretório (cd): você está em uma cópia completa do histórico — o remote origin já vem configurado."
    anchor: "#git-clone-a-copia-completa-em-um-passo"
---

# git clone: clonando repositórios

## Objetivos da lição

- Usar o git clone para copiar um repositório remoto para o local
- Entender o origin e a tracking branch origin/main
- Entender que, após o clone, você precisa usar cd para entrar no novo diretório

## git clone: a cópia completa em um passo

```bash
git clone /origin          # cria o subdiretório origin/ no diretório atual e clona para dentro dele
git clone /origin meu-projeto  # você também pode escolher o nome do diretório
cd origin                  # entre no repositório clonado
```

O `git clone <endereco>` faz quatro coisas de uma vez:

1. Cria um diretório novo no local (por padrão, com o último trecho do endereço)
2. Copia o **histórico completo** do remoto
3. Faz o checkout da área de trabalho no branch padrão (geralmente main)
4. Nomeia o remote como **origin** automaticamente e cria a tracking branch

O clone é a porta de entrada padrão para "entrar em um projeto existente" — você não precisa do `git init`, tudo vem do remoto.

## A tracking branch origin/main

No clone, o git registra para qual commit cada branch do remoto apontava naquele momento, guardando-os como **tracking branches**:

```
refs/remotes/origin/main   # espelho somente leitura: a posição atual do main do remoto
```

Ela é diferente do branch local (`refs/heads/main`): **os seus commits não a movem** — apenas `git fetch` / `git pull` / `git push` a atualizam. A qualquer momento você pode usar `git log origin/main` para ver "como está o lado remoto".

## Copiar vs conectar

O clone é uma **cópia**: o repositório clonado é totalmente independente, e a única ligação com o remoto é o endereço origin. Os seus commits não vão para o remoto sozinhos, e os commits novos do remoto também não aparecem sozinhos — fetch/push/pull, das próximas três lições, são o transporte nessas duas direções.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="clone" />

<LessonProgress />
