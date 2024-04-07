import {createRouter, createMemoryHistory} from 'vue-router';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';

const routes = [
    { path: '/', component : Home },
    { path: '/login', component : Login },
    { path: '/register', component : Register },
    { path: '/profile', component : Profile }
]

const router = createRouter({
    history : createMemoryHistory,
    routes,
})

export default router;