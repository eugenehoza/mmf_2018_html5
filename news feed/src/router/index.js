import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Auth from '../components/Authorization'
import Registration from '../components/Registration'
import Feed from '../components/Feed'

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
            path: '/feed',
            name: 'feed',
            component: Feed
        }
    ]
});

export default router;