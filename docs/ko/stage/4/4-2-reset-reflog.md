---
title: git reset과 reflog
exercises:
  - id: 4-2-e1
    question: git reset --hard는 무엇을 하나요?
    options:
      - HEAD, 인덱스, 작업 영역을 모두 대상 커밋으로 이동하고 중간의 커밋과 변경사항을 버림
      - 마지막 커밋의 메시지만 취소
      - 변경사항을 원격으로 푸시
    correct: 0
    explanation: "--hard는 세 가지의 일괄 후퇴입니다: 브랜치 포인터, 스테이징 영역, 작업 영역이 모두 대상 커밋 상태로 돌아갑니다 — 위험하지만 자주 쓰입니다."
    anchor: "#git-reset으로-head-이동"
  - id: 4-2-e2
    question: reset으로 버린 커밋을 되찾을 수 있나요?
    options:
      - 네, git reflog로 그 해시를 찾아 다시 reset하면 됩니다
      - 아니요, 영원히 사라집니다
      - 원격에서 clone해야만 합니다
    correct: 0
    explanation: git은 커밋 객체를 즉시 삭제하지 않습니다. reflog는 HEAD의 모든 이동을 기록하므로 옛 해시를 찾아 복원할 수 있습니다.
    anchor: "#git-reflog로-잃어버린-커밋-찾기"
  - id: 4-2-e3
    question: 아래 연습장에서 가장 최근 커밋을 취소하세요.
    type: task
    scenario: reset
    goal: git reset --hard HEAD~1을 실행해 가장 최근 커밋(그 변경사항 포함)을 취소하세요.
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1은 브랜치를 한 걸음 후퇴시키고 작업 영역도 이전 상태로 되돌립니다.
    anchor: "#git-reset으로-head-이동"
  - id: 4-2-e4
    question: 아래 연습장에서 reflog로 reset된 커밋을 되찾으세요.
    type: task
    scenario: reset
    goal: 'git reflog로 방금 reset된 커밋(메시지에 "break" 포함)을 찾고, git reset --hard로 복원하세요.'
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: reflog는 HEAD의 전체 역사를 보여줍니다. reset 전의 커밋 해시를 찾아 reset --hard로 돌아가면 모든 것이 복원됩니다.
    anchor: "#git-reflog로-잃어버린-커밋-찾기"
  - id: 4-2-e5
    question: git clean의 역할은 무엇인가요?
    options:
      - 추적되지 않는 파일 삭제(-f를 붙여야 실제 삭제, -n은 미리 보기)
      - 모든 커밋 기록을 비움
      - 추적되는 파일의 변경을 되돌림
    correct: 0
    explanation: clean은 추적되지 않는 파일만 다룹니다. 기본적으로 바로 삭제를 거부하고(clean.requireForce), -n으로 미리 보고 -f로 실행합니다 — 지워진 파일은 git으로 되찾을 수 없습니다.
    anchor: "#git-clean으로-추적되지-않는-파일-삭제"
  - id: 4-2-e6
    question: 아래 연습장에서 추적되지 않는 파일을 모두 삭제하세요.
    type: task
    scenario: clean
    goal: 먼저 git clean -n으로 미리 보고, git clean -f로 추적되지 않는 파일(scratch.txt와 todo.tmp)을 삭제하세요.
    checks:
      - type: workdirClean
    explanation: clean -f는 추적되지 않는 파일을 지웁니다. 작업 영역에 커밋된 파일만 남으면 통과합니다.
    anchor: "#git-clean으로-추적되지-않는-파일-삭제"
---

# git reset과 reflog

## 이번 과의 목표

- git reset으로 HEAD와 상태 이동하기
- --hard / 기본(mixed) / --soft 구분하기
- git reflog로 reset된 커밋 되찾기
- git clean으로 추적되지 않는 파일 정리하기

## git reset으로 HEAD 이동

```bash
git reset --hard <커밋>   # HEAD, 인덱스, 작업 영역 모두 후퇴
git reset <커밋>          # HEAD와 인덱스 후퇴, 작업 영역 유지
git reset --soft <커밋>   # HEAD만 이동, 인덱스와 작업 영역은 그대로
```

**reset은「거슬러 가기」**입니다: 브랜치 포인터를 임의의 커밋으로 옮깁니다. 세 모드의 차이는「영향 범위」입니다:

| 모드 | HEAD | 인덱스(스테이징 영역) | 작업 영역 |
| --- | --- | --- | --- |
| `--soft` | 이동 | 유지 | 유지 |
| 기본(mixed) | 이동 | 초기화 | 유지 |
| `--hard` | 이동 | 초기화 | 초기화 |

`--hard`는 가장 자주 쓰이면서 가장 위험합니다: 중간의 모든 커밋과 커밋되지 않은 변경사항이 한꺼번에 사라집니다(작업 영역이 바로 덮어써집니다). `--hard` 후에는 `HEAD is now at <짧은 해시> <메시지>`가 출력되어 지금 어디에 있는지 알려줍니다.


<ResetVisual />

## git reflog로 잃어버린 커밋 찾기

```bash
git reflog
```

**reflog(reference log)는 HEAD의 전체 이동 기록**입니다 — 현재 브랜치의 역사뿐 아니라「여러분의 HEAD가 어디까지 갔었는지」를 보여줍니다:

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

reset으로 버려진 커밋은 **삭제되지 않습니다**. 단지 어떤 브랜치도 가리키지 않을 뿐입니다. reflog에서 그 해시를 찾아 `git reset --hard <해시>`를 실행하면 완전히 되찾을 수 있습니다. 이것이 git의「후회 약」입니다: 본인 컴퓨터에서 일어난 일이라면 거의 무엇이든 복원할 수 있습니다.

## git clean으로 추적되지 않는 파일 삭제

```bash
git clean -n       # 미리 보기: 삭제될 파일 목록
git clean -f       # 실행: 추적되지 않는 파일 삭제
```

`git status`의 Untracked files에 나열된 파일은 모두 추적되지 않는 파일입니다 — 로컬에서 생긴, git이 관리하지 않는 파일(임시 파일, 빌드 산출물)이죠. `git clean`이 이들을 정리합니다. 두 가지를 기억하세요:

- 기본적으로 실행을 거부합니다(`clean.requireForce`), 반드시 `-f`; 먼저 `-n`으로 무엇이 지워질지 확인하세요
- **clean이 지운 파일은 git으로 되찾을 수 없습니다**(한 번도 커밋된 적이 없어 reflog도 구할 수 없습니다) — 실행 전에 반드시 확인하세요

## 연습

<Exercise />

## 연습장

<Playground scenario="reset" />

<LessonProgress />
