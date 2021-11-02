<h1> 저의 블로그를 소개합니다 😇 </h1>

<div class = "guide-body">
    <div class = "container">
        <div class = "card">
            <div class = "imgBox">
                <a href = "https://jeongshin.github.io/JeongShin_Blog/TIL/">
                    <img src ="./img/card-img1.jpg">
                </a>
            </div>
            <div class = "content">
                <h2>Today I Learned 🙇🏻‍♂️</h2>
                <h4>오늘 공부한 내용을 정리 & 요약 합니다</h4>
            </div>
        </div>
        <div class = "card">
            <div class = "imgBox">
                <a href = "https://jeongshin.github.io/JeongShin_Blog/algorithms/">
                    <img src ="./img/card-img2.jpg">
                </a>
            </div>
            <div class = "content">
                <h2>Algorithms 💻</h2>
                <h4>풀었던 알고리즘 문제들 중 어려웠거나<br>유용한 문제들을 정리 합니다</h4>
            </div>
        </div>
        <div class = "card">
            <div class = "imgBox">
                <a href = "https://jeongshin.github.io/JeongShin_Blog/book-review/">
                    <img src ="./img/card-img3.jpg">
                </a>
            </div>
            <div class = "content">
                <h2>Book-Review 📚</h2>
                <h4>한달에 최소 1권씩 책을 읽고 책을 리뷰 합니다</h4>
            </div>
        </div>
        <div class = "card">
            <div class = "imgBox">
                <a href = "https://jeongshin.github.io/JeongShin_Blog/daily/">
                    <img src ="./img/card-img4.jpg">
                </a>
            </div>
            <div class = "content">
                <h2>Daily 🌄</h2>
                <h4>매달 공부한 내용을 되돌아 보고<br>저의 일상을 리뷰 합니다</h4>
            </div>
        </div>
    </div>

</div>

<style>
.guide-body {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    position: relative;
    width: 1100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px; 
}

.container .card {
    position: relative;
    height: 300px;
    width: 500px;
    margin: 10px 10px;
    background: #1d1d1d;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 20px rgba(0,0,0,0.5);
    transition: 0.3s ease-in-out;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 50px;
}

.container .card:hover {
    height: 100%;
}

.container .card .imgBox {
    position: relative;
    width: 100%;
    height: 100%;
    top: -30px;
    z-index: 1;
    /* box-shadow: 0 5px 20px rgba(0,0,0,0.2); */
    padding-bottom: 10px;
}
.container .card .imgBox a img{
    max-width: 100%;
    border-radius: 10px;
}
.container .card .content{
    position: relative;
    margin-top: -140px;
    padding: 10px 15px; 
    text-align: center;
    visibility: hidden;
    opacity: 0;
    transition: 0.5s ease-in-out;
}
.container .card:hover .content{
    visibility: visible;
    opacity: 1;
    margin-top: -40px;
    transition-delay: 0.2s;
}
</style>
