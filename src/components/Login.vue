<template>
    <div class="mx-auto mt-5 col-xl-8">
        <div class="card">
            <div class="card-body">
                <h2>ID 로그인</h2>
                <Form class="form" @submit="handleLogin" :validation-scheme="scheme">
                    <div class="form-group">
                        <!-- <label for="username">아이디</label> -->
                        <Field
                            type="text"
                            class="form-control"
                            name="username"
                            v-model="user.username" 
                            placeholder="아이디"
                        />
                        <ErrorMessage
                            class="alert alert-danger"
                            role="alert"
                            name="username"
                        />
                    </div>
                    <div class="form-group">
                        <!-- <label for="password">비밀번호</label> -->
                        <Field
                            type="password"
                            class="form-control"
                            name="password"
                            v-model="user.password"
                            placeholder="비밀번호"
                        />
                        <ErrorMessage
                            class="alert alert-danger"
                            role="alert"
                            name="username"
                        />
                    </div>
                    <div class="form-group">
                        <div class="alert alert-danger" role="alert" v-if="message">{{ message }}</div>
                    </div>
                    <input type="checkbox"><span>로그인 상태 유지</span>
                    <div class="form-group py-3">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                            <span>로그인</span>
                        </button>
                    </div>
                </Form>
                <div class="forLogin">
                    <a @click="goToPage('pw')">비밀번호 찾기</a>
                    |
                    <a @click="goToPage('id')">아이디 찾기</a>
                    |
                    <a @click="goToPage('rg')">회원가입</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import User from '../models/user.js';
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
        methods: {
            handleLogin() {
                const user = {
                    loginId: this.user.username,
                    password: this.user.password
                };
                console.log("user:: ", user)
                this.$store.dispatch('auth/login', user)
                    .then(() => {
                        this.$router.push('/profile');
                    })
                    .catch(error => {
                        console.error('로그인 오류:', error);
                        this.message = '아이디 또는 비밀번호가 일치하지않습니다.'; 
                    });
            },
            goToPage(where) {
                if(where == 'pw') this.$router.push('/searchPw')
                if(where == 'id') this.$router.push('/searchId')
                if(where == 'rg') this.$router.push('/register')
            }
        }

    }
</script>
<style>
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

    .form {
        left: 25%;
        position: relative;
        width: 50%;

        .btn {
            width: 100%;
        }

        .alert alert-danger {
            color: red;
        }
    }

    .forLogin {
        position: relative;
        left: 30%;
    }
</style>