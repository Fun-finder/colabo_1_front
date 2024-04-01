<template>
    <div class="col-md-12">
        <img 
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card" 
        />
        <form name="form" @sublit.prevent="handleRegister">
            <div v-if="!successful">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        name="username"
                        v-mode="user.username"
                        v-validate="'requred|min:3|max:20'"
                    />
                    <div 
                        class="alert-danger"
                        v-if="submitted && error.has('username')"
                    >
                        {{ errirs.first('username') }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        v-mode="user.username"
                        v-validate="'requred|email|max:50'"
                    />
                    <div 
                        class="alert-danger"
                        v-if="submitted && error.has('email')"
                    >
                        {{ errirs.first('email') }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        name="password"
                        v-mode="user.username"
                        v-validate="'requred|min:6|max:40'"
                    />
                    <div 
                        class="alert-danger"
                        v-if="submitted && error.has('password')"
                    >
                        {{ errirs.first('password') }}
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Sign Up</button>
                </div>
            </div>
        </form>
        <div
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
            v-if="message"
        >
            {{ message }}
        </div>
    </div>
</template>

<script>
    import User from '../models/user'

    export default {
        name : 'register',
        computed :{
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        data(){
            return {
                user: new User("", ""),
                submitted : false,
                successful : false,
                message : ""
            }
        },
        mounted(){
            handleRegister(){
                this.message = "";
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if(valid){
                        this.$store.dispatch('auth/register', this.user).then(
                            data => {
                                this.message = data.message;
                                this.successful = true;
                            },
                            error => {
                                this.message = error.message;
                                this.successful = false;
                            }
                        ).then(
                            this.$router.push("/");
                        )
                    }
                })
            }
        }
    }
</script>

<style scoped>
    label{
        display: block;
        margin-top: 10px;
    }
    .card-container.card {
        max-width : 350px !important;
        padding: 40px;
    }
    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin : 50px auto 25px;
        border-radius: 2px;
        box-shadow : 0px 2px 2px rgba(0,0,0,0.3);
    }
    .profile-img-card {
        width : 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        border-radius: 50%;
    }
</style>