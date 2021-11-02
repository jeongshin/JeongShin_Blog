# Vanilla JavaScript <img src="https://img.icons8.com/color/48/000000/javascript.png"/>

## Step 2

### 전역객체 window

전역객체 `Global Object` 는 특수한 객체로 **모든 객체는 전역 객체의 프로퍼티**가 된다. 따라서 객체를 명시하지 않으면 암시적으로 window의 프로퍼티로 간주된다.

전역객체의 이름은 호스트 환경에 따라 달라지는데 예를들어 웹 브라우저에서 전역객체는 **window** node.js 에서는 **global**이 된다. 전역 객체 API는 ECMAScript에 정의되어 있다.

출처 : [생활코딩전역객체](https://opentutorials.org/module/532/6577)

### 원시타입과 참조타입

자바스크립트에는 다음 7가지 `Primitives` 원시 타입이 있다. (Object 제외) 이 있다.

- null
- undefined
- boolean
- number
- string
- object
- symbol

잠깐 `Symbol` 이란?

- A unique value that can be used as an identifier for object properties

쉽게 말해 **unique 한 값을 저장하는 컨테이너**이다.

```JS
const s = Symbol.for(555);
console.log(Symbol.keyFor(s)) // 555
```

원시 값은 모두 typeof 로 확인 할 수 있다.

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

`Natives` 란 특정 환경 (브라우저 등의 클라이언트 프로그램)에 종속되지 않은, ECMAScript 명세의 **내장 객체** 를 의미 합니다. (사실 내장 함수 이다).

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

### 값 vs 레퍼런스 🌟

`Value` : null, undefined, string number, boolean 같은 `Scalar Primitives` 는 언제나 **값 복사 방식**으로 할당/ 전달 된다.

`Reference` : 객체 (배열과 박싱된 객체 래퍼 전체)나 함수등 합성 값 `Compound Values` 은 할당/ 전달 시 반드시 **레퍼런스 copy를 생성**한다.

간단한 예제를 보면

```JS
var a = 2;
var b = a; // 원시 값 2 *값 복사*
b++
// a : 2 b : 3

var c = [1,2,3]
var d = c // d 와 c 모두 [1,2,3] 의 레퍼런스이다
d.push(4)
// c, d 모두 [1,2,3,4]
```

null, undefined, string, number, boolean, symbol 같은 원시 값은 언제나 값 복사 방식으로 전달된다.

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

자바스크립트에서 값 복사냐 레퍼런스 복사냐는 개발자가 정할 수 없고 전적으로 값의 타입을 보고 JS 엔진에 의해 결정된다.

### 불변성

JS 의 원시 값은 `Immutable` 합니다. 아래의 코드를 보면

```JS
function foo (x) {
    x = x + 1;
}
var a = 2
var b = new Number (a);
foo (b) // 3이 아닌 2
```

에서 Number 객체의 레퍼런스 사본(b) 가 전달되어 공유된 원시 값 2를 바꾸려 한다. 하지만 **원시 값은 immutable** 하기 때문에 2를 가진 Number 객체는 다른 원시 값을 가지도록 변경할 수 없다. 따라서 **바깥의 b는 불변의 원시값을 가진 원본 Number 객체**를 계속 참조한다.

### 래퍼객체

래퍼 객체는 `원시 값` `Primitives` 를 감싸는 객체이다.

객체 래퍼는 아주 중요한 용도로 활용된다. 원시 값 "abc"에는 프로퍼티나 메서드가 없지만 JS가 알아서 `박싱 (래핑)` 하므로 아래와 같이 내부 함수를 쓸 수 있는 것이다.

```JS
var a = "abc";
a.length; //3
a.toUpperCase(); // "ABC"
```

JS 엔진이 객체를 생성할 필요 없도록 개발자가 직접 객체 형태로 `Pre-Optimize` 하면 오히려 더 느려질 수 있다. **JS엔진이 알아서 박싱하도록 원시값을 사용**하자.

만약 수동으로 원시 값을 박싱하려면 Object() 함수를 이용하면 된다. 단 new 는 키워드는 없다.

```JS
var a = "abc"
var b = new String(a)
var c = Object(a)

typeof a // "string"
typeof b // "object"
typeof c // "object"

b instanceof String // true
c instanceof String // true
```

래퍼 언박싱은 valueOf() 메서드로 추출한다.

```JS
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);
a.valueOf() // "abc"
b.valueOf() // 42
c.valueOf() // true
```

이러한 래퍼 언박싱은 `암시적 강제변환`에서 일어나기 때문에 중요하다. [강제변환 내용 더보기](https://jeongshin.github.io/JeongShin_Blog/book-review/You_Don't_Know_JS/#ch-1-4-%EA%B0%95%EC%A0%9C%EB%B3%80%ED%99%98-%E2%AD%90%EF%B8%8F)

출처 : [You Don't Know JS](https://books.google.co.kr/books/about/You_Don_t_Know_JS_Up_Going.html?id=3iWABwAAQBAJ&source=kp_book_description&redir_esc=y)

## Step 3

### 객체의 메서드 호출할 때 this 바인딩

객체의 프로퍼티가 함수일 경우, 이 함수를 메서드라고 부른다. 메서드를 호출할 때, **메서드 내부에서 사용된 this 는 해당 메서드를 호출한 객체로 바인딩** 된다.

```JS
var myObject = {
    name : 'foo',
    // 이후에 다루겠지만 화살표 함수는 다르게 동작하니 유의해서 보도록 하자 ❗️
    sayName : function () {
        console.log(this.name)
    }
}
var otherObject = {
    name : 'bar'
}

otherObject.sayName = myObject.sayName

myObject.sayName() // foo
otherObject.sayName() // bar
```

<br>

@startuml
skinparam monochrome reverse
allow_mixing

object myObject {
name = 'bar'
sayName = ''
}

object otherObject {
name = 'foo'
sayName = ''
}

state "function()" as f
f : console.log(this.name)

f --> myObject : myObject가 호출시 this는 myObject를 가리킴
f --> otherObject : otherObject 호출시 this는 otherObject 가리킴

@enduml

위와 같이 sayName() 메서드에 사용된 **this는 자신을 호출한 객체에 바인딩** 되는걸 볼 수 있다.

<br>
<br>

### 내부함수에서의 this

내부함수에서 this는 `전역 객체`에 바인딩 된다.

`전역객체`

브라우저 환경에서 전역객체는 window 객체가 된다. Node.js에서는 global 객체가 된다.

자바스크립트의 모든 전역 변수는 전역 객체의 프로퍼티가 된다. 아래의 예제를 보자

```JS
var test = 'this is test'
console.log(window.test) // 전역 객체의 프로퍼티가 됨

var sayFoo = function () {
    console.log(this.test)
}
sayFoo()
```

예제에서 'this is test' 전역 객체에서 sayFoo를 호출하였기 때문에 this는 전역 객체로 바인딩 된다. 이때 this 바인딩 특성은 **내부 함수 또는 callback 함수 호출했을 경우**
에도 그대로 적용된다.

### 예제 1 : 내부 함수가 전역 객체에 바인딩

<br>

```JS
var value = 100
var myObject = {
    value : 1,
    func1 : function()  {
        this.value += 1
        console.log('func1 called value is ' + this.value)
        func2 = function () {
            this.value += 1
            console.log('func2 called value is ' + this.value)
            func3 = function () {
                this.value += 1
                console.log('func3 called value is ' + this.value)
            }
            func3()
        }
        func2()
    }
}
myObject.func1()
/* 출력 결과
func1 called value is 2
func2 called value is 101
func3 called value is 102
*/
```

@startuml
skinparam monochrome reverse
allowmixing
object myObject {
value = 2
func1 = [*]
}

object window {
value = 100
}

state "func1() 메서드" as f
state "func2() 내부함수" as f1
state "func3() 내부함수" as f2
f --> myObject : this
f1 --> window : this
f2 --> window : this

@enduml

예제 1에서는 내부 함수 호출 패턴이 정의되어 있지 않기 때문에 내부 함수가 호출 될 때, **this 는 전역 객체 window에 바인딩** 된다.

만약 내부 함수에서 myObject 를 접근하려면 **부모 함수의 this** 를 내부 함수가 접근 가능한 **다른 변수에 저장**하여 내부 함수가 전역 객체를 참조하는걸 극복할 수 있다. 예제 2를 보자.

### 예제 2 : that 을 이용한 this 바인딩

<br>

```JS
var value = 100
var myObject = {
    value : 1,
    func1 : function()  {
        var that = this
        /* ⭐️ 스코프 체이닝으로 인해 내부 함수는 외부 변수 that 에 접근 할 수 있다
        that 은 myObject this를 참조한다.
        즉, 이후 that으로 myObject value를 접근 가능해진다. */
        this.value += 1
        console.log('func1 called value is ' + this.value)
        func2 = function () {
            that.value += 1
            console.log('func2 called value is ' + that.value)
            func3 = function () {
                that.value += 1
                console.log('func3 called value is ' + that.value)
            }
            func3()
        }
        func2()
    }
}
myObject.func1()
/* 출력 결과
func1 called value is 2
func2 called value is 3
func3 called value is 4
*/
```

@startuml
skinparam monochrome reverse
allowmixing
object myObject {
value = 1
func1 = [*]
}
state "func1() 메서드" as f
state "func2() 내부함수" as f1
state "func3() 내부함수" as f2
f --> myObject : this
f1 --> f : that
f2 --> f : that
@enduml

자바스크립트는 이와 같은 this 바인딩의 한계를 극복하기 위해 this 바인딩을 명시적으로 할 수 있도록 `call` 과 `apply` 메서드를 제공한다.

jQuery, underscore.js 등의 라이브러리는 `bind` 라는 메서드를 통해 사용자가 **원하는 객체를 this에 바인딩**하도록 돕는다.

👉 책에는 bind 메서드가 라이브러리를 통해 사용할 수 있다 되어 있는데 ES5 부터 Function.prototype.bind 로 정의 되어 있습니다.

### call 과 apply 메서드를 이용한 명시적 this 바인딩

지금까지는 this 바인딩이 JS에 의하여 자동으로 바인딩 되었지만 이번 예제에선 함수 객체 기본 프로퍼티인 apply() 와 call() 을 이용하여 명시적으로 this를 바인딩 한다.
모든 함수는

```JS
function.apply(thisArg, argArray)
```

와 같이 호출이 가능하다. apply() 메서드를 호출하는 주체는 함수이고 apply() 메서드도 this를 특정 객체에 바인딩할 뿐 **본질은 함수 호출** 이다.

첫번째 인자 `thisArg` 는 호출한 함수 내부에서 사용한 **this에 바인딩할 객체**를 가리킨다. 즉, 첫번째 인자가 this로 명시적이게 바인딩 된다.

두번째 인자 `argArray` 는 호출할 때 넘길 인자들의 배열을 가리킨다.

즉, apply() 메서드는 (명시적 this, 인자 배열) 을 인자로 함수를 호출하는 셈이다.

```JS
function Person ( name, age, gender ) {
    this.name = name
    this.age = age
    this.gender = gender
}
// 리터럴로 생성한 빈 객체
var foo = {}

// foo 를 this 로 바인딩
Person.apply(foo, ['foo', 30, 'man'])
Person.call(foo, 'foo', 30, 'man')

console.dir(foo)
```

위와 같이 원하는 값을 명시적으로 바인딩하여 특정 함수나 메서드에서 접근이 가능하다.

가장 대표적인 예로 `유사 배열 객체`에서 사용하는 배열 메서드가 있다. `arguments 객체`는 실제 배열이 아니기 때문에 pop(), shift() 같은 배열의 메서드를 사용할 수 없다. 하지만 apply() 를 사용하면 가능하다.

```JS
function myFunction() {
    console.dir(arguments)
    // arguments.shift() 👉 Error 🤯
    // arguments 객체를 배열로 변환
    var args = Array.prototype.slice.apply(arguments)
    // 또는 ES6 Array.from(arguments) 도 가능
    console.dir(args)
    // __proto__ 프로퍼티가 Array로 바뀐걸 확인 가능
}
myFunction(1,2,3)
```

this에 대한 개념은 생성자 함수에서도 중요한 역할을 한다. JS 생성자 작동방식에 대해 알아보자.

### 생성자 함수 동작 방식

JS에서는 기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작하게 된다. 즉, new를 잘못사용하게 되면 원하지 않는 생성자를 실행할 수도 있다.

대부분의 자바스크립트 스타일 가이드에서는 생성자 함수의 첫 이름을 대문자로 쓰길 권하고 있다. 생성자 함수에서 this는 이전에 다루었던 this 바인딩과는 다르게 동작한다.

:::tip new 연산자로 함수 호출시 동작 방식

1.  빈 객체 생성 및 this 바인딩

    - 가장 먼저 빈 객체가 생성된다
    - 이 객체는 this로 바인딩 된다
    - 따라서 생성자 함수 코드 내부에서 this 는 이 빈 객체를 가리킨다
    - 여기서 엄밀히 따지면 빈 객체는 아니다 (아래 내용 참고)

`JS 객체 생성 규칙`
👉 JS에서 모든 객체는 자신의 부모인 프로토 타입 객체와 연결되어 있으며
부모의 프로퍼티나 메서드를 사용할 수 있는데 생성자 함수가 생성한 객체는
자신을 생성한 **생성자 함수의 prototype 프로퍼티가 가리키는 객체**를
**자신의 프로토 타입 객체로 설정**한다

2.  this를 통한 프로퍼티 생성

    이후에 함수 코드 내부에서 this를 사용하여 앞에서 생성된 **빈 객체에 동적으로 프로퍼티나 메서드를 생성**할 수 있게 된다

3) 생성된 객체 리턴

   가장 일반적인 경우 특별한 리턴문이 없는 경우 **this 로 바인딩 된 새로 생성한 객체가 리턴**된다. 이는 명시적으로 this를 리턴한 값과 동일하다.
   this 가 아닌 객체를 리턴하는건 이후에 다루도록 한다.
   :::

```JS
// 생성자 함수는 관례적으로 첫 글자는 대문자 이름 사용
var Person = function (name) {
    /* ⭐️ 아래 코드가 실행되기 전에 빈 객체를 생성 후 Person() 의
    prototype 프로퍼티가 가리키는 객체, Person.prototype,
    를 [[Prototype]] 링크로 연결하여
    자신의 프로토타입으로 설정 후 this로 바인딩 */
    this.name = name
    /* this가 가리키는 빈 객체에 동적으로 name 프로퍼티 생성 */
    /* 특별히 리턴값이 없는 경우 this로 바인딩된 이 객체가 리턴됨 */
}
var foo = new Person('foo')
```

### 리터럴 vs 생성자 객체 생성

```JS
// 리터럴 방식 : 1 번만 생성 가능
var foo = {
    name : 'foo',
    age : 35,
    gender : 'man'
}
console.dir(foo)

/* 출력 결과
Object
age: 35
gender: "man"
name: "foo"
__proto__: Object */

// 생성자 함수 : 여러번 생성 가능
function Person (name, age, gender, position) {
    this.name = name
    this.age = age
    this.gender = gender
}

// Person 생성자 객체 생성
var bar = new Person ('bar', 33, 'woman')
console.dir(bar)

/* 출력 결과
Person
age: 33
gender: "woman"
name: "bar"
__proto__: Object */
```

리터럴 방식과 생성자 방식의 차이는 프로토타입 객체 (`__proto__` 프로퍼티) 에 있다. 객체 리터럴의 경우 `Object.prototype` 을 생성자의 경우 `Person.prototype` 을 프로퍼티로 가진다.

이는 위에서 설명한 `JS 객체 생성 규칙` 에 따라 리터럴에선 객체 생성자가 Object() 이고 생성자에선 생성자가 Person() 함수이기 때문이다.

:::tip 생성자 함수를 new 없이 호출하면 어떤 사악한 일이 일어날까? 👿
new 를 이용한 생성자 함수에서 this는 빈 객체에 바인딩 된다고 위에서 다루었다.
하지만 new 키워드 없이 생성자 함수를 호출하게 되면 빈 객체가 아닌 글로벌 객체에 this가 바인딩 되어
글로벌 객체에 프로퍼티를 생성한다. 즉, 끔찍한 일이 발생한다. 주의하자 !
:::

출처 : [Inside Javascript](http://www.yes24.com/Product/Goods/37157296)

### 화살표 함수 - Arrow Function

화살표 함수는 ES6 부터 지원된 익명 함수로 간결하고 짧은 구문으로 표현할 수 있습니다. 특징을 2가지 정리해보았습니다.

    1. 생성자로 사용할 수 없다
    2. this 바인딩을 하지 않는다

1. 자바스크립트 생성자

자바스크립트에서는 new 키워드와 함수명을 더해주어 해당 함수를 생성자로 사용한다. 하지만 화살표 함수는 **생성자로 사용할 수 없다**.

2. 바인딩 되지 않은 this

**일반 함수**의 경우 모든 새로운 함수는 자신의 **this 값이 JS 엔진에 동적**으로 정해진다. strict mode 에서는 undefined, 생성자에선 새로운 객체, 함수가 객체 메서드로 호출된 경우 해당 함수를 호출한 객체가 할당된다.

반면 익명 함수인 화살표 함수는 **this 가 정해지지 않는다** (일반 함수와 다르게 정해진다가 더 정확한 표현인거 같습니다).

즉, 객체지향 관점에서 별로 좋지 않다.

```JS
function Person () {
    // 생성자로 사용된 함수에서 this는 새로 만들어진 객체를 의미 (JS 생성자 작동방식 참고).
    this.age = 0

    setInterval (function growUp () {
        // 비엄격모드 에서 this 는 Person 내부 this 가 아닌 전역 객체로 바인딩 됨
        this.age++
    }, 1000)
}
```

이에 대한 해결방법으로 관례적으로 사용하는 변수 `that` 을 선언해주거나 bind() 함수등을 사용하여 해결 해왔습니다.

```JS
function Person (){
    var that = this
    that.age = 0
    setInterval (function growUp(){
        that.age++
    }, 1000)
}
```

다시 화살표 함수로 돌아오자. 화살표 함수는 전역 컨텍스트에서 실행될 때 this 가 새로 정의되지 않는다.

대신 코드 바로 바깥 함수 또는 class 의 this 값이 사용 된다. 이는 this 가 실행 컨텍스트에 따라 동적으로 바인딩 되는 일반 함수와 다르게 **화살표 함수는 화살표 함수의 상위 스코프 this** 를 가리킨다. 이를 `Lexical this` 라 부릅니다.

이때 this 는 클로저 값으로 처리하는것과 같이 동작한다. 예제로 보면

```JS
function Person () {
    this.age = 0
    setInterval (() => {
        // this 는 상위 스코프 this, 즉, 생성자 함수에서 생성된 새로운 객체 가르키기 때문에
        // 위의 this.age 가 됨.
        this.age++
    }, 1000)
}
var p = new Person()
```

맨위 내부 함수의 전역 객체 this 바인딩을 다시 떠올려보자. 만약 모든 함수가 화살표 함수로 정의 되어 있었다면?

```JS
var value = 100
var myObject = {
    value : 1,
    func1 : function()  {
        this.value += 1
        console.log('func1 called value is ' + this.value)
        /* Lexical this 👉 스코프에서 this 를 정적으로 바인딩*/
        func2 = () => {
            this.value += 1
            console.log('func2 called value is ' + this.value)
            func3 = () => {
                this.value += 1
                console.log('func3 called value is ' + this.value)
            }
            func3()
        }
        func2()
    }
}
myObject.func1()
/* 출력 결과
func1 called value is 2
func2 called value is 3
func3 called value is 4
*/
```

와 같이 func1 에 this가 바인딩 되어 위와 같은 출력 결과를 얻었다.

:::tip 엄격모드와 관계
this 가 렉시컬 this 로 동작하기 때문에 this 에 관한 엄격 모드 규칙이 그냥 무시된다.

```JS
var f = () => {'use strict'; return this; }
f() === window // 혹은 전역 객체 출력 : true
```

this에 관련 없는 나머지 규칙들은 그대로 적용된다.
:::

#### 화살표 함수에서의 call, apply, bind

위에서 다룬 화살표 함수 특징에 따라 this 가 바인딩 되지 않기 때문에 call(), apply() 를 통해 인자만 전달하고 this는 무시 된다. 즉, this 의 값을 바꿀 수 없다.

```JS
window.x = 1;
const generalFunction = function () { return this.x; };
const arrowFunction = () => this.x;

console.log(generalFunction.call({ x: 10 }));
// this 가 현재 오브젝트에 바인딩됨. 따라서 x 값이 10으로 바뀜
console.log(arrowFunction.call({ x: 10 }));
// this 가 무시됨. 따라서 x 값은 그대로 1
```

#### 화살표 함수에서의 arguments 객체

화살표 함수는 arguments 객체 또한 바인딩하지 않음. 따라서 arguments 키워드는 스코프내에서 확인자에 대한 참조가 됨.

```JS
var arguments = [1,2,3]
var printFirstArg = () => {
    console.log(arguments[0]) // 1
}
printFirstArg()
```

하지만 대안으로 나머지 매개변수를 사용할 수 있음.

```JS
var arguments = [1,2,3]
function foo (n) {
    // 화살표 함수에 나머지 매개변수를 통해 명시적으로 인자 전달
    var f = (...args) => args[0] + n
    return f(2)
}
foo(1) // 3
```

~~정리하면서 포함한 내용이지만 그닥 쓸모 있어보이진 않습니다.~~

#### 메소드로 화살표 함수 ⭐️

위의 특징을 알았다면 다음의 내용을 이해할 수 있다.

```JS
const Person = {
    name : 'JeongShin',
    // this 가 해당 객체에 바인딩 되지 않고 전역 객체를 가리킴
    sayName: () => console.log(`Hi my name is ${this.name}`)
}
Person.sayName() // Hi my name is undefined
```

이러한 경우 `ES6 축약 메소드 표현`을 사용하여 아래와 같이 코딩하자

```JS
const Person = {
    name : 'JeongShin',
    // 일반 메소드 축약 표현
    sayName(){
       console.log(`Hi my name is ${this.name}`)
    }
}
Person.sayName() // Hi my name is JeongShin
```

위의 **일반 함수가 해당 메서드를 호출한 함수에 this 가 바인딩 되는것과 다르게 동작**한다.

#### prototype

화살표 함수는 prototype이 없다.

```JS
var foo = () => {};
console.log(foo.prototype) // undefined
```

#### 화살표 콜백 함수

콜백 함수를 화살표 함수로 정의하면 아래와 같은 실수가날 수 있다.

```JS
var btn = document.getElementById('button')
btn.addEventListener('click', () =>{
    console.log(this === window) // this 가 전역 객체에 바인딩
    this.innerHTML = 'btn clicked'
})
```

화살표 함수에서 this 는 전역 객체이다. 따라서 btn 에 this 를 바인딩 하기 위해서는

```JS
var btn = document.getElementById('button')
btn.addEventListener('click', function () =>{
    console.log(this === btn) // this 가 btn 에 바인딩
    this.innerHTML = 'btn clicked'
})
```

와 같이 해주면 된다.

출처 : [Mozilla Developer : MDN web docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98) , [PoiemaWeb : 웹 프로그래밍 튜토리얼](https://poiemaweb.com/es6-arrow-function)

## Step 4

### 클로저

인사이드 자바스크립트에서는 클로저에 대한 정의를 **이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수**를 클로저 라고 한다.

아래 예제를 보자.

```JS
function outerFunc () {
    var x = 10
    var innerFunc = function () {
        console.log(x)
    }
    return innerFunc
}
var inner = outerFunc()
inner() // 10
```

9행을 보면 innerFunc 실행 컨텍스트가 outerFunc 실행 컨텍스트가 사라진 이후에 생성된다.

하지만 출력 결과를 보면 알 수 있듯이 outerFunc 변수 객체는 여전히 남아 있고 innerFunc의 스코프 체인으로 참조되고 있다. 이것이 바로 `클로저`이다.

위에서 다루엇 듯이 JS에서 함수는 `일급 객체`로 취급된다. 즉, return 값으로 함수를 반환 할 수 있다는 뜻인데, 외부 함수가 반환 되더라도 (생명주기가 끝나더라도) **변수 객체는 내부 함수의 스코프 체인에 그대로 남아 접근** 할 수 있다.

따라서 예제의 outerFunc 에서 선언된 x를 참조하는 innerFunc가 클로저가 된다. 클로저로 참조되는 x 같은 외부 함수의 지역변수를 `자유변수 free variable` 이라 한다.

아래는 흔한 클로저를 구현하는 코드 패턴이다.

```JS
function outerFunc () {
    var x = 1
    return function () {
        /* some codes with arguments & x */
    }
}
var new_func = outerFunc()
new_func()
```

대부분의 클로저를 활용하는 코드는 이와 같은 코드 패턴을 유지한다. 이를 바탕으로 JS를 이용한 `함수형 프로그래밍`이 가능하다.

::: tip 함수형 언어 functional language
함수를 일급 객체로 취급하는 언어를 함수형 언어라 한다.
이는 자바스크립트 뿐만 아니라 여러가지 함수형 언어도 해당되지만 클로저의 개념을 꼭 이해해야 한다.
:::

### 클로저 활용

클로저는 내부 함수에서 접근하는 변수 대부분이 스코프 체인의 첫 번째 객체가 아닌 그 이후 객체에 존재한다.
따라서 변수를 스코프 체인 끝 쪽에 까지 자주 접근하게 되므로 **성능 저하와 메모리 부담 이슈**가 있다.
따라서 클로저는 무차별적으로 사용되지 말고 영리하게 사용되어야 한다.

함수형 프로그래밍에서 소개되는 대부분의 내용이 클로저를 사용하기 때문에 꼭 이해하고 넘어가자.

#### 함수의 캡슐화

가령 다음과 같은 함수를 작성한다고 가정해보자.

    "I am XXX. I live in XXX. I am XX years old"
    XX 부분은 사용자에게 인자로 받아 출력하는 함수

일단 그냥 짜보자.

```JS
var buff = ['I am', '' , 'I live in', '', 'I am', '', 'years old']
function getStr (name, city, age) {
    buff[1] = name
    buff[2] = city
    buff[5] = age
    return buff.join('')
}
var str = getStr('Jeong', 'GangNam', 26)
console.log(str)
```

`Warning❗️` 위의 코드는 buff가 전역 변수로 외부에 노출되어 있다. 따라서 다른 함수에서 접근 할수도 있고 같은 이름의 변수가 생성되면 버그가 생길수도 있다.

클로저를 활용하여 문제를 해결해보자.

```JS
var getStr = (function (){
    var buff = ['I am', '' , 'I live in', '', 'I am', '', 'years old']
    return (function (name, city, age)) {
        buff[1] = name
        buff[2] = city
        buff[5] = age
        return buff.join('')
    }
})()

var str = getStr('Jeong', 'GangNam', 26)
console.log(str)
```

위의 함수의 특이점은 **getStr 변수**에 익명의 즉시 실행 함수로 반환되는 **함수를 할당**한다. 이 함수는 즉시 실행 함수의 `클로저`가 되고 **자유변수 buff를 스코프 체인에서 참조**할 수 있다.

#### setTimeout()에 지정되는 함수

setTimeout 함수는 웹 브라우저에서 제공하는 함수이다.

첫 번째 인자를 함수로, 두 번째 인자를 시간 간격으로 해당 함수를 호출한다. setTimeout()으로 자신의 코드를 호출하고 싶다면 첫 번째 인자로 해당 함수 객체의 참조를 넘겨주면 되지만, 함수에 인자를 줄 수 없다. 클로저로 해결해보자 !

```JS
function callLater (obj, a, b) {
    return (function () {
        obj['sum'] = a + b
        console.log(obj['sum'])
    })
}
var sumObj = {
    sum : 0
}
var func = callLater(sumObj, 1, 2)
setTimeout(func, 500)
```

func 에 callLater 로 반환한 함수의 클로저를 setTimeout의 함수 첫 번쨰 인자로 넣어주어 해결 하였다.

#### 클로저 주의 사항

1. 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우

```JS
function func () {
    var x = 1
    return {
        func1 : function () { console.log(++ x)},
        func2 : function () { console.log(--x)}
    }
}
var exam = func ()
exam.func1()
exam.func2()
```

위의 예제에서 반환되는 객체에는 두개의 함수가 있는데 모두 자유 변수 x를 참조하기 때문에 각각의 함수가 모두 x 값을 바꿈을 항상 인지하자.

2. 루프 안에서 클로저

```JS
function countSeconds ( howMany ) {
    for (var i = 1 ; i <= howMany; i++ ) {
        setTimeout(function () {
            console.log(i)
        }, i * 1000)
    }
}
countSeconds(3) // 4,4,4
```

setTimeout 함수의 인자는 자유 변수 i를 참조한다. 하지만 이 함수가 실행되는 시점은 countSeconds() 함수의 실행이 종료된 이후이고, i 는 이미 4가 된 상태이다. 그러므로 모두 4가 출력된다.

```JS
function countSeconds ( howMany ) {
    for (var i = 1 ; i <= howMany; i++ ){
        (function (copy)){
            setTimeout(function () {
                console.log(copy)
            }, copy * 1000)
        }(i))
    }
}
countSeconds(3) // 1,2,3
```

이와 같이 자바스크립트 라이브러리를 만들고자 할 때 이에 대한 지식이 없으면 변수명 충돌, 성능 저하, 비효율적인 자원 활용등의 문제가 반드시 발생할 것이다. 충분히 공부하자!

### 함수형 프로그래밍

자바스크립트는 함수형 프로그래밍에서 제시하는 방법론 중 일부는 구현 가능하지만 순수한 함수형 프로그래밍 언어는 아니다.

함수형 프로그래밍은 함수의 조합으로 작업을 수행한다. 중요한 점은 이 작업이 이루어지는 동안 **작업에 필요한 데이터와 상태는 변하지 않는다는 점**이다. **변하는건 오직 함수**뿐이다.

다음 함수형 프로그래밍 슈도코드를 보자

특정 문자열을 암호화 하는 함수가 여러개 있다. f1, f2, f3 모두 함수.

    f1 = encrypt1
    f2 = encrypt2
    f3 = encrypt3

pure_value = 'jeong' 👉 암호화할 문자열

encrypted_value = get_encrypted(x) 👉 암호화 된 문자열 이라 가정하면

    encrypted_value1 = get_encrypted(f1)
    encrypted_value2 = get_encrypted(f2)
    encrypted_value3 = get_encrypted(f3)

와 같이 실행할 수 있다. 이때 pure_value 작업이 이루어지는 동안 **변하지 않는다**
변하는건 입력으로 들어오는 함수 f1, f2, f3가 된다.

f1, f2, f3는 외부 (pure_value 변수) 에 아무런 영향을 미치지 않는 함수이다. 이를 `순수 함수 pure function` 라고 한다.
즉, 순수 함수로 다른 작업에 활용해도 문제가 없다.

get_encryped() 함수는 결과 값이 encrypted_value 라는 값이지만 결과 값을 또 다른 형태의 함수로 반환 할 수도 있다.
이 함수처럼 **함수를 또 하나의 값으로 간주하여 함수의 인자 혹은 반환 값으로 사용할 수 있는 함수**를 `고계함수 higher order function` 라고 한다.

:::tip 명령형 vs 함수형 프로그래밍
함수형 프로그래밍에 반대되는 개념이 `명령형 프로그래밍 Imperative Programming` 이다. C 언어가 이에 해당된다. 명령형은 컴퓨터가 수행할 일의 명령을 순서대로 기술하는 프로그래밍 방식이다.

명령형 프로그래밍은 입력 출력을 계산하는 순수한 함수와 특정 작업을 수행하는 여러 가지 명령어로 이루어진 함수도 있다. 이를 `프로시저 procedure` 라 한다. 프로시저는 함수평 프로그래밍의 순수 함수와는 목적 자체가 다르다.

int ret = printf("print this to screen\n");

printf() 함수 역시 입력 값과 출력 값이 있지만 printf()의 목적은 화면에 출력하는게 함수의 목적이다. 결과 값은 단지 제대로 수행되었는지 여부만 따진다.

이처럼 명령형 프로그래밍은 **함수가 특정 작업의 순차적인 명령을 기술하는 데 중점**을 둔다.

반면에 함수형 프로그래밍은 함수가 순수 함수로서 외부에 아무런 영향을 주지 않는 선에서 **자신의 로직을 처리하여 결과를 반환**하여 함수의 목적이 결과 값 반환에 있다.
:::

### JS에서의 함수형 프로그래밍

자바스크립트는 다음 두가지 덕분에 함수형 프로그래밍이 일부 구현 가능하다

1. **일급 객체로서의 함수**
2. **클로저**

#### 배열의 각 원소 총합 구하수

먼저 명령형 프로그래밍 방식으로 구현한 코드를 보자

```JS
function sum (arr) {
    const len = arr.length
    let sum = 0
    for (let i = 0; i < len; i++){
        sum +=arr[i]
    }
    return sum
}
var arr = [1,2,3,4]
sum(arr) // 10

function multiply (arr) {
    const len = arr.length
    let result = 1
    for (let i = 0; i < len; i++){
        result +=arr[i]
    }
    return result
}
var arr2 = [1,2,3,4]
multiply(arr) // 24
```

문제 하나하나 각각의 함수를 구현하여 풀이한다. 또 배열의 원소를 다른 방식으로 계산하러면 새로운 함수가 필요하다.

함수형 프로그래밍으로 다시 작성해보자.

```JS
function reduce(func, arr, memo){
    var len = arr.length, i = 0, acc = memo
    for (;i < len; i++){
        acc = func(acc, arr[i])
    }
    return acc
}
var arr = [1,2,3,4]
var sum = function (x, y) {
    return x + y
}
var multipy = function (x, y) {
    return x * y
}
console.log(reduce(sum, arr, 0))
console.log(reduce(multiply, arr, 1))
```

이와 같이 함수형 프로그래밍을 통하여 더욱 높은 모듈화를 이룰 수 있다.

#### 팩토리얼

일반적으로 명령형 프로그래밍으로 재귀호출 방식으로 구현한다면 아래와 같이 구현 할 수 있다.

```JS
function fact(num) {
    if (num === 0 )
        return 1
    else
        return num * fact (num - 1)
}
console.log(fact(100))
```

하지만 함수형 프로그래밍을 이용하면 중복된 연산을 줄임으로써 성능을 향상 시킬 수 있다.

```JS
var fact = function () {
    var cache = {'0' : 1}
    var func = function (n) {
        var result = 0
        if (typeof(cache[n]) === 'number'){
            result = cache [n]
        }
        else {
            result = cache [n] = n * func(n - 1)
        }
        return result
    }
    return func;
}();

console.log(fact(10))
console.log(fact(20))
```

fact 는 자유 변수 cache에 접근 할 수 있는 클로저를 반환 받는다. 클로저로 숨겨지는 cache 에는 팩토리얼 연산 값을 저장한다. 즉, 연산과정에서 캐시에 저장된 값이 있으면 즉시 그 값이 반환 된다. 이를 `memoization 패턴` 이라 한다.

#### 피보나치 수열

memoization 패턴을 이용해서 피보나치 수열을 구현해보자.

```JS
var fibo = function () {
    var cache = {'0' : 0, '1' : 1}
    var func = function (n) {
        if (typeof(cache[n] === 'number')){
            result = cache[n]
        } else {
            result = cache[n] = func(n-1) + func(n-2)
        }
        return result
    }
    return func
}();
```

앞의 예제와 비슷하게 클로저를 이용하여 cache를 캐시로 활용한다.

이를 활용하여 팩토리얼과 피보나치 수열을 계산하는 함수를 인자로 받는 함수를 구현해보자

```JS
var cacher = function (cache, func) {
    var calc = function (n) {
        if (typeof(cache[n] === 'number')){
            result = cache[n]
        } else {
            result = cache[n] = func(calculate, n)
        }
        return result
    }
    return calc
}

var fact = cacher({'0' : 1}, function (func, n){
    return n * func(n - 1)
})

var fibo = cacher({'0' : 0, '1' : 1}, function (func, n){
    return func (n - 1) + func (n - 2)
})
```

위와 같이 함수형 프로그래밍으로 코드를 구현하는 감을 익히도록 해보자.

`커링`

커링이란 특정 함수에서 정의된 인자의 일부를 넣어 고정시키고, 나머지 인자를 받는 새로운 함수를 만드는 것을 의미한다.

커링은 함수형 프로그래밍 언어에서 기본적으로 지원하지만 JS에서는 기본으로 제공하지는 않는다. 따라서 사용자는 다음과 같이 Function.prototype에 커링 함수를 정의하여 사용할 수 있다. 아래 코드를 보자.

```JS
Function.prototype.curry = function () {
    var fn = this, args = Array.prototype.slice.call(arguments)
    return function () {
        return fn.apply( this, args.concat( Array.prototype.slice.call(arguments)))
    }
}
```

### 객체 생성

1. `new 생성자`

```JS
function Person() {
    this.name = 'bar',
    this.age = 24,
    this.gender = 'women'
}
var bar = new Person();
```

이와 같이 new 생성자를 이용하면 bar 는 **Person.prototype 을 프로퍼티** 로 받는다.

2. `리터럴 방식`

```JS
var foo = {
    name : 'foo',
    age : 35,
    gender : 'man'
}
```

이러한 리터럴 방식의 경우 1번만 생성 가능하며 **Object.prototype 을 프로퍼티**로 가진다.

즉, new 와 리터럴 방식의 객체 생성을 비교할 때 new 생성자로 만들어진 bar는 Person의 인스턴스가 되고 리터럴 방식의 객체 foo 는 Object의 인스턴스가 된다.

3. `Object.create(proto, [propertiesObject])`

Object.create 메서드는 첫번째 인자로 **프로토 타입 객체**를 명시적으로 전달 한다.

두 번째 인자로는 객체의 속성을 정의한다.

<br>
<br>
<br>

[스택오버플로우](https://stackoverflow.com/questions/4166616/understanding-the-difference-between-object-create-and-new-somefunction) 에서는 생성자와 Object.create 의 차이점을 다음과 같이 설명한다.

`new Person()`

1. 새로운 Object 객체 생성
2. obj.\_\_proto 를 Person.prototype 으로 설정
3. return Person.call(obj) || obj

`Object.create(Person.prototype)`

1. 새로운 Object 객체 생성
2. obj.\_\_proto 를 Person.prototype 으로 설정
3. return obj

### Symbol

A unique value that can be used as an identifier for object properties

쉽게 말해 **unique 한 값을 저장하는 컨테이너**이다.

```JS
const s = Symbol.for(555);
console.log(Symbol.keyFor(s)) // 555
```

Symbol 이 어디서 어떻게 활용되는지는 아직 잘 모르곘습니다 ㅠ ㅠ

출처: [인사이드 자바스크립트](https://books.google.co.kr/books?id=gSVJDgAAQBAJ&printsec=frontcover&dq=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8&hl=en&sa=X&ved=2ahUKEwjU2eK9kO3qAhVlwYsBHbivCAQQ6AEwAHoECAMQAg#v=onepage&q=%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8&f=false)

## Step 5

### Iterator 와 Generator

컬랙션에서 items 들을 순회하는건 흔한 일이다. 따라서 자바스크립트는 여러가지 순회하는 방법 (for loops, map(), filter() 등)이 있다.

`Iterator` 란 Arrays, Strings, Maps, Sets, NodeLists 에 포함된 built-in Object 이다. Iterator 는 두 개의 속성 (value, done) 을 반환하는 **next() 메소드**를 사용하여 객체의 `Iterator protocol` 을 구현한다.

`Generator` 는 Iterator 를 iterative 알고리즘을 직접 정의 할 수 있도록 해준다. 생성자 함수는 **function\*** 문법을 사용한다. Generator 는 next 메소드를 통해 호출되면 어떤 값이 소비되고 생성자 함수는 yield 키워드를 만날때 까지 실행된다.

먼저 간단한 예제를 보자.

```JS
// 1) genny 라는 generator 선언
// function * 👉 Generator 로 사용됨을 의미
function* genny() {
    yield 'a';
    yield 'b';
    // return undefined 👉 JS 는 반환 값이 없으면 자동으로 undefined 를 반환
}

// 2) genny 라는 generator 로 iter 라는 iterator 생성
// iterator 는 next 라는 built-in function 제공
let iter = genny();
console.log(iter.next()); // 3) { value 'a', done : false }
console.log(iter.next()); // 4) { value 'b', done : false }
console.log(iter.next()); // 5) { value : undefined, done : true }

// 5) 에서 return 값이 반환 되면 done 이 true 로 바뀐다.
```

다음과 같이 iterator 는 done 값이 true 가 될 때 까지 값을 yield 값을 추출한다.

### Iterator 활용해보기

자 이제 다음과 같은 객체가 있다.

```JS
let myBestMovie = {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
}
```

객체는 다음과 같이 for... of 문으론 순회 할 수 없다.

```JS
for (const p of myBestMovie){
    console.log(p) // Uncaught TypeError: myBestMovie is not iterable 🤯
}
```

Iterator & Generator 를 활용해서 Object 를 순회하도록 커스터마이징 해보자.

먼저 영화 정보를 순회 할 수 있도록 Generator 를 정의하자.

```JS
let count = -1;
let movieIter = {
    // 이 객체 안에는 1개의 Symbol.iterator 프로퍼티가 있다.
    // Symbol 을 통해 iterator 의 Unique함을 보장할 수 있다.
    [Symbol.iterator]: function(movie){
        return {
            // next () 함수를 통해 순회하므로 next 를 구현 해준다.
            next: () => {
                count++;
                switch (count) {
                    case 0:
                        return {
                            value: movie.title,
                            done: false
                        }
                    case 1:
                        return {
                            value: movie.year,
                            done: false
                        }
                    case 2:
                        return {
                            value: movie.director,
                            done: false
                        }
                    case 3:
                        return {
                            value: undefined, done: true
                        }
                    default:
                        return {
                            value: undefined, done: true
                        }
                }
            }
        }
    }
}
```

이제 myBestMovie 객체를 순회 해보자.

```JS
// movie iterator 를 data 변수에 저장
let data = movieIter[Symbol.iterator](myBestMovie);

console.log(data.next()); // { value : 'Interstellar', done : false }
console.log(data.next()); // { value : 2014, done: false }
console.log(data.next()); // { value : 'Christopher Nolan', done : false }
console.log(data.next()); // { value : undefined, done : true }
```

위처럼 Object 를 순회 할때 어떤 속성 값을 먼저 반환하느냐에 따라 순회 순서가 달라진다. 또한 속성 값이 동일 또는 유사한 객체들은 같은 Iterator 로 순회 할 수 있다.

출처 : [YouTube: Steve Griffith](https://www.youtube.com/watch?v=NoUPIQobeLw), [MDN web docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)

## Step 6

### 자바스크립트에서의 객체 지향

자바스크립트는 `프로토타입 기반` (prototype-based) 객체 지향 언어이다.

프로토타입 기반 프로그래밍은 클래스가 필요없는 (class-free) 객체 지향 프로그래밍 스타일로 `프로토타입 체인`과 `클로저` 등으로 객체 지향 언어의 상속, 캡슐화 (정보 은닉) 등의 개념을 구현할 수 있다.

### ES5 : 프로토 타입, 클로저

ES6에서 클래스가 등장하기 이전에는 아래 예제와 같이 객체지향 개념을 구현 하였다.

```JS
// 즉시 실행 함수로 생성자와 프로토 타입 체이닝을 적용하여 반환
var Person = (function (){
    // 생성자 함수
    function Person(name) {
        this._name = name;
    }
    // public method
    Person.prototype.introduceSelf = function () {
        console.log('Hi nice to meet you ! 😇');
    };
    return Person;
})());
// 👉 이는 자바스크립트에서 함수는 1급 객체이기 때문에 가능하다 생각됩니다.
```

### ES6 : 클래스

위에서 자바스크립트는 class-free 언어라고 하였지만 ES6 에서 등장한 클래스는 객체지향 언어에 익숙한 프로그래머에게 더욱 단순 명료한 Syntactic Sugar라 볼 수 있다.

- 클래스는 함수로 호출될 수 없다.

- 일반적으로 클래스 선언문도 호이스팅이 발생한다. **모든 선언문은 런타임 이전에 실행**됨을 기억하자.

- 클래스 선언은 let 과 const 처럼 블록 스코프에 선언되면 **호이스팅 이 일어나지 않는다**

:::tip 클래스의 호이스팅
클래스는 클래스 선언문 이전에 참조할 수 없다. 하지만 호이스팅이 발생하지 않는것이 아니라 let, const 처럼 호이스팅이 동작한다. 따라서 클래스 선언문 이전에 Temporal Dead Zone, `TDZ`에 빠지기 때문에 호이스팅이 발생하지 않는거 처럼 동작한다.
:::

- 클래스의 메소드 안에서 super 키워드를 상용할 수 있다.

### 클래스 constructor

클래스 필드 (class field)는 클래스 내부의 캡슐화된 변수를 말한다.

```JS
class Person {
    constructor(name) {
        // _name 이 클래스 필드가 된다
        // 인스턴스의 생성과 동시에
        // 클래스 필드의 생성과 초기화를 진행한다.
        this._name = name;
    }
}
```

이와 같이 constructor 내부에서 선언한 클래스 필드는 생성자에서 생성할 인스턴스를 가리키는 this에 바인딩 된다.

이는 언제나 인스턴스를 통해 외부에서 참조 될 수 있기 때문에 `public`이다.

자바스크립트에서 ES6의 클래스는 다른 객체 지향 언어처럼 private, public, protected 키워드와 같은 **접근 제한자 (access modeifier)를 지원하지 않는다**

### 클래스 method

Getter 와 Setter 를 정의하고 싶을 때는 메소드 이름 앞에 get 또는 set 을 붙여 사용할 수 있다.

```JS
class Account {
    constructor () {
        this._balance = 0;
    }
    get balance() {
        return this._balance;
    }
    set balance(balance) {
        this._balance = balance;
    }
}
const a = new Account();
a.balance = 10;
a.balance; // 10
```

static 키워드를 사용하면 정적 메소드가 된다.

```JS
class Square {
    constructor (_width) {
        this.width = _width;
        this.height = _height;
    }
    // static method
    static equals (a,b) {
        return a.width * a.height === b.width * b.height;
    }
}
```

스태틱 메소드는 어떤 특정 인스턴스가 아닌 클래스에 속한 함수를 구현할 때 사용된다.
일종의 helper method 를 만들 수 있다. 따라서 this 가 사용되지 않을때 사용한다.

### 클래스 상속

자바스크립트에서 상속의 개념은 prototype을 기반으로 객체지향 상속의 개념을 흉내내도록 구현한 것이다.

B 클래스가 슈퍼 클래스, A가 B의 서브 클래스라 가정하면

- 서브 클래스 A 는 슈퍼 클래스 **B의 정적 메소드와 정적 속성을 사**용할 수 있다.
- 슈퍼 클래스 **B 의 인스턴스 메소드와 인스턴스 속성**을 서브 클래스 A의 인스턴스에서 사용할 수 있다.
