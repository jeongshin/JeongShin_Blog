# 인사이드 자바스크립트

## 1장. 자바스크립트 기본 개요

## 2장. 개발 환경

## 3장. 자바스크립트 데이터 타입과 연산자

## 4장. 함수와 프로토타입 체이닝

### 함수 3가지 정의 방법

- `함수 선언문` - function statement

```JS
function add (x,y) {
    return x + y;
}
```

내부적으로는 자바스크립트 엔진에 의해 add 변수가 👉 내부적 함수 참조하게 됨

function statement 방식은 **반드시 함수명이 정의**되어야 함

- `함수 표현식` - function expression

```JS
var add = function (x,y) {
    return x+y;
}; // function expression 의 경우 관습적으로 ; 을 빠지지 않고 붙임
```

함수 변수 add 는 `익명 함수` - anonymous function 을 참조

```JS
var add = function sum(x,y) {
    return x + y;
}
console.log(add(3,4)); // 출력 : 7
console.log(sum(3,4)); // 에러 !
```

함수 표현식에 사용된 함수 이름은 외부에서 접근 불가능.

즉, 함수 내부에서 재귀적으로 호출 하거나 디버거 등에서 함수를 구분할때 사용.

3. `Funtion() 생성자` 함수

```JS
var add = new Function('x', 'y', 'return x + y');
console.log(add(3,4)); // 출력 : 7
```

### 함수 호이스팅

```JS
add (2, 3); // 출력 : 5
function add (x,y) {
    return x + y;
}
add(3, 4); // 출력 : 7
```

add(2,3) 시점에서는 아직 함수가 정의되지 않았지만 함수가 정상적으로 호출됨.
`함수 선언문` 형태로 정의한 함수는 `호이스팅`이 되어 코드 맨 처음부터 유효함.

**더글럿스 클락포드**는 함수 호이스팅은 함수를 사용하기 전에 반드시 선언해야 한다는 규칙을 무시하므로 코드의 구조를 엉성하게 만들수 있기 때문에 **함수 표현식 사용을 권장**한다.

```JS
add(2,3); //uncaught type error ! 👉 function expression 방식은 hoisting 되지 않음
var add = function (x,y) {
    return x + y;
}
add(3,4);
```

이와 같이 함수 호이스팅이 발생하는 근본적인 원인은 자바스크립트는 **변수 생성과 초기화 작업이 분리되서 진행**되기 때문이다. 이후 내용에서 더 자세하게 다룬다.

### 함수도 객체다 🌟

```JS
function add (x, y){
    return x + y;
}

add.result = add (3,2); // result 프로퍼티 동적 생성
add.status = 'OK';

console.log(add.result); // 출력 : 5
console.log(add.status); // 출력 : 'OK'
```

- add() 함수를 생성하면 함수 객체 `[[Code]] 내부 프로퍼티`에 저장됨

@startuml
skinparam monochrome reverse
scale 300 width
object add {
[[ code ]] 👉 return x + y
result 👉 5
status 👉 'OK'
}
@enduml

JS는 함수도 일반 객체처럼 취급하기 때문에 아래의 동작이 가능

- 리터럴에 의해 생성
- 변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능
- 함수의 인자로 전달 가능

```JS
var foo = function (func) {
    func();
};

foo(function (){
    console.log('Function can be used as the argument');
});
```

- 함수의 리턴값으로 리턴 가능

```JS
var foo = function () {
    return function (){
    console.log('Function can be used as the argument');
    }
};
var bar = foo();
bar();
```

- 동적으로 프로퍼티 생성 및 할당 가능

⭐️ 이와 같은 특징을 `일급 객체 First Class` 라 부름 가장 중요한건 함수가 **일반 객체처럼 값으로 취급**된다는걸 이해해야한다.

<br>

add 함수를 좀 더 자세히 들여다보면

