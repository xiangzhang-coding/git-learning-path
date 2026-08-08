---
title: git init와 git status
exercises:
  - id: 1-1-e1
    question: git init은 무엇을 하나요?
    options:
      - 다른 사람의 코드를 내려받는다
      - 현재 디렉터리에 .git 디렉터리를 만들고 디렉터리를 저장소로 만든다
      - 새 파일을 하나 만든다
    correct: 1
    explanation: git init은 현재 디렉터리에 빈 git 저장소를 초기화합니다(.git 디렉터리 생성). 이후 이 디렉터리와 하위 디렉터리가 버전 관리 대상이 됩니다.
    anchor: "#git-init으로-저장소-만들기"
  - id: 1-1-e2
    question: git status는 무엇을 알려주나요?
    options:
      - 현재 브랜치와 세 영역 사이의 차이
      - 파일의 성능 지표
      - 서버 상태
    correct: 0
    explanation: git status는 가장 자주 쓰는 명령 중 하나로, 현재 브랜치, 스테이징된 변경, 스테이징되지 않은 변경, 추적되지 않은 파일을 보여줍니다.
    anchor: "#git-status로-상태-보기"
  - id: 1-1-e3
    question: 파일이 git에 추적(tracked)된다는 것은 무엇을 의미하나요?
    options:
      - .gitignore에 들어 있다
      - git의 기록이나 스테이징 영역에 있으며, git이 그 변화를 계속 지켜본다
      - 잠겨 있어 수정할 수 없다
    correct: 1
    explanation: tracked 파일은 git이 알고 있는 파일(커밋되었거나 스테이징된)이고, untracked 파일은 작업 트리에 새로 나타났지만 git이 아직 모르는 파일입니다.
    anchor: "#git-status로-상태-보기"
  - id: 1-1-e4
    question: 아래 연습장에서 저장소를 초기화하세요.
    type: task
    scenario: init
    goal: git init으로 현재 디렉터리를 git 저장소로 만든 다음, git status로 확인하세요.
    checks:
      - type: branchIs
        name: main
    explanation: 초기화하면 git status가 "On branch main"이라고 표시됩니다. 연습장에는 user.name/user.email이 미리 설정되어 있어 바로 커밋할 수 있습니다.
    anchor: "#git-init으로-저장소-만들기"
---

# git init와 git status

## 이번 과의 목표

- git init으로 저장소를 만든다
- git status로 저장소 상태를 이해한다
- tracked 파일과 untracked 파일을 구분한다

## git init으로 저장소 만들기

버전 관리의 출발점: git에게 "이 디렉터리는 당신이 관리합니다"라고 알려주는 일입니다.

```bash
git init
```

이 명령은 현재 디렉터리에 `.git` 디렉터리를 만듭니다. 여기에 객체 데이터베이스, 인덱스, 참조 등이 들어 있으며——이것이 저장소 본체입니다. 작업 트리의 파일은 영향을 받지 않고, 이 순간부터 파일의 모든 변화를 기록할 수 있습니다.

## git status로 상태 보기

`git status`는 가장 자주 쓰는 명령으로, 세 영역 사이의 차이를 한눈에 보여줍니다.

- 지금 어느 브랜치에 있는지(On branch ...)
- 스테이징된 변경(Changes to be committed)
- 스테이징되지 않은 변경(Changes not staged for commit)
- 추적되지 않은 파일(Untracked files)

한 가지 기억하세요: **git은 새 파일을 자동으로 추적하지 않습니다.** 새로 만든 파일은 `git add`를 해야 스테이징 영역에 들어가고, 그래야 git이 계속 변화를 지켜봅니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="init" />

<LessonProgress />
