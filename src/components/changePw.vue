<template>
    <div class="container">
        <h1>비밀번호 변경</h1>
        <input placeholder="현재 비밀번호">
        <input placeholder="새 비밀번호">
        <input placeholder="새 비밀번호 확인">
        <button>확인</button>
        <button @click="goPage(false)">취소</button>
    </div>
</template>
<script>
export default {
    name: 'changePw',
    methods: {
        //      
        goPage(data) {
            if(data){

            }else {

            }
            this.$emit('offPopup');
        },
    }
}
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

}
</style>