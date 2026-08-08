---
title: git push 커밋 푸시
exercises:
  - id: 3-3-e1
    question: git push는 무엇을 원격으로 보내나요?
    options:
      - 현재 브랜치에서 원격에 아직 없는 커밋(그 역사와 함께)
      - 작업 영역의 모든 파일
      - 모든 로컬 브랜치
    correct: 0
    explanation: push는 로컬 브랜치가 원격보다 앞선 커밋을 보내고, 원격 브랜치를 같은 위치로 전진시킵니다.
    anchor: "#git-push-커밋-보내기"
  - id: 3-3-e2
    question: git이 non-fast-forward(비패스트포워드) 푸시를 거부하는 이유는 무엇인가요?
    options:
      - 원격에 로컬에 없는 커밋이 있고, 그대로 덮어쓰면 다른 사람의 작업이 사라지기 때문
      - 원격 저장소가 가득 찼기 때문
      - 로컬 브랜치 이름이 올바르지 않기 때문
    correct: 0
    explanation: 원격이 로컬보다 앞서 있다면 push는 원격의 새 커밋을 덮어씁니다. git은 이런 덮어쓰기를 거부하며, 먼저 pull로 병합한 뒤 push할 것을 요구합니다.
    anchor: "#non-fast-forward-푸시는-거부된다"
  - id: 3-3-e3
    question: 아래 연습장에서 로컬 커밋을 원격으로 푸시하세요.
    type: task
    scenario: push
    goal: main 브랜치에서 git push를 실행해 로컬이 앞선 커밋을 원격으로 푸시하세요.
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: push 후 출력에 To /origin과 main -> main이 표시됩니다. 원격 저장소가 이제 로컬과 같은 커밋을 가리킵니다.
    anchor: "#git-push-커밋-보내기"
---

# git push 커밋 푸시

## 이번 과의 목표

- git push로 로컬 커밋을 원격으로 푸시하기
- push가「앞선 부분」만 푸시한다는 점 이해하기
- non-fast-forward 거부 규칙 이해하기

## git push 커밋 보내기

```bash
git push              # 현재 브랜치를 origin으로 푸시
git push origin main  # 원격과 브랜치를 명시적으로 지정
```

push는 **현재 브랜치에 있고 원격에는 없는 커밋**을 보낸 뒤, 원격 브랜치를 로컬과 같은 위치로 전진시킵니다. 출력은 다음과 같습니다:

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2`는 원격 브랜치가 이전 커밋에서 새 커밋으로 전진했음을 뜻합니다. 푸시에 성공하면 원격과 로컬이 같은 역사를 공유합니다.

**주의**: push는「앞선 커밋」만 푸시합니다. 원격에도 로컬에도 없는 변경이나, 로컬에서 아직 커밋하지 않은 변경은 전송되지 않습니다.

## 패스트포워드 갱신과 추적 브랜치

push는 본질적으로 원격 브랜치를 로컬 브랜치의 위치로 **패스트포워드**시키는 일입니다(패스트포워드 개념은 단계 2의 merge에서 나왔습니다). 푸시에 성공하면 로컬의 추적 브랜치 `origin/main`도 함께 전진합니다. 이것은「원격이 지금 어디 있는지」의 미러이므로 이제 원격과 일치하게 됩니다.

## non-fast-forward 푸시는 거부된다

**원격에 로컬에 없는 커밋**이 있다면(예: 다른 사람이 먼저 푸시했거나 원격 저장소에 갱신이 있다면), 그대로 푸시하면 그 커밋을 덮어쓰게 됩니다. git은 이를 거부합니다:

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

해결법은 힌트가 말해 주는 대로입니다. 먼저 `git pull`로 원격의 새 커밋을 병합한 뒤 push하면 됩니다.

## 연습

<Exercise />

## 연습장

<Playground scenario="push" />

<LessonProgress />
