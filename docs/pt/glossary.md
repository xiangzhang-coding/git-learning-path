# Glossário

Os termos mantêm sempre o nome em inglês; esta tabela dá uma breve explicação.

| Termo | Significado | Primeira aparição |
| --- | --- | --- |
| repository | O diretório que armazena histórico e metadados (contém `.git`) | 0-2 |
| working tree | A área onde você edita arquivos | 0-2 |
| staging area | A lista de mudanças preparadas para o próximo commit (também chamada index) | 0-2 |
| commit | Um registro completo em forma de instantâneo | 0-1 |
| snapshot | O estado completo do projeto em um dado momento | 0-1 |
| SHA-1 | Hash de conteúdo; o identificador único de um commit | Etapa 1 |
| HEAD | Ponteiro para o último commit do ramo atual | Etapa 2 |
| branch | Um ponteiro móvel para um commit | Etapa 2 |
| tag | Um nome fixado a um commit específico | Etapa 4 |
| remote | Uma cópia do repositório hospedada em outro lugar | Etapa 3 |
| origin | O nome de remote padrão após um clone | Etapa 3 |
| clone | Copiar um repositório remoto para sua máquina | Etapa 3 |
| fetch | Baixar commits remotos sem mesclar | Etapa 3 |
| push | Enviar commits locais para um remote | Etapa 3 |
| pull | fetch + merge | Etapa 3 |
| merge | Integrar outro ramo no ramo atual | Etapa 2 |
| rebase | Reancorar commits sobre uma nova base | Etapa 4 |
| conflict | Mudanças sobrepostas que exigem resolução manual | Etapa 2 |
| stash | Guardar temporariamente mudanças não commitadas | Etapa 4 |
| checkout | Trocar de ramo ou restaurar arquivos | Etapa 2 |
| switch | Trocar de ramo (comando mais recente) | Etapa 2 |
| restore | Restaurar um arquivo para uma versão dada | Etapa 1 |
| reset | Mover HEAD e/ou a staging area e o working tree | Etapa 4 |
| revert | Desfazer um commit antigo com um commit novo | Etapa 4 |
| cherry-pick | Copiar um commit específico para o ramo atual | Etapa 4 |
| diff | A mudança entre dois estados | Etapa 1 |
| status | Visão geral das diferenças entre as três áreas | Etapa 1 |
| log | A lista do histórico de commits | Etapa 1 |
| tracking branch | Ramo local associado a um ramo remoto | Etapa 3 |
| upstream | O ramo remoto seguido por um ramo local | Etapa 3 |
| fast-forward | Uma mescla que apenas avança, sem divergência | Etapa 2 |
| detached HEAD | HEAD que não aponta para nenhum ramo | Etapa 4 |
| reflog | O registro completo de onde o HEAD esteve | Etapa 4 |
| DAG | Grafo acíclico dirigido; a topologia do histórico | Etapa 2 |
| fork | Copiar o repositório de outra pessoa para sua conta | Etapa 5 |
| pull request | Pedido para mesclar seu ramo (PR) | Etapa 5 |
