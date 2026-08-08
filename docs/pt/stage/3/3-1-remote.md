---
title: "git remote: repositórios remotos"
exercises:
  - id: 3-1-e1
    question: O que é um remote?
    options:
      - Uma localização remota com uma cópia do repositório (outro repositório, normalmente em um servidor)
      - Uma pasta local
      - Um comando interno do git usado para compactar repositórios
    correct: 0
    explanation: O remote é a localização de "outra cópia do repositório". O git envia e puxa commits por ele; origin é o nome padrão do remote após o clone.
    anchor: "#o-que-e-um-remote"
  - id: 3-1-e2
    question: O que o git remote -v mostra?
    options:
      - Os nomes e endereços de todos os remotes
      - A lista de todos os branches
      - Todos os commits do remoto
    correct: 0
    explanation: O git remote -v lista o nome e o endereço de cada remote, além da configuração que ele usa para fetch e push.
    anchor: "#git-remote-ver-e-adicionar"
  - id: 3-1-e3
    question: Na zona de prática abaixo, adicione um remote chamado origin.
    type: task
    scenario: remote
    goal: Registre o remote com git remote add origin /origin e confirme com git remote -v.
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: O remote add apenas registra o endereço, sem transferir nenhum dado. Depois disso, fetch/push/pull sabem para onde ir.
    anchor: "#git-remote-ver-e-adicionar"
---

# git remote: repositórios remotos

## Objetivos da lição

- Entender o conceito de remote: a localização de outra cópia do repositório
- Usar o git remote add para registrar um repositório remoto
- Usar o git remote -v para ver a configuração

## O que é um remote

Até agora, todos os seus commits ficaram apenas em **uma cópia do repositório na sua máquina**. Projetos reais exigem colaboração: cada pessoa tem uma cópia, e existe um "repositório compartilhado" como ponto de troca — é o remote.

O remote (repositório remoto) é essencialmente **o endereço de outro repositório git**. O próprio git não tem "nuvem": qualquer máquina (ou diretório) pode ser um remote. Seu repositório o referencia por um nome, e o padrão é **origin** (nomeado automaticamente no clone).

Na zona de prática desta lição, `/origin` é a localização do repositório remoto — um repositório em memória independente do `/repo` local. **Você não pode entrar no remoto com `cd`**: ele só guarda o histórico, sem árvore de trabalho (como um repositório bare de verdade ou um repositório em um servidor). Você trabalha na sua cópia local e troca dados com ele por comandos git.

## git remote: ver e adicionar

```bash
git remote            # lista os nomes dos remotes
git remote -v         # lista nomes + endereços (uma linha para fetch, outra para push)
git remote add <nome> <endereco>   # registra um novo remote
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

O `remote add` apenas registra o endereço, **sem transferir nenhum dado**. Ele grava a configuração em `.git/config`:

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## Dois papéis para lembrar

| Nome | Significado |
| --- | --- |
| Branch local | `refs/heads/main`, onde caem os seus commits |
| remote | O endereço do repositório remoto, como `/origin` |
| Tracking branch | `refs/remotes/origin/main`, o espelho local que registra "para onde o main aponta do lado remoto" |

A tracking branch é a chave dos próximos passos (clone/fetch): ela permite ver "como está o remoto" mesmo sem conexão.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="remote" />

<LessonProgress />
