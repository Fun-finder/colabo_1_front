<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark main-color-1 px-3">
      <div class="navbar-brand">
        <img src="/src/assets/just_logo.png" alt="logo image" class="logo">
      </div>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/" class="nav-link">
            <font-awesome-icon icon="home">Home</font-awesome-icon>
          </a>
        </li>
      </div>
      <div class="navbar-nav mr-auto" v-if="!currentUser">
        <li class="nav-item">
          <RouterLink to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus">Sign up</font-awesome-icon>
          </RouterLink>
        </li>
      </div>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt">LogIn</font-awesome-icon>
          </RouterLink>
        </li>
      </div>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/profile" class="nav-link">
            <font-awesome-icon icon="user">{{ currentUser.username }}</font-awesome-icon>
          </RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logOut">
            <font-awesome-icon icon="sign-out-alt">LogOut</font-awesome-icon>
          </a>
        </li>
        <li class="nav-item">
          <RouterLink to="/main" class="nav-link">
            <font-awesome-icon icon="user">메인페이지</font-awesome-icon>
          </RouterLink>
        </li>
      </div>
    </nav>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user
      }
    },
    methods :{
      logOut () {
        this.$store.dispatch('auth/logout');
        this.$router.push('/')
      }
    }
  }
</script>

<style>
.main-color-1 {
  background-color: #D6DAC8;
}
.main-bg {
  background-color: #EFBC9B;
}
.logo {
  height: 50px;
  padding: 0 auto;
}
</style>