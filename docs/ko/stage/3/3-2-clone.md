---
title: git clone 저장소 복제
exercises:
  - id: 3-2-e1
    question: git clone은 무엇을 하나요?
    options:
      - 원격 저장소를 로컬에 완전히 복사(역사 + 작업 영역)하고 origin을 자동으로 설정
      - 최신 커밋 하나만 다운로드
      - 로컬 저장소를 원격으로 업로드
    correct: 0
    explanation: clone은 전체 역사를 복사하고 기본 브랜치의 작업 영역을 체크아웃한 뒤, 원격을 origin으로 자동 명명하고 추적 브랜치를 만듭니다.
    anchor: "#git-clone-한-번에-복사-완료"
  - id: 3-2-e2
    question: clone 후 origin/main은 무엇인가요?
    options:
      - "추적 브랜치: 로컬이「원격 main이 어떤 커밋을 가리키는지」기록하는 미러"
      - 원격 저장소 안의 폴더
      - 바로 커밋할 수 있는 로컬의 새 브랜치
    correct: 0
    explanation: refs/remotes/origin/main은 clone/fetch 시점의 원격 main 위치를 기록하는 읽기 전용 추적 미러입니다.
    anchor: "#추적-브랜치-origin-main"
  - id: 3-2-e3
    question: 아래 연습장에서 원격 저장소를 클론하고, 클론된 디렉터리로 들어가세요.
    type: task
    scenario: clone
    goal: git clone /origin을 실행한 뒤 cd origin으로 클론된 저장소 디렉터리에 들어가고, git status로 main 브랜치임을 확인하세요.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: clone 후 새 디렉터리로 들어가면(cd) 완전한 역사의 복사본 안에 있는 것입니다. remote origin은 이미 자동으로 설정되어 있습니다.
    anchor: "#git-clone-한-번에-복사-완료"
---

# git clone 저장소 복제

## 이번 과의 목표

- git clone으로 원격 저장소를 로컬에 복사하기
- origin과 추적 브랜치 origin/main 이해하기
- clone 후 cd로 새 디렉터리에 들어가야 한다는 점 이해하기

## git clone 한 번에 복사 완료

```bash
git clone /origin          # 현재 디렉터리에 origin/ 하위 디렉터리를 만들고 그 안에 클론
git clone /origin 내-프로젝트  # 디렉터리 이름을 지정할 수도 있음
cd origin                  # 클론된 저장소로 들어가기
```

`git clone <주소>`는 네 가지를 한 번에 완료합니다:

1. 로컬에 새 디렉터리 생성(기본적으로 주소의 마지막 부분을 이름으로 사용)
2. 원격의 **전체 역사**를 복사
3. 기본 브랜치(보통 main)의 작업 영역 체크아웃
4. 원격을 **origin**으로 자동 명명하고 추적 브랜치 생성

clone은「기존 프로젝트에 합류하는」표준 진입점입니다. `git init`이 필요 없으며 모든 것이 원격에서 옵니다.

## 추적 브랜치 origin/main

clone 시 git은 원격 각 브랜치가 그 순간 가리키던 커밋을 기록해 **추적 브랜치(tracking branch)**로 저장합니다:

```
refs/remotes/origin/main   # 읽기 전용 미러: 지금 원격 main의 위치
```

이는 로컬 브랜치(`refs/heads/main`)와 다릅니다. **여러분의 커밋이 이것을 움직이지 않으며**, 오직 `git fetch` / `git pull` / `git push`만 갱신합니다. 이후 언제든 `git log origin/main`으로「원격이 어떻게 생겼는지」확인할 수 있습니다.

## 복사 vs 연결

clone은 **복사**입니다. 클론된 저장소는 완전히 독립적이며, 원격과의 유일한 연결은 origin이라는 주소뿐입니다. 여러분의 커밋이 원격으로 자동 전송되지 않고, 원격의 새 커밋도 자동으로 나타나지 않습니다. 다음 세 과에서 배울 fetch/push/pull이 바로 이 두 방향의 운반입니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="clone" />

<LessonProgress />
