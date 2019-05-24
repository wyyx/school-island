import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/workbench',
      name: 'workbench',
      children: [
        {
          path: 'teacher',
          name: 'teacher',
          component: () =>
            import(
              /* webpackChunkName: "workbench-teacher" */ '../views/WorkbenchTeacher.page.vue'
            )
        },
        {
          path: 'school-run',
          name: 'school-run',
          component: () =>
            import(
              /* webpackChunkName: "workbench-school-run" */ '../views/WorkbenchSchoolRun.page.vue'
            )
        }
      ],
      component: () =>
        import(
          /* webpackChunkName: "workbench" */ '../views/Workbench.page.vue'
        )
    },
    {
      path: '/explore',
      name: 'explore',
      component: () =>
        import(/* webpackChunkName: "explore" */ '../views/Explore.page.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () =>
        import(/* webpackChunkName: "my" */ '../views/My.page.vue')
    },
    {
      path: '/article/:id',
      name: 'article-detail',
      component: () =>
        import(
          /* webpackChunkName: "article-detail" */ '../views/ArticleDetail.page.vue'
        ),
      props: true
    },
    {
      path: '/create-article',
      name: 'create-article',
      component: () =>
        import(
          /* webpackChunkName: "create-article" */ '../views/CreateArticle.page.vue'
        ),
      props: true
    },
    {
      path: '/convert-article-guide',
      name: 'convert-article-guide',
      component: () =>
        import(
          /* webpackChunkName: "convert-article-guide" */ '../views/ConvertArticleGuide.page.vue'
        ),
      props: true
    },
    {
      path: '/convert-article',
      name: 'convert-article',
      component: () =>
        import(
          /* webpackChunkName: "convert-article" */ '../views/ConvertArticle.page.vue'
        ),
      props: true
    }
  ]
})
