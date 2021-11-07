<div id = "aboutme">

<img src="../.vuepress/public/images/logo.jpg" alt="Profile" class="profile">

<h1 style = "font-family: 'Josefin Sans', sans-serif; text-shadow: 3px 3px 20px #000;"> Jeong Shin </h1>
</div>

    💁🏻‍♂️ 신정웅
    💖 웹, 프론트 엔드
    🏫 학력
        🇺🇸 몽고메리 아카데미 졸업
        🇰🇷 단국대학교 소프트웨어 학과 16학번 재학중

<style>
*{
    /* margin: 0;
    padding: 0; */
    box-sizing: border-box;
}
#aboutme{
    margin-top: 20%;
    text-align: center;
}
@keyframes animate
{
    0%
    {
        background-position: 0 0;
    }
    50%
    {
        background-position: 300% 0;
    }
    100%
    {
        background-position: 0 0;
    }
}
.profile {
    width: 300px;
    height: 300px;
    border-radius: 20%;
    background: linear-gradient(90deg, #515BD4, #8134AF, #dd2a7b, #feda77, #f58529,#feda77, #dd2a7b, #8134AF, #515BD4);
    background-size: 400%;
    transition: 0.5s;
    animation: animate 30s ease-in-out infinite;
    padding: 0.7rem;
    box-shadow: 10px 10px 10px 5px rgba(0,0,0,1);
}


</style>
