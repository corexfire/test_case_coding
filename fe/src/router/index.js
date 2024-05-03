// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import DashboardView from '../components/DashboardView.vue';

const routes = [
    { path: '/login', component: LoginForm },
    { path: '/register', component: RegisterForm },
    { path: '/dashboard', component: DashboardView }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
