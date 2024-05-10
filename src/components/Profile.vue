<template>
    <div class="container">
        <header class="jumbotron">
            <h3>user name : {{ content.username }}</h3>
            <h3>email : {{ content.emain }}</h3>
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
        mounted(){
            AuthService.getUserContent().then(
                response => {
                    this.content = response;
                },
                error => {
                    this.content = error.response.data.message;
                }
            )
        }
    }
</script>