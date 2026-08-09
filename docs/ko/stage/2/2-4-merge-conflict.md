---
title: 머지 충돌 해결하기
exercises:
  - id: 2-4-e1
    question: 충돌(conflict)은 언제 발생하나요?
    options:
      - 양쪽이 같은 파일의 같은 자리를 수정했을 때
      - 양쪽이 서로 다른 파일을 수정했을 때
      - git merge를 실행하기만 하면
    correct: 0
    explanation: 다른 위치를 바꾸면 git이 자동으로 병합합니다. 양쪽이 같은 자리를 바꿔 누구 것을 남길지 git이 판단할 수 없을 때만 직접 결정해야 합니다.
    anchor: "#충돌은-어떻게-발생하나"
  - id: 2-4-e2
    question: 충돌 마커 <<<<<<< HEAD와 ======= 사이에는 무엇이 있나요?
    options:
      - 현재 브랜치(HEAD)의 이 자리 수정 내용
      - 상대 브랜치의 이 자리 수정 내용
      - 파일 전체 내용
    correct: 0
    explanation: 충돌 파일에서 <<<<<<< HEAD와 ======= 사이는 "우리 쪽" 버전이고, =======와 >>>>>>> 사이는 "상대 쪽" 버전입니다.
    anchor: "#충돌-마커"
  - id: 2-4-e3
    question: 아래 연습장에서 충돌을 만들고 해결하세요.
    type: task
    scenario: conflict
    goal: git merge feature를 실행해 충돌을 일으키세요. hello.txt의 내용을 "hello resolved"로 바꾸고 충돌 마커를 모두 지우세요. git add hello.txt로 스테이징한 뒤 git commit으로 머지를 완료하세요.
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: 충돌 해결의 본질은 "git이 못 하는 결정을 직접 내리는 것"입니다. 파일을 편집하고 마커를 지우고 add한 뒤 commit하면 머지 커밋이 탄생합니다.
    anchor: "#충돌-해결-절차"
  - id: 2-4-e4
    question: 충돌을 해결한 뒤(add 이후) 머지를 완료하려면 어떤 명령을 쓰나요?
    options:
      - git commit(해결 결과를 커밋해 머지 커밋을 생성)
      - git stash
      - git reset
    correct: 0
    explanation: 충돌 해결 후 add하면 git은 여전히 머지 중입니다(MERGE_HEAD가 존재). 이때 git commit은 현재 내용으로 머지 커밋을 만들어 머지를 끝냅니다.
    anchor: "#충돌-해결-절차"
---

# 머지 충돌 해결하기

## 이번 과의 목표

- 충돌이 생기는 이유를 이해한다
- 충돌 마커를 읽는다
- 충돌 해결의 표준 절차를 익힌다. 편집 → add → commit

## 충돌은 어떻게 발생하나

머지할 때 git은 양쪽 변경을 한데 합쳐야 합니다. 양쪽이 **서로 다른 위치**를 바꿨다면 git이 자동으로 병합합니다. 하지만 **양쪽이 같은 파일의 같은 자리를 수정했다면** git은 누구 것을 남길지 판단할 수 없습니다. 그래서 양쪽 버전을 모두 파일에 넣고, 결정은 당신에게 맡깁니다.

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

출력은 어느 파일인지 명확히 알려 줍니다:

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## 충돌 마커

충돌 파일의 각 충돌 블록에는 마커가 셋 있습니다:

| 마커 | 의미 |
| --- | --- |
| `<<<<<<< HEAD` | 아래는 우리 쪽(현재 브랜치) 내용 |
| `=======` | 구분선 |
| `>>>>>>> feature` | 아래는 상대 브랜치(feature) 내용, 마커 이름은 상대 브랜치 이름 |

**할 일**: 최종적으로 남길 내용을 정하고(새로 써도 됨) 마커 셋을 모두 지웁니다.

## 충돌 해결 절차

표준 절차는 네 동작입니다:

```bash
git merge feature          # 1. 충돌 발생시키기
# 충돌 파일 편집: 내용 선택 후 마커 삭제
git add hello.txt          # 2. 이 파일이 해결됐다고 git에 알리기
git commit -m "merge: resolve"   # 3. 머지 완료, 머지 커밋 생성
```

그동안 `git status`는 머지 중임을 알려 줍니다. 해결되지 않은 파일이 있으면 `You have unmerged paths`, 모두 add하면 `All conflicts fixed but you are still merging`이 표시됩니다. 이때 commit하면 됩니다.

**핵심**: 충돌은 에러가 아니라 git이 결정권을 당신에게 넘긴 것입니다. 해결 후 만들어지는 것은 여전히 평범한 머지 커밋이며, 역사에는 이 머지가 그대로 기록됩니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="conflict" />

<LessonProgress />
