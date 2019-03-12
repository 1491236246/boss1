import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui' 
import { Message } from 'element-ui' 
import axios from './config/axios'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import ContentTop from '@/components/ContentTop.vue'

Vue.use(Element);  
Vue.use(VueQuillEditor);
Vue.component('ContentTop',ContentTop);
Vue.prototype.$http=axios;

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  console.log(to);
  store.commit('changeValue', to.path);
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

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if(isChunkLoadFailed){
      router.replace(targetPath);
  }
})


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
