---
title: 5-3 Issues와 협업
exercises:
  - id: 5-3-e1
    question: GitHub Issue의 전형적인 용도는 무엇인가요?
    options:
      - bug 보고, 기능 제안, 구체적인 작업 토론
      - 코드 백업 저장
      - 커밋 로그 작성
    correct: 0
    explanation: Issue는 하나의 구체적인 문제를 둘러싼 토론 스레드로, 담당자 지정, label 부착, milestone 등록, PR 연결이 가능합니다.
    anchor: "#issue란-무엇인가"
  - id: 5-3-e2
    question: PR을 병합할 때 issue도 자동으로 닫으려면 어떻게 해야 하나요?
    options:
      - PR 설명이나 연결된 커밋 메시지에 "fixes #12"라고 적는다
      - issue 댓글에서 PR 번호를 언급한다
      - issue는 수동으로만 닫을 수 있다
    correct: 0
    explanation: GitHub는 closes, fixes, resolves 키워드에 issue 번호를 붙인 것을 인식하고, PR이 병합되면 해당 issue를 자동으로 닫습니다.
    anchor: "#pr로-issue-닫기"
  - id: 5-3-e3
    question: label과 milestone의 역할은 각각 무엇인가요?
    options:
      - label은 issue를 분류하고(bug, feature 등), milestone은 issue 무리를 하나의 버전 목표로 묶는다
      - label은 권한 표시이고 milestone은 타임라인이다
      - 둘 다 저장소에 별표를 추가하는 기능이다
    correct: 0
    explanation: labels는 필터링과 분류에 좋고, milestones는「이 버전에서 무엇을 끝낼지」를 나타내며 보통 Release와 대응합니다.
    anchor: "#label과-milestone"
---

# Issues와 협업

## 이번 과의 목표

- issue가 무엇인지, 어떻게 여는지 이해하기
- label과 milestone으로 작업 조직하기
- 「fixes #번호」로 PR과 issue 연결하기

## issue란 무엇인가

Issue는 저장소 안의 토론 스레드입니다: bug를 보고하고, 기능을 제안하며, 구체적인 작업을 토론합니다. 각 issue에는 번호(예: #12), 제목, 설명, 댓글이 있고, 담당자를 지정하거나 label을 달거나 milestone에 넣을 수도 있습니다.

## issue 열기

저장소 페이지에서 Issues → New issue를 누릅니다. 좋은 issue 설명에는 다음이 들어갑니다: 문제가 무엇인지, 어떻게 재현하는지, 기대하는 동작. 많은 저장소가 issue 템플릿(bug 보고 / 기능 요청)을 제공하며, 템플릿대로 작성하면 처리 효율이 크게 올라갑니다.

## label과 milestone

- **label(레이블)**: issue를 분류합니다. 예: bug, enhancement, good first issue. label별 필터링이 유지보수자의 주요 정리 수단입니다.
- **milestone(마일스톤)**: issue 무리를 하나의 버전 목표로 묶습니다. 예: v1.2.0. milestone은 진행도를 보여 줍니다(issue x/y개 완료).

## PR로 issue 닫기

PR 설명(또는 연결된 커밋의 메시지)에 이렇게 적습니다:

```
fixes #12
```

GitHub가 해당 PR을 issue 12와 연결하고, PR이 병합되면 issue는 자동으로 닫힙니다. 같은 뜻의 키워드로 closes, resolves가 있습니다. 덕분에「어떤 변경이 어떤 문제를 해결했는지」를 역사에서 추적할 수 있습니다.

## 협업 흐름 한눈에 보기

```
bug 발견 → issue 열기(#12) → 유지보수자가 label + milestone 부착
  → 기여자가 브랜치를 만들어 bug 수정 → PR 설명에 "fixes #12" 작성
  → 병합 → issue 자동으로 닫힘, milestone +1
```

## 직접 해보기

- 내 저장소에 issue를 하나 열고, label과 milestone을 만들어 보세요
- bug를 하나 고쳐 PR을 제출하면서 설명에서 issue를 연결하세요
- 병합 후 issue가 자동으로 닫히는지 확인하세요

## 연습

<Exercise />

<LessonProgress />
