import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null
    },
    mutations: {
        AUTH_USER(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
        },
        STORE_USER(state, userData) {
            state.user = userData;
        }
    },
    actions: {
        signUp({ commit, dispatch }, authData) {
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
                    });
                    dispatch('storeUser', authData);
                })
                .catch(error => console.log(error));
        },
        logIn({ commit, dispatch }, authData) {
            axios
                .post(
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDAQriC5BLiECFfVYA3egkT3TGSJ0Y-SM8',
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
                    });
                    dispatch('storeUser', authData);
                })
                .catch(error => console.log(error));
        },
        storeUser({ commit }, userData) {
            axios
                .get(
                    'https://authentication-6e029.firebaseio.com/users.json',
                    userData
                )
                .then(res => {
                    console.log(res);
                })
                .catch(error => console.log(error));
        },
        fetchUuser({ commit }) {
            axios
                .get('https://authentication-6e029.firebaseio.com/users.json')
                .then(res => {
                    const data = res.data;
                    const users = [];
                    for (const key in data) {
                        const user = data[key];
                        user.id = key;
                        users.push(user);
                    }
                    console.log(users);
                })
                .catch(error => console.log(error));
        }
    },
    getters: {}
});
