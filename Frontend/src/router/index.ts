import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import userDashboard from '../views/user_dashboard.vue';
import test from '../views/test.vue';


const routes: Array<RouteRecordRaw> = [
    {path: '/user_dashboard', component: userDashboard},
    {path: '/user_dashboard/test', component: test}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
