---
title: git stash와 git tag
exercises:
  - id: 4-1-e1
    question: git stash는 무엇을 저장하나요?
    options:
      - 아직 커밋하지 않은 변경사항(staged와 unstaged의 tracked 파일)
      - 이미 커밋된 역사
      - 원격 저장소의 전체 내용
    correct: 0
    explanation: stash는 작업 영역의 커밋되지 않은 변경사항을 임시로 치워 두어 작업 영역을 깨끗한 상태로 만들고, 나중에 pop으로 되찾을 수 있습니다.
    anchor: "#git-stash는-변경사항-임시-저장"
  - id: 4-1-e2
    question: tag와 branch의 차이는 무엇인가요?
    options:
      - branch는 커밋에 따라 움직이고, tag는 하나의 commit을 고정으로 가리킴
      - tag는 커밋에 따라 움직이고, branch는 고정
      - 둘은 완전히 같다
    correct: 0
    explanation: tag는 어떤 commit에 박아 둔 이름으로, 이후 커밋을 해도 움직이지 않습니다 — 버전 번호를 표시하기에 좋습니다.
    anchor: "#git-tag로-버전-표시"
  - id: 4-1-e3
    question: 아래 연습장에서 현재 커밋되지 않은 변경사항을 stash하세요.
    type: task
    scenario: stash
    goal: git stash를 실행해 작업 영역을 깨끗한 상태로 만드세요.
    checks:
      - type: statusClean
    explanation: stash 후 작업 영역은 깨끗하고, 변경사항은 stash 목록(stash@{0})에 보관됩니다.
    anchor: "#git-stash는-변경사항-임시-저장"
  - id: 4-1-e4
    question: 아래 연습장에서 stash된 변경사항을 복원하세요.
    type: task
    scenario: stash
    goal: git stash pop을 실행해 hello.txt의 수정이 작업 영역으로 돌아오게 하세요.
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop은 stash@{0}의 변경사항을 작업 영역에 되돌리고 그 stash 기록을 삭제합니다.
    anchor: "#git-stash-list와-git-stash-pop"
  - id: 4-1-e5
    question: 아래 연습장에서 현재 커밋에 태그를 붙이세요.
    type: task
    scenario: tag
    goal: git tag v1.0을 실행한 다음, git tag로 태그가 존재하는지 확인하세요.
    checks:
      - type: tagExists
        name: v1.0
    explanation: 태그는 현재 HEAD에 고정되며, 그 뒤 커밋이 아무리 많아져도 움직이지 않습니다.
    anchor: "#git-tag로-버전-표시"
---

# git stash와 git tag

## 이번 과의 목표

- git stash로 커밋하지 않은 변경사항 임시로 치워 두기
- git stash list / pop으로 stash 관리하기
- git tag로 버전 표시하기

## git stash는 변경사항 임시 저장

```bash
git stash          # 현재의 모든 커밋되지 않은 변경사항 치워 두기
git stash list     # stash 목록 보기
git stash pop      # 가장 최근 stash 복원
```

작업 중 이런 상황이 자주 생깁니다: 변경을 절반만 해 놓았는데 갑자기 다른 일 때문에 브랜치를 바꿔야 하지만, 커밋되지 않은 변경이 있으면 전환이 거부됩니다. **stash**는「임시 보관소」입니다: 변경사항을 치워 두어 작업 영역을 깨끗하게 만들고, 언제든 되찾을 수 있습니다.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list와 git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop`은 가장 최근 stash의 변경사항을 작업 영역에 되돌리고 그 기록을 삭제합니다(출력 `Dropped stash@{0}`). 주의: stash는 **git이 추적하고 있는 파일**만 저장합니다. 새로 만든 untracked 파일은 stash되지 않습니다.

## git tag로 버전 표시

```bash
git tag v1.0              # 라이트급 태그: 현재 commit에 이름 붙이기
git tag -a v1.0 -m "설명" # 주석 태그: 설명문 붙이기
git tag                   # 모든 태그 나열
```

버전을 배포할 때「이 commit을 영원히 가리키는 이름」이 필요합니다 — **tag**는 commit에 박아 두는 표시입니다. branch와 달리 tag는 새 커밋에 따라 움직이지 않습니다. 나중에 언제든 `git switch <tag>`로 그 버전으로 돌아갈 수 있습니다(이때 HEAD는 detached 상태가 되며, 챕터 4 뒤에서 다룹니다).
**태그로 전환과 detached HEAD**：`git switch <tag>`를 실행하면 HEAD가 태그가 가리키는 commit을 가리키지만, 이때 HEAD는 어떤 브랜치에도 걸려 있지 않습니다. 이것이 detached HEAD（분리된 HEAD）입니다. 이 상태에서 커밋하면 새 커밋은 어떤 브랜치에도 속하지 않아, 한번 다른 곳으로 전환하면 되찾지 못할 수도 있습니다. 그래서 보기만 하면 괜찮지만, 커밋하려면 먼저 `git switch -c <새 브랜치 이름>`으로 새 브랜치를 만드세요.

## 연습

<Exercise />

## 연습장

<Playground scenario="stash" />

<LessonProgress />
