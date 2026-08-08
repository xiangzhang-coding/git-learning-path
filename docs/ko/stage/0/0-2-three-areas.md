---
title: 3영역 모델
exercises:
  - id: 0-2-e1
    question: 지금 에디터로 수정 중인 파일이 있는 영역은 어디인가요?
    options:
      - working tree(작업 트리)
      - staging area(스테이징 영역)
      - repository(저장소)
    correct: 0
    explanation: 작업 트리는 파일을 편집하는 곳이고, 스테이징 영역은 커밋할 변경의 목록, 저장소는 커밋된 기록입니다.
    anchor: "#_3영역"
  - id: 0-2-e2
    question: git add는 변경을 어디서 어디로 옮기나요?
    options:
      - working tree → staging area
      - staging area → repository
      - repository → working tree
    correct: 0
    explanation: git add는 작업 트리의 변경을 스테이징 영역에 등록합니다. 기록에 쓰는 것은 git commit(staging area → repository)입니다.
    anchor: "#_3영역"
  - id: 0-2-e3
    question: git commit은 변경을 어디서 어디로 옮기나요?
    options:
      - working tree → staging area
      - staging area → repository
      - 변경을 버린다
    correct: 1
    explanation: commit은 스테이징된 변경을 하나의 커밋으로 묶어 저장소(.git 디렉터리)에 저장해 기록 스냅샷을 만듭니다.
    anchor: "#_3영역"
  - id: 0-2-e4
    question: 스테이징 영역의 가장 큰 장점은 무엇인가요?
    options:
      - 커밋 과정이 더 번거로워진다
      - 변경을 나눠 커밋할 수 있어 기록이 깔끔해진다
      - 실수를 자동으로 고쳐준다
    correct: 1
    explanation: 서로 무관한 두 기능을 한 번에 바꿨다면 첫 번째를 add 후 커밋하고, 두 번째를 add 후 커밋하면 됩니다. 각 커밋이 읽기 쉽고 되돌리기 쉽습니다.
    anchor: "#스테이징-영역이-왜-하나-더-있을까"
---

# 3영역 모델

## 이번 과의 목표

- working tree, staging area, repository 3영역을 이해한다
- git add와 git commit이 무엇을 옮기는지 이해한다
- git status가 무엇을 보여주는지 안다

## 3영역

Git은 저장소를 3개 영역으로 나눕니다.

- **working tree(작업 트리)**: 지금 편집 중인 파일. 에디터가 바꾸는 것은 바로 이것
- **staging area(스테이징 영역, 일명 index)**: 다음 커밋을 위해 골라둔 변경 목록
- **repository(저장소, `.git` 디렉터리)**: 커밋된 기록 스냅샷

`git status`가 보여주는 것은 바로 이 영역들 사이의 차이입니다. 바꿨는데 add하지 않은 파일, add했는데 commit하지 않은 파일.

## 스테이징 영역이 왜 하나 더 있을까

스테이징 영역 덕분에 **나눠 커밋**할 수 있습니다. 무관한 두 기능을 한 번에 바꿨더라도, 첫 번째를 add하고 커밋한 뒤 두 번째를 add하고 커밋하면 기록이 깔끔하고 되돌리기 쉽습니다. 이 영역이 없으면 한 번의 수정이 '이것저것 바꿈'이라는 지저분한 커밋 하나가 됩니다.

## 애니메이션: 3영역

버튼을 눌러 파일이 영역 사이를 이동하는 모습을 보세요. 편집은 작업 트리에서 일어나고, `git add`가 스테이징 영역에 등록하며, 기록에 쓰는 것은 `git commit`뿐입니다.

<ThreeAreas />

## 연습

<Exercise />

<LessonProgress />
