---
title: git add와 git commit
exercises:
  - id: 1-2-e1
    question: git add는 변경을 어느 영역에 넣나요?
    options:
      - working tree
      - staging area(스테이징 영역)
      - repository(저장소)
    correct: 1
    explanation: git add는 작업 트리의 변경을 스테이징 영역에 등록해 "이 변경들은 커밋할 준비가 됐다"고 표시합니다.
    anchor: "#git-add로-변경-스테이징하기"
  - id: 1-2-e2
    question: git commit의 -m 옵션은 무엇을 하나요?
    options:
      - 두 브랜치를 병합한다
      - 이번 커밋에 설명 문구를 쓴다
      - 커밋 작성자를 바꾼다
    correct: 1
    explanation: -m은 커밋 메시지(commit message)를 제공해 이번 커밋이 무엇을 했는지 기록합니다. 좋은 커밋 메시지는 다른 사람(미래의 나 포함)을 위해 씁니다.
    anchor: "#git-commit으로-스냅샷-저장하기"
  - id: 1-2-e3
    question: 아래 연습장에서 todo.txt를 스테이징하세요.
    type: task
    scenario: add-commit
    goal: git add todo.txt로 파일을 스테이징 영역에 추가하세요.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: 스테이징하면 git status에서 todo.txt가 "Changes to be committed" 아래에 표시됩니다.
    anchor: "#git-add로-변경-스테이징하기"
  - id: 1-2-e4
    question: 아래 연습장에서 todo.txt를 커밋하세요. 커밋 메시지에는 "todo"가 포함되어야 합니다.
    type: task
    scenario: add-commit
    goal: "git add todo.txt 후 git commit -m \"feat: add todo\"로 커밋하세요."
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: 커밋하면 todo.txt가 저장소 기록에 들어갑니다. hello.txt의 수정은 작업 트리에 그대로 남고 커밋되지 않습니다——commit은 스테이징 영역의 내용만 묶습니다.
    anchor: "#git-commit으로-스냅샷-저장하기"
---

# git add와 git commit

## 이번 과의 목표

- git add로 변경을 스테이징 영역에 넣는다
- git commit으로 스냅샷을 저장한다
- commit이 스테이징 영역의 내용만 커밋한다는 것을 이해한다

## git add로 변경 스테이징하기

```bash
git add <파일명>     # 파일 하나를 스테이징
git add .            # 현재 디렉터리의 모든 변경을 스테이징
```

`git add`는 작업 트리의 변경을 **스테이징 영역(staging area)**에 등록합니다. 선택적으로 스테이징할 수 있습니다. 기능 세 곳을 고쳤다면 그중 한 곳만 add하고 커밋하면 기록이 깔끔해집니다.

## git commit으로 스냅샷 저장하기

```bash
git commit -m "feat: add login page"
```

`git commit`은 **스테이징 영역**의 내용을 하나의 커밋(commit)으로 묶어 저장소 기록에 씁니다. 커밋할 때마다 다음이 일어납니다.

- 프로젝트 현재 모든 파일의 완전한 **스냅샷** 저장(차이가 아님)
- SHA-1 해시로 고유 ID 생성(예: `4a2b9c1`)
- 작성자, 시각, 커밋 메시지 기록

**핵심 규칙: commit에는 스테이징 영역의 내용만 들어갑니다.** 작업 트리에서 바꿨지만 add하지 않은 변경은 이번 커밋에 들어가지 않습니다.

## 커밋 메시지 작성법

"무엇을 했는지"를 한 문장으로: 동사로 시작하고, 시제를 통일하며, 50자 안으로 끝냅니다. 예: `fix: correct the login validation`.

## 연습

<Exercise />

## 연습장

<Playground scenario="add-commit" />

<LessonProgress />
