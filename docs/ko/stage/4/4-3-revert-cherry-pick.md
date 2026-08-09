---
title: git revert와 git cherry-pick
exercises:
  - id: 4-3-e1
    question: git revert는 커밋을 어떻게 취소하나요?
    options:
      - 역방향의 새 커밋을 만들어 역사는 계속 앞으로 나아감
      - 그 커밋을 직접 삭제
      - 브랜치 포인터를 뒤로 이동
    correct: 0
    explanation: revert는 역사를 다시 쓰지 않습니다 — 역방향의 새 커밋으로 대상 커밋의 변경을 상쇄하며, 이미 푸시된 커밋에 적합합니다.
    anchor: "#git-revert로-커밋-되돌리기"
  - id: 4-3-e2
    question: git cherry-pick은 무엇을 할 때 쓰나요?
    options:
      - 어떤 브랜치의 커밋 하나를 현재 브랜치로 복사
      - 두 브랜치를 병합
      - 파일을 골라서 비교
    correct: 0
    explanation: cherry-pick은 지정한 커밋의 변경을 현재 브랜치에 적용해 새 커밋을 만듭니다 — 남의 특정 커밋만 가져올 때 좋습니다.
    anchor: "#git-cherry-pick으로-커밋-복사"
  - id: 4-3-e3
    question: 아래 연습장에서 그 나쁜 커밋을 취소하세요.
    type: task
    scenario: revert
    goal: "git revert로 가장 최근의 나쁜 커밋(fix: break hello)을 취소해 hello.txt가 올바른 내용으로 돌아오게 하세요."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert는 "Revert \"fix: break hello\""라는 새 커밋을 만들고, hello.txt는 손상 전 내용으로 돌아갑니다.'
    anchor: "#git-revert로-커밋-되돌리기"
  - id: 4-3-e4
    question: 아래 연습장에서 feature 브랜치의 커밋을 main으로 복사하세요.
    type: task
    scenario: cherry-pick
    goal: main 브랜치에서 git cherry-pick <feature의 커밋>을 실행해 feature.txt의 기능을 main으로 가져오세요.
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: cherry-pick으로 커밋을 복사해도 feature 브랜치는 그대로이고, main에도 내용이 같은 커밋이 하나 더 생깁니다.
    anchor: "#git-cherry-pick으로-커밋-복사"
---

# git revert와 git cherry-pick

## 이번 과의 목표

- git revert로 이미 있는 커밋 취소하기
- git cherry-pick으로 커밋 복사하기
- 둘 다 역사를 다시 쓰지 않는다는 점 이해하기

## git revert로 커밋 되돌리기

```bash
git revert <커밋>
```

revert는 그 커밋을「삭제」하지 않고 **역방향의 새 커밋을 만듭니다**: 대상 커밋의 변경을 반대로 적용하고 역사는 그대로 앞으로 나아갑니다:

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

왜 reset을 쓰지 않을까요? **revert는 역사를 다시 쓰지 않기 때문**입니다 — 다른 사람이 이미 clone이나 pull한 커밋을 reset으로 없애면 모든 복사본이 어긋나게 됩니다. revert는「상쇄 커밋을 하나 더 붙일」뿐이라 모두에게 안전합니다. 따라서: **로컬에서 아직 푸시하지 않은 실수는 reset, 이미 푸시된 실수는 revert**입니다.

## git cherry-pick으로 커밋 복사

```bash
git cherry-pick <커밋>   # 그 커밋을 현재 브랜치로 복사
```

cherry-pick은 **어떤 커밋 하나의 변경**을 현재 브랜치에 적용해 새 커밋을 만듭니다(내용은 같고 해시는 다릅니다). 대표적인 상황: 다른 사람이 feature 브랜치에서 버그를 고쳤는데, feature 전체를 병합하지 않고 그 수정만 main에 바로 가져오고 싶을 때입니다.

```
o  A ---- B (main) ---- B' (cherry-pick된 수정)
     \
      C (feature에서의 수정)
```

## revert와 cherry-pick의 차이

| | revert | cherry-pick |
| --- | --- | --- |
| 방향 | 취소(역방향 적용) | 복사(정방향 적용) |
| 쓰임 | 잘못된 커밋을 지우고 싶을 때 | 좋은 커밋을 다른 브랜치로 옮기고 싶을 때 |
| 결과 | 새 커밋이 옛 커밋을 상쇄 | 새 커밋이 옛 커밋을 복제 |

둘 다 기존 역사를 다시 쓰지 않으며, 충돌이 나면 멈추고 해결을 기다립니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="revert" />

<LessonProgress />
