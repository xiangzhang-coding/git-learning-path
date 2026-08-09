---
title: Releases e versionamento
exercises:
  - id: 5-4-e1
    question: Em 2.4.1, o que representa cada número do versionamento semântico?
    options:
      - 2 é o major (mudança que quebra compatibilidade), 4 é o minor (funcionalidade nova) e 1 é o patch (bug fix)
      - 2 é o patch, 4 é o major e 1 é o minor
      - os três números não têm diferença
    correct: 0
    explanation: "MAJOR.MINOR.PATCH: o major quebra a compatibilidade, o minor adiciona funcionalidades e o patch corrige bugs. A regra de incremento faz a versão comunicar informações de compatibilidade."
    anchor: "#versionamento-semantico"
  - id: 5-4-e2
    question: "Para enviar um tag anotado para o remote, o correto é:"
    options:
      - 'primeiro git tag -a v1.0.0 -m "v1.0.0" e depois git push origin v1.0.0'
      - o git push envia todos os tags automaticamente
      - depois de criar o tag com git tag, não é preciso push
    correct: 0
    explanation: Primeiro cria-se o tag e depois ele é enviado explicitamente; o git push não envia tags por padrão (a não ser com git push --tags).
    anchor: "#criar-um-tag-e-enviar-push"
  - id: 5-4-e3
    question: Qual é a relação entre o GitHub Release e o git tag?
    options:
      - O Release é construído sobre um tag e ainda oferece release notes e artefatos
      - Release não tem relação com tag
      - Release é um branch
    correct: 0
    explanation: O Release é criado a partir de um tag existente, com texto de apresentação (release notes) e artefatos binários — formando uma versão oficial.
    anchor: "#criar-um-release"
---

# Releases e versionamento

## Objetivos da lição

- Entender as regras do versionamento semântico
- Criar um tag e enviá-lo para o GitHub
- Criar um Release com notas e artefatos

## Versionamento semântico

O número de versão MAJOR.MINOR.PATCH (ex.: 2.4.1):

| Posição | Quando incrementa |
| --- | --- |
| MAJOR (major) | Mudança que quebra a compatibilidade com versões antigas |
| MINOR (minor) | Funcionalidade nova, com compatibilidade retroativa |
| PATCH (patch) | Correção de bug, sem funcionalidade nova |

A regra é simples: aumentar o major explica "por que seu programa quebrou de repente"; aumentar o patch indica "pode atualizar sem medo".

## Criar um tag e enviar (push)

Antes de publicar, crie o tag no local (visto na Etapa 4):

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

Atenção: o `git push` não envia tags por padrão — é preciso enviar explicitamente `git push origin <tag>` (ou enviar todos de uma vez com `git push --tags`).

## Criar um Release

Na página do repositório no GitHub: Releases → Draft a new release:

1. Escolha (ou crie) o tag, ex.: v1.0.0
2. Escreva o título e as notas da versão (release notes)
3. Opcional: anexe artefatos binários (instaladores, builds)
4. Clique em Publish release

O Release é "um tag com notas": é lá que os usuários baixam a versão e veem o que mudou, em vez de fuçar no git log.

## Como escrever release notes

Boas notas agrupam por tipo de leitor:

- **Funcionalidades** (Features): o que há de novo, com links para os PRs
- **Correções** (Bug fixes): o que foi corrigido, com links para as issues
- **Mudanças que quebram** (Breaking changes): avisos importantes para quem for atualizar

## Mão na massa

- Crie o tag v0.1.0 no seu projeto e envie-o
- Crie o primeiro Release com notas em três seções
- Publique uma versão de patch e observe a lista de Releases

## Exercícios

<Exercise />

<LessonProgress />
