# You Don't Know JS

# Part I. 타입과 문법

## CH 1-1. 타입

자바스크립트에는 다음 7가지 `Primitives` 원시 타입이 있다. (Object 제외) 이 있다.

- null
- undefined
- boolean
- number
- string
- object
- symbol

잠깐 `Symbol` 이란?

A unique value that can be used as an identifier for object properties

쉽게 말해 **unique 한 값을 저장하는 컨테이너**이다.

```JS
const s = Symbol.for(555);
console.log(Symbol.keyFor(s)) // 555
```

```JS
/* 타입은 자신의 명칭과 동일한 문자열을 반환 */
typeof undefined === "undefined" // true;
typeof true === "boolean" // true
typeof 42 === "number" // true
typeof {life : 42} === "object" // true
typeof Symbol() === "symbol" // true
/* 특별한 녀석 */
typeof null === "object"
typeof function a() {/* some codes */} === "function" // Object 하위 타입
typeof [1,2,3] === "object" // Object 하위 타입
```

`null` 은 **falsy**한 유일한 원시 값이지만 **타입은 Object**인 특별한 존재이다. 따라서, 정확하게 확인하려면

```JS
var a = null;
(!a && typeof a === "object") // true
```

와 같이 두개의 조건이 필요하다.

`function` 의 경우 **object의 하위 타입** 이다. 이는 `Callable Object` [[Call]] 로 호출 가능한 객체 라 명시되어 있다.

### 값은 타입을 가진다

자바스크립트는 변수에 `Type Enforcement` 하지 않는다. 즉, 변수값이 **처음에 할당된 값과 동일한 타입일 필요가 없다**

`undefined` 는 접근 가능한 스코프에 변수가 선언 되었으나 아직 값이 할당되어 있지 않음을 의미 한다.
반면 `undeclared` 는 접근 가능한 스코프에 변수가 선언 조차 되지 않음을 의미 한다.
두 가지 경우 모두 다 `typeof` 연산 결과는 **undefined** 값을 가지지만 분명 다른 의미를 가진다.

## CH 1-2. 값

### 배열

JS 배열에서는 인덱스에 키/ 프로퍼티 문자열을 추가 할 수 있지만 length 가 증가하지 않는다.
또한 키로 넣은 문자열이 10진수 숫자 타입으로 바뀌면 숫자 키를 사용한 결과를 초래 할 수 있다.

```JS
var a = []
a['13'] = 42
a.length // 14
var b = []
b.['foo'] = 4
b['foo'] // 4
b.length //0 👉 문자열이 들어가는 경우 length는 증가하지 않는다
```

### 문자열

문자열과 배열의 차이는 문자열은 `Immutable` 배열은 `Mutable`이다. 따라서
str[0] 의 접근 방법은 바르지 못하다. str.charAt(0) 이 올바른 접근 방법이다.

문자열은 불변 값이기 때문에 내용이 변경되면 새로운 문자열을 생성한 뒤 반환한다.

문자열을 다룰 때 대부분의 배열 메서드는 문자열에 쓸 수 없지만, 문자열에 대해 불변 배열 메서드는 빌려 쓸 수 있다.

```JS
const a = 'foo'
const c = Array.prototype.join.call(a, '-')
const d = Array.prototype.map.call(a, v => v.toUpperCase() + '.').join('');
```

### 작은 소수의 값

    0.1 + 0.2 === 0.3 // false

수식은 true 여야 정상이지만 0.1 과 0.2는 원래 숫자와 일치하지 않는다. 따라서 결과 값은 0.30000000000000004 에 가깝다.

이때 `Machine Epsilon`으로 이를 대신 할 수 있다.

```JS
const numbersCloseEnoughToEqual = (n1, n2) => {
    return Math.abs(n1 - n2) < Number.EPSILON;
    }
numbersCloseEnoughToEqual( 0.1 + 0.2 , 0.3 ); // true;
```

### 32-bit Signed Integer

정수는 2 ^ 53 -1 까지 안전하다. 하지만 비트 연산 등에서 32비트에만 가능한 연산이 있어 범위가 줄어든다.
이때 범위는 Math.pow(-2, 31) ~ Math.pow(2, 31) 까지가 된다.

### NaN

`NaN` 은 말 그대로 **숫자 아님**을 의미한다. NaN은 경계 값 (특별한 의미의 숫자 값)의 일종으로 에러를 나타낸다.

```JS
    typeof (2 / "foo") === "number" // true
    ( 2 / "foo" ) === NaN // false
    isNaN( 2 / "foo" ) // true
```

위와 같은 특징을 보이며 NaN은 어떤 것과도 동등하지 않다.
NaN은 세상의 모든 언어를 통틀어 **자기 자신과도 동등하지 않은** 유일한 값이다.

```JS
if (!Number.isNaN){
    Number.isNaN = n => n !== n;
}
```

### Infinity

JS에서 divide by zero 연산은 에러가 아닌 무한대 값이 된다.

