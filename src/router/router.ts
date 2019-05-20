import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: () =>
        import(/* webpackChunkName: "workbench" */ '../views/Workbench.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () =>
        import(/* webpackChunkName: "explore" */ '../views/Explore.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import(/* webpackChunkName: "my" */ '../views/My.vue')
    }
  ]
})
