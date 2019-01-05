import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import router from './router'
import store from './store'

// axios.defaults.baseURL = 'https://authentication-6e029.firebaseio.com'
// axios.defaults.headers.common['Authorization'] = "auth";

// axios.interceptors.request.use(config =>{
//   console.log(config);
//   return config;
// })
// axios.interceptors.response.use(res => {
//   console.log(res);
//   return res;
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
