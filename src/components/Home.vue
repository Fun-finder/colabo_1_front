<template>
    <div class="container mt-5 card">
        <div class="col-xl-8 mx-auto text-center p-4">
            <img class="mb-3 mx-auto" src="/src/assets/logo_no_background.png"/>
            <header class="title">
                <h3>메모리 퍼즐</h3>
            </header>
            <p class="card-body">
                {{ content }}
            </p>
            <footer class="pb-4">
                <div class="btn btn-secondary mr-1">
                    <RouterLink to="/login" class="nav-link">
                        로그인
                    </RouterLink>
                </div>
                <div class="btn btn-primary ml-1">
                    <RouterLink to="/register" class="nav-link">
                        회원가입
                    </RouterLink>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Home",
        data() {
            return {
                content: "소중한 나의 인생의 하루하루를 기록할 수 있는 일기 앱입니다."
            }
        },
        mounted(){
            
        }
    }
</script>
<style>

.test-img {
    border: 1px solid #222;
    height: 250px;   
}
.mr-1 {
    margin-right: 0.25rem;
}
.ml-1 {
    margin-left: 0.25rem;
}
div{
    /* border: 1px solid orange; */
}
</style>