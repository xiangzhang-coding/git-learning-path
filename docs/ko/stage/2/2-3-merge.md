---
title: git merge로 브랜치 병합
exercises:
  - id: 2-3-e1
    question: fast-forward(패스트포워드) 머지는 언제 일어나나요?
    options:
      - 현재 브랜치에 새 커밋이 없고 대상 브랜치의 커밋이 모두 그 뒤에 있을 때
      - 언제나 일어난다
      - 두 브랜치 모두 새 커밋이 있을 때
    correct: 0
    explanation: main이 제자리에 있고 feature가 그 뒤에 새 커밋을 쌓았다면, merge는 main 포인터를 앞으로 이동시키기만 하면 됩니다. 역사는 직선을 유지하고 새 커밋은 생기지 않습니다.
    anchor: "#패스트포워드-머지"
  - id: 2-3-e2
    question: 두 브랜치 모두 새 커밋이 있을 때 git merge는 무엇을 만드나요?
    options:
      - 머지 커밋(merge commit, 부모가 둘인 커밋)
      - 새 커밋 두 개
      - 태그 하나
    correct: 0
    explanation: 역사가 갈라진 뒤 병합할 때 git은 양쪽 변경을 한곳에 합쳐야 하므로 부모 커밋이 둘인 머지 커밋을 만듭니다.
    anchor: "#머지-커밋"
  - id: 2-3-e3
    question: 아래 연습장에서 feature를 main으로 병합하세요(패스트포워드 머지).
    type: task
    scenario: merge-ff
    goal: main에서 git merge feature를 실행하세요. 병합 후 작업 트리에 feature.txt가 있어야 합니다.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: 출력에 Fast-forward가 표시됩니다. main에는 새 커밋이 없었으므로 포인터가 feature로 바로 전진했고, 작업 트리에 feature.txt가 나타납니다.
    anchor: "#패스트포워드-머지"
  - id: 2-3-e4
    question: 아래 연습장에서 feature를 main으로 병합하세요(두 브랜치가 이미 갈라져 있음).
    type: task
    scenario: merge
    goal: main에서 git merge feature를 실행해 일반 머지를 완료하세요.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: 이번에는 역사가 이미 갈라져 있어 merge가 머지 커밋을 만듭니다. 연습장의 커밋 그래프에서 merge commit이 두 브랜치로 이어지는 것을 볼 수 있습니다.
    anchor: "#머지-커밋"
---

# git merge로 브랜치 병합

## 이번 과의 목표

- git merge로 브랜치를 현재 브랜치에 병합한다
- 패스트포워드 머지와 머지 커밋을 구분한다
- merge commit의 부모가 둘이라는 것을 이해한다

## git merge의 기본 흐름

```bash
git switch main     # 먼저 변경을 받을 쪽으로 돌아가기
git merge feature   # feature를 병합하기
```

`git merge <브랜치>`는 대상 브랜치의 변경을 **현재 브랜치**에 합칩니다. 먼저 두 브랜치의 **공통 조상**을 찾고, 세 경로의 차이(공통 조상 → 현재 브랜치, 공통 조상 → 대상 브랜치)를 계산한 뒤 변경을 한데 합칩니다.

## 패스트포워드 머지

현재 브랜치에 새 커밋이 없고 대상 브랜치만 "그 뒤로 몇 걸음 더 나아간" 상태라면:

```
o  A ← main은 여기에 멈춤
|
o  B ← feature
|
o  C ← feature에서 한 번 더 커밋
```

`git merge feature`는 `main` 포인터를 C로 **바로 전진**시키기만 하면 됩니다. 이것이 fast-forward(패스트포워드)입니다. 출력에 `Fast-forward`가 표시되며, **새 커밋은 생기지 않고** 역사는 직선을 유지합니다.

## 머지 커밋

두 브랜치가 각자 커밋했다면(역사가 갈라졌다면) "포인터 전진"만으로는 갈 수 없습니다. git은 양쪽 내용을 합쳐 새 커밋을 하나 만들어야 합니다:

```
o  A
|\
| o  B (main의 새 커밋)
o |  C (feature의 새 커밋)
 \|
  o  M (merge commit, 부모가 둘: B와 C)
```

이 **merge commit**의 특별한 점은 부모(parent)가 둘이라는 것입니다. 연습장의 커밋 그래프에서 머지 커밋이 두 브랜치에 동시에 연결된 것을 볼 수 있습니다.

## 자동 머지

양쪽이 서로 다른 위치를 바꿨다면 git이 두 변경을 자동으로 합쳐 주며 할 일이 없습니다. 출력은 이렇게 생깁니다:

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

양쪽이 같은 자리를 바꿨다면 다음 과의 주제인 충돌이 시작됩니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="merge" />

<LessonProgress />
