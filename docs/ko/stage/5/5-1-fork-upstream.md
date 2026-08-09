---
title: fork와 upstream 동기화
exercises:
  - id: 5-1-e1
    question: fork와 clone의 차이는 무엇인가요?
    options:
      - fork는 GitHub에서 저장소를 내 계정으로 복사하고, clone은 저장소를 내 컴퓨터로 복사한다
      - fork는 코드만 복사하고 clone은 역사까지 함께 복사한다
      - fork는 clone의 별칭이다
    correct: 0
    explanation: fork는 GitHub 서버에 사본을 만듭니다(내 계정 이름 아래). clone은 저장소를 로컬에 통째로 복사합니다. fork 후에는 보통 로컬로 clone해야 작업할 수 있습니다.
    anchor: "#fork란-무엇인가"
  - id: 5-1-e2
    question: 오픈소스 협업에서 origin과 upstream 리모트를 둘 다 두는 이유는 무엇인가요?
    options:
      - origin은 내 fork를 가리키고 upstream은 원작자 저장소를 가리켜 각자 제 역할을 한다
      - 리모트 하나에는 역사가 다 담기지 않기 때문이다
      - GitHub가 리모트를 두 개 강제하기 때문이다
    correct: 0
    explanation: push는 내 fork(origin)에만 보낼 수 있습니다. upstream은 상위 업데이트를 받고, PR로 기여를 되돌려보내는 데 씁니다.
    anchor: "#upstream-리모트-추가"
  - id: 5-1-e3
    question: upstream의 새 커밋을 내 fork에 동기화하려면 올바른 순서는?
    options:
      - git fetch upstream으로 내려받고 upstream/main을 로컬 main에 병합(또는 rebase)한 뒤 push origin
      - git push upstream으로 upstream을 끌어온다
      - git pull origin만 하면 upstream도 자동으로 동기화된다
    correct: 0
    explanation: fetch는 upstream 커밋만 내려받고, merge/rebase는 업데이트를 로컬 main에 이어붙이며, 마지막 push가 GitHub의 사본까지 업데이트합니다.
    anchor: "#upstream과-동기화"
---

# fork와 upstream 동기화

## 이번 과의 목표

- fork가 오픈소스 협업에서 하는 역할 이해하기
- git remote add upstream으로 원작자 저장소 연결하기
- fetch + merge로 상위 업데이트 동기화하기

## fork란 무엇인가

fork(포크)는 GitHub에서 남의 저장소를 내 계정 아래로 복사하는 기능입니다:

```
원작자: github.com/author/project
    │ fork
    ▼
나: github.com/you/project   ← 마음대로 수정 가능
```

fork는 GitHub의 기능입니다(git 명령어가 아님). clone과의 차이: fork는 GitHub 서버에 사본을 만들고, clone은 저장소를 로컬 컴퓨터로 복사합니다. 전형적인 오픈소스 흐름은「먼저 fork, 그다음 내 fork를 clone」입니다 — 원작자 저장소에는 쓰기 권한이 없으므로 내 사본에서만 작업할 수 있습니다.

## 자신의 fork 클론하기

GitHub에서 Fork를 누른 뒤, 내 계정 아래에 있는 저장소를 clone합니다:

```bash
git clone https://github.com/you/project.git
cd project
git remote -v
```

`git remote -v`는 리모트 하나를 보여 줍니다: `origin`이 내 fork를 가리킵니다. 이 시점에는 origin만 읽고 쓸 수 있습니다 — 원작자 저장소의 업데이트는 자동으로 나타나지 않습니다.

## upstream 리모트 추가

원작자 저장소를 두 번째 리모트로 등록합니다. 관례상 이름은 `upstream`입니다:

```bash
git remote add upstream https://github.com/author/project.git
git remote -v
```

이제 리모트가 둘입니다: `origin`(내 fork, 읽기/쓰기)과 `upstream`(원작자 저장소, 업데이트를 받기 위한 읽기 전용). 이 두 역할의 분담을 기억하는 것이 fork 워크플로의 핵심입니다.

## upstream과 동기화

상위 저장소는 계속 업데이트됩니다. fork를 따라가게 하려면:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

- `git fetch upstream`: upstream 커밋을 내려받습니다(로컬은 그대로)
- `git merge upstream/main`(또는 rebase): 업데이트를 로컬 main에 이어붙입니다
- `git push origin main`: GitHub의 fork까지 동기화합니다

이렇게 하면 fork가 원작자 저장소와 일치하게 되고, 이후 최신 코드 위에서 브랜치를 만들어 기여할 수 있습니다.

## 직접 해보기

- GitHub에서 자주 쓰는 오픈소스 저장소를 하나 fork하세요
- 그 저장소를 clone하고 upstream을 추가한 뒤 동기화를 한 번 완료하세요
- Issues 페이지에서 다른 사람들이 어떻게 협업하는지 살펴보세요

## 연습

<Exercise />

<LessonProgress />
