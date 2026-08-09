---
title: config와 help
exercises:
  - id: 0-3-e1
    question: git config --global user.name이 영향을 주는 범위는 어디까지인가요?
    options:
      - 현재 저장소만
      - 현재 사용자의 모든 저장소
      - 이 컴퓨터의 모든 사용자
    correct: 1
    explanation: --global은 ~/.gitconfig에 기록되어 현재 사용자의 모든 저장소에 적용됩니다. 플래그가 없으면 현재 저장소(local)에만 적용됩니다.
    anchor: "#첫-커밋-전-설정"
  - id: 0-3-e2
    question: 세 설정 레벨 중 우선순위가 가장 높은 것은?
    options:
      - system
      - global
      - local
    correct: 2
    explanation: 더 구체적인 레벨일수록 우선순위가 높아 local > global > system 순서로 덮어씁니다. local은 현재 저장소에만 해당합니다.
    anchor: "#세-설정-레벨"
  - id: 0-3-e3
    question: git commit의 사용법 요약을 빠르게 보려면?
    options:
      - git commit -h
      - git help commit
      - 둘 다 가능하다
    correct: 2
    explanation: -h는 사용법 요약을, git help는 전체 매뉴얼을 엽니다. 둘 다 공식적인 방법입니다.
    anchor: "#모르는-명령어를-만났을-때"
  - id: 0-3-e4
    question: git config --list가 보여주는 것은 무엇인가요?
    options:
      - 현재 적용 중인 모든 설정
      - 사용자 설정만
      - 저장소의 파일 목록
    correct: 0
    explanation: --list는 적용 중인 전체 설정(local > global > system을 병합한 결과)을 보여줍니다. 설정 문제를 진단하는 첫걸음입니다.
    anchor: "#첫-커밋-전-설정"
---

# config와 help

## 이번 과의 목표

- user.name과 user.email을 설정한다
- system / global / local 세 레벨을 이해한다
- help로 명령어 사용법을 찾는다

## 첫 커밋 전 설정

Git은 커밋마다 작성자를 알아야 하므로, 처음에 한 번 설정합니다.

```bash
git config --global user.name "이름"
git config --global user.email "이메일"
```

`--global`은 모든 저장소에 적용됩니다. `git config --list`로 적용 중인 전체 설정을, `git config user.name`으로 한 항목만 확인할 수 있습니다.

## 세 설정 레벨

설정에는 넓이가 다른 세 레벨이 있고, **더 구체적일수록 우선순위가 높습니다**.

| 레벨 | 범위 | 저장 위치 |
| --- | --- | --- |
| system | 이 컴퓨터의 모든 사용자 | `/etc/gitconfig` |
| global | 현재 사용자의 모든 저장소 | `~/.gitconfig` |
| local | 현재 저장소 | `.git/config` |

적용되는 값은 local → global → system 순서로 결정됩니다.

## 모르는 명령어를 만났을 때

- `git help <명령어>`: 전체 매뉴얼 열기
- `git <명령어> -h`: 사용법 요약 바로 보기
- `git help --all`: 모든 명령어 나열

명령어를 잊어도 괜찮습니다. 찾는 방법을 아는 것으로 충분합니다.

## 연습

<Exercise />

<LessonProgress />
