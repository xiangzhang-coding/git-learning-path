---
title: "git worktree: múltiplas árvores de trabalho"
exercises:
  - id: 4-5-e1
    question: O que é um git worktree?
    options:
      - Um diretório de trabalho extra que compartilha os objetos e refs do mesmo repositório
      - Uma cópia do repositório com histórico próprio
      - Um branch temporário para experimentos
    correct: 0
    explanation: O git worktree add cria outro diretório de trabalho que lê e escreve no mesmo repositório (objetos e refs compartilhados), mas mantém seu próprio HEAD e index.
    anchor: "#um-repositorio-uma-arvore-de-trabalho"
  - id: 4-5-e2
    question: O mesmo branch pode ter checkout em dois worktrees ao mesmo tempo?
    options:
      - "Não, o git recusa: um branch só pode ter checkout em um worktree"
      - Sim, os dois podem trabalhar nele e dar merge depois
      - Só se o branch ainda não foi enviado
    correct: 0
    explanation: cada branch pode ter checkout em exatamente um worktree — senão dois worktrees sobrescreveriam os commits um do outro para o mesmo branch.
    anchor: "#git-worktree-add-uma-segunda-arvore-de-trabalho"
  - id: 4-5-e3
    question: O que acontece se você executar git worktree remove em um worktree com mudanças não commitadas?
    options:
      - O git recusa e mantém o worktree até você resolver as mudanças
      - O git apaga as mudanças junto com o worktree
      - O git commita as mudanças automaticamente
    correct: 0
    explanation: "como salvaguarda, o remove recusa enquanto houver mudanças não commitadas — commite, faça stash ou use -f (force) se quiser mesmo descartá-las."
    anchor: "#git-worktree-remove-limpeza"
---

# git worktree: múltiplas árvores de trabalho

## Objetivos da lição

- Criar diretórios de trabalho extras para o mesmo repositório com o git worktree
- Entender que todos os worktrees compartilham objetos e refs, mas mantêm HEADs separados
- Listar e limpar worktrees; saber por que os agentes os usam

## Um repositório, uma árvore de trabalho

Por padrão, um repositório significa um diretório de trabalho. Você faz checkout de um branch, edita arquivos, commita — e quando precisa de outro branch, executa `git switch` e o diretório inteiro muda de conteúdo.

Esse switch tem um custo: o trabalho em andamento no branch atual precisa ser commitado ou guardado com stash primeiro, e os dois branches compartilham o mesmo diretório — por isso você nunca vê dois branches ao mesmo tempo.

O `git worktree` quebra essa regra de um-para-um. Um **worktree** é um diretório de trabalho extra ligado ao mesmo repositório:

```
your project/            <- árvore de trabalho principal (a original)
├── .git/                <- compartilhado: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- segundo worktree (adicionado com git worktree add)
└── src/  (branch hotfix)   <- branch diferente, diretório diferente
```

Todos os worktrees **compartilham o mesmo banco de objetos e refs** — um commit feito em um worktree fica visível em todos — mas cada worktree tem **seu próprio HEAD e index**, então cada um pode estar em um branch diferente sem atrapalhar os outros.

## git worktree add: uma segunda árvore de trabalho

```bash
git worktree add <path> <branch>
```

Cria um novo diretório de trabalho em `<path>` e faz checkout do `<branch>` lá. Algumas formas comuns:

```bash
git worktree add ../hotfix hotfix         # faz checkout do branch existente hotfix
git worktree add -b fix-login ../login    # cria o branch fix-login e faz checkout dele
git worktree add --detach ../explore v1.2 # HEAD desanexado em uma tag
```

Detalhes úteis:

- Se o branch já existe, o path precisa estar vazio — o git não sobrescreve um diretório que tem arquivos.
- Um branch só pode ter checkout em **um único worktree**. Tentar fazer checkout do mesmo branch em um segundo worktree falha com `fatal: '<branch>' is already checked out at ...`.
- Quando você faz `git clone`, o clone é um repositório separado completo; um worktree **não** é um clone — ele não tem um `.git` próprio, ele aponta para o do repositório pai.

## git worktree list: ver todas as árvores de trabalho

```bash
git worktree list
```

Mostra todos os worktrees ligados ao repositório, com o path, o branch com checkout e qual é o worktree principal:

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

O worktree principal é o diretório onde o repositório foi originalmente clonado ou criado — ele não pode ser removido.

## git worktree remove: limpeza

```bash
git worktree remove <path>
```

Remove o diretório de trabalho e desregistra o worktree. Duas proteções:

- O diretório não pode conter arquivos untracked ou modificados — caso contrário o git recusa e manda commitar, fazer stash ou usar `-f`.
- `git worktree remove -f <path>` apaga mesmo com mudanças, descartando-as.

Um worktree removido deixa o branch (e seus commits) em paz: o ponteiro do branch continua existindo no repositório, pronto para receber checkout no worktree principal depois.

## Por que agentes adoram worktrees

Agentes de IA de codificação (Claude Code, Cursor e similares) trabalham frequentemente em várias tarefas ao mesmo tempo. Sem worktrees, um agente que troca de tarefa precisa commitar ou fazer stash, trocar de branch e depois desembaraçar as mudanças — e um erro pode misturar as edições de uma tarefa no commit de outro branch.

Com o `git worktree add`, cada tarefa ganha **seu próprio diretório e branch**, totalmente isolados:

- O agente da tarefa A edita em `../task-a` no branch `feature/login`
- O agente da tarefa B edita em `../task-b` no branch `fix/typo`
- Os dois commits caem no mesmo repositório; nenhum pode tocar nos arquivos do outro

Quando você revisa o resultado, cada branch é uma unidade limpa — e você ainda tem um único histórico compartilhado para enviar. Esse isolamento é o motivo de os fluxos baseados em worktree terem virado a norma no desenvolvimento orientado por agentes.

## Quando usar worktrees

Use-os quando:

- Você precisa trabalhar em dois branches ao mesmo tempo (um hotfix enquanto o trabalho da feature continua)
- Você roda testes longos ou um dev server em um worktree e continua editando em outro
- Agentes ou ferramentas de equipe executam tarefas paralelas isoladas

Pule-os quando: uma tarefa por vez é a norma — os diretórios extras só adicionam burocracia sem benefício.

## Exercícios

<Exercise />

<LessonProgress />
