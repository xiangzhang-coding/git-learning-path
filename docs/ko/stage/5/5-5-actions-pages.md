---
title: 5-5 GitHub Actions와 Pages
exercises:
  - id: 5-5-e1
    question: GitHub Actions의 workflow 파일은 어디에 두나요?
    options:
      - 저장소의 .github/workflows/ 디렉터리 아래, YAML 형식
      - 아무 디렉터리의 .yml 파일
      - 루트에만 둘 수 있고 이름도 main.yml이어야 한다
    correct: 0
    explanation: workflow는 .github/workflows/*.yml에 작성하고, 이벤트(push, pull_request 등)가 트리거합니다.
    anchor: "#workflow-파일"
  - id: 5-5-e2
    question: workflow 안에서 job과 step의 관계는?
    options:
      - job은 작업(병렬 가능, 서로 다른 머신에서 실행), step은 job 안의 한 단계 동작
      - job은 동작이고 step은 머신이다
      - 둘은 같은 것이다
    correct: 0
    explanation: workflow는 job으로, job은 step으로 구성됩니다(각 step은 명령을 실행하거나 action을 재사용). job 사이에는 의존성을 선언할 수 있습니다.
    anchor: "#workflow-파일"
  - id: 5-5-e3
    question: 이 강의 사이트(GitHub Pages)의 배포는 어떤 시나리오인가요?
    options:
      - push가 Actions를 트리거해 사이트를 빌드하고 Pages에 배포한다
      - 서버를 직접 구매해야 한다
      - 매번 파일을 수동으로 업로드한다
    correct: 0
    explanation: 커밋이 Actions를 트리거해 자동으로 빌드하고 Pages에 배포합니다. 이것이 이 강의 사이트의 배포 방식입니다.
    anchor: "#github-pages-배포"
---

# GitHub Actions와 Pages

## 이번 과의 목표

- Actions가 무엇인지, 이벤트가 어떻게 workflow를 트리거하는지 이해하기
- workflow 파일의 구조 읽기
- Actions로 GitHub Pages를 배포하는 방법 알기

## Actions란 무엇인가

GitHub Actions는 내장된 CI/CD입니다: 저장소의 이벤트(push, pull_request, 예약, 수동)가 자동화 작업을 트리거합니다 — 테스트 실행, 빌드, 출시, 배포. 지금 보고 있는 이 강의 사이트도 Actions가 빌드해 Pages에 배포한 것입니다.

## workflow 파일

workflow는 `.github/workflows/` 아래 YAML 파일로 정의합니다(예: deploy.yml):

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
```

구조: `on`은 트리거 이벤트를 선언하고, `jobs`는 작업을 정의하며(병렬 실행 가능, 각자 한 머신에서), `steps`는 작업 안의 한 단계 한 단계 동작입니다(`run`은 명령 실행, `uses`는 커뮤니티가 만든 action 재사용).

## 자주 쓰는 트리거 이벤트

- `push`: push할 때 트리거(브랜치 제한 가능)
- `pull_request`: PR이 열리거나 업데이트될 때
- `schedule`: 정해진 시간에 트리거(cron 문법)
- `workflow_dispatch`: 버튼 클릭으로 수동 트리거

## GitHub Pages 배포

Pages 배포에는 두 가지 길이 있습니다: 저장소 설정에서 Pages를 켜고 브랜치를 그대로 배포하거나, Actions로 빌드한 산출물을 배포. 후자가 더 자주 쓰입니다(먼저 테스트와 빌드를 실행하고 산출물을 Pages에 배포):

```
push ──▶ workflow 트리거 ──▶ 의존성 설치 → 빌드 → 산출물을 Pages에 배포
```

배포 상태, 로그, 실패 원인은 모두 저장소의 Actions 탭에서 확인합니다. 커밋 옆의 초록 체크(✓/✗)가 검사 실행 결과로 들어가는 입구입니다.

## 직접 해보기

- 저장소에 `.github/workflows/deploy.yml`을 만들어 정적 페이지 하나를 배포하세요
- 일부러 빌드 단계를 틀리게 해서 Actions의 실패 로그를 관찰하세요
- 연습용 저장소에 테스트를 실행하는 workflow를 추가하세요

## 연습

<Exercise />

<LessonProgress />
