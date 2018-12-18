import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Auth from '../components/Authorization'
import Registration from '../components/Registration'
import Feed from '../components/Feed'
import NotFound from '../components/NotFound'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/',
            name: 'feed',
            component: Feed
        },
        {
            path: '*',
            name: 'not-found',
            component: NotFound
        }
    ]
});

export default router;