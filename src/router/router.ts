import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.page.vue'
import { authGuard } from './auth.guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
      // beforeEnter: authGuard
    },
    {
      path: '/workbench',
      name: 'workbench',
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "workbench" */ '../views/Workbench.page.vue'
        ),
      children: [
        {
          path: 'teacher',
          name: 'teacher',
          beforeEnter: authGuard,
          component: () =>
            import(
              /* webpackChunkName: "workbench-teacher" */ '../views/WorkbenchTeacher.page.vue'
            )
        },
        {
          path: 'school-run',
          name: 'school-run',
          beforeEnter: authGuard,
          component: () =>
            import(
              /* webpackChunkName: "workbench-school-run" */ '../views/WorkbenchSchoolRun.page.vue'
            )
        },
        {
          path: 'parents',
          name: 'parents',
          beforeEnter: authGuard,
          component: () =>
            import(
              /* webpackChunkName: "workbench-parents" */ '../views/WorkbenchParents.page.vue'
            )
        }
      ]
    },
    {
      path: '/my-classes',
      name: 'my-classes',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "my-classes" */ '../views/MyClasses.page.vue'
        )
    },
    {
      path: '/class-data',
      name: 'class-data',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "class-data" */ '../views/ClassData.page.vue'
        )
    },
    {
      path: '/student-grade-detail',
      name: 'student-grade-detail',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "student-grade-detail" */ '../views/StudentGradeDetail.page.vue'
        )
    },
    {
      path: '/my-archieve-for-student',
      name: 'my-archieve-for-student',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "my-archieve-for-student" */ '../views/MyArchiveForStudent.page.vue'
        )
    },
    {
      path: '/student-grade-detail-for-parents',
      name: 'student-grade-detail-for-parents',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "student-grade-detail-for-parents" */ '../views/StudentGradeDetailForParents.page.vue'
        )
    },
    {
      path: '/data-center',
      name: 'data-center',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "data-center" */ '../views/DataCenter.page.vue'
        )
    },
    {
      path: '/grade-input',
      name: 'grade-input',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "grade-input" */ '../views/GradeInput.page.vue'
        )
    },
    {
      path: '/grade-input-edit',
      name: 'grade-input-edit',
      props: route => ({ ...route.params, ...route.query }),
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "grade-input-edit" */ '../views/GradeInputEdit.page.vue'
        )
    },
    {
      path: '/explore',
      name: 'explore',
      beforeEnter: authGuard,
      component: () =>
        import(/* webpackChunkName: "explore" */ '../views/Explore.page.vue')
    },
    {
      path: '/account',
      beforeEnter: authGuard,
      children: [
        {
          path: 'my',
          name: 'my',
          beforeEnter: authGuard,
          component: () =>
            import(/* webpackChunkName: "my" */ '../views/My.page.vue')
        },
        {
          path: 'tourist',
          name: 'tourist',
          beforeEnter: authGuard,
          component: () =>
            import(
              /* webpackChunkName: "tourist" */ '../views/Tourist.page.vue'
            )
        }
      ],
      component: () =>
        import(/* webpackChunkName: "account" */ '../views/Account.page.vue')
    },
    {
      path: '/article/:id',
      name: 'article-detail',
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "article-detail" */ '../views/ArticleDetail.page.vue'
        ),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: '/create-article',
      name: 'create-article',
      component: () =>
        import(
          /* webpackChunkName: "create-article" */ '../views/CreateArticle.page.vue'
        ),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: '/convert-article-guide',
      name: 'convert-article-guide',
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "convert-article-guide" */ '../views/ConvertArticleGuide.page.vue'
        ),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: '/convert-article',
      name: 'convert-article',
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "convert-article" */ '../views/ConvertArticle.page.vue'
        ),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: '/binding',
      name: 'binding',
      component: () =>
        import(/* webpackChunkName: "binding" */ '../views/Binding.page.vue'),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "user-settings" */ '../views/UserSettings.page.vue'
        ),
      props: route => ({ ...route.params, ...route.query })
    }
  ]
})
