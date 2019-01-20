import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'  
import axios from './config/axios'
import ContentTop from '@/components/ContentTop.vue'

Vue.use(Element);  
Vue.component('ContentTop',ContentTop);
Vue.prototype.$http=axios;

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
   if (!localStorage.getItem('userInfo')){
    if (to.name == 'login') {
      next();
    }else {
      Message.error("登录过期");
      router.replace('/');
    }
  }else{
    next();
  }
});


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
