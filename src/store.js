import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexs:1
  },
  mutations: {
    increment (state,ind) {
      state.indexs=ind;
      console.log(state.indexs);
    },
    SET_USERINFO(state, userInfo){
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', userInfo);
    },
  },
  actions: {

  }
})
