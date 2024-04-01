import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';

Vue.use(Router);// Router에 useRouter로 변경된듯

export default new Router({
    mode: "history",
    routes : [
        {
            path: '/',
            component : Home
        },
        {
            path: '/login',
            component : Login
        },
        {
            path: '/register',
            component : Register
        },
        {
            path: '/profile',
            component : Profile
        }
    
    ]
})