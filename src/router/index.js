import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/view/login.vue'
import Main from '@/view/main.vue'
import * as Util  from '@/libs/util.js' 
import http from '@/libs/http.js'
import store from '@/store'
Vue.use(Router)

const router= new Router({
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
    },
    {
      path: '/public',
      name: 'Main',
      component: Main,
      children:[{
        name:"publicPage",
        path:'publicPage',
        component: () =>
          import ('@/view/publicPage.vue')
      }],
    }
  ]
})
router.beforeEach((to,from,next)=>{

  let token=Util.getToken()
   let data=store.state.account
  if(to.name ==='login'){
    next()
  }else{
    if(( to.name !=='login' && token)){
      next()
    }else{
   
      http.post({
        url:'/auth/login',
        data:data
      }).then(res=>{
        Util.setToken(res.token)
        next({
          name:to.name
        })
       
      })
    }
  }
})
export default router