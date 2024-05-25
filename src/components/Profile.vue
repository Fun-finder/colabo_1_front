<template>
    <div class="container">
      <div class="input-group">
        <label for="loginId">ID:</label>
        <input type="text" id="loginId" :value="content.loginId" disabled>
      </div>
      <div class="input-group">
        <label for="password">PW:</label>
        <input type="password" id="password" :value="content.password" disabled>
      </div>
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.input-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

label {
  margin-right: 10px;
}
</style>