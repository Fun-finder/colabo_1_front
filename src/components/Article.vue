<template>
    <div class="d-flex col-xl-3 col-lg-4 col-md-4">
        <div class="card my-2">
            <div role="item-header">
                <div class="float-start">O</div>
                <div class="float-start">{{ item.keyword }}</div>
            </div>
            <img class="item-img" :src="item.src" src="">
            <div role="item-body">
                <p>{{ item.content }}</p>
            </div>
            <div role="item-footer">{{ item.reg_dt }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['item']
}
</script>
<style>
.item-img {
    height: 150px;
    border: 1px solid aqua;
}
</style>