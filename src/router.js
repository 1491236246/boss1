import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index/Index.vue'], resolve),
      children:[
        {
          path: 'home',
          name: 'home',
          component: resolve => require(['@/pages/homepage/Home.vue'], resolve)
        }
        ,{
          path: 'settings',
          name: 'settings',
          component: resolve => require(['@/pages/homepage/Settings.vue'], resolve)
        },
        {
          path: 'systeminfo',
          name: 'systeminfo',
          component: resolve => require(['@/pages/homepage/Systeminfo.vue'], resolve)
        },
        {
          path: 'loginIn',
          name: 'loginIn',
          component: resolve => require(['@/pages/homepage/LoginIn.vue'], resolve)
        },
        {
          path: 'list',
          name: 'list',
          component: resolve => require(['@/pages/goodsList/List.vue'], resolve)
        }
      ]
    }
  ]
})
