---
title: git fetch와 git pull
exercises:
  - id: 3-4-e1
    question: git fetch는 무엇을 하나요?
    options:
      - 원격의 새 커밋을 다운로드하고 추적 브랜치를 갱신하지만 작업 영역은 건드리지 않음
      - 다운로드하고 현재 브랜치에 바로 병합
      - 로컬 커밋을 원격으로 전송
    correct: 0
    explanation: fetch는「원격의 미러」(origin/main)만 갱신합니다. 여러분의 브랜치와 작업 영역은 그대로이며, 원격에 무엇이 있는지 안전하게 확인할 수 있습니다.
    anchor: "#git-fetch는-보기만-하고-움직이지-않는다"
  - id: 3-4-e2
    question: git pull과 git fetch의 관계는 무엇인가요?
    options:
      - pull = fetch + merge(원격의 새 커밋을 현재 브랜치에 병합)
      - pull = fetch + push
      - 둘은 완전히 같다
    correct: 0
    explanation: pull은 먼저 fetch로 미러를 갱신한 뒤 origin/main을 현재 브랜치에 병합(또는 패스트포워드)합니다.
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: 아래 연습장에서 원격의 새 커밋을 가져오세요.
    type: task
    scenario: pull-ff
    goal: main 브랜치에서 git pull을 실행해 원격에 새로 추가된 커밋을 패스트포워드 병합하세요.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: 로컬에 새 커밋이 없으면 pull은 패스트포워드됩니다. 작업 영역에 원격이 추가한 파일이 바로 나타나고 역사는 직선을 유지합니다.
    anchor: "#git-pull-fetch-merge"
---

# git fetch와 git pull

## 이번 과의 목표

- git fetch로 작업 영역을 건드리지 않고 원격 갱신을 다운로드하기
- pull = fetch + merge 이해하기
- git log origin/main으로 원격 상태 관찰하기

## git fetch는 보기만 하고 움직이지 않는다

```bash
git fetch            # origin의 모든 새 커밋 다운로드
git fetch origin     # 같은 뜻의 표현
```

fetch는 원격의 **새 커밋 객체**를 로컬로 다운로드하고 추적 브랜치 `origin/main`을 갱신합니다. 하지만 **여러분의 브랜치와 작업 영역은 건드리지 않습니다**:

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

fetch 후에는 원격 상태를 안전하게「확인」할 수 있습니다. 원격과 로컬이 얼마나 차이나는지 언제든 볼 수 있습니다:

```bash
git log origin/main --oneline   # 원격에 무엇이 있는지
git log main..origin/main       # 원격에 있고 로컬에는 없는 커밋
```

## git pull = fetch + merge

```bash
git pull             # git fetch + git merge origin/main과 같음
```

pull은 두 단계를 하나로 합친 것입니다. 먼저 fetch로(미러 갱신) `origin/main`을 현재 브랜치에 병합합니다.

- **로컬에 새 커밋이 없음**: 패스트포워드 병합, 작업 영역이 바로 갱신되고 역사는 직선 유지
- **로컬에도 새 커밋이 있음**: 머지 커밋(merge commit)이 생기고 두 브랜치의 역사가 합쳐짐
- **양쪽이 같은 곳을 변경함**: 충돌 — 해결 절차는 단계 2와 완전히 같습니다(편집 → add → commit)

## 언제 무엇을 쓸까

| 상황 | 명령 |
| --- | --- |
| 원격에 무엇이 새로 있는지만 보고 싶을 때 | `git fetch` |
| 원격의 새 커밋을 바로 가져오고 싶을 때 | `git pull` |
| 푸시가 안 될 때(거부됨) | 먼저 `git pull` 후 `git push` |

**황금 규칙**: push 전에 먼저 pull — 원격의 갱신을 먼저 병합하고 나서 푸시하면 non-fast-forward 거부를 당하지 않습니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="pull" />

<LessonProgress />