```JS
ƒ add(x,y)
    ⭐️ arguments: null // 👉 함수를 호출할때 전달된 인자 값, 함수를 호출할때 함수 내부로 전달됨
    ⭐️ caller: null // 👉자신을 호출한 함수, 현재 add() 함수를 호출하지 않았기 때문에 null
    length: 2
    name: "add" // 👉 함수 이름
    ⭐️ prototype: {constructor: ƒ}
    ⭐️ __proto__: ƒ ()
    /* 👉 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]] 내부 프로퍼티를 가짐,
    여기서는 Function.prototype 객체 */
        apply: ƒ apply()
        arguments: (...)
        bind: ƒ bind()
        call: ƒ call()
        caller: (...) // 👉 자신을 호출한 함수
        constructor: ƒ Function()
        length: 0
        name: ""
        toString: ƒ toString()
        Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
        get arguments: ƒ ()
        set arguments: ƒ ()
        get caller: ƒ ()
        set caller: ƒ ()
        __proto__: Object
        [[FunctionLocation]]: <unknown>
        [[Scopes]]: Scopes[0]
    [[FunctionLocation]]: VM1691:1
    [[Scopes]]: Scopes[1]
```

모든 함수들은 `Function.prototype 객체` 를 부모 객체로 가진다. 그리고 Function Prototype 객체는 모든 객체의 조상인 `Object.prototype 객체` 를 부모로 가진다.

@startuml
skinparam monochrome reverse
Object.prototype <|-- Function.prototype
Function.prototype <|-- Function.func1
Function.prototype <|-- Function.func2
Function.prototype <|-- Function.xxx
@enduml

Function.prototype 객체가 가지는 내장 프로퍼티 & 메서드들은 다음과 같은 것들이 있다.

- constructer 프로퍼티
- toString() 메서드
- **apply** (thisArg, argArray) 메서드
- **call** (thisArg, [, arg1 [, arg2]]) 메서드
- bind (thisArg,[, arg1[, arg2]]) 메서드

**length 프로퍼티**

함수가 정상적으로 실행될 때 기대되는 인자의 개수를 나타낸다.

### prototype 프로퍼티 vs [[Prototype]] 프로퍼티

두 프로퍼티 모두 프로토타입 객체를 가리킨다.

`[[Prototype]]` 👉 자신의 부모 역할을 하는 프토토타입 객체를 가르킴

`prototype` 👉 이 함수가 생성자로 사용될 때 이 함수를 통해 생성된 객체의 부모역할을 하는 프토토타입 객체

@startuml
skinparam monochrome reverse
scale 200 width
object function
function : prototype

object prototpye_object
prototpye_object : constructor

function <|-- prototpye_object
prototpye_object <|-- function
@enduml

자바스크립트에서는 함수를 생성할 때, 함수 **객체 자신**과 연결된 **프로토 타입 객체** 두 객체를 동시에 생성하며 위의 그림과 같이 **prototpye, constructor** 라는 프로퍼티로 **서로 참조**하게 된다.

⭐️ 즉, 함수 객체와 프로토 타입 객체는 서로 밀접하게 연결되어 있다.

```JS
function myFunction (){
    return true
}
console.dir(myFunction.prototype)
/* 프로토 타입 객체 출력 결과
Object
constructor: ƒ myFunction() 👉 생성자 함수
__proto__: Object 👉 모든 자바스크립트 객체가 가지는 부모 역할 프로퍼티
*/

console.dir(myFunction.prototype.constructor)
/* constructor 와 매핑되어 있는 함수, 즉, myFunction() 함수 출력 */
```

`Callback Functions`

어떤 이벤트가 발생했거나 특정 시점을 도달했을때 시스템에서 호출되는 함수

`Immediate Functions`

최초 한 번의 실행만을 필요로하는 초기화 코드 부분에 사용가능

또한 전역 네임스페이스를 더럽히지 않음으로 이후 다른 자바스크립트 라이브러리들이 동시에 로드가 되더라도 라이브러리 간 뼌수 이름 충돌 같은 문제를 방지할 수 있다.

`Inner Functions`

클로저를 생성하거나 부모 함수 코드에서 외부에서의 접근을 막고 독립적인 헬퍼 함수를 구현하는 용도로 사용

