---
title: config e help
exercises:
  - id: 0-3-e1
    question: Qual é o alcance de git config --global user.name?
    options:
      - Apenas o repositório atual
      - Todos os repositórios do usuário atual
      - Todos os usuários da máquina
    correct: 1
    explanation: --global grava em ~/.gitconfig e vale para todos os repositórios do usuário atual; sem a opção, vale só para o repositório atual (local).
    anchor: "#configuracao-antes-do-primeiro-commit"
  - id: 0-3-e2
    question: Qual dos três níveis de configuração tem prioridade máxima?
    options:
      - system
      - global
      - local
    correct: 2
    explanation: "Quanto mais específico o nível, maior a prioridade: local > global > system. local pertence só ao repositório atual."
    anchor: "#tres-niveis-de-configuracao"
  - id: 0-3-e3
    question: Qual comando mostra rapidamente um resumo de uso do git commit?
    options:
      - git commit -h
      - git help commit
      - Ambos funcionam
    correct: 2
    explanation: -h mostra o resumo de uso e git help abre o manual completo — ambos são oficiais, use o que precisar.
    anchor: "#quando-voce-encontra-um-comando-desconhecido"
  - id: 0-3-e4
    question: O que git config --list imprime?
    options:
      - Toda a configuração em vigor
      - Somente a configuração do usuário
      - A lista de arquivos do repositório
    correct: 0
    explanation: --list imprime a configuração efetiva (o resultado mesclado de local > global > system) — o primeiro passo para diagnosticar problemas de configuração.
    anchor: "#configuracao-antes-do-primeiro-commit"
---

# config e help

## Objetivos da lição

- Definir user.name e user.email
- Entender os níveis system / global / local
- Usar help para consultar comandos

## Configuração antes do primeiro commit

O Git precisa saber quem escreveu cada commit — configure uma vez:

```bash
git config --global user.name "Seu nome"
git config --global user.email "voce@example.com"
```

`--global` vale para todos os repositórios. `git config --list` mostra toda a configuração em vigor; `git config user.name`, um único item.

## Três níveis de configuração

A configuração tem três níveis — **quanto mais específico, maior a prioridade**:

| Nível | Alcance | Onde fica |
| --- | --- | --- |
| system | todos os usuários da máquina | `/etc/gitconfig` |
| global | todos os repositórios do usuário | `~/.gitconfig` |
| local | o repositório atual | `.git/config` |

O valor efetivo é resolvido na ordem local → global → system.

## Quando você encontra um comando desconhecido

- `git help <comando>`: abre o manual completo
- `git <comando> -h`: resumo de uso rápido
- `git help --all`: lista todos os comandos

Esquecer um comando não é problema — saber procurá-lo é suficiente.

## Exercícios

<Exercise />

<LessonProgress />
