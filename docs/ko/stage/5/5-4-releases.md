---
title: 5-4 Releases와 버전 출시
exercises:
  - id: 5-4-e1
    question: 의미론적 버전 2.4.1에서 각 숫자는 무엇을 뜻하나요?
    options:
      - 2는 주 버전(파괴적 변경), 4는 부 버전(새 기능), 1은 패치(bug 수정)
      - 2는 패치, 4는 주 버전, 1은 부 버전
      - 세 숫자 사이에 차이가 없다
    correct: 0
    explanation: "MAJOR.MINOR.PATCH: 주 버전은 호환을 깨고, 부 버전은 기능을 추가하며, 패치는 bug를 고칩니다. 올리는 규칙이 버전 번호에 호환성 정보를 담게 합니다."
    anchor: "#의미론적-버전"
  - id: 5-4-e2
    question: 주석이 달린 tag를 원격으로 push하려면 올바른 방법은?
    options:
      - 먼저 git tag -a v1.0.0 -m "v1.0.0"을 하고, git push origin v1.0.0
      - git push가 tag를 자동으로 전부 가져간다
      - git tag를 만들면 push할 필요가 없다
    correct: 0
    explanation: 먼저 tag를 만들고 명시적으로 push합니다. git push는 기본적으로 tag를 보내지 않습니다(git push --tags는 예외).
    anchor: "#tag-만들고-push하기"
  - id: 5-4-e3
    question: GitHub Release와 git tag의 관계는?
    options:
      - Release는 tag 위에 세워지며, 출시 설명과 첨부 파일을 추가로 제공한다
      - Release는 tag와 무관하다
      - Release는 브랜치다
    correct: 0
    explanation: 기존 tag에서 Release를 만들어, 설명(release notes)과 바이너리 첨부를 붙여 정식 버전을 만듭니다.
    anchor: "#release-만들기"
---

# Releases와 버전 출시

## 이번 과의 목표

- 의미론적 버전의 규칙 이해하기
- tag를 만들고 GitHub로 push하기
- 설명과 첨부가 있는 Release 만들기

## 의미론적 버전

버전 번호 MAJOR.MINOR.PATCH(예: 2.4.1):

| 자리 | 언제 올리나 |
| --- | --- |
| MAJOR 주 버전 | 호환되지 않는 파괴적 변경 |
| MINOR 부 버전 | 새 기능 추가, 하위 호환 유지 |
| PATCH 패치 | bug 수정, 새 기능 없음 |

규칙은 간단합니다: 주 버전을 올리면「왜 내 프로그램이 갑자기 고장 났는지」가 설명되고, 패치를 올리면「안심하고 업그레이드해도 된다」는 뜻입니다.

## tag 만들고 push하기

출시 전에 먼저 로컬에서 tag를 만듭니다(단계 4에서 학습):

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

주의: `git push`는 기본적으로 tag를 보내지 않으므로 `git push origin <tag>`처럼 명시해야 합니다(전부 보내려면 `git push --tags`).

## Release 만들기

GitHub 저장소 페이지 → Releases → Draft a new release:

1. tag를 선택(또는 새로 만든다), 예: v1.0.0
2. 제목과 출시 설명(release notes) 작성
3. 바이너리 산출물(설치 패키지, 빌드 결과물) 첨부 가능
4. Publish release 클릭

Release는「설명이 붙은 tag」입니다: 사용자는 여기서 버전을 내려받고 변경 사항을 확인하며, git log를 뒤질 필요가 없습니다.

## release notes 작성법

좋은 출시 설명은 독자별로 묶습니다:

- **신규**(Features): 새 기능, PR에 링크 가능
- **수정**(Bug fixes): 무엇을 고쳤는지, issue에 링크 가능
- **파괴적 변경**(Breaking changes): 업그레이드 시 주의사항

## 직접 해보기

- 내 프로젝트에 v0.1.0 tag를 만들고 push하세요
- 첫 번째 Release를 만들고, 세 부분으로 설명을 작성하세요
- 패치 버전을 하나 출시하고 Releases 목록을 살펴보세요

## 연습

<Exercise />

<LessonProgress />