```JS
function parent () {
    var a = 100
    var b = 200
    function child () {
        var b = 300
        console.log(a)
        console.log(b)
    }
    child() // 내부 함수 정의와 내부 함수 호출이 모두 스코프 내에 있다 GOOD ⭕️
}
parent()
child() // 함수 내부에 정의는 되어 있는 함수를 외부에서 접근이 불가능 하다 BAD ❌

/* 출력 결과
100
300
Uncaught ReferenceError : child is not defined
```

내부 함수 child 에서는 자신을 둘러싼 외부 함수의 변수에 접근이 가능하다 이를 `스코프 체이닝` 이라 부른다.

```JS
function parent () {
    var a = 100
    var child = function () {
        console.log( a )
    }

    // child() 함수 반환
    return child
}
var inner = parent()
inner()
/* 출력 결과 : 100 */
```

@startuml
skinparam monochrome reverse
state parent함수 {
state "(익명) Inner Function" as f
state "a : 100" as v1
state "child() 함수 변수" as v2
f : console.log(a)
}
state "외부 inner 변수" as v3

v3 -> f
f -> v1
v2 -> f
@enduml

위와 같이 내부 함수를 참조하는 child 변수를 리턴 값으로 반환하면 **inner 변수가 child() 내부 함수를 참조**하게 된다.

따라서 inner 변수로 내부 함수를 호출하게 되면 **스코프 체이닝**으로 부모 함수에 a 변수가 정의되어 있는지 확인하고 a 값을 출력한다.

이와 같이 실행이 끝난 parent() 와 같은 부모 함수 스코프의 변수를 참조하는 inner 함수를 `클로저` 라고 한다.

예제) 자신을 제정의 하는 함수

```JS
var self = function (){
    console.log('a')
    return function () {
        console.log('b')
    }
}
self = self() // 'a'
self() // 'b'
```

위의 코드는 처음 정의된 self 함수가 실행되고 내부 익명 함수를 반환하여 두 번째로 실행하였을때 내부 함수를 실행하게 된다.

이 코드를 통해 자바스크립트의 언어적 유연성을 볼 수 있다.

### 함수 호출과 this ⭐️⭐️

`arguments 객체`

JS에서는 함수 인자를 맞춰주지 않아도 선언된 인자보다 적으면 undefined 를 할당하고, 초과될시 무시 하는데 런타임시에 인자의 개수에 따라 다르게 동작해야한다면 **arguments 객체를 사용**해야 한다.

arguments 객체는 다음과 같이 세 부분으로 구성되어 있다 (**proto** 제외)

    함수를 호출할 때 넘겨진 인자 (유사 배열)
    length 포로퍼티 👉 인자 개수
    callee 프로퍼티 👉 현재 실핼 중인 함수의 참조 값

이를 이용하여 아래와 같은 코딩을 할 수 있다.

```JS
function sum () {
    var result = 0
    for (let i = 0; i < arguments.length; i++ ){
        result += arguments[i]
    }
    return result
}
console.log(sum(1,2,3)) // 6
console.log(sum(1,2,3,4,5,6,7,8,9)) // 45
```

이때 유의할 점은 이 객체는 실제 배열이 아닌 `유사 배열 객체` 이다. 즉, 배열과 같이 length 를 가지고 있지만 배열에 사용하는 메서드를 맘대로 사용하다간 큰일난다. 이와 관련해서는 이후에 **call 과 apply 메서드를 이용한 명시적인 this 바인딩** 에서 다룬다.

### 객체의 메서드 호출할 때 this 바인딩

객체의 프로퍼티가 함수일 경우, 이 함수를 메서드라고 부른다. 메서드를 호출할 때, **메서드 내부에서 사용된 this 는 해당 메서드를 호출한 객체로 바인딩** 된다.

