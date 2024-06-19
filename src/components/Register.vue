<template>
    <div class="mx-auto mt-5 col-xl-8">
        <div class="card">
            <div class="card-body">
                <h2>회원가입</h2>
                <Form name="form" @submit="handleRegister" :validation-scheme="scheme">
                    <div class="form-group">
                        <Field type="text" class="form-control" name="username" v-model="user.username" placeholder="아이디" />
                    </div>
                    <div class="form-group">
                        <Field type="password" class="form-control" name="password" v-model="user.password" placeholder="비밀번호"/>
                    </div>
                    <div class="form-group">
                        <Field type="password" class="form-control" name="passwordChk" v-model="user.passwordChk" placeholder="비밀번호 확인"/>
                    </div>
                        <ErrorMessage name="username" v-slot="{ message }">
                            <div class="alert-danger">{{ message }}</div>
                        </ErrorMessage>
                        <ErrorMessage name="password" v-slot="{ message }">
                            <div class="alert-danger">{{ message }}</div>
                        </ErrorMessage>
                        <ErrorMessage name="passwordChk" v-slot="{ message }">
                            <div class="alert-danger">{{ message }}</div>
                        </ErrorMessage>
                    <div class="form-group">
                        <Field type="text" name="email" class="form-control" v-model="user.email" placeholder="[선택] 이메일"/>
                    </div>
                    <div class="form-group">
                        <Field type="text" name="nickname" class="form-control" v-model="user.nickname" placeholder="닉네임"/>
                    </div>
                    <ErrorMessage name="email" v-slot="{ message }">
                        <div class="alert-danger">{{ message }}</div>
                    </ErrorMessage>
                    <ErrorMessage name="nickname" v-slot="{ message }">
                        <div class="alert-danger">{{ message }}</div>
                    </ErrorMessage>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">회원가입</button>
                    </div>
                    <div class="alert" :class="successful ? 'alert-success' : 'alert-danger'" v-if="message">
                        {{ message }}
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../models/user.js';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// validation scheme
const maxStringMsg = "아이디: 최대 20자 이하로 입력해야합니다.";
const usernameScheme = yup.string().min(6, "아이디: 최소 6자 이상 입력해야 합니다.").max(20, maxStringMsg);
const passwordScheme = yup.string().max(20, maxStringMsg);
const emailScheme = yup.string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일: 형식에 맞지 않습니다.')
    .required('이메일: 이메일을 입력해주세요.');
const nicknameScheme = yup.string().required('닉네임: 필수정보입니다.');
const passwordChkScheme = yup.string()
    .oneOf([yup.ref('password'), null], '비밀번호: 비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인: 비밀번호 확인을 입력해주세요.');

const formScheme = yup.object({
    username: usernameScheme,
    password: passwordScheme,
    email: emailScheme,
    nickname: nicknameScheme,
    passwordChk: passwordChkScheme,
});

export default {
    name: 'register',
    components: {
        Form, Field, ErrorMessage
    },
    data() {
        return {
            user: new User("", "", "", "", ""),
            submitted: false,
            successful: false,
            message: ""
        };
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        scheme() {
            return formScheme;
        }
    },
    methods: {
        handleRegister() {
            this.message = "";
            this.submitted = true;
            this.$store.dispatch('auth/register', this.user)
                .then(
                    response => {
                        console.log('response', response)
                        this.message = response.Message;
                        this.successful = true;
                    },
                    error => {
                        console.log('error1::', error.Error)
                        this.message = error.Error;
                        this.successful = false;
                    }
                ).then(() => {
                    console.log('then')
                    if (this.successful) {
                        this.$router.push("/");
                    }
                }).catch(error => {
                    console.error('로그인 오류:', error);
                    this.message = error; 
                });
        }
    }
}
</script>

<style scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 50px auto 25px;
    border-radius: 2px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    border-radius: 50%;
}

.alert-danger {
    color: red;
}
</style>
