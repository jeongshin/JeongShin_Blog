# 프로그래머스 Level02

## 큰 수 만들기 👉 Greedy, Stack

[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/42883) [나의 풀이](https://github.com/DKU-STUDY/Algorithm/blob/master/programmers/%EB%82%9C%EC%9D%B4%EB%8F%84%EB%B3%84/level02.%ED%81%B0_%EC%88%98_%EB%A7%8C%EB%93%A4%EA%B8%B0/JeongShin.js)

### 1. 문제정의

다음과 같이 string 형태의 숫자가 주어졌을때, k만큼의 숫자를 제외해서 가장 큰 수를 만드는 문제.

    💁🏻‍♂️ 1번 예제
    Number = '4177252841' k = 4 일때
    4,1,2,2 를 제외한 '775841' 을 구하는 문제

### 2. 풀이 & 코드

이 문제에 대한 풀이는 쉽게 떠올릴 수 있다.

예를들어

    Number = '4177' k = 2 라 가정하면,
    | 4 | 1 | 7 | 7 | 가장 먼저 1을 제외
    | 4 | 7 | 7 | 이 가장 큰 수가 된다. 다음으로 4을 제외하면
    | 7 | 7 | 가장 큰 수가 만들어진다.

    즉 맨 앞에서부터 검사해가며 바로 뒤의 숫자보다 작은 숫자를 찾아서 제외하면 된다.

위의 솔루션으로 간단하게 구현하면 **시간복잡도 O (N ^ 2)** 으로 쉽게 구할 수 있다.

하지만, 이 문제에서 요구하는건 한번의 iteration, **O (N)**, 으로 해를 구하는것.

일단 최악의 경우를 생각해보자.

    Number = '999999999999991919' k = 2 에서지
    2개의 1을 찾아내는데 거의 숫자를 k번 처음부터 끝까지 모두 탐색해야 한다.

여기서 스터디 원의 도움을 받았는데 바로 `스택`을 이용하면 N의 반복으로 해결할 수 있다.

1번 예제로 돌아가보자.

    4177252841 에서 스택과 삭제한 숫자 개수 deleteCount를 이용해 풀이해보자
    4 칸의 빈 스택을 만들어준다.
    |   |   |   |   | 그 뒤 4개의 숫자를 push
    | 4 | 1 | 7 | 7 | 에서 가장 먼저 1을 pop, deleteCount = 1
    | 4 | 7 | 7 | 2 | 다음 숫자 2 를 push 4를 pop, deleteCount = 2
    | 7 | 7 | 2 | 5 | 5를 push
    ... 반복

    이와 같이 4개의 숫자를 제외할때 까지 반복해주면 특정 index에서 종료가 되거나
    문자열 끝에 도달시 맨 뒤의 숫자부터 pop 해주면 된다.

위의 풀이대로 풀이해주면 모든 인덱스당 스택에서 제외할 값을 찾기위한 스택의 크기 k 만큼 반복이 진행된다.

즉, 시간복잡도가 **O ( k \* N ) 에서 k 는 상수 이므로 👉 O ( N )** 이 된다.

### 3. 어려웠던 점

스택에 대한 아이디어를 스스로 생각해내지 못했던 점이 많이 아쉽다.

그리디 기법을 사용하는 배열관련 문제에서 N ^ 2 의 탐색이 이루어 지는 상황이 있다면 스택, 큐를 이용하여 풀이 할 수 있는지 생각해보자.

## 타겟 넘버 👉 BFS, DFS

[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/43165) [나의 풀이]()

### 1. 문제정의

다음과 같이 배열이 주어질 때 target 을 만드는 경우의 수를 구하는 문제.

    numbers = [1, 1, 1, 1, 1] target = 3 이라 가정하면
    -1+1+1+1+1 = 3
    +1-1+1+1+1 = 3
    +1+1-1+1+1 = 3
    +1+1+1-1+1 = 3
    +1+1+1+1-1 = 3

총 5가지 경우의 수가 존재한다.

### 2. 풀이 & 코드

이 문제는 별수 없이 2 ^ n 의 케이스를 다 따져봐야 한다.

```
    ( 0)_ ( 1) _ ( 2) _ ( 3)
      \        \     \_ ( 1)
       \         ( 0) _ ( 1)
        \          \___ (-1)
         \                    ... ( 생략 😱 )
          (-1) _ ( 0) _ ( 1)
            \        \_ (-1)
             \__ (-2) _ (-1)
                     \_ (-3)
```

2행, 3행에서 결과적으로는 같은 1 이지만 지나온 path 가 다르다.

- 2행 : 1 + 1 - 1
- 3행 : 1 - 1 + 1

path 가 다르면 또 다른 경우의 수로 세기 때문에 이 문제의 경우 2 ^ n 의 모든 케이스를 고려해야 한다.

이 문제는 2가지 방법으로 접근해 보았다.

1. dfs-like solution

```JS
function sol1(numbers, target) {
    const len = numbers.length;
    let answer = 0;
    const dfs = (sum, idx) => {
        if (idx === len) {
            answer += (sum === target)
            return;
        }
        dfs(sum + numbers[idx], idx + 1)
        dfs(sum - numbers[idx], idx + 1)
    }
    dfs(0, 0)
    return answer
}
```

가장 먼저 재귀 호출로 구현. dfs 알고리즘과 유사한 형태로 해를 구한다.

2. bfs-like solution

```JS
function sol2(numbers, target) {
    const len = numbers.length;
    let stack = [0];
    let lvl = 0;
    while (lvl < len) {
        const temp = [];
        stack.forEach((el) => {
            temp.push(el - numbers[lvl]);
            temp.push(el + numbers[lvl]);
        })
        stack = temp;
        lvl++
    }
    return stack.reduce((acc, curr) => acc + (curr === target), 0)
}
```

이 두가지 방법의 차이는 dfs는 위의 그림 기준 **1행 2행 3행 순서대로 탐색**이 이루어지고

bfs는 level 순서로, 즉, **열 순서대로 탐색**해 나간다.

이 문제는 두가지 방법 중 어떤걸 사용해도 풀이가 가능했지만 만약 문제 조건이 달라지면 어떤 알고리즘을 사용할지 고려해봐야 한다.

### 3. 어려웠던 점

레벨 3의 dfs, bfs 알고리즘을 풀이하고 나중에 레벨 2를 도전해서 그런지 이 문제는 별다른 어려움 없이 재미있게 풀이 하였다 😇

어려운 문제도 솔루션을 봐서라도 포기하지말고 한번 풀어보자. 다른 문제가 쉬워진다 👍
