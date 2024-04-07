import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //해당 폴더 안에 있는 index.js를 가져옴 (생략가능)
import store from './store'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import VeeValidate from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faHome, faUser, faUserPlus, faSigninAlt, faSignOutALt
} from '@fortawesome/free-solid-svg-icons'
//사용할 fontAwesome Icon 추가
library.add(faHome, faUser, faUserPlus, faSigninAlt, faSignOutALt);
//전역 설정
// Vue.config.productionTip = false;

const app = createApp({});
//사용할 라이브러리 추가 => 버전이 바뀌면서 없어진듯. use가 먹지 않음
// => Vue 객체에서 createApp 이후 app.use로 변경
app.use(BootstrapVue);
app.use(VeeValidate);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)
    .use(store)
    .component("App", App)
    .mount("#app");

//지울 것
//asset/main.css
//App.vue 코드
