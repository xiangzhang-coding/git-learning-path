# Capítulo 2 — Branches e merge

A linha de princípios deste capítulo: **grafo de commits e HEAD**. O branch é apenas um ponteiro para um commit, e o HEAD marca sua posição atual; toda operação com branches (switch, merge, conflito) move ponteiros pelo grafo de commits — ou volta a unir os caminhos bifurcados.

## Lições

- 2-1 [git branch e git switch](/pt/stage/2/2-1-branch-switch): branches são ponteiros, HEAD é a posição atual
- 2-2 [Trabalhando em branches](/pt/stage/2/2-2-branch-workflow): os commits caem apenas no branch atual, o histórico se bifurca em um DAG
- 2-3 [git merge: mesclando branches](/pt/stage/2/2-3-merge): fast-forward e merge commit
- 2-4 [Resolvendo conflitos de merge](/pt/stage/2/2-4-merge-conflict): marcadores de conflito e o fluxo de resolução

## Novos comandos deste capítulo

| Comando | Efeito |
| --- | --- |
| `git branch` | Mostra a lista de branches, com `*` no atual |
| `git branch <nome>` | Cria um branch (sem trocar) |
| `git switch <nome>` | Troca para um branch existente |
| `git switch -c <nome>` | Cria e troca para um novo branch |
| `git merge <branch>` | Mescla o branch alvo no branch atual |

<StageProgress stage="2" />
