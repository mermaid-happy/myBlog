import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router.js'
import { timeToNow, transTab } from './filters.js';
import { fetchMsgCount } from './vuex/actions';
import { getToken } from './vuex/getters';
import store from './vuex/store';


Vue.filter('timeToNow', timeToNow);
Vue.filter('transTab', transTab);

Vue.use(VueRouter)
Vue.use(Vuex)
const router = new VueRouter({
	routes
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
