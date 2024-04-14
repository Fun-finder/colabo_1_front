<template>
    <div class="container">
        <div class="row content-height" >
            <div class="left-list col-xl-3">
                <ul>
                    <li v-for="item in itemList">
                        <div class="d-flex float-start" role="article keyword">{{item.keyword}}</div>
                        <div class="d-flex float-end" role="article register date">{{item.reg_dt}}</div>
                    </li>
                </ul>
            </div>
            <div class="col-xl-9 right-content row">
                <Item v-for="item in itemList" :item="item" :key="item.id">
                </Item>
            </div>
        </div>
    </div>
</template>
<script>
import Item from './Article.vue';

let itemList = [
    { id: 1 , src: "/src/assets/logo_no_background.png", reg_dt : "2024-04-11", emotion_cd : 1 , keyword: "좋은 날이었다.", content : "dfawfsfd adfjahw edf jwaef sdkjfa s"},
    { id: 2 , src: "/src/assets/logo_no_background.png", reg_dt : "2024-04-11", emotion_cd : 2 , keyword: "좋은 날이었다.", content : "dfawfsfd adfjahw edf jwaef sdkjfa s"},
    { id: 3 , src: "/src/assets/logo_no_background.png", reg_dt : "2024-04-11", emotion_cd : 3 , keyword: "좋은 날이었다.", content : "dfawfsfd adfjahw edf jwaef sdkjfa s"},
    { id: 4 , src: "/src/assets/logo_no_background.png", reg_dt : "2024-04-11", emotion_cd : 4 , keyword: "좋은 날이었다.", content : "dfawfsfd adfjahw edf jwaef sdkjfa s"},
    { id: 5 , src: "/src/assets/logo_no_background.png", reg_dt : "2024-04-11", emotion_cd : 5 , keyword: "좋은 날이었다.", content : "dfawfsfd adfjahw edf jwaef sdkjfa s"},
    { id: 6 , src: "/src/assets/logo_no_background.png", reg_dt : "2024-04-11", emotion_cd : 6 , keyword: "좋은 날이었다.", content : "dfawfsfd adfjahw edf jwaef sdkjfa s"}
]

export default {
    name: "Main",
    components : {
        Item
    },
    data() {
        return {
            content: "",
            itemList: itemList
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