```JS
var myObject = {
    name : 'foo',
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

자바스크립트에서 함수를 호출하면, 해당 함수 내부 코드에서 사용된 this는 `전역 객체`에 바인딩 된다.

### 전역객체

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

예제에서 'this is test' 전역 객체에서 sayFoo를 호출하였기 때문에 this는 전역 객체로 바인딩 된다. 이때 this 바인딩 특성은 **내부 함수를 호출했을 경우**
에도 그대로 적용된다.

### 예제 1 : 내부 함수가 전역 객체에 바인딩

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
var Person = function (name) { // 생성자 함수는 관례적으로 첫 글자는 대문자 이름 사용
    /* ⭐️ 아래 코드가 실행되기 전에 빈 객체를 생성 후 Person() 의
    prototype 프로퍼티가 가리키는 객체, Person.prototype, 를 [[Prototype]] 링크로 연결하여
    자신의 프로토타입으로 설정 후 this로 바인딩 */
    this.name = name
    /* this가 가리키는 빈 객체에 동적으로 name 프로퍼티 생성 */
    /* 특별히 리턴값이 없는 경우 this로 바인딩된 이 객체가 리턴됨 */
}
var foo = new Person('foo')
console.log(foo.name)
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

/* 출력 결과 */
Object
age: 35
gender: "man"
name: "foo"
__proto__: Object

// 생성자 함수 : 여러번 생성 가능
function Person (name, age, gender, position) {
    this.name = name
    this.age = age
    this.gender = gender
}

// Person 생성자 객체 생성
var bar = new Person ('bar', 33, 'woman')
console.dir(bar)

/* 출력 결과 */
Person
age: 33
gender: "woman"
name: "bar"
__proto__: Object

var baz = new Person ('baz', 25, 'woman')
console.dir(baz)

/* 출력 결과 */
Person
age: 25
gender: "woman"
name: "baz"
__proto__: Object
```

리터럴 방식과 생성자 방식의 차이는 프로토타입 객체 (`__proto__` 프로퍼티) 에 있다. 객체 리터럴의 경우 `Object.prototype` 을 생성자의 경우 `Person.prototype` 을 프로퍼티로 가진다.

이는 위에서 설명한 `JS 객체 생성 규칙` 에 따라 리터럴에선 객체 생성자가 Object() 이고 생성자에선 생성자가 Person() 함수이기 때문이다.

:::tip 생성자 함수를 new 없이 호출하면 어떤 사악한 일이 일어날까? 👿

new 를 이용한 생성자 함수에서 this는 빈 객체에 바인딩 된다고 위에서 다루었다.
하지만 new 키워드 없이 생성자 함수를 호출하게 되면 빈 객체가 아닌 글로벌 객체에 this가 바인딩 되어
글로벌 객체에 프로퍼티를 생성한다. 즉, 끔찍한 일이 발생한다. 주의하자 !
:::

#### 강제 인스턴스 생성 코드 패턴

다음은 더글러스 크락포드와 JS 전문가들이 제안하는 new 키워드 없이 객체를 생성을 방지하기 위한 코드 패턴이다.

```JS
function A (arg){
    if (!(this instanceof A)) // or if (!(this instanceof arguments.callee))
        return new A(arg)
    this.value = arg ? arg : 0
}
var a = new A (100) // a.value : 100
var b = A(10) // b.value : 10
console.log(global.value) // undefined
```

if (!(this instanceof arguments.callee)) 코드에서 호출한 함수가 new 키워드가 사용되어 빈 객체 생성 후 이 객체에 **this가 바인딩 되었는지에 대한 여부를 검사**한다.

위의 코드 패턴을 통하여 new 키워드를 사용하지 않아도 전역 객체가 아닌 새로운 인스턴스를 생성하여 리턴하게 된다. 이는 대부분의 JS 라이브러리에 사용되는 코드 패턴이다.

### call 과 apply 메서드를 이용한 명시적 this 바인딩

지금까지는 this 바인딩이 JS에 의하여 자동으로 바인딩 되었지만 이번 예제에선 함수 객체 기본 프로퍼티인 apply() 와 call() 을 이용하여 명시적으로 this를 바인딩 한다.
모든 함수는

