---
title: 브랜치에서 작업하기
exercises:
  - id: 2-2-e1
    question: feature 브랜치에서 커밋한 뒤 main으로 전환하면 그 커밋이 보이나요?
    options:
      - 아니요, 커밋은 현재 브랜치에만 쌓입니다
      - 네, 모든 브랜치가 같은 역사를 공유합니다
      - 커밋 메시지에 따라 다릅니다
    correct: 0
    explanation: 커밋할 때마다 현재 브랜치 포인터에 쌓입니다. feature에서 한 커밋은 feature만 전진시키고 main의 역사에는 영향이 없습니다.
    anchor: "#커밋은-현재-브랜치에만-쌓인다"
  - id: 2-2-e2
    question: 두 브랜치가 각자 커밋하면 커밋 그래프(commit graph)는 어떤 모양이 되나요?
    options:
      - 공통 조상에서 갈라진 DAG(유향 비순환 그래프)
      - 항상 직선 하나
      - 한 브랜치의 기록만 남는다
    correct: 0
    explanation: 각 브랜치가 전진하면 역사가 공통 커밋에서 갈라져 나무처럼 분기합니다. git 세계에서는 이를 DAG라고 부릅니다.
    anchor: "#갈라짐과-커밋-그래프"
  - id: 2-2-e3
    question: 아래 연습장에서 feature 브랜치에서 커밋을 하나 만드세요.
    type: task
    scenario: branching
    goal: feature를 생성해 전환하고, feat.txt를 새로 만들어(내용은 자유) 커밋하세요. 커밋 메시지에는 "feat"가 포함되어야 합니다.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: 커밋하면 연습장 아래의 커밋 그래프가 갈라집니다. feature 포인터는 한 칸 전진하고 main은 제자리에 있습니다.
    anchor: "#커밋은-현재-브랜치에만-쌓인다"
  - id: 2-2-e4
    question: 아래 연습장에서 main으로 전환하고 작업 트리를 깨끗하게 유지하세요.
    type: task
    scenario: branching
    goal: git switch main으로 main에 돌아가고, 상태를 clean으로 만드세요.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: main으로 돌아오면 feature에서 한 커밋은 main의 역사에 보이지 않지만, 브랜치 포인터는 남아 있어 언제든 다시 전환할 수 있습니다.
    anchor: "#커밋은-현재-브랜치에만-쌓인다"
---

# 브랜치에서 작업하기

## 이번 과의 목표

- 브랜치에서 커밋하며 커밋이 현재 브랜치에만 쌓인다는 것을 이해한다
- 갈라짐을 이해한다. 커밋 그래프가 공통 조상에서 분기한다
- 연습장의 커밋 그래프로 브랜치 구조를 관찰한다

## 커밋은 현재 브랜치에만 쌓인다

브랜치를 만든 뒤에는 **커밋이 현재 브랜치에만 쌓입니다**. `main`이 commit A에 있다고 가정해 봅시다:

```bash
git switch -c feature
# 코드 수정
git commit -m "feat: login page"
```

이 커밋은 `feature`만 전진시키고 `main`은 여전히 A에 머뭅니다. main으로 전환하면 이 커밋도, 그 파일도 보이지 않습니다. 작업 트리가 A의 스냅샷으로 돌아가기 때문입니다.

**이것이 바로 브랜치의 핵심 용도입니다**: feature에서 자유롭게 실험하고, main은 항상 안정적으로 유지합니다.

## 갈라짐과 커밋 그래프

main과 feature가 각자 커밋하면 역사는 공통 조상에서 갈라집니다:

```
o  A (main과 feature의 공통 출발점)
|\
o |  B (main의 새 커밋)
| o  C (feature의 새 커밋)
```

이 구조를 **커밋 그래프(commit graph)**라고 하며, 기술적으로는 DAG(유향 비순환 그래프)입니다. 각 커밋은 최대 두 개의 부모 커밋을 가지며 순환이 없습니다. 연습장 아래의 커밋 그래프가 이를 실시간으로 그려 줍니다. 브랜치 이름은 브랜치 끝에 직접 표시됩니다.

## git log로 역사 관찰하기

```bash
git log --oneline
```

`git log`는 **현재 브랜치**의 역사만 표시합니다. feature로 전환하면 feature 줄을, main으로 전환하면 main 줄을 보여 줍니다. 모든 브랜치의 커밋을 보려면 연습장의 커밋 그래프가 가장 직관적입니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="branching" />

<LessonProgress />
