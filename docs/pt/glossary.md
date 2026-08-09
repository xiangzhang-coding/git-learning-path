# Glossário

Os termos mantêm sempre o nome em inglês; esta tabela dá uma breve explicação.

| Termo | Significado | Primeira aparição |
| --- | --- | --- |
| repository | O diretório que armazena histórico e metadados (contém `.git`) | 0-2 |
| working tree | A área onde você edita arquivos | 0-2 |
| staging area | A lista de mudanças preparadas para o próximo commit (também chamada index) | 0-2 |
| commit | Um registro completo em forma de instantâneo | 0-1 |
| snapshot | O estado completo do projeto em um dado momento | 0-1 |
| SHA-1 | Hash de conteúdo; o identificador único de um commit | Capítulo 1 |
| HEAD | Ponteiro para o último commit do ramo atual | Capítulo 2 |
| branch | Um ponteiro móvel para um commit | Capítulo 2 |
| tag | Um nome fixado a um commit específico | Capítulo 4 |
| remote | Uma cópia do repositório hospedada em outro lugar | Capítulo 3 |
| origin | O nome de remote padrão após um clone | Capítulo 3 |
| clone | Copiar um repositório remoto para sua máquina | Capítulo 3 |
| fetch | Baixar commits remotos sem mesclar | Capítulo 3 |
| push | Enviar commits locais para um remote | Capítulo 3 |
| pull | fetch + merge | Capítulo 3 |
| merge | Integrar outro ramo no ramo atual | Capítulo 2 |
| rebase | Reancorar commits sobre uma nova base | Capítulo 4 |
| conflict | Mudanças sobrepostas que exigem resolução manual | Capítulo 2 |
| stash | Guardar temporariamente mudanças não commitadas | Capítulo 4 |
| checkout | Trocar de ramo ou restaurar arquivos | Capítulo 2 |
| switch | Trocar de ramo (comando mais recente) | Capítulo 2 |
| restore | Restaurar um arquivo para uma versão dada | Capítulo 1 |
| reset | Mover HEAD e/ou a staging area e o working tree | Capítulo 4 |
| revert | Desfazer um commit antigo com um commit novo | Capítulo 4 |
| cherry-pick | Copiar um commit específico para o ramo atual | Capítulo 4 |
| diff | A mudança entre dois estados | Capítulo 1 |
| status | Visão geral das diferenças entre as três áreas | Capítulo 1 |
| log | A lista do histórico de commits | Capítulo 1 |
| tracking branch | Ramo local associado a um ramo remoto | Capítulo 3 |
| upstream | O ramo remoto seguido por um ramo local | Capítulo 3 |
| fast-forward | Uma mescla que apenas avança, sem divergência | Capítulo 2 |
| detached HEAD | HEAD que não aponta para nenhum ramo | Capítulo 4 |
| reflog | O registro completo de onde o HEAD esteve | Capítulo 4 |
| DAG | Grafo acíclico dirigido; a topologia do histórico | Capítulo 2 |
| fork | Copiar o repositório de outra pessoa para sua conta | Capítulo 5 |
| pull request | Pedido para mesclar seu ramo (PR) | Capítulo 5 |
| issue | Tópico de discussão sobre bug, funcionalidade ou tarefa no repositório | Capítulo 5 |
| label | Rótulo que classifica uma issue (ex.: bug, enhancement) | Capítulo 5 |
| milestone | Reúne um grupo de issues sob um objetivo de versão | Capítulo 5 |
| release | Versão oficial baseada em um tag, com notas e artefatos | Capítulo 5 |
| workflow | Fluxo de automação do GitHub Actions | Capítulo 5 |