```JS
function.appy(thisArg, argArray)
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

JS 함수 리턴 규칙

- 규칙 1 일반 함수나 메서드는 리던값을 지정하지 않을 경우, undefined 값이 리턴된다.
- 규칙 2 생성자 함수에서 리턴값을 지정하지 않을 경우 **생성된 객체가 리턴**된다.

### 프토로타입 체이닝 👉 일단 Skip !

## 5장. 실행 컨텍스트와 클로저

### 실행 컨텍스트

실행 컨텍스트란 C나 다른 언어에서의 콜 스택에 들어가는 실행 정보 하나와 비슷하다. ECMAScript에서는 실행 컨텍스트를 **실행 가능한 코드를 형상화하고 구분하는 추상적인 개념**이라 기술한다. 즉, **실행 가능한 자바스크립트 코드 블록이 실행되는 환경** 이라 할 수 있다. 실행 컨텍스트가 형성되는 경우는

1. 전역 코드
2. eval() 함수로 실행되는 코드
3. 함수 안의 코드를 실행할 경우 👉 대부분의 경우

ECMAScript 에서는 실행 컨텍스트 생성을 다음과 같이 설명 한다

    현재 실행되는 컨텍스트에서 이 컨텍스트와 관련 없는 실행 코드가 실행되면,
    새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 이동한다

    실행 컨텍스트를 이해하면 다음 두 가지 개념을 이해할 수 있다.
    👉 활성 객체와 변수 객체
    ⭐️ 스코프 체인

    샐행 컨텍스트 생성 과정
    1. 활성 객체 생성
        실행에 필요한 정보를 담을 객체 생성하는데 이를 활성 객체라 부름
    2. arguments 객체 생성
    3. 스코프 정보 생성
        실행 컨텍스트 안에서 연결 리스트와 유사한 형식으로 스코프 정보 생성
        [[scope]] 프로퍼티로 참조됨
    4. 변수 생성
        지역 변수 생성
    5. this 바인딩
    6. 코드 실행
        변수의 초기화 및 연산, 다른 함수 실행 등이 이루어 진다.

::: tip Node.js에서의 전역 변수
브라우저에서는 **최상위 코드가 전역 코드**이다. 따라서

```JS
var a = 10
b = 15
console.log(window.a) // 10
console.log(window.b) // 15
```

var a 로 정의한 변수가 전역 객체인 window 의 프로퍼티로 들어가기 때문에 위의 코드가 잘 실행된다.
하지만 Node.js 에서는

```JS
var a = 10
b = 15
console.log(global.a) // undefined
console.log(global.b) // 15
```

최상위 코드가 전역 코드가 아니다. 따라서 var a 가 전역 객체에 들어가지 않는다. 이는 Node.js 에서는 하나의 js 파일이 모듈로 작동하기 때문에 모듈 내에서 최상위에 변수를 선언해도 그 **모듈의 지역 변수**가 된다. var 을 사용하지 않을 경우 전역 객체인 global 에 들어가기 때문에 주의하자
:::

스코프 체인을 정리해보면

👉 각 함수 객체는 [[scope]] 프로퍼티로 현재 컨텍스트의 스코프 체인을 참조한다

👉 새로운 실행 컨텍스트가 실행되면 (함수호출) 현재 실행중인 함수 객체의 [[scope]] 프로퍼티를 복사하고,
새롭게 생성된 변수 객체를 해당 체인의 제일 앞에 추가한다.

👉 다른 언어와 다르게 JS에서는 **오직 함수만이 스코프 유효 범위의 한 단위**가 된다. (C 코드의 경우 if, for 문의 {} 단위가 있음)

⭐️ 스코프 체인 = 현재 실행 컨텍스트의 변수 객체 + 상위 컨텍스트의 스코프 체인

⭐️ 즉, 각각의 함수는 [[scope]] 프로퍼티로 **자신이 생성된** 실행 컨택스트의 스코프 체인을 참조한다. 함수가 실행되는 순간 실행 컨텍스트가 만들어지고, 이 실행 컨텍스트는 **실행된 함수의 [[scope]] 프로퍼티를 기반**으로 새로운 스코프 체인을 만든다.

#### 스코프 체인 예제 1

```JS
var value = 'value1'
function printFunc () {
    var value = 'value2'
    function printValue () {
        return value
    }
    console.log(printValue()) // 출력 : value1
}
printFunc()
```

@startuml
scale 700 width
skinparam monochrome reverse
state "0" as l1

state 전역실행컨텍스트 {
state "변수객체" as v
v : value : "value1"
v : printFunc
v : this
v : [ [ scope ] ]
}
v --> l1
l1 : 전역객체

state "0" as l2
state printFunc실행컨텍스트 {
state "변수객체" as v2
v2 : value : "value2"
v2 : printValue ⭐️
v2 : this
v2 : [ [ scope ] ]
}
v2 --> l2
l2 : 전역객체
l2 --> 1
1 : printFunc 변수 객체

state printValue실행컨텍스트 {
state "변수객체" as v3
v3 : this
v3 : [ [ scope ] ]
}
state "0" as l4
l4 : 전역객체
v3 --> l4

state "1" as l5
l5 : printFunc 변수 객체
l4 --> l5

state "2" as l6
l6 : printValue 변수 객체
l5 --> l6

@enduml

위의 다이어그램을 보자 ⭐️ 부분에서 printValue 의 **함수 객체가 생성될 때** 실행 컨텍스트는 printFunc 이다. 따라서 printFunc의 **스코프를 복사**하여 자신의 새로운 변수 객체가 추가되었다.

#### 스코프 체인 예제 2

```JS
var value = 'value1'
function printValue () {
    return value
}
function printFunc (func) {
    var value = 'value2'
    console.log(func()) // 출력 : value1
}
printFunc()
```

@startuml
scale 700 width
skinparam monochrome reverse
state "0" as l1

state 전역실행컨텍스트 {
state "변수객체" as v
v : value : "value1"
v : printFunc
v : printValue ⭐️

v : this
v : [ [ scope ] ]
}
v --> l1
l1 : 전역객체

state "0" as l2
state printFunc실행컨텍스트 {
state "변수객체" as v2
v2 : value : "value2"
v2 : func
v2 : this
v2 : [ [ scope ] ]
}
v2 --> l2
l2 : 전역객체
l2 --> 1
1 : printFunc 변수 객체

state printValue실행컨텍스트 {
state "변수객체" as v3
v3 : this
v3 : [ [ scope ] ]
}
state "0" as l4
l4 : 전역객체
v3 --> l4

state "1" as l5
l5 : printValue 변수 객체
l4 --> l5

@enduml

위의 다이어그램을 보자 ⭐️ 부분에서 printValue 의 함수 객체가 생성될 때 실행 컨텍스트는 첫 번째 예제와 달리 **전역 실행 컨텍스트** 이다. 따라서 스코프가 전역 실행 스코프의 프로퍼티만 복사한다.

`식별자 인식` 은 스코프 체인으로 부터 식별자를 찾는데 스코프 제일 첫번째 변수 객체부터 (지역 변수, 공식 인자, 내부 함수) 에서 전역 객체까지 순서대로 인식한다. 단 this 는 식별자가 아닌 키워드로 분류 되므로, 스코프 체인 참조 없이 접근 할 수 있다.

#### 이쯤 다시보는 호이스팅

```JS
/* 전역 실행 컨텍스트가 실행 되면 변수 foo, 함수 객체 bar,
 변수 x를 차례로 생성된다. foo, x 에는 undefined 가 할당된다.
 이 작업은 코드 실행 전에 이루어진다 */
