# 자바 객체지향의 원리와 이해

## 객체 지향 설계 5원칙 - SOLID

좋은 소프트웨어 설계를 위해서는 결합도 (coupling) 은 낮추고 응집도 (cohension) 은 높이는 것이 바람직하다.

SOLID 의 개념 또한 High Cohension 응집력을 높이고 Loose Coupling 결합도를 낮추는 관점에서 지속적으로 재정립된 것이다.

`결합도`는 모듈(클래스)간의 상호 의존정도로써 결합도가 낮으면 모듈간의 **상호 의존성**이 줄어들어 객체의 재사용이나 수정, 유지보수가 용이하다.

`응집도`는 하나의 모듈 내부에 존재하는 구성 요소들의 기능적 관련성으로, 응집도가 높은 모듈은 **하나의 책임에 집중**하고 독립성이 높아져 재사용이나 기능의 수정, 유지보수가 유리하다.

SOLID는 객체지향 프로그램을 구성하는 속성, 메서드, 클래스, 객체, 패키지, 모듈, 라이브러리, 프레임워크, 아키텍쳐 등 다양한 곳에 적용된다. SOLID 는 눈에 보이는 제품은 아니다 우리가 만드는 제품에 녹여내야 하는 개념이다.

### SRP - Single Responsibility Principle

> 어떤 클래스를 변경해야 하는 이유는 오직 하나뿐이여야 한다.

단일 책임 원칙을 위반하는 사례를 몇가지 보자.

1. 한 클래스에 다양한 클래스가 의존하는 경우

한 남자의 예로 다음과 같은 의존성이 있다고 가정하면

    어머니 👉 남자 (아들 역할)
    직장상사 👉 남자 (사원 역할)
    소대장 👉남자 (소대원 역할)

남자라는 클래스에 너무나도 많은 역할과 책임이 있다. 따라서 이런 경우 역할과 책임을 다음과 같이 분리할 수 있다.

    어머님 👉 아들 (아들 역할)
    직장상사 👉 사원 (사원 역할)
    소대장 👉 소대원 (소대장)

2. 한 속성이 여러 의미를 가지는 경우

데이터베이스에서 가령 한 필드에 있어 토지인 경우 면적을, 건물인 경우 층수를 나타내는 테이블이 있다고 가정하자.
이 데이터를 사용할 때마다 if 문을 이용하여 건물인지 토지인지 확인해야 한다.

3. 메서드에서 단일 책임이 지켜지지 않는 경우

```JAVA
class 늑대 {
	final static Boolean 수컷 = true;
	final static Boolean 암컷 = false;
	Boolean 성별;
	void 일과수행() {
		if (this.성별 == 수컷) {
			// 먹이를 사냥한다.
		}
		else {
			// 새끼들을 돌본다.
		}
	}
}
```

늑대 클래스에 일과수행 메서드는 성별에 따라 행위가 달라지고 있다. if 문이 존재할 경우 단일 책임 원칙을 위반하는가 의심해볼 필요가 있다.

아래와 같이 SRP에 맞게 리팩토링 해보자.

```JAVA
abstract class 늑대 {
	abstract void 일과수행 ()
}
class 수컷늑대 extends 늑대 {
	void 일과수행() {
		// 먹이를 사냥한다
	}
}
class 암컷늑대 extends 늑대 {
	void 일과수행(){
		// 새끼들을 돌본다.
	}
}
```

어플리케이션의 경계를 정하고 추상화를 통해 클래스를 선별하고 속성과 메서드를 설계할 때 반드시 단일 책임 원칙을 고려하는 습관을 들이자.

### OCP - Open Closed Principle

> 자신의 확장에는 열려 있고, 주변의 변화에 대해서는 닫혀 있어야 한다.

@startuml
state "판매 Interface" as BUY
state "구매담당직원" as p1
state "보안담당직원" as p2
state "편의점사장" as p3
BUY --> p3
BUY --> p2
BUY --> p1
손님 --> BUY : 구매하다
@enduml

가령 편의점에서 편의점 직원은 근본적으로 판매라는 행위에 있어서 손님이 누가되든 판매자가 누가되든 행위 자체에는 어느 영향도 받지 않는다.

따라서 주변의 변화에 손님의 구매 행위에는 영향을 받지 않고 직원은 교대를 통하여 확장에 열려있다.

OCP를 따르지 않으면 유연성, 재사용서으 유지보수성에 불리할 수 있다.

### LSP - Liskov Substitution Principle

