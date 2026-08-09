---
title: git stash и git tag
exercises:
  - id: 4-1-e1
    question: Что сохраняет git stash?
    options:
      - Незакоммиченные изменения (staged и unstaged tracked-файлов)
      - Уже сохранённую историю
      - Всё содержимое удалённого репозитория
    correct: 0
    explanation: stash временно прячет незакоммиченные изменения из рабочего каталога, возвращая его в чистое состояние — позже их можно вернуть через pop.
    anchor: "#git-stash-спрятать-изменения"
  - id: 4-1-e2
    question: В чём разница между tag и branch?
    options:
      - branch перемещается вместе с коммитами, tag намертво указывает на один commit
      - tag перемещается вместе с коммитами, branch неподвижен
      - Они полностью одинаковы
    correct: 0
    explanation: "tag — это имя, прибитое к одному commit: сколько бы коммитов ни появилось после, оно не сдвинется — удобно помечать номера версий."
    anchor: "#git-tag-метка-версии"
  - id: 4-1-e3
    question: В зоне практики ниже спрячьте текущие незакоммиченные изменения через stash.
    type: task
    scenario: stash
    goal: Выполните git stash, чтобы рабочий каталог снова стал чистым.
    checks:
      - type: statusClean
    explanation: После stash рабочий каталог чист, а изменения сохранены в списке stash (stash@{0}).
    anchor: "#git-stash-спрятать-изменения"
  - id: 4-1-e4
    question: В зоне практики ниже верните изменения из stash обратно.
    type: task
    scenario: stash
    goal: Выполните git stash pop, чтобы изменения hello.txt вернулись в рабочий каталог.
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop возвращает изменения stash@{0} в рабочий каталог и удаляет эту запись stash.
    anchor: "#git-stash-list-и-git-stash-pop"
  - id: 4-1-e5
    question: В зоне практики ниже поставьте тег на текущий коммит.
    type: task
    scenario: tag
    goal: Выполните git tag v1.0, затем git tag, чтобы убедиться, что тег существует.
    checks:
      - type: tagExists
        name: v1.0
    explanation: "Тег прибит к текущему HEAD: сколько бы коммитов ни появилось после, он не сдвинется."
    anchor: "#git-tag-метка-версии"
---

# git stash и git tag

## Цели урока

- Временно прятать незакоммиченные изменения командой git stash
- Управлять stash командами git stash list / pop
- Помечать версии командой git tag

## git stash: спрятать изменения

```bash
git stash          # спрятать все текущие незакоммиченные изменения
git stash list     # показать список stash
git stash pop      # вернуть самую свежую запись stash
```

В работе это бывает постоянно: изменения готовы наполовину, а нужно срочно переключиться на другую ветку — но переключение откажется (есть незакоммиченные изменения). **stash** — это «временная камера хранения»: спрятал изменения, рабочий каталог снова чист, а забрать их можно в любой момент.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list и git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` возвращает изменения самой свежей записи stash в рабочий каталог и удаляет её (в выводе — `Dropped stash@{0}`). Обратите внимание: stash сохраняет только **файлы, уже отслеживаемые git**; новые untracked-файлы stash не трогает.

## git tag: метка версии

```bash
git tag v1.0              # легковесный тег: имя для текущего commit
git tag -a v1.0 -m "описание" # аннотированный тег: с описанием
git tag                   # показать все теги
```

При выпуске версии нужно «имя, которое всегда указывает на этот commit» — **tag** и есть такая метка, прибитая к commit. В отличие от branch, tag не сдвигается с появлением новых коммитов. В любой момент можно вернуться к версии через `git switch <tag>` (тогда HEAD окажется в состоянии detached — об этом дальше в главе 4).
**Переключение на тег и detached HEAD**: `git switch <tag>` направит HEAD на коммит, на который указывает тег, — но в этот момент HEAD не висит ни на одной ветке; это и есть detached HEAD (отделённая голова). Если закоммитить в этом состоянии, новый коммит не будет принадлежать ни одной ветке, и после переключения его можно не найти. Так что просто посмотреть — без проблем; если нужно коммитить, сначала создайте ветку командой `git switch -c <имя новой ветки>`.

## Упражнения

<Exercise />

## Зона практики

<Playground scenario="stash" />

<LessonProgress />
