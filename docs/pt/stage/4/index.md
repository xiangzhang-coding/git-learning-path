# Capítulo 4 — Reparos e avançado

A linha de princípios deste capítulo: **refs e reflog**. O reset move o ponteiro do branch, o revert/cherry-pick geram commits novos, o rebase reescreve o histórico — e o reflog registra cada movimento do HEAD, fazendo com que qualquer "arrependimento" possa ser recuperado.

## Lições

- 4-1 [git stash e git tag](/pt/stage/4/4-1-stash-tag): guardar alterações temporariamente, marcar versões fixas
- 4-2 [git reset e reflog](/pt/stage/4/4-2-reset-reflog): os três modos de mover o HEAD, recuperar commits com o reflog
- 4-3 [git revert e git cherry-pick](/pt/stage/4/4-3-revert-cherry-pick): desfazer com commit inverso e copiar commits
- 4-4 [git rebase: reaplicar commits](/pt/stage/4/4-4-rebase): histórico linear, conflitos e abort

## Novos comandos deste capítulo

| Comando | Efeito |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | Guarda temporariamente alterações não commitadas |
| `git tag <nome>` / `git tag -a <nome> -m <msg>` | Marca fixa em um commit |
| `git reset [--hard\|--soft] <ref>` | Move o HEAD (podendo incluir índice/área de trabalho) |
| `git reflog` | Mostra o registro completo dos movimentos do HEAD |
| `git revert <ref>` | Desfaz um commit com um commit inverso novo |
| `git cherry-pick <ref>` | Copia um commit para o branch atual |
| `git rebase <branch>` / `--continue` / `--abort` | Reaplica os commits do branch sobre o branch de destino |

<StageProgress stage="4" />
