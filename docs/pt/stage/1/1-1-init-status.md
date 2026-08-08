---
title: git init e git status
exercises:
  - id: 1-1-e1
    question: O que o git init faz?
    options:
      - Baixa o código de outra pessoa
      - Cria um diretório .git e transforma o diretório atual em um repositório
      - Cria um arquivo novo
    correct: 1
    explanation: O git init inicializa um repositório git vazio no diretório atual (criando o diretório .git); a partir daí, o diretório e seus subdiretórios ficam sob controle de versão.
    anchor: "#git-init-cria-um-repositorio"
  - id: 1-1-e2
    question: O que o git status mostra?
    options:
      - O branch atual e as diferenças entre as três áreas
      - Métricas de desempenho dos arquivos
      - O status do servidor
    correct: 0
    explanation: "O git status é um dos comandos mais usados: ele mostra o branch atual, as alterações em stage, as alterações fora do stage e os arquivos não rastreados."
    anchor: "#git-status-mostra-o-estado"
  - id: 1-1-e3
    question: O que significa um arquivo ser rastreado (tracked) pelo git?
    options:
      - Ele está no .gitignore
      - Ele existe no histórico ou no stage do git, que passa a acompanhar suas mudanças
      - Ele está travado e não pode ser modificado
    correct: 1
    explanation: Um arquivo tracked é um arquivo que o git conhece (já commitado ou em stage); um arquivo untracked é um arquivo novo na área de trabalho que o git ainda não viu.
    anchor: "#git-status-mostra-o-estado"
  - id: 1-1-e4
    question: Na zona de prática abaixo, inicialize um repositório.
    type: task
    scenario: init
    goal: Use o git init para transformar o diretório em um repositório git e depois confirme com o git status.
    checks:
      - type: branchIs
        name: main
    explanation: "Após a inicialização, o git status mostra \"On branch main\". A zona de prática já vem com user.name e user.email pré-configurados, então você pode fazer commit direto."
    anchor: "#git-init-cria-um-repositorio"
---

# git init e git status

## Objetivos da lição

- Criar um repositório com o git init
- Entender o estado do repositório com o git status
- Diferenciar arquivos tracked e untracked

## git init cria um repositório

O ponto de partida do controle de versão: dizer ao git "este diretório é seu".

```bash
git init
```

Ele cria o diretório `.git` no diretório atual, guardando o banco de objetos, o índice e as referências — é isso que é o repositório em si. Os arquivos da área de trabalho não são afetados; a partir desse momento, toda mudança pode ser registrada.

## git status mostra o estado

O `git status` é o comando mais usado: ele resume para você as diferenças entre as três áreas:

- Em qual branch você está (On branch ...)
- Alterações em stage (Changes to be committed)
- Alterações fora do stage (Changes not staged for commit)
- Arquivos não rastreados (Untracked files)

Lembre-se de uma regra: **o git não rastreia arquivos novos automaticamente**. Um arquivo novo precisa passar pelo `git add` para entrar na área de stage; só então o git passa a acompanhá-lo.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="init" />

<LessonProgress />
