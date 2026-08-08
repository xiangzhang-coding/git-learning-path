# Etapa 3 — Colaboração remota

A linha de princípios desta etapa: **duas cópias do repositório e a tracking branch**. Um remote é o endereço de outra cópia do repositório; o clone a copia, o fetch atualiza o "espelho do remoto" (origin/main), o push envia os commits locais para lá, e o pull = fetch + merge.

## Lições

- 3-1 [git remote: repositórios remotos](/pt/stage/3/3-1-remote): o que é um remote, adicionar e ver
- 3-2 [git clone: clonando repositórios](/pt/stage/3/3-2-clone): a cópia completa em um passo, origin e a tracking branch
- 3-3 [git push: enviando commits](/pt/stage/3/3-3-push): enviar commits locais, rejeição non-fast-forward
- 3-4 [git fetch e git pull](/pt/stage/3/3-4-fetch-pull): fetch só vê, não mexe; pull = fetch + merge

## Novos comandos desta etapa

| Comando | Efeito |
| --- | --- |
| `git remote add <nome> <url>` | Registra o endereço de um repositório remoto |
| `git remote -v` | Mostra os nomes e endereços de todos os remotes |
| `git clone <url> [<dir>]` | Copia o repositório remoto completo para o local |
| `git push` | Envia ao remoto os commits em que o branch atual está à frente |
| `git fetch` | Baixa commits novos do remoto e atualiza a tracking branch |
| `git pull` | fetch + merge: busca e mescla as atualizações remotas |
| `git log origin/main` | Mostra o histórico para onde a branch remota aponta hoje |
| `cd <dir>` | Troca de diretório na zona de prática (entre no repositório após o clone) |

<StageProgress stage="3" />
