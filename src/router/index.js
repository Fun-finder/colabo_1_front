import {createRouter, createWebHistory} from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import Main from '../components/Main.vue';

const routes = [
    { path: '/', component : Home },
    { path: '/login', component : Login },
    { path: '/register', component : Register },
    { path: '/profile', component : Profile },
    { path: '/main', component : Main },
]

const router = createRouter({
    history : createWebHistory(),
    routes,
})

export {router};