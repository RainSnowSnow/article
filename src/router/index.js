import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/view/login.vue'
import Main from '@/view/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: UserLogin,

    },
     {
      path: '/article',
      name: 'Main',
      component: Main,
      children:[{
        name:"articlePage",
        path:'articlePage',
        component: () =>
          import ('@/view/article.vue')
      },
]
    },
    {
      path: '/profession',
      name: 'Main',
      component: Main,
      children:[{
        name:"export",
        path:'export',
        component: () =>
          import ('@/view/profession.vue')
      }],
    },
    {
      path: '/shenhe',
      name: 'Main',
      component: Main,
      children:[{
        name:"shenhe",
        path:'shenhe',
        component: () =>
          import ('@/view/shenheArticle.vue')
      }],
    }
  ]
})