foo() // TypeError 🙅🏻‍♂️
bar() // 출력 : undefined
var foo = function () {
    console.log(x)
}
function bar () {
    console.log(x)
}
var x = 1
```

이쯤 되니까 호이스팅이 왜 저렇게 작동하는지 더 이해가 잘 된다 😇

### 클로저

일단 이 책에서의 정의를 먼저 보고 시작하자. 클로저는 **이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수**를 클로저 라고 한다.

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

예제에서 함수별 실행 컨텍스트 스코프 보면 아래와 같이 된다.

- 전역 실행 컨텍스트 [[scope]] 👉 전역 객체

- outerFunc [[scope]] 👉 전역 객체 👉 outerFunc 변수 객체

- innerFunc [[scope]] 👉 전역 객체 👉 outerFunc 변수 객체 👉 innerFunc 변수 객체

하지만 9행을 보면 innerFunc 실행 컨텍스트가 outerFunc 실행 컨텍스트가 사라진 이후에 생성된다.

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

7장 함수형 프로그래밍에서 소개되는 대부분의 내용이 클로저를 사용하기 때문에 꼭 이해하고 넘어가자.
좋은 자바스크립트 프로그래머가 되려먼 많은 개발 경험을 쌓는 것이 가장 중요하다.

#### 객체의 메서드 연결하기

`TODO` 아직 이해를 못했음

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

## 6장. 객체지향 프로그래밍

#### 클래스 기반 언어 vs 프로토타입 기반 언어

클래스 기반의 언어는 클래스로 객체의 기본적인 형태와 기능을 정의하고, 생성자로 인스턴스를 만들어서 사용할 수 있다. JAVA, C++ 과 같은 언어가 이에 해당된다.

이런 유형의 언어는 모든 인스턴스가 **클래스에 정의된 대로 같은 구조이고 보통 런타임에 바꿀 수 없다**. 하지만 이에 따라 **정확성, 안정성, 예측성의 관점**에서 프로토 타입 언어보다 **좀 더 나은 결과를 보장**한다.

반면 프로토 타입 기반의 언어는 객체의 자료구조, 메서드 등을 동적으로 바꿀 수 있다. **객체의 구조와 동작 방식 또한 동적으로 바꿀 수 있**다는 장점이 있다.

#### 클래스, 생성자, 메서드

C++, JAVA 는 class 라는 키워드를 제공하여 클래스를 만들 수 있다. 클래스와 같은 이름의 생성자를 구현한다. 하지만 자바스크립트에선 이러한 개념이 없다.

자바스크립트에서는 **모든게 객체**이다. 따라서 **클래스, 생성자, 메서드 모두 함수로 구현** 한다.

```JS
function Person (arg) {
    this.name = arg
    this.getName = function () {
        return this.name
    }
    this.setName = function (value) {
        this.name = value
    }
}

