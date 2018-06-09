import Vue from 'vue'
import Vuex from 'vuex'
import teams from './modules/teams.js'
import works from './modules/works.js'
import libs from './modules/libs.js'
import commits from './modules/commits.js'
import infos from './modules/infos.js'


Vue.use(Vuex);

const state = {
    hasLogin: false,
    username: '',
    userId: ''
};
const actions = {};
const mutations = {
    setHasLogin(state, hasLogin) {
        state.hasLogin = hasLogin;
    },
    setUsername(state, username) {
        state.username = username;
    },
    setUserId(state, userId) {
        state.userId = userId;
    }
};
export default new Vuex.Store({
    modules: {
        teams,
        works,
        libs,
        commits,
        infos
    },
    state,
    actions,
    mutations
})