```JS
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

### -0

JS 에서는 -0이 존재함.

```JS
var a = 0 / -3; // -0
var b = 0 * -3; // -0
/* 이 부분은 앞뒤가 맞지 않는 대목 🤯 */
JSON.stringify(-0); // "0"
JSON.parse("-0") // -0
```

-0은 이동 방향을 따질때 유용하게 쓰임

이러한 특이한 동등 비교 할때에는 `Object.is()` 가 사용됨.

### 값 vs 레퍼런스 🌟

`Value` : null, undefined, string number, boolean 같은 `Scalar Primitives` 는 언제나 **값 복사 방식**으로 할당/ 전달 된다.

`Reference` : 객체 (배열과 박싱된 객체 래퍼 전체)나 함수등 합성 값 `Compound Values` 은 할당/ 전달 시 반드시 레퍼런스 copy를 생성한다.

배열 같은 합성 값을 값 복사에 의해 전달하려면

```JS
foo (a.slice()); // Shallow Copy
```

와 같이 레퍼런스가 원본을 가리키지 않게 해야함.

반면, 스칼라 원시 값을 레퍼런스처럼 바뀐 값이 바로바로 반영되도록 넘기려면 원시 값을 달른 합성 값 (객체, 배열) 으로 감싸야 한다.

```JS
function foo(wrapper){
    wrapper.a = 42;
}
var obj = {
    a : 2
};
foo(obj);
obj.a = 42;
//wrapper 없이 그냥 a를 전달할 경우 값이 변경되지 않음
```

## CH 1-3. 네이티브

`Natives` 라고 하는 여러 가지 내장 타입이 아래와 같이 있다 (사실 내장 함수 이다).

    String()
    Number()
    Boolean()
    Array()
    Object()
    Function()
    RegExp()
    Date()
    Error()
    Symbol() // ES6

예를들어 (new String("abc")) 생성자의 결과는 원시 값 "abc" 를 감싼 객체 래퍼이다.

### 내부 [[Class]]

typeof 가 `object` 인 값에는 [[Class]]라는 내부 프로퍼티가 붙는다.

```JS
Object.prototype.toString.call([1,2,3,]); // "[object Array]"
Object.prototype.toString.call(42); // "[object Number] 단순 윈시 값은 해당 객체 래퍼로 자동 박싱된다.
```

### 래퍼 박싱하기

객체 래퍼는 아주 중요한 용도로 활용된다. 원시 값 "abc"에는 프로퍼티나 메서드가 없지만 JS가 알아서 `박싱 (래핑)` 하므로 아래와 같이 내부 함수를 쓸 수 있는 것이다.

```JS
var a = "abc";
a.length; //3
a.toUpperCase(); // "ABC"
```

JS 엔진이 객체를 생성할 필요 없도록 개발자가 직접 객체 형태로 `Pre-Optimize` 하면 오히려 더 느려질 수 있다. **JS엔진이 알아서 박싱하도록 원시값을 사용**하자.

### Array ( )

```JS
var a = new Array(3);
var b = [undefined, undefined, undefined];

a.join("-");
b.join("-");

a.map(function (v,i) {return i;}); // [undefined * 3]
b.map(function (v,i) {return i;}); // [0, 1, 2]
```

a 는 슬롯이 없기 때문에 map() 함수가 순회할 원소가 없다.

undefined 값 원소로 채워진 배열은 다음과 같이 선언 할 수 있다.

```JS
var a = Array.apply(null, {length : 3});
a; // [undefined, undefined, undefined]
```

apply() 함수로 첫번째 인자는 this 객체 바인딩 `Object Binding`, 두번째 인자는 인자의 배열 (유사 배열)로 원소들이 `Spread` 되어 함수 인자로 전달된다.

즉, Array.apply() 는 Array() 함수를 호출하면서 {length : 3} 객체 값을 펼쳐 인자로 넣는다.

### Symbol ( )

`Symbol` 은 ES6부터 등장한 원시 값으로 충돌 염려 없이 객체 프로퍼티로 사용 가능한 특수 **유일 값**이다.

## CH 1-4. 강제변환 ⭐️

어떤 값을 다른 타입의 값으로 바꾸는 과정이 명시적이면 `Type Casting`, 암시적이면 `Coercion` 이라 한다.

`Type Casting` 은 정적 타입 언어에서 컴파일 시점에, `Coercion`은 동적 타입 언어에서 런타임 시점에 발생한다.

```JS
var a = 42;
var b = a + ""; // Explicit Coercion 암시적 강제변환
var c = String( a ); // Implicit Coercion 명시적 강제변환
```

명시적, 암시적의 용어 상 관계는 아래와 같이 생각할 수 있다.

👉 `Explicit` : `Implicit` = **Obvious** : **Hidden Side Effect**

:::tip JS에서의 강제 변환
JS에서는 강제변환을 하면 문자열, 숫자, 불리언 같은 스칼라 원시 값 중 하나가 되며
객체, 함수 같은 합성 값 타입으로 변환될 일은 없다.
네이티브에서 박싱은 스칼라 원시 값을 해당 객체로 감싸는건데 이는 강제변환에 해당 🙅🏻‍♂️
:::

### ToString

**문자열이 아닌 값** 👉 **문자열** 변환을 담당 한다.
일반 객체는 기본적으로 `Object.prototype.toString()`에 있는 toString() 메서드가 내부 [[Class]] 를 반환한다.
따라서 자신의 toString() 메서드를 가진 객체는 문자열 처럼 사용하면 자동으로 이 메서드가 기본으로 호출되어 대체한다.

```JS
var arr = [1,2,3];
a.toString(); // "1,2,3"
```

### JSON

`JSON-Safe Value` 는 모두 JSON.stringify() 로 문자열화 할 수 있다. 안전 값이 아닌 값은 **undefined, 함수, Symbol**, Circular Reference Object 등이 있다.

따라서 JSON.stringify() 는 인자가 undefined, 함수, 심벌 값이면 자동으로 배열에 포함될 경우 null로 바꾸고 객체 프로퍼티에 있으면 지워버린다.

```JS
JSON.stringify(undefined) // undefined
JSON.stringify( function(){} ) // undefined
JSON.stringify(
    [1, undefined, function(){}, 4]
) // "[1, null, null, 4]"
JSON.stringify(
    { a : 2, b : function(){} }
) // "{"a" : 2 }"
```

부적절한 JSON 값이나 직렬화하기 곤란한 객체 값을 문자열화 하려면 `toJSON()` 메서드를 따로 정의해야한다.

JSON.stringify() 은 직접적인 강제변환의 형식은 아니지만 두 가지 이유로 ToString 강제 변환과 연관된다.

    1. 문자열, 숫자, 불리언, null 값이 JSON으로 문자열화하는 방식은
     ToString 추상 연산의 규칙에 따라 문자열 값으로 강제변환되는 방식과 동일하다.

    2. JSON.stringify() 에 전달한 객체가 자체 toJSON() 메서드를 갖고 있자면,
     문자열화 전 호출되어 JSON-Safe Value로 강제변환 된다.

### ToNumber

**숫자가 아닌 값** 👉 **숫자**를 담당한다.

예를들어 true 👉 1, false 👉 0, undefined 👉 NaN, null 👉 0 으로 바뀐다.

문자열 : 숫자 리터럴 규칙과 비슷하게 작동하고 변환이 실패하면 NaN이 된다.

객체 & 배열 : 동등한 원시 값으로 변환 후 그 결과값을 ToNumber 규칙에 의해 강제 변환.

동등한 원시 값 변환 과정에서 해당 객체가 `valueOf()` 메서드를 구현 했는지 확인하거나 `toString()`을 이용하여 강제변환 한다.

```JS
var a = {
    valueOf: () => {
        return '42'
    }
}
var b = {
    toString: () => {
        return '42'
    }
}

