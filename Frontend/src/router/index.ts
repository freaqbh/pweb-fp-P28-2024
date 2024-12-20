import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import crowdfund from '../views/crowdfund.vue';
import test from '../views/test.vue';


const routes: Array<RouteRecordRaw> = [
    {path: '/crowdfund', component: crowdfund},
    {path: '/crowdfund/test', component: test}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
