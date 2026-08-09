---
title: git revert e git cherry-pick
exercises:
  - id: 4-3-e1
    question: Como o git revert desfaz um commit?
    options:
      - Gera um commit novo com o efeito inverso; o histórico segue avançando
      - Apaga o commit diretamente
      - Move o ponteiro do branch de volta
    correct: 0
    explanation: O revert não reescreve o histórico — ele usa um commit inverso novo para anular as alterações do commit de destino; serve para commits já enviados (push).
    anchor: "#git-revert-desfazer-um-commit"
  - id: 4-3-e2
    question: Para que serve o git cherry-pick?
    options:
      - Copiar um commit de outro branch para o branch atual
      - Mesclar dois branches
      - Selecionar arquivos para comparar
    correct: 0
    explanation: O cherry-pick aplica no branch atual as alterações do commit indicado e gera um commit novo — útil quando você quer só um commit específico de outra pessoa.
    anchor: "#git-cherry-pick-copiar-um-commit"
  - id: 4-3-e3
    question: Na zona de prática abaixo, desfaça o commit ruim.
    type: task
    scenario: revert
    goal: "Use o git revert para desfazer o commit ruim mais recente (fix: break hello) e fazer o hello.txt voltar ao conteúdo correto."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'O revert gera um commit novo "Revert \"fix: break hello\"" e o hello.txt volta ao conteúdo de antes da quebra.'
    anchor: "#git-revert-desfazer-um-commit"
  - id: 4-3-e4
    question: Na zona de prática abaixo, copie o commit da branch feature para a main.
    type: task
    scenario: cherry-pick
    goal: Na branch main, execute o git cherry-pick <commit da feature> para levar o recurso de feature.txt para a main.
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: Depois do cherry-pick, a branch feature continua exatamente como estava e a main ganha um commit novo com o mesmo conteúdo.
    anchor: "#git-cherry-pick-copiar-um-commit"
  - id: 4-3-e5
    question: Para que serve o git bisect?
    options:
      - Localizar, por busca binária, o primeiro commit que introduziu o bug
      - Mesclar o histórico de dois branches
      - Desfazer o commit mais recente
    correct: 0
    explanation: O bisect marca os commits "bad" e "good" e, em seguida, faz checkout dos pontos intermediários para você confirmar — a busca binária localiza rápido "a partir de qual commit começou a quebrar".
    anchor: "#git-bisect-localiza-o-commit-problematico"
  - id: 4-3-e6
    question: Na zona de prática abaixo, use o bisect para localizar o commit que introduziu o bug.
    type: task
    scenario: bisect
    goal: 'Execute o git bisect start, o git bisect bad e o git bisect good HEAD~3; a cada vez que o checkout for para um commit intermediário, veja a função add do calc.js — correta, use o git bisect good; com bug, use o git bisect bad, até localizar.'
    checks:
      - type: bisectDone
    explanation: 'O bisect localiza "fix: typo in add" — a função add começa a errar a partir dele; ao terminar, você pode usar o git bisect reset para voltar ao branch original.'
    anchor: "#git-bisect-localiza-o-commit-problematico"
---

# git revert e git cherry-pick

## Objetivos da lição

- Usar o git revert para desfazer um commit existente
- Usar o git cherry-pick para copiar commits
- Usar o git bisect para localizar o commit problemático com busca binária
- Entender que nenhum dos dois reescreve o histórico

## git revert: desfazer um commit

```bash
git revert <commit>
```

O revert não "apaga" o commit — ele **gera um commit novo com o efeito inverso**: aplica de trás para frente as alterações do commit de destino e o histórico segue em frente:

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

Por que não usar o reset? Porque **o revert não reescreve o histórico** — se você descartasse com reset um commit que outras pessoas já clonaram ou puxaram, todas as cópias ficariam inconsistentes; o revert apenas "adiciona um commit que anula", e isso é seguro para todos. Regra: **erro local ainda não enviado usa reset; erro já enviado usa revert**.

## git cherry-pick: copiar um commit

```bash
git cherry-pick <commit>   # copia esse commit para o branch atual
```

O cherry-pick aplica no branch atual as alterações de **um commit específico** e gera um commit novo (mesmo conteúdo, hash diferente). Caso típico: outra pessoa corrigiu um bug na branch feature e você quer esse conserto direto na main, sem mesclar a feature inteira.

```
o  A ---- B (main) ---- B' (cherry-picked fix)
     \
      C (fix on feature)
```

## Diferença entre revert e cherry-pick

| | revert | cherry-pick |
| --- | --- | --- |
| Direção | desfaz (aplica o inverso) | copia (aplica direto) |
| Uso | o commit tem erro e o efeito precisa sumir | o commit é bom e vai para outro branch |
| Resultado | um commit novo que anula o antigo | um commit novo que reproduz o antigo |

Nenhum dos dois reescreve o histórico existente; em caso de conflito, os dois param até você resolver.

## git bisect localiza o commit problemático

```bash
git bisect start          # iniciar
git bisect bad            # o HEAD atual está ruim
git bisect good <commit>  # marcar um commit conhecido como bom
# ciclo: checkout no ponto intermediário → testar → git bisect good / git bisect bad
git bisect reset          # terminar, voltar ao branch original
```

"Uma funcionalidade quebrou, mas não sei a partir de qual commit" — revisar o histórico commit por commit é ineficiente. O bisect usa a **busca binária**: marque um commit "bad" e um "good"; o git faz checkout do commit intermediário entre os dois; você testa e diz good ou bad, e o intervalo cai pela metade. Depois de algumas rodadas, você localiza o primeiro commit que introduziu o bug.

## Exercícios

<Exercise />

## Zona de prática

<Playground scenario="revert" />

<LessonProgress />
