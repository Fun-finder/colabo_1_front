<template>
    <div class="mx-auto mt-5 col-xl-8">
        <div class="card">
            <div class="card-body">
                <h2>비밀번호 찾기</h2>
                <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
                <Form class="form" @submit="handleSearch" :validation-scheme="scheme">
                    <div class="form-group">
                        <span>아이디</span>
                        <Field
                            type="text"
                            class="form-control"
                            name="name"
                            v-model="email.name" 
                        />
                        <ErrorMessage
                            class="alert alert-danger"
                            role="alert"
                            name="name"
                        />
                    </div>
                    <div class="form-group">
                        <span>이메일 주소</span>
                        <Field
                            type="text"
                            class="form-control"
                            name="email"
                            v-model="email.email" 
                        />
                        <ErrorMessage
                            class="alert alert-danger"
                            role="alert"
                            name="email"
                        />
                        <input type="button" value="인증번호 받기" @click="getVerificationNumber">
                    </div>
                    <div class="form-group">
                        <Field
                            type="text"
                            class="form-control"
                            name="verification"
                            v-model="email.verification" 
                            placeholder="인증번호 6자리 숫자 입력"
                        />
                    </div>
                    <div class="form-group py-3">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                            <span>다음</span>
                        </button>                    
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import Email from '../models/email.js';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// validation
const maxNum = 6;
const maxValidMsg = `인증번호는 ${maxNum}자입니다.`;
const emailScheme = yup.string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
    .required('이메일을 입력해주세요.');

const formScheme = yup.object({
    name: yup.string().required('이름을 입력해주세요.'),
    email: emailScheme
});

export default {
    name: 'searchPw',
    components: {
        Form, Field, ErrorMessage
    },
    data() {
        return {
            email: new Email("", "", ""),
            loading: false,
            message: ""
        }
    },
    computed: {
        scheme() {
            return formScheme;
        }
    },
    methods: {
        getVerificationNumber() {
            if (!this.email.name) {
                alert('이름을 입력해주세요.');
                return;
            }
            if (!this.email.email) {
                alert('이메일을 입력해주세요.');
                return;
            }
            const email = {
                name: this.email.name,
                email: this.email.email,
            };
            // 이메일 인증번호 발송 로직 추가
            this.$store.dispatch('search/sendVerificationCode', email)
                .then(() => {
                    alert('인증번호가 발송되었습니다.');
                })
                .catch(error => {
                    console.error('인증번호 발송 오류:', error);
                    alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
                });
        },
        handleSearch() {
            if (!this.email.verification) {
                alert('인증번호를 입력해주세요.')
            }
            const email = {
                name: this.email.name,
                email: this.email.email,
                verification: this.email.verification
            };

            console.log("email:: ", email);
            this.loading = true;
            this.$store.dispatch('search/pw', email)
                .then(() => {
                    this.$router.push('/showPw');
                })
                .catch(error => {
                    console.error('인증 오류:', error);
                    this.message = '인증번호가 일치하지 않습니다.';
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
p {
    font-size: 13px;
    color: gray;
}

span {
    display: block;
    /* width: 30px; */
}

input[type=text] {
    width: 100%;
}
</style>
