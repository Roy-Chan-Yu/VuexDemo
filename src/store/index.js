/* eslint-disable linebreak-style */
import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import productsModules from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    cart: {
      carts: [],
    },
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getCart(context) {
      context.commit('LOADING', true);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data);
        }
        context.commit('LOADING', false);
        console.log('取得購物車', response.data.data);
      });
    },
    addtoCart(context, { id, qty }) {
      console.log(context, id, qty);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const item = {
        product_id: id,
        qty,
      };
      // vm.$store.state.isLoading = true;
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
        console.log('加入購物車:', response);
      });
    },
    removeCart(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', false);
      axios.delete(url).then((response) => {
        context.commit('LOADING', false);
        // vm.getCart();
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    cart: state => state.cart,
  },
  modules: {
    productsModules,
  },
});
