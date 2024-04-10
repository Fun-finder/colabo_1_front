<template>
    <div class="col-md-12">
        <img 
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
        />
        <Form name="form" @submit.prevent="handleLogin" :validation-scheme="scheme">
            <div class="form-group">
                <label for="username">Username</label>
                <Field
                    type="text"
                    class="form-control"
                    name="username"
                    v-model="user.username"
                />
                <ErrorMessage
                    class="alert alert-danger"
                    role="alert"
                    name="username"
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <Field
                    type="password"
                    class="form-control"
                    name="password"
                    v-model="user.password"
                />
                <ErrorMessage
                    class="alert alert-danger"
                    role="alert"
                    name="username"
                />
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                    <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                    <span>Login</span>
                </button>
            </div>
            <div class="form-group">
                <div class="alert alert-danger" role="alert" v-if="message">{{ message }}</div>
            </div>
        </Form>
    </div>
</template>

<script>
    import User from '../models/User';
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import * as yup from 'yup';

    //validation
    const minNum = 6;
    const minValidMsg = `최소 ${minNum}자의 문자를 입력하세요.`;
    const maxNum = 20;
    const maxValidMsg = `최대 ${maxNum}자까지 입력할 수 있습니다.`;
    const emailScheme = yup.string()
        .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
        .required('이메일을 입력해주세요.');

    const formScheme = yup.object({
        username : yup.string().required().min(minNum,minValidMsg).max(maxNum, maxValidMsg),
        password : yup.string().required().min(minNum,minValidMsg).max(maxNum, maxValidMsg),
        email : emailScheme
    })

    export default {
        name: 'login',
        computed : {
            loggedIn(){
                return this.$store.state.auth.status.loggedIn;
            }
        },
        components : {
            Form, Field, ErrorMessage
        },
        data() {
            return {
                user : new User("", ""),
                loading : false,
                message : ""
            }
        },
        mounted () {
            if(this.loggedIn) {
                this.$router.push("/");
            }
        },
        computed : {
            scheme(){
                return formScheme;
            }
        },
        methods : {
            handleLogin(){
                this.loading = true;
                
                if(errorMessages == null || errorMessages.legnth == 0) {
                    this.loading = false;
                    return;
                }

                this.$store.dispatch('auth/login', this.user).then(
                    ()=>{
                        this.$router.push('profile');
                    },
                    error =>{
                        this.loading = false;
                        this.message = error.message
                    }
                )
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