var c = [ 4, 2 ];
c.toString = (){
    return this.join("");
}

Number(a) // 42
Number(b) // 42
Number(c) // 42
Number('') // 0
Number([]) // 0
Number(['abc']) // NaN
```

### ToBoolean

`Falsy 값`

JS에서 모든 값은 둘 중 하나에 속한다. 1. 불리언으로 강제변환하면 false가 되는 값

Ex) undefined, null, false, +0, -0, NaN 2. 1번을 제외한 명백한 true 값

| 인자타입  | 결과 값                 |
| :-------- | :---------------------- |
| Undefined | false                   |
| Null      | false                   |
| Number    | +0, -0, NaN 만 👉 false |
| String    | length가 0이면 false    |
| Object    | true                    |

`truthy 값`

falsy 값이 아니면 무조건 truthy 값.

```JS
var a = [];
var b = {};
var c = () => {};
var d = Boolean(a && b && c) // true
```

`Falsy 객체`

Falsy 객체란 평범한 객체처럼 작동할 것 같지만 (truthy 객체라 생각하기 쉽지만) 불리언으로 강제변환하면 false인 객체.

```JS
var a = new Boolean( false )
var b = new Number( 0 )
var c = new String( "" )
var d = Boolean(a && b && c) // true
```

Falsy 객체를 위의 객체들로 오해하기 쉽지만 **위의 객체들은 falsy 값을 둘러싼 객체이긴 하지만 불리언 변환시 true** 가 된다.
즉, 단순히 falsy 값을 둘러싼 객체가 falsy 객체는 아니다.

Falsy 객체의 예는 DOM에서 사용했던 유사 배열 객체 `document.all` 이 해당되는데 document.all 은 자바스크립트 상으로는 truthy 한 일반 객체 처럼 작동
해야하지만 비표준 브라우저 IE 를 감지하는 수단으로 if (document.all) 의 값이 특수 목적으로 falsy 하게 사용되고 있음.

## CH 1-4-1 명시적 강제 변환

1. `문자열👈👉숫자`

String(), Number() 를 사용하는데, `new` 키워드를 사용하지 않기 때문에 객체 래퍼를 생성하는게 아니다 !
👉 new 키워드가 있는 경우는 해당 원시 값에 객체 래퍼를 생성하여 감싸주는 것이고 new 키워드가 없다면 명시적 강제 변환에 해당된다.

```JS
var a = 42;
var b = a.toString()
/* toString 메서드도 겉으론 명시적이지만
원시 값 42에는 toString() 메서드가 없기 때문에
JS엔진이 42를 객체 래퍼로 박싱하여 내부적으론 암시적인 작동이다.
*/
var c = '3.14'
var d = +c
/* +는 단항 연산자 Unary Operator 로 피연산자 c를 숫자로
명시적 강제변환 한다. 하지만 이진 연산자, 증감 연산자와 같이
쓸 경우 명시적이라해도 가독성이 급격히 떨어지기 때문에 피해야 한다!
*/
```

2. `날짜👈👉숫자`

**+** 단항 연산자는 `Date 객체` 👉 `숫자` 강제변환 용도로 쓰인다.

```JS
var timestamp = +new Date();
// trick : timestamp = +new Date;
```

하지만 ES5 부터는 현재 타임스탬프는 **Date.now()** 로 특정 날짜/ 시간의 타임스탬프는 **new Date().getTime()** 을 쓰도록 한다.

3. `~ 연산자`

`비트 연산자`는 피 연산자를 **32 비트 값**으로 강제로 맞춘다.

~ 연산자는 32비트 숫자로 강제변환 후 각 비트를 거꾸로 뒤집는다. (NOT 연산)

    ~x 는 대략 - (x + 1) 과 같다. // ~42 👉 -43

즉, ~ 연산자를 falsy 하게 만드는 유일한 값은 -1 이고 이러한 특징 때문에 -1을 경계 값이라 부른다. 이를 활용하면 아래와 같은 코드를 작성 할 수 있다.

```JS
var a = 'Hello World'
~a.indexOf('lo') // -4 👉 truthy
if (~a.indexOf('lo')){
   // 찾았다 😇
}
!~a.indexOf('ol')
if (!~a.indexOf('ol')){
    // 못 찾았다 🤯
}
```

:::tip ~~ : 비트 잘라내기

1. 32비트 값에 한하여 안전하다.

2. 음수에서는 Math.floor() 과 결과 값이 다르다 !

:::

4. `ParseInt()`

문자열 👉 숫자 강제 변환과 parseInt 는 동작이 다르다.
ParseInt는 인자 값을 강제로 문자열로 바꾸고 파싱을 시작한다. 하지만 되도록이면 문자열이 아닌 값을 넘기는건 좋지 않다.

```JS
var a = "42"
var b = "42px"
Number( a ) // 42
parseInt( b ) // 42
Number( b ) // NaN 강제변환 하려는 인자가 숫자가 아닌 문자를 포함하면 NaN을 던진다
parseInt( b ) // 42 좌 -> 우 방향으로 파싱하다가 숫자가 아닌 문자에서 멈춘다

