# 코딜리티

## lessons17.NumberSolitaire

[문제 링크](https://app.codility.com/programmers/lessons/17-dynamic_programming/number_solitaire/)

### 1. 아이디어

다음과 같은 배열이 있을때,

```JS
const A = [1,-2,0,9,-1,-2]
```

A 배열 0 에서부터 len - 1 까지 1~6 만큼 이동하여 최대 값을 가지고 목적지에 도착해야하는 문제

즉, 1 👉 9 👉 -2 의 순서로 뛰어서 8을 반환해야함 (모두 6을 넘지 않는 범위)

최대 값을 저장하는 새로운 배열 score를 사용하여 풀이

### 2. 풀이 & 코드

가장 처음에 0에서 출발하므로 score 배열에 A[0]을 추가해준다.

> idx = 0 일때

A = | 1 | -2 | 0 | 9 | -1 | -2 |

score = | 1 | -∞ | -∞ | -∞ | -∞ | -∞ |

여기서 0번 부터 자기 자신 기준으로부터 6칸 떨어진 범위내에 만들수 있는 최대 값을 구해낸다.

A = | 1 👈 기준 | -2 | 0 | 9 | -1 | -2 |

score = | 1 | -1 | 1 | 10 | 0 | -1 |

이때 6번 반복되기 때문에 시간복잡도는 6

> idx = 1 일때

A = | 1 | -2 👈 기준 | 0 | 9 | -1 | -2 |

score = | 1 | -1 | 1 | 10 | 0 | -1 |

-2를 더하면 값이 더 줄어들기 때문에 score 는 모두 그대로 유지된다.

이렇게 모든 index 를 반복하면 A[len -1] 에 최대 값을 구해낸다.

`시간복잡도` : 한 인덱스당 6번 for 문 \* N 👉 O(N)

```JS
for (let curr = 0; curr < len; curr++) {
    for (let k = 1; k < 7; k++) {
        const next = curr + k;
        if (next > len)
            break;
        const sum = score[curr] + A[next];
        score[next] = Math.max(sum, score[next]);
    }
}
```

### 3. 어려웠던 점

코드 리뷰하면서 다시 문제푼거를 보니까 생각보다 잘 생각이 안났음 복습이 중요한듯

추가로 변수명을 조금더 신경써서 써야할꺼 같음 내가 작성했던 코드였는데도 변수명을 제대로 안해주니까 헷갈림

## lessons11.CountNonDivisible

[문제 링크](https://app.codility.com/programmers/lessons/11-sieve_of_eratosthenes/count_non_divisible/)

### 1. 아이디어

문제는

```JS
const A = [3, 1, 2, 3, 6];
```

위와 같은 배열이 있을때, 각 인덱스별로 나눠지지 않는 수를 구해내는 문제

    A[0] = 3, non-divisors: 2, 6,
    A[1] = 1, non-divisors: 3, 2, 3, 6,
    A[2] = 2, non-divisors: 3, 3, 6,
    A[3] = 3, non-divisors: 2, 6,
    A[4] = 6, non-divisors: 없다.

결과 값은 [2,4,3,2,0] 을 리턴해야 함.

### 2. 풀이 & 코드

제가 풀이를 접근한 방법은 배열의 크기를 len 이라 가정하면

```JS
A.map(el=> len - (나누어 떨어지는 수의 개수))
```

의 방법으로 구해 내는데

나누어 떨어지는 수의 개수 = 1의 개수 + 약수의 개수

1의 경우 모든 숫자를 나누어 지기 때문에 1은 ones 라는 변수로 세고 나머지 숫자들은 다음과 같이 약수의 개수를 구합니다.

```JS
const count = { '2': 1, '3': 2, '4': 1, '6': 4 };
// 2는 2으로 나누어짐
// 3은 3으로 나누어짐  * 2 (배열에 2개가 있기 때문)
// 6은 6, 3 * 2개, 2 로 나누어짐
let ones = 1;
```

이렇게 count를 구하려면 A 를 순회하면서 배열내 최대값 (max) 까지

```JS
for (let i = 1; (i * val) <= max; i++)
    count[i * val] = (count[i * val] || 0) + 1
```

3 의 경우 3, 6 의 개수를
2 의 경우 2, 4 의 개수를 하나씩 올리도록 for문을 만듭니다.

```JS
return A.map(el => len - (count[el] || 0) - ones);
```

모든 요소 별로 나누어지지 않는 수와 1의 개수를 빼서 계산해주면 해결

`시간복잡도` : O(N log N)

### 3. 어려웠던 점

나누어 떨어지지 않는 개수를 세야하는 문제기 때문에 단순하게 접근하면 모든 나누어 떨어지지 않는 수를 구하는데 어려움이 있었음. 👉 나누어 떨어지는 수를 계산해서 빼주는 방법으로 풀이하니까 해결하였음.

이런 경우 시간 복잡도가 왜 N \* log(N) 인지 정확히 모르겠음.

## lessons99.ArrayInversionCount - Merge Sort

[문제 링크](https://app.codility.com/programmers/lessons/99-future_training/array_inversion_count/)

### 1. 아이디어

아래와 같은 배열이 있을때

```JS
const A = [-1, 6, 3, 4, 7, 4]
```

배열의 인덱스는 작지만 값은 더 큰 pair, 즉, inversion 이 발생하는 pair 의 개수를 찾는 문제

    (1,2) (1,3) (1,5) (4,5) 4개의 pair 들은 인덱스는 왼쪽이 더 작지만 배열의 값은 더 큼

4 를 리턴해야 함

### 2. 풀이 & 코드

> Sol 1. Nested loops

이 문제는 간단하게 접근하면 단순한 2중 포문으로

```JS
for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len - 1; j++) {
        if (i < j && A[i] > A[j])
            count++;
    }
}
```

위와 같이 solution 을 구할 수 있지만 시간복잡도 측면에서 좋지 못한 성능을 보임

`시간복잡도` : O(N ^ 2)

> Sol 2. Merge Sort

Merge Sort 를 이용하면 더 좋은 성능으로 solution 을 구할 수 있음.

    Merge Sort 의 Conquer 과정에서 약간 변형하여
    i 👉 index of left sub-arry,
    j 👉 index of right sub-arry,
    mid 👉 index of mid  라 가정
    배열이 merge 되는 과정에서 A [i] > A [j] 의 조건을 만족하면 (mid - i) 개의 inversion 을
    구할 수 있다.
    예를들어
    left sub array : | 1   3   5  👈 7 |   right sub array : | 4 👈 5   9   11 |
    i = 0, j = 4, mid = 4 라 가정할때
    Conquer 가 진행 되다가 A[2] > A[4] 시점에서
    5 와 7은 무조건 4보다 크기 때문에 (mid - i) 👉 (4 - 2) 개의 inversion 을 구할 수 있다.

Merge 과정은 다음과 같다.

```JS
const merge = (arr, left, mid, right) => {
    let [i, j, k] = [left, mid, left];
    let inv_count = 0;
    const temp = [];
    while ((i <= mid - 1) && (j <= right)) {
        if (arr[i] <= arr[j])
            temp[k++] = arr[i++];
        // 👉 여기서 arr[i] > arr[j] 일 때 (mid - i) 개의 inversion 발생
        else {
            temp[k++] = arr[j++];
            inv_count = inv_count + (mid - i);
        }
    }
    while (i <= mid - 1)
        temp[k++] = arr[i++];
    while (j <= right)
        temp[k++] = arr[j++];
    for (let i = left; i <= right; i++)
        arr[i] = temp[i];
    return inv_count;
}
```

`시간복잡도` : O(N log N)

### 3. 어려웠던 점

코드 자체는 merge sort 를 그대로 사용하되 약간의 변형으로 solution 을 구할 수 있지만 아이디어를 도출하는게 어려웠다.
[GeeksforGeeks](https://www.geeksforgeeks.org/counting-inversions/) 코드를 참고하여 풀이하였지만 재밌었던 문제 !