> 서브 타입은 언제나 자신의 기반 타입 (base type)으로 교체할 수 있어야 한다.

> 하위 클래스의 인스턴스는 상위형 객체 참조 변수에 대입해 상위 클래스의 인스턴스 역할을 하는데 문제가 없어야 한다.

객체 지향의 상속은 다음 조건을 만족해야 한다.

- 하위 클래스 is a kind of 상위 클래스 - 하위 분류는 상위 분류의 한 종류이다.
- 구현 클래스 is able to 인터페이스 - 구현 분류는 인터페이스할 수 있어야 한다.

즉, 객체지향에서 상속은 조직도나 계층도가 아닌 분류도가 되어 한다.

```JS
아버지 춘향이 = new 딸()
```

위의 경우 딸이 아버지를 상속 받아 아버지 - 딸 구조 (조직도, 게층도). 이때 춘향이는 아버지의 행위 (메서드) 를 할 수 있어야 하는데 상당이 어색함이 느껴진다.

```JS
동물 뽀로로 = new 펭귄()
```

펭귄이 동물을 상속 받아 동물 - 펭귄 구조 (분류도). 이때 뽀로로는 동물의 역할을 문제 없이 수행할 수 있다.

따라서 상속이 잘못되는 경우 LSP를 위반 할 수 있다.

### ISP - Interface Segregation Principle

> 클라이언트는 자신이 사용하지 않는 메서드에 의존 관계를 맺으면 안 된다.

위의 SRP에서 남자의 역할에 따라 남자 클래스틑 토막내어 하나의 역할과 책임을 가지는 다수의 클래스로 분할 하였다. 하지만 이에 대한 다른 구현으로 ISP가 사용될 수 있다.

남자의 역할을 클래스를 분리하여 토막내는것이 아닌 인터페이스를 제한하여 구현하는것도 가능하다. 예를들어 어머니와 관계에서는 아들 인터페이스로 제한하고 직장 상사와의 관계에서는 사원 인터페이스 등등.. 의 형식으로 인터페이스 분할 원칙을 적용할 수 있다.

결과적으로 같은 문제를 두고 SRP 와 ISP는 두 가지 해결책이라 볼 수 있다. 이는 프로젝트 요구사항이나 설계자 취향에 따라 선택해서 설계할 수 있지만 가급적 단일 책임 원칙을 적용하는 것이 더 좋은 해결책이다.

ISP에서 집고 넘어가야 할 개념중 하나가 바로 `인터페이스 최소주의 원칙` 이다. 이는 인터페이스를 통해 메서드를 외부에 제공할 때는 **최소한의 메서드만 제공**하라는 원칙이다.

상속과 인터페이스에서 상위 클래스는 풍성할수록 좋고 인터페이스는 작을수록 좋다고 했고 LSP에 따라 하위 객체는 상위 객체인 척 할 수 있다. 따라서 인터페이스는 그 역할에 충실한 최소한의 기능만 공개해야 한다.

따라서 인터페이스는 ~할 수 있는 (is able to)의 기준으로 만드는 것이 좋다.

### DIP - Dependency Inversion Principle

> 고차원 모듈은 저차원 모듈에 의존하면 안 된다. 이 두 모듈 모두 다른 추상화된 것에 의존해야 한다.

> 추상화된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화된 것에 의존해야 한다.

예를들어 자동차와 스노우 타이어 사이의 관계를 살펴보자.

@startuml
class "자동차" as car
class "스노우타이어" as st

car --> st
@enduml

자동차는 스노우 타이어에 의존한다. 하지만 스노우 타이어는 계절이 변함에 따라 지속적으로 교체 되어야한다. 즉, 스노우타이어가 일반 타이어로 교체 될때마다 자동차는 그 영향에 노출되어 있다.

이에 의존 역전 원칙 DIP를 적용해보자.

@startuml
class "자동차" as car
interface "타이어" as i
class "스노우타이어" as t1
class "일반타이어" as t2
class "광폭타이어" as t3
car --> i
i <.. t1
i <.. t2
i <.. t3
@enduml

위와 같이 DIP 리팩토링을 통하여 더 이상 자동차는 타이어 변화에 영향을 받지 않는다.

이처럼 자신보다 변하기 쉬운 것에 의존하던 것을 추상화된 인터페이스나 상위 클래스를 두어 변하기 쉬운 것의 변화에 영향받지 않게 하는 것이 의존 역전 원칙이다.

### SOLID - Summary

