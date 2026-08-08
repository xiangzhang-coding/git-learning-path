---
title: git remote 원격 저장소
exercises:
  - id: 3-1-e1
    question: remote란 무엇인가요?
    options:
      - 저장소 복사본이 있는 원격 위치(다른 저장소, 보통 서버에 있음)
      - 로컬의 폴더
      - 저장소를 압축하는 git 내장 명령
    correct: 0
    explanation: remote는「다른 저장소」의 위치입니다. git은 이 주소로 커밋을 올리고 내려받으며, origin은 clone 후 기본 remote 이름입니다.
    anchor: "#remote는-무엇인가"
  - id: 3-1-e2
    question: git remote -v는 무엇을 표시하나요?
    options:
      - 모든 remote의 이름과 주소
      - 모든 브랜치 목록
      - 원격의 모든 커밋
    correct: 0
    explanation: git remote -v는 각 remote의 이름과 주소, 그리고 fetch와 push에 사용되는 설정을 나열합니다.
    anchor: "#git-remote-확인과-추가"
  - id: 3-1-e3
    question: 아래 연습장에서 origin이라는 이름의 원격 저장소를 추가하세요.
    type: task
    scenario: remote
    goal: git remote add origin /origin으로 원격 저장소를 등록하고, git remote -v로 확인하세요.
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: remote add는 주소만 등록할 뿐 데이터를 전송하지 않습니다. 이후 fetch/push/pull이 어디로 가야 할지 알게 됩니다.
    anchor: "#git-remote-확인과-추가"
---

# git remote 원격 저장소

## 이번 과의 목표

- remote의 개념 이해하기: 다른 저장소의 위치
- git remote add로 원격 저장소 등록하기
- git remote -v로 설정 확인하기

## remote는 무엇인가

지금까지 여러분의 모든 커밋은 **여러분의 로컬 저장소 하나**에만 있었습니다. 실제 프로젝트는 여럿이 협업합니다. 모두가 각자 저장소를 하나씩 갖고, 교환 지점인「공유 저장소」도 하나 있습니다. 그것이 바로 remote입니다.

remote(원격 저장소)는 본질적으로 **다른 git 저장소의 주소**입니다. git 자체에는「클라우드」가 없으며, 어떤 머신(또는 디렉터리)이든 remote가 될 수 있습니다. 여러분의 저장소는 이름으로 remote를 참조하며, 기본 이름은 **origin**(clone 시 자동으로 붙음)입니다.

이번 과의 연습장에서 `/origin`이 바로 그 원격 저장소의 위치입니다. 로컬의 `/repo`와 서로 독립된 메모리 저장소입니다.

## git remote 확인과 추가

```bash
git remote            # remote 이름 나열
git remote -v         # 이름 + 주소 나열(fetch/push 각 한 줄)
git remote add <이름> <주소>   # 새 remote 등록
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add`는 주소만 등록할 뿐 **데이터를 전송하지 않습니다**. `.git/config`에 설정을 기록합니다:

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## 두 가지 역할 기억하기

| 이름 | 의미 |
| --- | --- |
| 로컬 브랜치 | `refs/heads/main`, 여러분의 커밋이 여기에 쌓임 |
| remote | 원격 저장소의 주소, 예: `/origin` |
| 추적 브랜치(tracking branch) | `refs/remotes/origin/main`, 로컬이「원격의 main이 어디를 가리키는지」기록하는 미러 |

추적 브랜치는 다음 단계인 clone/fetch의 핵심입니다. 네트워크 없이도「원격이 어떻게 생겼는지」확인할 수 있게 해줍니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="remote" />

<LessonProgress />
