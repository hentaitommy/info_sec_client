import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userinfo: {},
  },
  mutations: {
    login (state) {
      state.isLogin = true;
    },
    logout (state) {
      state.isLogin = false;
    },
    setUser(state, info) {
      state.userinfo = info;
      console.log(state);
    }
  },
  actions: {
    async checkLogin(context) {
      let res = await fetch('/api/userinfo', { credentials: 'include' }).then(res => res.json());
      if (res.usertype) {
        context.commit('login');
        context.commit('setUser', res);
      } else {
        context.commit('logout');
        context.commit('setUser', {});
      }
      console.log(context.state);
    }
  }
})

export default store;