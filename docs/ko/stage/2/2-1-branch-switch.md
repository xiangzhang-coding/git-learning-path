---
title: git branch와 git switch
exercises:
  - id: 2-1-e1
    question: git branch는 무엇을 표시하나요?
    options:
      - 모든 브랜치의 목록, 현재 브랜치는 * 표시
      - 모든 커밋의 목록
      - 커밋되지 않은 변경
    correct: 0
    explanation: git branch는 저장소의 브랜치를 나열하고, *로 현재 위치한 브랜치를 표시합니다.
    anchor: "#git-branch로-브랜치-확인과-생성"
  - id: 2-1-e2
    question: 브랜치는 본질적으로 무엇인가요?
    options:
      - 어떤 commit을 가리키는 이동 가능한 포인터
      - 코드의 완전한 사본
      - 독립된 폴더 하나
    correct: 0
    explanation: 브랜치는 commit을 가리키는 포인터일 뿐입니다. 브랜치를 만들어도 파일이 복사되지 않으므로 매우 가볍습니다.
    anchor: "#브랜치는-포인터"
  - id: 2-1-e3
    question: 아래 연습장에서 feature 브랜치를 만들고 그 브랜치로 전환하세요.
    type: task
    scenario: branching
    goal: git switch -c feature로 "생성과 전환"을 한 번에 끝내세요.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature는 "feature 브랜치 생성 + 전환" 두 동작을 합친 것입니다. HEAD가 이제 feature를 가리킵니다.
    anchor: "#git-switch로-브랜치-전환"
  - id: 2-1-e4
    question: 아래 연습장에서 main 브랜치로 전환하세요.
    type: task
    scenario: branching
    goal: git switch main으로 main으로 돌아가세요.
    checks:
      - type: branchIs
        name: main
    explanation: 브랜치 전환은 HEAD와 작업 트리 내용만 바꿀 뿐, 커밋은 각자 자기 브랜치에 그대로 남아 있습니다.
    anchor: "#git-switch로-브랜치-전환"
---

# git branch와 git switch

## 이번 과의 목표

- git branch로 브랜치를 확인하고 생성한다
- git switch로 브랜치를 전환한다
- 브랜치는 포인터이며 HEAD가 현재 위치를 가리킨다는 것을 이해한다

## 브랜치는 포인터

브랜치(branch)는 본질적으로 **commit을 가리키는 이동 가능한 포인터**입니다. 브랜치를 만들어도 파일이 복사되지 않고, 현재 commit을 가리키는 이름이 하나 늘어날 뿐입니다:

```bash
git branch feature
```

이 명령은 저장소에 `feature`라는 이름을 기록해 현재 HEAD가 가리키는 commit을 가리키게 합니다. 이후 `feature`에서 커밋하면 `feature` 포인터가 따라 전진합니다.

**핵심 개념: 브랜치에 "각자의 코드"는 없습니다.** 브랜치는 역사 속 위치 표시일 뿐입니다. 같은 작업 트리에서 브랜치 이름을 바꾸면, 보이는 파일은 그 브랜치 포인터가 가리키는 스냅샷입니다.

## git branch로 브랜치 확인과 생성

```bash
git branch        # 모든 브랜치 나열, 현재 브랜치는 *
git branch <이름> # 브랜치 생성(전환은 하지 않음)
```

나열하면 출력이 이렇게 생깁니다:

```
* main
  feature
```

브랜치 생성은 포인터 하나를 기록할 뿐, **전환하지 않습니다**. 전환하려면 switch를 사용합니다.

## git switch로 브랜치 전환

```bash
git switch <이름>      # 기존 브랜치로 전환
git switch -c <이름>   # 생성과 동시에 전환(가장 자주 사용)
```

- `git switch feature`: HEAD가 `feature`로 이동하고, 작업 트리 파일은 해당 브랜치 포인터가 가리키는 스냅샷으로 바뀝니다
- `git switch -c feature`: 새 브랜치를 만들고 즉시 전환합니다. `git branch feature` + `git switch feature`와 같습니다

**예전 문법**: `git checkout <이름>`와 `git checkout -b <이름>`는 같은 동작을 하는 옛 명령어입니다. `git switch`가 새로 권장되는 명령어이며, 연습장은 둘 다 지원합니다. `git checkout`에는 '파일 복원' 용도도 있었지만 이제 `git restore`(챕터 1에서 학습)가 담당합니다.

전환할 때 작업 트리에 커밋되지 않은 변경이 있으면 git은 거부하고 커밋이나 stash를 먼저 하라고 안내합니다. 스냅샷이 바뀌면 변경이 놓일 자리가 없기 때문입니다.

## HEAD는 현재 위치를 가리킨다

**HEAD**는 "지금 어느 브랜치의 어느 commit에 있는지"를 표시하는 특수 포인터입니다. `git status` 첫 줄의 `On branch feature`가 바로 HEAD의 답입니다. 브랜치 전환은 HEAD 포인터를 옮기는 일입니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="branching" />

<LessonProgress />
