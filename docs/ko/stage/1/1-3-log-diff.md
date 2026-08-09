---
title: git log와 git diff
exercises:
  - id: 1-3-e1
    question: git log --oneline은 무엇을 보여주나요?
    options:
      - "한 줄에 커밋 하나: 짧은 해시 + 커밋 메시지"
      - 파일의 전체 내용
      - 현재 브랜치 이름
    correct: 0
    explanation: git log는 커밋 기록을 나열하고, --oneline은 한 줄로 압축해(짧은 해시 + 커밋 메시지) 일상에서 가장 자주 쓰는 조회 방식입니다.
    anchor: "#git-log로-기록-보기"
  - id: 1-3-e2
    question: git diff는 무엇을 보여주나요?
    options:
      - 작업 트리와 스테이징 영역 사이의 내용 차이
      - 커밋 기록의 차이
      - 파일의 인코딩 차이
    correct: 0
    explanation: git diff는 작업 트리와 스테이징 영역을 비교하고(스테이징되지 않은 변경), git diff --staged는 스테이징 영역과 HEAD를 비교합니다(스테이징된 변경).
    anchor: "#git-diff로-변경-보기"
  - id: 1-3-e3
    question: 아래 연습장에서 src/a.js를 수정하고 커밋하세요. 커밋 메시지에는 "fix"가 포함되어야 합니다.
    type: task
    scenario: history
    goal: "src/a.js의 const a = 2를 const a = 3으로 바꾼 뒤 add와 commit을 하고, 메시지는 \"fix: bump a\"로 하세요."
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: 커밋하면 기록이 5개가 됩니다. git log --oneline의 첫 줄이 바로 새 커밋입니다.
    anchor: "#git-log로-기록-보기"
  - id: 1-3-e4
    question: git show <커밋>은 무엇을 보여주나요?
    options:
      - "그 커밋의 전체 세부 정보: 작성자, 날짜, 커밋 메시지, 변경된 diff"
      - 저장소에 있는 모든 파일 목록
      - 현재 브랜치의 커밋 그래프
    correct: 0
    explanation: 'git show는 커밋 하나를 펼쳐 보여줍니다: 머리말에는 작성자와 날짜, 아래에는 부모 커밋과 비교한 diff — 「이 커밋이 정확히 무엇을 바꿨는지」 보는 표준 방법입니다.'
    anchor: "#git-show로-커밋-확인"
  - id: 1-3-e5
    question: git blame <파일>은 무엇을 할 때 쓰나요?
    options:
      - 각 줄마다 마지막으로 그 줄을 수정한 커밋과 작성자를 표시
      - 파일에서 빈 줄을 삭제
      - 두 파일의 차이를 비교
    correct: 0
    explanation: 'blame은 줄 단위로 책임을 추적합니다: 각 줄 앞에는 「마지막으로 수정한 커밋의 짧은 해시 + 작성자」가 붙어, 「이 줄은 누가, 왜 바꿨지」를 알아볼 때 매우 유용합니다.'
    anchor: "#git-blame으로-줄의-출처-추적"
---

# git log와 git diff

## 이번 과의 목표

- git log로 커밋 기록을 본다
- git diff로 변경 내용을 본다
- git show로 단일 커밋의 세부 내용 보기
- git blame으로 각 줄의 출처 추적하기
- 짧은 해시와 스냅샷 모델을 안다

## git log로 기록 보기

```bash
git log              # 전체 기록(작성자, 날짜 포함)
git log --oneline    # 한 줄에 커밋 하나: 짧은 해시 + 메시지
```

각 커밋의 SHA-1 해시는 그 커밋의 신분증입니다. `git log --oneline`에 표시되는 앞 7자리 짧은 해시만으로도 커밋을 충분히 유일하게 가리킬 수 있습니다.

## git diff로 변경 보기

```bash
git diff             # 작업 트리 vs 스테이징 영역(아직 add하지 않은 변경)
git diff --staged    # 스테이징 영역 vs HEAD(add했지만 아직 commit하지 않은 변경)
```

출력에서 `-`로 시작하는 줄은 삭제된 줄, `+`로 시작하는 줄은 새로 추가된 줄입니다. 커밋 전에 diff로 무엇을 바꿨는지 확인하는 것이 표준 습관입니다.

## git show로 커밋 확인

```bash
git show <커밋>    # 어떤 커밋의 세부 정보 보기
git show HEAD     # 가장 최근 커밋
```

`git show`는 커밋 하나를 펼쳐 보여줍니다: 머리말에는 커밋 해시, 작성자, 날짜와 커밋 메시지, 아래에는 부모 커밋과 비교한 diff가 있습니다 — 「이 커밋이 정확히 무엇을 바꿨는지」에 대한 답이 바로 여기에 있습니다. git log의 해시와 함께 쓰면 어떤 변경이든 거슬러 확인할 수 있습니다.

## git blame으로 줄의 출처 추적

```bash
git blame <파일>   # 줄마다 출처 표시
```

blame은 파일의 각 줄에 접두사를 붙입니다: **마지막으로 이 줄을 수정한 커밋의 짧은 해시 + 작성자**. 「이 줄은 누가, 어느 커밋에서 바꿨지」가 궁금할 때 blame 한 번이면 알 수 있습니다 — 온라인 버그를 추적할 때 흔히 쓰는 시작점입니다.

## 스냅샷 모델

커밋할 때마다 저장되는 것은 **완전한 스냅샷**이지 차이가 아닙니다. git은 내용을 SHA-1 해시로 처리합니다——내용이 같으면 해시도 같으므로, 해시 자체로 무결성을 검증하고 중복을 없애 저장할 수 있습니다. 이것이 '분산식'이 성립하는 전제이기도 합니다. 어느 클론의 기록이든 완전히 재구성할 수 있기 때문입니다.


<SnapshotVisual />

## 연습

<Exercise />

## 연습장

<Playground scenario="history" />

<LessonProgress />
