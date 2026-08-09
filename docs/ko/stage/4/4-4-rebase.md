---
title: git rebase로 커밋 재생
exercises:
  - id: 4-4-e1
    question: git rebase는 무엇을 하나요?
    options:
      - 현재 브랜치에서 분기점 이후의 커밋을 대상 브랜치의 최신 커밋 뒤에 재생
      - 두 브랜치를 하나의 커밋으로 병합
      - 현재 브랜치의 역사를 삭제
    correct: 0
    explanation: rebase는 분기된 후의 커밋을 대상 브랜치 맨 위에 하나씩「재생」해서, 역사가 분기에서 직선이 됩니다.
    anchor: "#git-rebase로-커밋-재생"
  - id: 4-4-e2
    question: rebase 후에 커밋 해시는 어떻게 되나요?
    options:
      - 재생된 커밋은 모두 새 해시(커밋 내용은 같고 정체성은 다름)
      - 그대로 유지
      - 첫 번째만 바뀐다
    correct: 0
    explanation: 해시에는 부모 커밋과 시간이 포함되므로 재생은 완전히 새로운 커밋 객체를 만듭니다 — 따라서 푸시된 브랜치를 rebase하면 안 됩니다.
    anchor: "#git-rebase로-커밋-재생"
  - id: 4-4-e3
    question: 아래 연습장에서 feature 브랜치를 main에 rebase하세요.
    type: task
    scenario: rebase
    goal: feature로 전환한 뒤 git rebase main을 실행해 feature의 커밋이 main 뒤에 놓이게 하세요.
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: "rebase 후 커밋 그래프는 직선입니다: main의 커밋 두 개가 앞에, feature의 커밋이 뒤에 있으며 머지 커밋은 없습니다."
    anchor: "#git-rebase로-커밋-재생"
  - id: 4-4-e4
    question: 아래 연습장에서 rebase 충돌 후 중단하세요.
    type: task
    scenario: rebase-conflict
    goal: feature로 전환한 뒤 git rebase main으로 충돌을 일으키고, git rebase --abort로 원상태로 되돌리세요.
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: 양쪽이 같은 곳을 수정하면 충돌이 나며, --abort는 rebase 이전의 상태로 전부 되돌립니다.
    anchor: "#rebase-충돌과-중단"
---

# git rebase로 커밋 재생

## 이번 과의 목표

- git rebase로 브랜치 커밋을 대상 브랜치에 재생하기
- rebase가 역사를 다시 쓰고 새 해시를 만든다는 점 이해하기
- rebase 충돌과 --abort 이해하기

## git rebase로 커밋 재생

```bash
git switch feature
git rebase main
```

rebase는 현재 브랜치에서 **분기점 이후**의 커밋 하나하나를 대상 브랜치의 최신 커밋 뒤에 다시 적용합니다:

```
rebase 전(분기):          rebase 후(직선):
o  A                        o  A
|\                          o  B (main)
| o  B (main)               o  C' (feature, 새 해시)
o |  C (feature)            o  D' (feature, 새 해시)
 \|
  o  D (feature)
```

출력은 `Successfully rebased and updated refs/heads/feature.`입니다. 커밋 그래프가「가지」에서「직선」이 됩니다 — 이것이 rebase의 핵심 가치: **역사가 더 깨끗해집니다**.

**중요**: 재생된 커밋은 모두 **새 해시**(내용은 같고 정체성은 다름)입니다. 즉 rebase는 역사를 다시 쓰는 것 — 그래서 **이미 푸시해서 다른 사람이 쓰고 있는 브랜치는 절대 rebase하지 마세요**.

## rebase와 merge의 선택

| | merge | rebase |
| --- | --- | --- |
| 역사 | 분기 유지 + 머지 커밋 | 직선, 분기 없음 |
| 해시 | 그대로 | 다시 씀(새 해시) |
| 푸시된 브랜치 | 안전 | 금지 |
| 쓰임 | 공유 브랜치 병합 | 로컬 브랜치 정리 |

흔한 워크플로 조합: 로컬에서는 rebase로 역사를 직선으로 정리하고, 푸시한 뒤에는 merge로 공유 브랜치에 합칩니다.

## rebase 충돌과 중단

rebase가 커밋을 재생할 때마다 충돌이 날 수 있습니다(양쪽이 같은 곳을 수정). 이때 git은 멈춥니다:

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

해결 방법은 두 가지입니다:

```bash
git rebase --continue   # 충돌 해결(add 후) 후 재생 계속
git rebase --abort      # 이번 rebase 포기, 원상 복구
```

merge 충돌과 같습니다: 파일을 편집하고, 표시를 지우고, `git add`한 뒤 `--continue`합니다. 처리하고 싶지 않으면 `--abort`로 모든 것이 rebase 이전으로 돌아갑니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="rebase" />

<LessonProgress />
