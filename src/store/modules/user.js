import AuthService from '../../services/AuthService'
import router from '../../router'

const state = () => ({
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loadingUser: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    redirect: null
})
  
const mutations = {
    REDIRECT: (state, payload) => {
        state.redirect = payload;
    },
    SET_USER: (state, payload) => {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('user', JSON.stringify(payload));
        state.isAuthenticated = true;
        state.user = payload
        state.token = payload.token
        if(router.currentRoute.path === '/auth' && !state.redirect){
            router.push({path: `/`});
        }else{
            router.push({path: `${state.redirect}`});
        }
        state.redirect = null;
    },
    AUTH_USER: (state, user) => {
        localStorage.setItem('user', JSON.stringify(user));
        state.isAuthenticated = true;
        state.user = user;
    },
    SET_LOADING_USER: (state, payload) => {
        state.loadingUser = payload
    },
    LOG_USER_OUT(state){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        if(router.currentRoute.path !== '/'){
            // router.push({path: `/`});
        }
    },
}

const actions = {

    async loginUser({commit}, credentials ){
        try {
            commit('SET_LOADING_USER', true);
            const response = await AuthService.login(credentials);
            commit('SET_USER', response.data);
            commit('SET_LOADING_USER', false);
        } catch (error) {
            commit('SET_LOADING_USER', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async registerUser({commit}, credentials){
        try{
            commit('SET_LOADING_USER', true);
            const response = await AuthService.create(credentials);
            commit('SET_USER', response.data);
            commit('SET_LOADING_USER', false);
        }catch(error){
            commit('SET_LOADING_USER', false);
            commit('LOG_USER_OUT')
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async fetchUser({commit}){
        try{
            commit('SET_LOADING_USER', true)
            const response = await AuthService.getUser();
            commit('AUTH_USER', response.data)
            commit('SET_LOADING_USER', false)
        }catch(error){
            commit('SET_LOADING_USER', false)
        }
    },
    async updateUser({commit}, payload){
        try {
            const response = await AuthService.update(payload);
            commit('SET_USER', response.data);
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    }
    
}

const getters = {
    getUser: state => state.user,
    getLoadingUser: state => state.loadingUser
}

export default {
    state,
    getters,
    mutations,
    actions
};