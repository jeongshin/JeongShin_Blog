# WEB Basics

웹을 공부하며 배운 전반적인 내용을 다룹니다.

## MVC Models

#### Model

- 데이터 관리를 구현 (saving, fetchig ... )
- 데이터는 메모리, 파일 시스템, DB 등 모든 데이터를 의미함
- 데이터와 관련된 로직 구현

#### View

- 사용자가 보는 것
- 로직이 많이 포함되어서는 안됨

#### Controller

- Model과 view 를 연결하여 서로간 communication 을 도움

## Regular Expression

#### Regex Basics

문자에서 패턴을 검색할때 쓰인다.

`Literal Character` `Meta Character` 로 이루어져 있는데 예제와 함께 하나씩 공부해가며 알아가보자.

Meta Character 는 특정 문자들의 set 대한 상징으로 여러개의 문자를 포함한다.

1. Single Char

```
\d 👉 0 - 9, any digit

\w 👉 A - Z, a - z, 0 - 9 any word
\W 👉 NOT word (\w에 포함 안되는 전부)

\s 👉 white space, 공백, 탭
\S 👉 NOT white space

. 👉 any character

* 👉 0 or more
  ex) re.\* 는 re 로 시작하는 모든 문자열이 해당된다.
```

2. Quntifiers

```
* 👉 0 or more
+ 👉 1 or more
? 👉 0 or 1
{min, max}
{n}

예제) \s\w{5}\s : 공백 사이에 오는 5개 문자가 오는 문자열
```

3. Alternation

#### Regex Examples

1. `-` , `^` 이 두 가지는`[]` 안에서 조금 특별하게 동작한다.

**[-.]** 👉 - 또는 . 을 포함한 문자를 검색한다. (리터럴 '-' 를 검색함)

**[a-z]** 👉 a ~ z 의 알파벳을 검색한다 (범위 검색).

**[0-5]{3}** 👉 0 ~ 5 로 이루어진 3자 문자열을 검색한다.

**[^0-5]{3}** 👉 위에서 구한 범위를 제외한 모든 부분을 구한다.

**[a^bc]** 👉 a, b, c 와 리터럴 ^ 문자를 검색한다.

**\b[A-Z][a-z]\*** 👉 문장의 첫 그 다음이 소문자로 오는 문자 검색. 길이가 \*로 뒤에 더 올 수 있음.

2. `( | )` 로 or 을 검색할 수 있다.

**(net | com)** 👉 net 또는 com 특정 문자열을 검색한다.

이메일은 다음과 같이 검색할 수 있다.

```regex
\w+@\w+\.(net | com | edu)
```

전화번호는 다음과 같은 형식으로 될 수 있다.

- (010)2169-2142
- 010.2169.2142
- 010-2169-2142

```regex
\(? \d{3} [-.)] \d{3} [-.] \d{4}
```

## CSS BEM

### Block. Element. Modifier CSS 아키텍쳐

CSS 요소들을 다음 세 가지로 구분하여

`Block` 👉 독립적인 의미가 있는 컴포넌트

`Element` 👉 독립적인 의미는 없고 Block 에 포함되는 요소들

`Modifier` 👉Block 혹은 Element 의 외관을 변화시키는 요소

이름을 정한다.

예를들어 아래와 같은 Card 가 있으면,

<div class = "card">
    <div class = "card__img"> </div>
    <div class = "card__description">
        <h2>captain teemo 👾</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
    </div>
</div>

Block 👉 카드 전체 class = "card"

Element 👉 카드 이미지 class = "card\_\_img"

Element 👉 카드 텍스트 class = "card\_\_description"

Modifier 👉 카드 텍스트 색 변경 class = "card\_\_description card\_\_description--active"

와 같은 형식으로 CSS 요소들의 역할에 따라 이름을 다르게 하여 CSS 클래스의 이름을 보고 어떤 역할인지 예측이 가능하게 한다.

<style>

.card {
    display : grid;
    grid-template-columns : 100%;
    grid-template-rows : 210px 210px 80px;
    grid-template-areas : "image" "text";
    width: 50%;
    border-radius : 18px;
    background: #1b1b1b;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
    align-items: center;
    text-align: center;
}
.card__img {
    grid-area : image;
    background: url("cardimg.png");
    width: 100%;
    height: 100%;
    border-radius: 18px;
    background-size: cover;
}
.card__description {
    grid-area : text;
    margin-top : 15%;
    padding: 5%;
}
</style>