var me = new Person('me')
var you = new Person('you')
var him = new Person('him')
```

위와 같이 클래스를 구현하면 Person 함수가 클래스이자 생성자의 역할을 한다. 하지만 주의 해야될 점이 있다.

@startuml
skinparam monochrome reverse
scale 700 width
state Person {
state name
state setName
state getName
}
state me {
state "name" as v3
state "setName" as v4
state "getName" as v5
}
state you {
state "name" as v6
state "setName" as v7
state "getName" as v8
}
@enduml

각 객체는 자기 영역에서 공통적으로 사용할 수 있는 setName() 함수와 getName() 함수를 따로 생성하고 있다. 즉, **자원 낭비**를 가져온다. 아래 그림을 보자.

```JS
function Person (arg) {
    this.name = arg
}
Person.prototype.getName = function () {
    return this.name
}
Person.prototype.setName = function () {
    return this.value
}
var me = new Person('me')
var you = new Person('you')
```

@startuml
skinparam monochrome reverse
scale 700 width
state Person {
state name
}

state me {
state "name" as v3
}
state you {
state "name" as v6
}
state prototype{
state "getName" as v5
state "setName" as v4
}
Person --> prototype
me --> prototype
you --> prototype
@enduml

Person 함수 객체의 prototype 프로퍼티에 함수 getName(), setName() 함수를 정의하면 각 객체는 각자 따로 함수 객체를 생성할 필요 없이 프로토 타입 체인으로 접근할 수 있다.

더글라스 크락포트는 다음과 같은 메서드 정의 방법을 제시한다.

```JS
Function.prototype.method = function (name, func) {
    if (!this.prototype[name])
        this.prototype[name] = func
}
```

#### 상속

자바스크립트는 클래스를 기반으로 하는 전통적인 상속을 지원하지 않는다. 따라서 다음과 같이 두 가지 방법으로 상속을 흉내낼 수 있다.

    1. 프로토 타입을 이용한 상속 Prototypal Inheritance
    2. 클래스 기반 상속

먼저 더글라스 크락포트가 소개한 자바스크립트에서 프로토 타입을 이용한 상속을 보자.

```JS
function create_child (parent) {
    function F () {} // 1. 빈 함수 객체를 만들고
    F.prototype = parent // 2. prototype 프로퍼티에 인자로 들어온 객체를 참조
    return new F() // F 함수 생성자로 하는 새로운 객체 반환
}
```

이렇게 반환된 객체는 부모 객체의 프로퍼티에 접근할 수 있고, 자신만의 프로퍼티도 만들 수 있다.

참고로 위와 같은 함수는 이해를 돕기위한 예제이고 JS에서 기본적으로 이를 제공하는데 바로 `Object.create()` 함수 이다.

클래스 기반 상속 👉 일단 skip

#### 캡슐화

```JS
var Person = function (arg) {
    var name = arg ? arg : 'zzoon'
    return {
        getName : function () {
            return name
        },
        setName : function (arg) {
            name = arg
        }
    };
}
var me = Person()
console.log(me.getName())
```

위의 예제는 자바스크립트 라이브러리에서도 흔히 사용되는 `모듈 패턴`이다. Person 함수로부터 반환 받은 객체로 Person 함수의 private 멤버에 접근 할 수 있다.

하지만 접근하는 private 멤버가 객체나 배열이면 `얕은 복사`로 참조만을 반환 하므로 사용자가 이후 이를 쉽게 변경할 수 있다.

아래 예제를 보자.

```JS
var ArrCreate = function (arg) {
    var arr = [1,2,3]
    return {
        getArr : function () {
            return arr
        }
    }
}
var obj = ArrCreate()
var arr = obj.getArr()
arr.push(5)
console.log(obj.getARr()) // [1,2,3,5]
```

따라서 객체를 반환하는 경우 `깊은 복사`로 **복사본을 반환**하는 것이 좋다.

이제 클로저를 이용하여 캡슐화를 적용해보자.

```JS
var Person = function (arg) {
    var name = arg ? arg : 'zzoon'
    var Func = function () {}
    Func.prototype = {
        getName : function () {
            return name
        },
        setName : function () {
            name = arg
        }
    }
    return Func
}()
```

위의 예제의 경우 클로저를 활용하여 name 에 접그할 수 없게 했다. 즉시 실행 함수로 반환되는 Func가 클로저가 되고 name 프로퍼티가 자유 변수가 되기 때문에
사용자는 name에 대한 접근이 불가능하다.

## 7장. 함수형 프로그래밍

### 함수형 프로그래밍이란?

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

```C
int ret = printf("print this to screen\n");
```

printf() 함수 역시 입력 값과 출력 값이 있지만 printf()의 목적은 화면에 출력하는게 함수의 목적이다. 결과 값은 단지 제대로 수행되었는지 여부만 따진다.

이처럼 명령형 프로그래밍은 **함수가 특정 작업의 순차적인 명령을 기술하는 데 중점**을 둔다.

반면에 함수형 프로그래밍은 함수가 순수 함수로서 외부에 아무런 영향을 주지 않는 선에서 **자신의 로직을 처리하여 결과를 반환**하여 함수의 목적이 결과 값 반환에 있다.
:::

### JS에서의 함수형 프로그래밍

자바스크립트는 다음 두가지 덕분에 함수형 프로그래밍이 일부 구현 가능하다

    1. 일급 객체로서의 함수
    2. 클로저

몇가지 코드로 이해해보자.

#### 배열의 각 원소 총합 구하기

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

## 8. jQuery 소스 코드 분석
