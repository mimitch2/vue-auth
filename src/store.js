import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {
    AUTH_USER(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    }
  },
  actions: {
    signUp({ commit }, authData) {
      axios
        .post(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDAQriC5BLiECFfVYA3egkT3TGSJ0Y-SM8',
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
          })
        })
        .catch(error => console.log(error));
    },
    logIn({ commit }, authData) {
      axios
        .post(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDAQriC5BLiECFfVYA3egkT3TGSJ0Y-SM8',
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }
  },
  getters: {}
});
