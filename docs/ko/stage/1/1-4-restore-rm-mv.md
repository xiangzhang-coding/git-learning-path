---
title: git restore, git rm과 git mv
exercises:
  - id: 1-4-e1
    question: git restore hello.txt의 역할은 무엇인가요?
    options:
      - hello.txt를 HEAD 버전으로 되돌리고 작업 트리의 변경을 버린다
      - hello.txt를 삭제한다
      - hello.txt를 스테이징 영역에 넣는다
    correct: 0
    explanation: git restore는 파일을 저장소의 버전(기본적으로 HEAD)으로 되돌려 작업 트리의 수정을 버립니다. 되돌리는 대상은 추적된 파일이며, 추적되지 않은 파일은 영향을 받지 않습니다.
    anchor: "#git-restore로-변경-취소하기"
  - id: 1-4-e2
    question: 아래 연습장에서 git restore로 hello.txt를 복원하세요.
    type: task
    scenario: local
    goal: hello.txt가 망가졌습니다. git restore hello.txt로 원래대로 복원하세요.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: 복원하면 hello.txt가 "hello world"로 돌아가고 작업 트리가 깨끗해져 git status에 nothing to commit이 표시됩니다.
    anchor: "#git-restore로-변경-취소하기"
  - id: 1-4-e3
    question: 아래 연습장에서 notes.txt를 삭제하세요(버전 기록에는 남깁니다).
    type: task
    scenario: local
    goal: git rm notes.txt로 파일을 삭제하고 삭제를 스테이징하세요.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: "git rm은 두 가지를 동시에 합니다: 작업 트리에서 파일을 삭제하고 삭제를 스테이징합니다. 커밋하면 파일이 최신 버전에서 사라지지만 기록에서 다시 찾을 수 있습니다."
    anchor: "#git-rm으로-파일-삭제하기"
  - id: 1-4-e4
    question: 아래 연습장에서 notes.txt를 diary.txt로 이름을 바꾸세요.
    type: task
    scenario: local
    goal: git mv notes.txt diary.txt로 이름을 바꾸고 스테이징하세요.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv는 '이동 + 스테이징'을 합친 명령입니다. 이름을 바꾸면 git status에 옛 이름의 삭제와 새 이름의 추가가 표시됩니다.
    anchor: "#git-mv로-파일-이동하기"
---

# git restore, git rm과 git mv

## 이번 과의 목표

- git restore로 작업 트리의 변경을 버린다
- git rm으로 파일을 삭제한다
- git mv로 파일을 이동하거나 이름을 바꾼다

## git restore로 변경 취소하기

수정을 망쳤나요? 마지막 커밋의 모습으로 돌아가고 싶다면:

```bash
git restore <파일명>
```

`git restore`는 파일을 HEAD의 버전으로 되돌려 **작업 트리의 수정을 버립니다.** 추적된(tracked) 파일에만 적용된다는 점을 기억하세요——새 파일은 git이 아직 모르기 때문에 restore가 건드릴 수 없습니다.

## git rm으로 파일 삭제하기

```bash
git rm <파일명>
```

한 번에 두 가지를 끝냅니다: 작업 트리에서 파일을 삭제하고, 삭제를 스테이징 영역에 등록합니다. 커밋하면 파일이 최신 버전에서 사라지지만 기록은 남아 있어 언제든 다시 찾을 수 있습니다.

## git mv로 파일 이동하기

```bash
git mv 옛이름 새이름
```

파일을 이동(이름 변경)하고 스테이징합니다. git은 이름 변경 자체를 '기억하지' 않습니다——내용 비교로 인식하기 때문입니다. 옛 파일이 사라지고 + 새 파일의 내용이 같음 = 이름 변경. 그래서 mv 뒤 status에는 deleted와 new file이 표시됩니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="local" />

<LessonProgress />
