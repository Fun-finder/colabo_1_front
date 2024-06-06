import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import SearchId from '../components/SearchId.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import Main from '../components/Main.vue';
import AuthService from '../services/auth-service';

const routes = [
    { path: '/', component : Home },
    { path: '/login', component : Login },
    { path: '/searchId', component : SearchId },
    { path: '/register', component : Register },
    { path: '/profile', component : Profile, meta: { requiresAuth: true } }, // 인증이 필요한 페이지
    { path: '/main', component : Main, meta: { requiresAuth: true } },
]

const router = createRouter({
    history : createWebHistory(),
    routes,
})

// 네비게이션 가드 추가
router.beforeEach(async (to, from, next) => {
    const isLoggedIn = await AuthService.isLoggedIn();

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/');
    } else {
        next();
    }
});
export {router};