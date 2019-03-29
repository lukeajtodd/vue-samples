import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@VX/store';
import widget from '@H/widget';

import Landing from '@C/Landing';
import Lesson from '@C/Lesson';
import ErrorScreen from '@C/ErrorScreen';

const Search = () =>
    import(/* webpackChunkName: "search-bundle" */ '@C/search/Search');
const Quiz = () => import(/* webpackChunkName: "quiz-bundle" */ '@C/quiz/Quiz');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/landing',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/',
            name: 'Search',
            component: Search
        },
        {
            path: '/lesson/:id',
            name: 'Lesson',
            component: Lesson
        },
        {
            path: '/quiz/:id',
            name: 'Quiz',
            component: Quiz
        },
        {
            path: '/error',
            name: 'ErrorScreen',
            component: ErrorScreen
        }
    ]
});

router.beforeEach(async function(to, from, next) {
    if (to.name == 'ErrorScreen') {
        next();
    }

    if (!store.state.widget) {
        store.commit('widget', widget.load({ to, from, next }));

        if (store.getters.inApplication) return;
    }

    try {
        await store.dispatch('Auth/fetchToken', { to, from, next });
    } catch (err) {
        return store.dispatch('tokenError');
    }

    return store
        .dispatch('Auth/getUserProfile')
        .then(res => next())
        .catch(err => store.dispatch('tokenError'));
});

export default router;