```

5. `!!`

- 👉 불리언으로 강제변환이 가능하다.

## CH 1-4-2 암시적 강제 변환

숨겨진 형태로 일어나는 타입 변환.

1. `문자열👈👉숫자`

'+' 연산자는 숫자의 덧셈, 문자열 접합 두 가지 목적으로 `Overload`됨.

하지만 + 연산자가 단순히 문자열이 올때 문자열만 합치는 역할만 하는건 아니다. 아래의 코드를 보면

```JS
var a = [1,2];
var b = [3,4];
a + b // "1,23,4"
```

문자열이 아닌 배열의 문자열로 강제 변환된 뒤 합쳐졌다.

ES5에 따르면 + 알고리즘은 피연산자가 **객체 값** 문자열이거나, 문자열 표현형으로 나타낼 수 있으면 **문자열 붙이기**를 한다.

피연산자 (오브젝트) 👉 ToPrimitive 추상연산 👉 [[DefaultValue]] 알고리즘 호출

배열 👉 valueOf() 으로 원시 값 반환이 불가능, toString() 호출 👉 + 연산으로 두 문자열이 합쳐짐

```JS
var a = 42;
var b = a + ""; // 암시적 강제변환
b; // "42"
```

위의 경우 암시적 강제 변환의 흔한 관용 코드인데

ToPrimitive 연산 과정에서 a 값을 valueOf() 메서드에 전달하여 호출하고, toString 추상 연산을 하여 문자열로 변환된다.

하지만 a 가 원시 값이 아닌 객체라면 결과값은 달라진다.

```JS
var a = {
    valueOf : () => {return 42}
    toString : () => {return 4}
}
a + "" // "42" 👉 valueOf() 메서드에 전달, toString 추상 연산하기 때문에 42가 됨.
String(a) // "4" 👉 명시적 형변환 toString()을 직접 호출
```

### && 와 || 연산자

JS 에서 `&&` 와 `||` 연산자는 다른 언어와 달리 결과 값이 불리언 값이 아니다 !

결과 값은 **두 피연산자 중 한쪽 값**이다.
단 연산자 우선순위에서 `&&` 는 `||`보다 먼저 평가 된다.

```JS
var a = 42;
var b = 'abc'
var c = null;

a || b // 42
a && b // "abc"

c || b // "abc"
c && b // null
```

||, && 연산자는 우선 첫 번째 피연산자의 ToBoolean 로 강제 변환 후 평가를 한다.

    || 연산자는 결과가
        true 이면 첫 번째 피연산자의 값을
        false 이면 두 번째 피연산자 값을 반환 한다.
    대략 a ? a : b 와 같다

    && 연산자는
        true 이면 두 번째 피연산자 값을
        false 이면 첫 번째 피연산자 값을 반환 한다.
    대략 a ? b : a 와 같다

즉, 자바스크립트에서의 ||, && 연산은 **피 연산자 선택 연산자**에 가까운 셈이다.

`||` 연산자는 **디폴트 값 할당 관용 코드**로 많이 사용된다. 하지만 falsy 값은 무조건 건너뛸 경우에만 사용해야 한다.
그렇지 않은 경우에는 삼항 연산자로 명시적이게 지정해야 한다.

`&&` 연산자는 첫 번째 피연산자 불값 결과가 truthy 일때만 두 번째 피연산자를 선택하기 때문에 이런 특성을 `가드 연산자` 라고 한다.
따라서 첫 번째 표현이 두 번째 표현의 가드 역할을 하게 된다.

```JS
const foo = () => {
    console.log( a );
}
var a = 42;
a && foo()
```

위의 코드에서 5번행은 if (a) foo()와 같은 역할을 한다.

42 👉 a 가 truthy 일 때에만 foo()가 호출된다. a 가 falsy 일 경우 foo() 함수는 수행되지 않는다.

### 심벌의 강제변환

ES6에서 부터 등장한 Symbol 의 경우

- Symbol 👉 문자열 : 명시적 강제변환은 허용되나 암시적 강제변환은 금지되고 바로 에러처리 된다.
- Symbol 👉 숫자 : 양뱡향 모두 에러가 난다.
- Symbol 👉 Boolean : 명시적/ 암시적 모두 강제변환 가능하다.

하지만 심벌 값을 강제 변환할 일은 정말 드물 것이다. 원래 만들어진 의도가 강제변환을 필요로 하지 않기 때문이다.

### 느슨한/ 엄격한 동등 비교

JS 에서 흔히 `Loose Equals ==` 연산자와 `Strict Equals ===` 연산자에 대해

== 는 값의 동등함, === 는 타입과 값 모두의 동등함이라 알고 있지만 더 정확한 의미는

== 는 동등함 비교시 **강제 변환을 허용** ===는 **강제 변환 허용 하지 않는다**

1. `* 👉 Boolean 비교`
   어떤 값을 true/ false와 직접 비교할때 주의해야할 점이 있다.

```JS
var a = "42"
var b = true;
a == b // false 👉 WHAT!??!?!??  🤯🤯🤯🤯
```

ES5 를 인용하면,

- Type(x) 가 불리언이면 ToNumber (x) == y 의 비교 결과를 반환한다
- Type(y) 가 불리언이면 x == ToNumber(y) 의 비교 결과를 반환한다

즉, ToNumber(true) 👉 1 로 강제 변환, 1 == "42" 이 되는데 타입이 다름으로 "42"는 42로 바뀌어
1 == 42, false 가 된다. 즉, "42" 값 자체의 truthy/ falsy 여부는 == 연산과 무관하다
**==의 피연산자 한쪽이 불리언 값**이면 예외 없이 그 값이 **숫자로 먼저 강제 변환**된다

즉, **== true 혹은 == false** 같은 코드는 쓰지 않는게 좋다

```JS
var a = "42"
// BAD !! 🙅🏻‍♂️
if (a == true) {
}
// 암시적 작동 🙆🏻‍♂️
if (a){
}
// 명시적 작동 🙆🏻‍♂️
if (!!a){
}
// 명시적 작동 🙆🏻‍♂️
if (Boolean( a )){
}
```

2.  `null 👉 undefined 비교`

null 과 undefined 는 구분되지 않는 값들로 동일한 값으로 취급된다.

```JS
var a = doSomething();
if (a == null){
    // some codes
}
```

a == null의 평과 결과는 doSomething이 null이나 undefined 일 경우에만 true

나머지 0, false, "" 등이 falsy 한 값 모두 false가 된다. 즉, a == null 과 같이 **undefined, null을 비교**하는 연산은
**가독성**도 뛰어나고 **안전하게 작동**하는 암시적 강제변환이다.

3. `객체 👉 비객체 비교`

- Type(x) 가 String 또는 Number 이고 Type(y)가 객체라면, x == ToPrimitive(y)의 비교 결과를 반환한다.
- Type(x) 가 객체 이고 Type(y)가 String 또는 Number라면, ToPrimitive(x) == y 의 비교결과를 반환한다.

즉, **객체를 ToPrimitive()** 하여 내부 스칼라 원시 값과 **String or Number 와 비교**한다.

```JS
var a = 42
var b = [42]
a == b // true

