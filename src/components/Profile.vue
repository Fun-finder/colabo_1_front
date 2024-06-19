<template>
  <div class="mx-auto mt-5 col-xl-8">
      <div class="card">
          <div class="card-body">
              <Form class="form" @submit="handleProfile" :validation-scheme="scheme">
                  <div class="form-group">
                    <table>
                      <tr>
                        <td>프로필사진</td>
                        <td><button>사진변경</button><button>삭제</button></td>
                      </tr>
                      <tr>
                        <td>닉네임</td>
                        <td><input type="text" :value="content.nickname"></td>
                      </tr>
                      <tr>
                        <td>아이디</td>
                        <td><input type="text" :value="content.loginId"></td>
                      </tr>
                        <td>이메일</td>
                        <td><input type="text" :value="content.email"></td>
                      <tr>
                        <td>비밀번호</td>
                        <td><input type="text"><button type="button" @click="this.onPopup = true">변경</button></td>
                      </tr>
                    </table>
                    <button>저장</button>
                  </div>
              </Form>
          </div>
      </div>
      <changePw v-if="this.onPopup" @offPopup="this.onPopup = false;"></changePw>
  </div>
</template>
<script>
    import AuthService from '../services/auth-service';
    import changePw from './changePw.vue'
    export default {
        name : 'profile',
        data(){
            return {
                content: '',
                onPopup: false,
            }
        },
        components:{
          changePw
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