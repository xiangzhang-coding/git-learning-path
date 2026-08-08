---
title: Por que controle de versão?
exercises:
  - id: 0-1-e1
    question: Qual é o maior problema de gerenciar versões copiando arquivos e acrescentando datas?
    options:
      - Os arquivos ocupam muito espaço em disco
      - "O histórico não é consultável: não dá para voltar de forma confiável a um estado anterior"
      - Os nomes de arquivo ficam longos demais
    correct: 1
    explanation: O defeito central não é espaço nem nomes, mas um histórico irrecuperável — você não consegue voltar a uma versão passada nem saber qual é a mais recente.
    anchor: "#o-que-e-controle-de-versao"
  - id: 0-1-e2
    question: Qual NÃO é uma capacidade básica de um sistema de controle de versão (VCS)?
    options:
      - Registrar cada mudança como um instantâneo
      - Voltar a qualquer versão histórica
      - Corrigir automaticamente bugs no código
    correct: 2
    explanation: Um VCS registra, compara, reverte e facilita a colaboração; não corrige código. Isso é trabalho de quem escreve o código.
    anchor: "#o-que-e-controle-de-versao"
  - id: 0-1-e3
    question: "Qual é a diferença-chave entre o controle centralizado (ex.: SVN) e o distribuído (ex.: Git)?"
    options:
      - O centralizado exige rede para commitar; o distribuído commita localmente
      - O distribuído não suporta colaboração
      - Não há diferença real
    correct: 0
    explanation: No centralizado, cada commit precisa ir para um servidor central — sem rede, sem commits. No distribuído, cada clone é um repositório completo e você commita localmente, até offline.
    anchor: "#centralizado-vs-distribuido"
  - id: 0-1-e4
    question: O que cada commit guarda no Git?
    options:
      - Apenas a diferença em relação ao commit anterior
      - Um instantâneo completo de todo o projeto
      - Somente os caminhos dos arquivos alterados
    correct: 1
    explanation: Um commit do Git guarda um instantâneo completo (com compressão e deduplicação), não só um diff — por isso é chamado de controle de versão «por instantâneos».
    anchor: "#centralizado-vs-distribuido"
---

# Por que controle de versão?

## Objetivos da lição

- Entender o que um sistema de controle de versão (VCS) resolve
- Comparar o controle centralizado e o distribuído
- Saber a qual tipo o Git pertence

## O sofrimento sem controle de versão

Imagine um projeto em andamento: no meio do caminho você percebe que a abordagem não funciona e quer voltar ao estado de ontem à tarde — onde está esse arquivo? Talvez em `final_v2_backup`, talvez já sobrescrito. Colaboração é pior: duas pessoas editam o mesmo arquivo, quem salvar por último vence e o trabalho da outra desaparece em silêncio.

Esses três problemas — **registrar, voltar, colaborar** — são exatamente o que o Git resolve.

## O que é controle de versão

Um sistema de controle de versão (VCS) registra cada mudança e guarda um **instantâneo** completo do projeto a cada momento, permitindo:

- consultar qualquer versão histórica
- comparar as diferenças entre dois estados quaisquer
- voltar a qualquer estado anterior

Não é uma ferramenta de backup: o backup guarda só a cópia mais recente, enquanto um VCS mantém todo o histórico e cada versão é reconstruível.

## Centralizado vs distribuído

- **Centralizado (ex.: SVN)**: um único repositório central; todos fazem checkout dele e cada commit precisa passar pela rede. Se o servidor cair, ninguém commita.
- **Distribuído (ex.: Git)**: cada clone é uma cópia completa do repositório central. Os commits acontecem localmente, até offline; depois você os envia aos outros.

Como cada commit do Git guarda um instantâneo completo em vez de um diff, todo o histórico é reconstruível a partir de qualquer clone — é exatamente isso que torna o «distribuído» possível.

## Animação: retroceder a linha do tempo

Arraste o controle ou clique num ponto: o conteúdo dos arquivos muda a cada versão — «viajar ao passado» é exatamente o que o controle de versão oferece.

<TimelineRewind />

## Exercícios

<Exercise />


<LessonProgress />
