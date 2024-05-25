<template>
    <div class="container">
        <header class="jumbotron">
            <h3>user name : {{ content }}</h3>
            <h3>password : {{ content }}</h3>
        </header>
    </div>
</template>
<script>
    import AuthService from '../services/auth-service';
    
    export default {
        name : 'profile',
        data(){
            return {
                content: ''
            }
        },
        mounted() {
            this.fetchProfileData();
         },
         methods: {
            async fetchProfileData() {
            try {
                const data = await AuthService.getProfile();
                this.content = data;
            } catch (error) {
                this.error = error;
            }
            }
        }
    }
</script>