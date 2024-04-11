<template>
    <div class="container">
        <div class="row content-height" >
            <div class="left-list col-xl-3">
                왼쪽
            </div>
            <div class="col-xl-9 right-content row">
                <Item v-for="item in itemList">
                </Item>
            </div>
        </div>
    </div>
</template>
<script>
import Item from './Article.vue';

export default {
    name: "Main",
    components : {
        Item
    },
    data() {
        return {
            content: "",
            itemList: [1,2,3,4,5]
        }
    },
    mounted(){

    }
}
</script>
<style scoped>
.left-list {
    border : 1px solid orange;
}
.right-content {
    border : 1px solid green;
}
.content-height {
    height: 80vh;
}

</style>