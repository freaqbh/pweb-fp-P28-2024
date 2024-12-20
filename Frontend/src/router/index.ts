import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import crowdfund from '../views/crowdfund.vue';
import Login from '../views/login.vue';
import crowdfunddetail from '../views/crowdfund.detail.vue';
import Landing from '../views/landing.vue';
import news from '../views/news.vue';
import success from '../views/success.vue';

// Fungsi untuk memvalidasi token
function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload);
        const isExpired = payload.exp * 1000 < Date.now();
        return !isExpired;
    } catch (error) {
        return false;
    }
}

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Landing },  // Landing page route
    { path: '/news', component: news }, // Corrected path for News
    { path: '/login', component: Login },
    {
        path: '/crowdfund',
        component: crowdfund,
        beforeEnter: (_to, _from, next) => {
            const token = localStorage.getItem('token');
            if (isTokenValid(token)) {
                next(); // Token valid, izinkan akses
            } else {
                next('/login'); // Token tidak valid, arahkan ke login
            }
        },
    },
    { path: '/crowdfund/:id', component: crowdfunddetail },
    { path: '/crowdfund/thank-you/:id', component: success },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
