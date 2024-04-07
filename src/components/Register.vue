<template>
    <div class="col-md-12">
        <img 
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card" 
        />
        <Form name="form" @sublit.prevent="handleRegister" :validation-scheme="scheme">
            <div v-if="!successful">
                <div class="form-group">
                    <label for="username">Username</label>
                    <Field
                        class="form-control"
                        name="username"
                        placeholder="username"
                        v-mode="user.username"
                    />
                    <ErrorMessage 
                        class="alert-danger"
                        name="email"
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <Field
                        name="email"
                        class="form-control"
                        v-mode="user.username"
                    />
                    <ErrorMessage 
                        class="alert-danger"
                        name="email"
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field
                        type="password"
                        class="form-control"
                        name="password"
                        v-mode="user.username"
                    />
                    <ErrorMessage 
                        class="alert-danger"
                        name="password"
                    />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Sign Up</button>
                </div>
            </div>
        </Form>
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
    import User from '../models/User'
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import * as yup from 'yup';

    //validation scheme
    const maxStringMsg = "최대 20자 이하로 입력해야합니다."
    const usernameScheme = yup.string().min(6, "최소 6자 이상 입력해야 합니다.").max(20, maxStringMsg);
    const passwordSchene = yup.string().max(20, maxStringMsg);
    const emailScheme = yup.string()
        .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
        .required('이메일을 입력해주세요.');

    const formScheme = yup.object({
        username : usernameScheme,
        password : passwordSchene,
        email : emailScheme
    })

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
            if(this.loggedIn){
                this.$router.push("/")
            }
        },
        computed : {
            scheme(){
                return formScheme;
            }
        },
        methods: {
            handleRegister(){
                this.message = "";
                this.submitted = true;
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
                    this.$router.push("/")
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
</style>../models/User