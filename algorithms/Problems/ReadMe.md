#  알고리즘 정리 노트

## 조합과 순열

정말 알고리즘 문제에 자주 등장하고 나올때 마다 헷갈리는 조합, 순열 관련 문제를 이해하기 위해 릿 코드 관련 문제를 정리 해보았다.

알고리즘에서 조합, 순열로 문제가 나올수 있는 상황은 다음과 같다.

1. 순열 👉 중복 O
2. 순열 👉 중복 X
3. 조합 👉 중복 O
4. 조합 👉 중복 X

이때 **중복의 기준은 하나의 후보를 두 번 쓸수 있는가?** 가 된다.

### Combination Sum I 👉 중복 ⭕️

[문제 출처](https://leetcode.com/problems/combination-sum/)

다음과 같은 후보들과 타겟이 주어졌을 때 가능한 모든 조합을 구하는 문제

```JS
const candidates = [2,3,6,7], target = 7,
// answer = [[7],[2,2,3]]
```

먼저 전체 코드는 다음과 같다.

```JS
const combinationSum = (candidates, target) => {
    const answer = [];
    candidates.sort((a, b) => a - b);
    backtrack(candidates, [], 0, target, answer);
    return answer;
};

function backtrack(candidates, arr, idx, remain, answer, len = candidates.length) {
    if (remain <= 0)
        return remain === 0 ? answer.push(arr) : null;
    for (let i = idx; i < len; i++) {
        const curr = candidates[i];
        arr.push(curr);
        // 여기서 바로 다음 인덱스로 이동하지 않고 현재 인덱스를 반복해서 사용하도록 한다.
        backtrack(candidates, [...arr], i, remain - curr, answer, len);
        arr.pop();
    }
}
```

이 경우 하나의 후보가 여러번 등장할 수 있는, 즉, 중복을 허용하는 문제이다. 이때는 위의 주석과 같이 현재 인덱스에 대해 여러번 삽입을 허용한다.

### Combination Sum II 👉 중복 ❌

[문제 출처](https://leetcode.com/problems/combination-sum-ii/submissions/)

후보와 타겟이 다음과 같이 주어졌을때,

```JS
const candidates = [1, 1, 2, 5, 6, 7, 10], target = 8
// answer = [[1,1,6],[1,2,5],[1,7],[2,6]]
```

다음과 같이 중복이 없는 (모든 후보가 한번씩만 사용 되는) 경우를 구하는 문제. 먼저 코드는 아래와 같다.

```JS
const combinationSum2 = (candidates, target) => {
    const answer = [];
    candidates.sort((a, b) => a - b);
    backtrack(candidates, [], 0, target, answer);
    console.log(answer);
    return answer;
};

function backtrack(candidates, arr, idx, remain, answer, len = candidates.length) {
    if (remain <= 0)
        return remain === 0 ? answer.push(arr) : null;
    for (let i = idx; i < len; i++) {
        const curr = candidates[i];
        arr.push(curr);
        backtrack(candidates, [...arr], i + 1, remain - curr, answer, len);
        arr.pop();
        // 중복된 해답이 생기는걸 방지하기 위해 같은 값을 가진 인덱스에 대해 skip 한다.
        while (candidates[i + 1] === candidates[i]) i++;
    }
}
const candidates = [10, 1, 2, 7, 6, 1, 5], target = 8;
combinationSum2(candidates, target);
```

이 문제에서는 하나의 후보를 여러번 쓰는건 허용되지 않지만 중복된 후보가 존재한다.

    [ [ 1, 1, 6 ], [ 1, 2, 5 ], [ 1, 7 ], [ 1, 2, 5 ], [ 1, 7 ], [ 2, 6 ] ]
    Process finished with exit code 0

일반적인 풀이법으로 풀이하면 다음과 같은 중복된 해답이 생긴다. 이유는 1이 여러개 존재하기 때문에 1로 만들어 질 수 있는 해에 대하여 1의 개수만큼 생기게 된다.

이를 해결하는게 상당히 까다로웠는데,

    | 1 | 1 | 2 | 5 | 6 | 7 | 10 |

다음과 같이 1 이 여러개일 경우 1 **하나의 1에 대해서만 재귀함수를 구현**하기 위해 다른 1을 skip 해주면 해결 할 수 있다.

### Permutations I 👉 중복 ❌

[문제 출처](https://leetcode.com/problems/permutations/)

후보중 중복되지 않는 순열을 뽑는 문제.

```JS
const nums = [1,2,3]
// answer = [ [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1] ]
```

중복되지 않는 순열은 구현하기 비교적 간단하다. 모든 후보 값이 유니크하기 때문에

```JS
const permute = function (nums) {
    const answer = [];
    permutation(nums, [], answer);
    return answer;
};

function permutation(nums, arr, answer, len = nums.length) {
    if (arr.length === len)
        return answer.push(arr);
    nums.forEach((v) => {
        // 유니한 값이기 때문에 indexOf ㅁ로 해당 값이 있는지 여부만 판단하면 됨
        if (!~arr.indexOf(v))
            permutation(nums, [...arr, v], answer, len);
    })
}
```

이 문제는 어렵지 않게 풀이 가능했다. 조금 더 까다로운 아래의 경우를 보자.

### Permutations II 👉 중복 ⭕️

중복이 있는 순열의 경우 조금 더 까다롭다.

코드를 먼저 보자.

```JS
const permuteUnique = function (nums) {
    const answer = [];
    const possible = {};
    nums.sort((a, b) => a - b);
    for (const num of nums)
        possible[num] = (possible[num] || 0) + 1;
    backtrack(answer, [], nums, {}, possible);
    return answer;
};

function backtrack(answer, arr, nums, visited, possible, len = nums.length) {
    if (arr.length === len)
        return answer.push(arr);
    for (let i = 0; i < len; i++) {
        const curr = nums[i];
        if (visited[curr] === possible[curr])
            continue;
        arr.push(curr);
        visited[curr] = (visited[curr] || 0) + 1;
        backtrack(answer, [...arr], nums, {...visited}, possible, len);
        arr.pop();
        visited[curr] = visited[curr] - 1;
        while (nums[i] === nums[i + 1])
            i++;
    }
}
```

중복이 있는 순열에서 핵심은 현재 숫자를 몇 번 방문 했는지 확인 해야한다. 이는 다양한 풀이로 접근이 가능하다고 생각한다.

내가 처음 생각해낸 방법은 object 형태의 visited 정보를 체크하여 다음과 같이 arr 에 푸쉬하는 시점에 + 1, backtrack 이후 pop 하는 과정에서 -1 하여 정보를 관리하는 것이다.

릿코드에서 참고한 다른 풀이로는 각 nums 의 인덱스 별로 visited 를 boolean 값으로 관리하는 방법도 공부해 보았다. 나에게 조금 더 맞는 방법은 위의 코드이다.
