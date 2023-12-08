import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dev: true,
  },
  mutations: {
    setDev: (state, val) => {
      state.dev = val;
    }
  },
  actions: {
    setDev: ({commit}, val) => {
      commit('setDev', val);
    },
  },
  getters: {
    mode: (state, getters) => {
      return state.dev ? 'development': 'production';
    }
  },
  modules: {

  }
})
