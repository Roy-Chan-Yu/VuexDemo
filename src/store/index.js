/* eslint-disable linebreak-style */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
});