var c = null // undefined, NaN
var d = Object(a)
c == d // false
```

객체 b는 `언박싱`하여 원시 값을 a와 비교했을때 a 와 b는 같다. 하지만 c의 경우 null, undefined은 객체 래퍼가 없기 때문에 일반 객체가 만들어져 false, NaN은 자기 자신과 다른 성질 때문에 false가 된다.

### 헷갈리는 falsy 비교

```JS
"0" == false // true
false == 0 // true
false == "" // true
"" == 0 // true
"" == [] // true
0 == []
```

## 추가 +) 암시적 강제변환의 안전한 사용법 🌟

- 피연산자 중 하나가 true/ false 일 가능성이 있으면 **절대로** == 연산자를 쓰지 말자
- 피연산자 중 하나가 [], " ", 0 이 될 가능성이 있으면 가급적 == 연산자는 쓰지 말자

결국 == 냐 === 냐는 동등 비교 시 강제변환을 허용 할거냐 말거냐의 차이임을 기억하자

## CH 1-5. 문법

연쇄 할당문 `Chained Assignment`

```JS
var a, b, c
a = b = c = 42
```

이를 활용하여 아래와 같은 코드 작성 가능

```JS
function vowels (str){
    var matches
    if (str && (matches = str.match(/[aeiou]/g))){
        return matches
    }
}
vowels("hello world")
```

### 객체 분해

```JS
const getData() {
    return {
        a: 42,
        b: "foo"
    }
}
var {a, b} = getData() // 42 "foo"
```

### 단락 평가 ⭐️

&&, || 연산자의 특징에 따라 아래와 같은 코딩이 가능하다

```JS
if (opts && opts.cool)
if (opts.cache || primeCache())
```

opts 가 undefined 혹은 객체가 아니라면 에러가 나지만 opts 를 먼저 평가하기 때문에 두번째로 오는 opts.cool 은 에러나지 않는다. 즉, opts 는 opts.cool의 **가드역할**을 수행한다.

opts.cache 가 참이면 굳이 primeCache 를 호출하지 않는다

### 에러

ES6 부터 `TDZ` `Temporal Dead Zone` 이라는 새로운 개념이 도입되었는데 이는 아직 초기화를 하지 않아 변수를 참조할 수 없는 코드 영역이다.

ES6 let 구문에서

```JS
{
    a = 2; // ReferenceError! TypeOf도 사용 불가 ❌
    let a;
}
```

a 변수는 {}의 블록 스코프에서 변수가 초기화 되지 않았기 때문에 a는 **TDZ 내부에 있어 에러**가 난다. 즉, **let a;** 가 실행 되는 시점에 TDZ에서 빠져나와 undefined가 할당 된다.

# Part II. 스코프와 클로저

## CH 2-1. 스코프란 무엇인가?

### Scope

프로그래밍 언어의 기본 패러다임은 변수에 값을 저장하고 가져다 쓰고 수정하는 것임.
이에 따라 특정 변수를 저장하고 변수를 찾는데 잘 정의된 규칙이 필요한데 이를 `스코프`라 부름.

### JS Features

JS Compilation 단계

1. `Tokenizing` `Lexing` 문자열을 해당 언어의 의미 있는 조각, 토큰, 으로 나눔

2. `Parsing` 토큰 배열을 프로그램 문법 구조에 맞게 AST (Abstract Syntax Tree) 구조로 바꿈.

3. `Code Generation` AST를 기계어 집합으로 바꿈

JS 엔진의 특징

1. 파싱과 코드 생성 과정에서 불필요한 요소를 삭제하는 과정을 거쳐 성능을 최적화

2. 컴파일레이션을 미리 수행하지 않기 때문에 최적화 할 시간이 많지 않음

3. 코드가 실행되기 직전에 컴파일레이션이 진행됨 `Lasy Compile` `Hot Recompile` 등이 사용됨

   👉 즉, 자바스크립트는 실행되기 바로 직전에 컴파일이 된다 !

::: tip 자바스크립트가 코드를 처리할때 각 역할 분담

- 엔진 : 컴파일레이션의 시작부터 끝까지 전 과정과 자바스크립트 프로그램 실행을 책임짐
- 컴파일러 : 파싱과 코드 생성의 모든 잡일을 도맡아 함
- 스코프 : 선언된 모든 변수 (확인자) 검색 목록을 작성하고 유지.

:::

아래의 코드를 자바스크립트가 처리하는 방법은 다음과 같다.

```JS
var a = 2;
```

1. 컴파일러가 'var a' 를 보고 스코프에게 변수 a 의 유무를 찾음 (코드 실행 전에 var a 변수는 해당 스코프에 선언됨).

   👉 변수가 있으면 컴파일러는 지나가고 없으면 a를 스코프 컬렉션에 선언 요청

2. 컴파일러는 'a = 2' 를 처리하기 위해 엔진이 실행할 수 있는 코드를 생성 (LHS 참조)

   👉 엔진은 현재 스코프 컬렉션 내에 존재하는 변수들에서 a를 찾고 없을시 중첩 스코프를 살펴 a에 2를 대입

   👉 이때 a 를 찾지 못하게 되면 에러 발생

### Scope Search

컴파일러가 2번 단계에서 종류에 따라 `LHS` 또는 `RHS` 검색을 수행.

1. RHS 검색 (대입할 값 검색)

```JS
console.log(a);
```

Right-Hand Side 검색은 특정 변수의 값만 찾는다.

2. LHS 검색 (대입할 대상 검색)

```JS
a = 2;
```

Left-Hand Side 검색은 변수 a에 대한 컨테이너를 찾는다.

LHS 검색, RHS 검색을 좀 더 이해하기 위해서 아래의 코드를 예로 들면,

```JS
function foo(a) {
    console.log(a);
}
foo(2);
```

실행과정은 아래와 같이 설명할 수 있음

    엔진 : 스코프에게 foo에 대한 RHS에 대한 참조를 요구
    스코프 : 컴파일러가 선언한 foo 함수를 제공
    엔진 : foo를 실행, 변수 a 에 대한 LHS 참조 요구
    👉 foo(2)에 대한 실행이 이루어지면서 a = 2의 연산이 수행되기 때문.
    스코프 : 컴파일러가 foo의 인자로 선언된 a 를 제공
    엔진 : console에 대한 RHS 검색 요구
    스코프 : 내장된 console 함수를 제공
    엔진 : log() 를 찾고 a에 대한 RHS 참조 재 요구
    스코프 : 현재 스코프 변수 a를 제공

### Nested Scopes

하나의 블록이나 함수는 다른 블록이나 함수 안에 중첩될 수 있음. 따라서 스코프 또한 한 스코프 안에 다른 스코프가 중첩 가능.

👉 중첩 스코프에서 현재 스코프에서 대상 변수를 찾지 못하면 JS 엔진은 다음 바깥의 스코프로 넘어가 찾고 글로벌 스코프 (가장 바깥 스코프)까지 검색을 이어감.

            ( 글로벌 스코프 )
    |   |   |   |   |   |   |   |
    |   |   |   |   |   |   |   |
    |   |   |   |   |   |   |   |
    |   |   |   |   |   |   |   | 👆 렉시컬 스코프
    |   |   |   |   |   |   |   |
    |   |   |   |   |   |   |   |
    |   |   |   |   |   |   |   | 👈 현재 스코프

### Error 🌟

LHS, RHS 는 변수가 아직 선언되지 않았을 때 (모든 스코프에서 못 찾았을 떄) 서로 다르게 동작함

예를들어,

```JS
function foo(a) {
    console.log(a+b);
    b = a;
}
foo(2);
```

RHS 검색 : b 에 대한 RHS 검색이 모든 스코프에서 실패하면 `ReferenceError` 를 발생 시킨다.

LHS 검색 : 글로벌 스코프는 해당 이름에 대한 새로운 변수를 생성하여 엔진에게 건네줌. `Strict Mode` 의 동작이라면 Reference Error !

## CH 2-2. 렉시컬 스코프

`렉시컬 스코프는` 렉싱 타임 (Lexing Time) 에 정의되는 스코프.

스코프는 겹쳐진 버블이라 생각하면 된다. 아래의 코드를 보면

```JS
/* 글로벌 스코프를 감싸는 버블, 확인자 : foo */
function foo (a) {
    /* foo 스코프를 감싸는 버블, 확인자 : a, bar, b */
    var b = a * 2;
    function bar (c) {
        /* bar 스코프를 감싸는 버블, 확인자 : c */
        console.log(a,b,c);
    }
    bar (b*3);
}
```

버블은 벤 다이어그램이 아니기 때문에 어떤 함수의 버블도 동시에 다른 두 스코프에 존재 할 수 없음
console.log(a,b,c) 를 수행할 때 각 변수별로 가장 안쪽 스코프부터 찾아가다 찾으면 멈춘다.

`Shadowing` 이란 더 안쪽의 확인자가 더 바깥쪽의 확인자를 가리는 것.

함수의 렉시컬 스코프는 함수가 선언된 위치에 따라 정의된다.

**렉시컬 스코프를 속이는 2 가지 방법**

1. `eval()` 👉 코드 문자열을 전달하여 런타임에 렉시컬 스코프를 수정 가능

2. `with` 👉 객체 참조를 런타임에 아예 새로운 렉시컬 스코프를 만들어 사용

하지만 JS 엔진이 Compilation 단계에서 최적화 과정에 영향을 줌 따라서 성능이 많이 저하됨으로 사용을 피하는게 좋다.

:::tip 글로벌 변수
JS에서 글로벌 변수는 window 같은 글로벌 객체에 속함. 따라서 글로벌 변수를 직접 렉시컬 이름으로 참조하거나
글로벌 객체의 속성을 참조해 간접적으로 참조 가능.  
:::

## CH 2-3. 함수 vs 블록 스코프

### 스코프 역할을 하는 함수

함수 스코프는 모든 변수가 함수에 속하고 함수 전체와 내부 중첩된 스코프에서 사용, 재사용 될수 있다.

### 숨기기

`최소 권한의 원칙` 은 소프트웨어를 설계할때 모듈/ 객체의 API 와 같은 필요한 것만 최소한으로 남기고 나머지는 숨겨야 하는 원칙

Bad Idea 👎

```JS
function doSomething (a){
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
// b, doSomethingElse 의 코드는 불필요하게 외부에 노출되어 있어 있음
function doSomethingElse (a){
    return a - 1;
}
var b;
doSomething(2);
```

Good Idea 👍

```JS
function doSomething (a){
    // b, doSomethingElse 의 스코프가 doSomething 내부 스코프에 숨기 때문에 더 바람직 함
    function doSomethingElse (a){
        return a - 1;
    }
    var b;
    b = a + doSomethingElse(a * 2);
    return a - 1;
var b;
    console.log(b * 3);
}
doSomething(2);
```

### 충돌 회피

```JS
function foo(){
    function bar(a){
        // 변수 i 가 foo 스코프 변수 i와 충돌 발생 🤯
        i = 3;
        console.log(a + i);
    }
    for (var i = 0; i < 10; i++){
        bar (i * 2);
    }
}
```

해결방안은 두 가지 정도가 있는데,

- var j = 3; 과 같은 완전히 다른 이름의 확인자를 사용
- var i = 3; 으로 쉐도잉 사용

으로 해결 할 수 있다.

### Anonymous Function Expression

1. 스택 추적시 이름이 없어 디버깅이 어려울 수 있다.
2. 이름 없이 재귀 호출을 하러면 폐기 예정인 arguments.callee 참조가 필요하다.
3. 함수의 이름이 없어 가독성이 떨어진다.

### IIFE - Immediately Invoked Function Expression

```JS
var a = 2;
(function foo(){
    var a = 3;
    console.log(a);
})();
console.log(a);
```

위의 함수는 `function expression` 으로 취급 되기 때문에 foo 라는 확인자가 **함수 내부에서만 스코프**를 가지게됨.

### 블록 스코프

함수 단위 스코프가 많이 쓰이지만 많은 언어에서 블록 스코프를 지원함.

```JS
for (var i = 0; i < 10; i++){
    console.log( i );
}
```

위의 코드에서 i는 for 문 블록 내부에서만 유효한 변수이다. 즉, i 는 블록 스코프를 가져야 한다. 하지만 위의 예제는 함수 전체 스코프를 가지기 때문에 for 문 내부 변수 i가 함수의 스코프를 오염 시키는 예제이다.

**let, const 와 명시적 블록 스코프**

자바스크립트 `ES6` 부터 블록 스코프를 지닌 `let`과 `const` 키워드를 지원한다.
let 키워드는 변수를 둘러싼 **아무 블록**, **{ }**, 을 기준으로 스코프를 붙인다.
const 는 let 과 마찬가지로 블록 스코프를 생성하지만 선언된 값이 고정된다.

```JS
var foo = true;
if (foo){
    { // 👈 Explicit block
    let bar = foo * 2;
    bar = something( bar );
    console.log( bar );
    }
}
console.log(bar); // Reference Error
```

let 을 사용한 선언문은 속하는 스코프에서 `Hoisting` 효과를 받지 않는다.

{ } 를 문밥에 맞게 추가해주면 let 을 통해 선언된 변수를 묶을 수 있고 이후에 리팩토링할때도 유용하다.

### Garbage Collection

블록 스코프는 메모리 회수를 위한 `클로저` 와 `가비지 콜렉션` 과 관련 있다.

```JS
function process (data){
    //do something interesting
}
/* Case 1. Without Explicit Block Scope 😕 */

// click 함수가 현재 스코프의 클로저를 가지기 때문에 BigData가 메모리를 차지하고 있는 상태

var BigData = { /* some codes */ };
process(BigData);

var btn = document.getElementById("my_button");
btn.addEvenListener("click", function click (event) {
    console.log(" btn clicked ");
})

/* Case 2. With Explicit Block Scope 😊 */

// 명시적으로 BigData의 스코프를 정해주어 변수의 영역을 한정시켜 가비지 콜렉터에 의해 수거당함.
{
    let BigData = { /* some codes */ };
    process( BigData );
}

var btn = document.getElementById("my_button");
btn.addEvenListener("click", function click (event) {
    console.log(" btn clicked ");
})
```

## CH 2-4. 호이스팅

흔히 코드는 한줄 한줄 위에서부터 실행된다고 생각하지만 자바스크립트에선 잘못된 이해이다.

```JS
/* 호이스팅 예제 1 */
a = 2;
var a;
console.log( a );

// 출력 : 2
```

```JS
/* 호이스팅 예제 2 */
console.log( a );
var a = 2;

// 출력 : undefined
```

`렉시컬 스코프` 의 핵심은 컴파일레이션 단계에서 모든 선언문에서 적절한 스코프를 연결해주는 과정이다.

즉, 변수와 함수 선언문은 코드가 실제로 실행되기 전에 먼저 처리된다. 위의 예제 2번은 실제로는 아래와 같은 순서로 실행된다.

```JS
/* 호이스팅 예제 2 실행 순서 */
var a;
console.log( a );
a = 2;

// 출력 : undefined
```

이는 var 로 선언된 변수들이 `Hoisting` 되기 때문이다.

단, 호이스팅은 **스코프 별로 작동**한다. 아래의 코드를 보면

```JS
function foo() {
    var a;
    console.log(a); // undefined
    a = 2;
}
```

변수 a는 foo 스코프 내부에서 가장 꼭대기로 호이스팅 된다.

아래의 코드를 보면 조금더 호이스팅에 대하여 이해할 수 있다.

```JS
foo(); // TypeError 👉 undefined 값을 호출하려 하기 때문
bar(); // ReferenceError
var foo = function bar (){
    // some codes
}
```

위의 코드는 foo 함수는 var 변수로 선언되어 호이스팅 되지만 `함수 표현식`으로 선언된 함수 bar 를 참조하기 때문에 bar 함수는 호이스팅 되지 않음. 따라서, foo(); 가 실행된 시점에서 foo 변수는 bar 함수가 아닌 undefined 값을 가짐. [함수 표현식 호이스팅 더보기](https://jeongshin.github.io/JeongShin_Blog/book-review/Inside_JS/#_4%EC%9E%A5-%ED%95%A8%EC%88%98%EC%99%80-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-%EC%B2%B4%EC%9D%B4%EB%8B%9D)

## CH 2-5. 스코프 클로저 🌟

`클로저`란 함수가 속한 렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행 될 때에도 이 스코프에 접근할 수 있는 기능을 의미한다.

```JS
function foo() {
    var a = 2;
    function bar() {
        console.log( a );
    }
    return bar;
}
var baz = foo();
baz(); // 2
}
```

위의 코드를 보면 bar() 함수는 foo()의 렉시컬 스코프에 접근한다.
foo() 함수에 의해 내부 bar() 함수를 참조하는 확인자를 반환하여 baz가 참조하게 되고
baz() 가 실행된다. 즉, bar 함수가 **선언된 렉시컬 스코프 밖에서 실행**된다.

일반적으로 foo() 가 실행되고 foo() 의 내부 스코프가 사라졌다 생각하기 쉽지만 `클로저`에 의해
foo() **내부 스코프는 사용중으로 해제되지 않는다**.

한가지 예를 더 들자면

```JS
function wait (message) {
    setTimeout( function timer(){
        console.log(message);
    }, 1000);
}
wait("hello, closure!");
```

위의 코드는 timer 함수가 wait() 함수의 스코프에 대한 클로저를 가지고 있으므로 message에 대한 참조가 가능하다.
그러다 실행 1초후 wait의 내부 스코프는 사라져야 하지만 setTimeout() 익명의 내장 함수가 클로저를 가지고 있기 때문에 timer의 렉시컬 스코프는 남아 있다.

### 반복문과 클로저

```JS
for (var i = 1; i <= 5; i++){
    setTimeout( function timer(){
        console.log( i );
    }, i * 1000);
}
```

위의 코드는 실행결과는 6만 5번 출력된다. setTimeout 의 콜백 함수인 timer 가 반복문이 끝나고 작동하기 때문이다.
for 문 내부에서 5번의 함수들은 모두가 글로벌 스코프 클로저를 공유하기 때문에 공통된 i 를 참조한다.

즉, `closed scope`가 필요하게 된다.

```JS
for (var i = 1; i <= 5; i ++){
    (function (j){
        setTimeout (function timer(){
            console.log(j);
        }, j*1000);
    })(i);
}
```

위의 함수는 `IIFE` 방식으로 각자 생성한 스코프를 가지고 i 의 값을 복사한 j를 인자로 가지기 때문에 원하는 수행결과가 실행된다.

즉 **반복별 다른 블록 스코프**를 만들어준 셈이된다.

### 모듈

클로저를 사용하는 강력한 패턴 `모듈`

```JS
function CoolModule(){
    /* 비공개 데이터 */
    var something = "cool"
    var another = [1,2,3];
    /* foo 내부 렉시컬 스코프를 가지게 됨 */
    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join("!"));
    }
    return {
        doSomething,
        doAnother,
    }
}
var foo = CoolModule();
foo.doSomething();
foo.doAnother();
```

위의 코드 특징

1. 최외곽 함수가 실행되지 않으면 **내부 스코프와 클로저는 생성되지 않는다**

2. CoolModule() 함수는 **객체를 반환**한다. 해당 객체는 **내장 함수들에 대한 참조**를 가지지만, **내장 데이터 변수에 대한 참조를 가지지 않기** 때문에 변수들은 **비공개**로 유지된다.
   이 객체의 반환 값은 모듈의 공개 API라 볼 수 있다.

위의 모듈은 몇번이든지 호출 가능하다.

즉, `import` 키워드를 이용하여 특정 변수에 현재 스코프를 저장하고 `export` 키워드로 확인자를 현재 모듈의 공개 API로 내보낸다.

출처 : [You Don't Know JS](https://books.google.co.kr/books/about/You_Don_t_Know_JS_Up_Going.html?id=3iWABwAAQBAJ&source=kp_book_description&redir_esc=y)
