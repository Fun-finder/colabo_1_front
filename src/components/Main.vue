<template>
    <div class="container">
        <div class="row content-height" >
            <div class="d-none left-list col-xl-3">
            </div>
            <div class="col-xl-9 right-content">

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Main",
        data() {
            return {
                content: "",
                itemList: []
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