- SRP : 어떤 클래스를 변경하는 이유는 하나뿐
- OCP : 자신의 확장에는 열려 있고, 주변의 변화에는 닫혀있다.
- LSP : 서브타입은 언제나 자신의 기반 타입으로 교체할 수 있어야 한다.
- ISP : 클라이언트는 자신이 사용하지 않는 메서드에 의존 관계를 맺으면 안 된다.
- DIP : 자신보다 변하기 쉬운껏에 의존하지 마라.

## 스프링이 사랑한 디자인 패턴

객체지향 4대원칙, 설계 원칙(SOLID), 디자인 패턴을 요리에 비유해보자.

|      요리       |     OOP     |
| :-------------: | :---------: |
|     요리도구    |  4대 원칙   |
| 요리도구 사용법 |  설계 원칙  |
|     레시피      | 디자인 패턴 |

### Adapter Pattern

다음 예제는 dofactory 라는 온라인 사이트에서 참고한 Adapter 를 사용한 자바스크립트 코드 예제이다.
어댑터 패턴은 변환기라고 할 수 있다. 즉, 두 인터페이스 사이에 통신이 가능하게 해준다.

Adapter 패턴은 아래와 같은 구조를 가지는데

    Client 👉 Adapter 👉 Adaptee

먼저 Adapter 개념을 사용하지 않는 예제를 보자.

```JS
function Shipping() {
	this.request = function (보내는 우편번호, 받는 우편번호, 무게){
		let price;
		// calculate price
		return price;
	}
}

function run() {
	var shipping = new Shipping();
	var cost = shipping.request( 우편번호1, 우편번호2, 40 );
}
```

이제 Adapter 를 사용하여 리팩토링 해보자.

```JS
function Shipping() {
	this.login = function (certifi)
}

```

> 호출 당하는 쪽의 메서드를 호출하는 쪽의 코드에 대응하도록 중간에 변환기를 통해 호출하는 패턴

### Singleton Pattern

싱글턴 패턴이란 인스턴스를 하나만 만들어 사용하기 위한 패턴이다. 커넥션 풀, 스레드 풀, 디바이스 설정 등과 같은 경우 인스턴스를 여러 개 만들게 되면 불필요한 자원을 사용하게 되고 프로그램이 예상치 못한 결과를 낳을 수 있지만, 싱글턴 패턴은 오직 인스턴스를 하나만 만들고 이를 재사용한다.

JS Code

```JS
var singletonObj = (function (){
	var singletonInstance;
	function create() {
		function f1() {
			//some codes
		}
		function f2() {
			//other codes
		}
		return {
			func1: f1,
			func2: f2
		}
	}
	return {
		getInstance: function() {
			if (!singletonInstance){
				singletonInstance = create();
			}
			return singletonInstance;
		}
	};
	function Singleton () {
		if (!singletonInstance){
			singletonInstance = intialize();
		}
	}
})();
```

위와 같이 클라이언트에서 create 메서드에는 접근하지 못하게 private으로 getInstance 메서드는 public 으로 구현하여

```JS
var obj = singletonObj.getInstance();
```

다음과 같이 인스턴스를 생성할 수 있다. 싱글톤은 race condition에 영향을 받기 쉽기 때문에 동기화에 신경써야 한다.

JAVA Code

```JAVA
public class Singleton{
	static Singleton singletonObject; // 정적 참조 변수

	private Singleton() { } // private 생성자

	// 객체 반환 정적 메서드
	public static Singleton getInstance() {
		if (singletonObject == null) {
			singletonObject = new Singleton();
		}
		return singletonObject;
	}
}
```

만약 클라이언트 측에서

```JAVA
Singleton s = new Singleton();
// Error 🤯
// private 생성자이므로 new를 통해 인스턴스를 생성할 수 없다.
```

정리하면 싱글턴 패턴은 다음과 같은 특징을 가진다.

- private 생성자를 갖는다.
- 단일 객체 참조 변수를 정적 속성으로 갖는다.
- 단일 객체 참조 변수가 참조하는 단일 객체를 반환하는 getInstance() 정적 메서드를 갖는다.
- 단일 객체는 쓰기 가능한 속성을 갖지 않는 것이 정석이다.

### 팩터리 메서드 패턴 (Factory Method Pattern)

팩터리 메서드는 객체를 생성 반환하는 메서드를 말한다.

## 출처

자바스크립트 예제 출처 : [dofactory](https://www.dofactory.com/)
