<template>
    <div class="mx-auto mt-5 col-xl-8">
        <div class="card">
            <div class="card-body">
                <h2>아이디 찾기</h2>
                <p>본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다.</p>
                <Form class="form" @submit="handleSearch" :validation-scheme="scheme">
                    <div class="form-group">
                        <span>이름</span>
                        <Field
                            type="text"
                            class="form-control"
                            name="name"
                            v-model="email.name" 
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
                        <input type="button" value="인증번호 받기">
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

    //validation
    const maxNum = 6;
    const maxValidMsg = `인증번호는 ${maxNum}자입니다.`;
    const emailScheme = yup.string()
        .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
        .required('이메일을 입력해주세요.');

    const formScheme = yup.object({
        username : yup.string().required().max(maxNum, maxValidMsg),
        email : emailScheme
    })

    export default {
        name: 'searchId',
        computed : {
            // loggedIn(){
            //     return this.$store.state.auth.status.loggedIn;
            // }
        },
        components : {
            Form, Field, ErrorMessage
        },
        data() {
            return {
                email : new Email("", "", ""),
                loading : false,
                message : ""
            }
        },
        mounted () {
            // if(this.loggedIn) {
            //     this.$router.push("/");
            // }
        },
        computed : {
            scheme(){
                return formScheme;
            }
        },
        methods: {
            handleSearch() {
                const email = {
                    name: this.email.name,
                    email: this.email.email,
                    verification: this.email.verification
                };
                console.log("email:: ", email)
                this.$store.dispatch('search/id', email)
                    .then(() => {
                        this.$router.push('/showId');
                    })
                    .catch(error => {
                        console.error('인증 오류:', error);
                        this.message = '인증번호가 일치하지않습니다.'; 
                    });
            },
        }

    }


</script>
<style scroped>
p {
    font-size: 13px;
    color: gray;
}

span {
    width: 30px;
}

input[type=text] {
    width: 100%;
}
</style>