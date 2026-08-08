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
---

# git log와 git diff

## 이번 과의 목표

- git log로 커밋 기록을 본다
- git diff로 변경 내용을 본다
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

## 스냅샷 모델

커밋할 때마다 저장되는 것은 **완전한 스냅샷**이지 차이가 아닙니다. git은 내용을 SHA-1 해시로 처리합니다——내용이 같으면 해시도 같으므로, 해시 자체로 무결성을 검증하고 중복을 없애 저장할 수 있습니다. 이것이 '분산식'이 성립하는 전제이기도 합니다. 어느 클론의 기록이든 완전히 재구성할 수 있기 때문입니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="history" />

<LessonProgress />
