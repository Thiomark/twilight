import OrderService from '../../services/OrderService'

const state = () => ({
    orderLoading: false,
    orders: []
    
})
  
const mutations = {
    SET_ORDERS: (state, payload) => {
        state.orders = payload
    },
    SET_CREATED_ORDER: (state, payload) => {
        state.orders = [payload]
    },
    SET_ORDER_LOADING: (state, payload) => {
        state.orderLoading = payload
    }
}

const actions = {

    async createOrder({commit}, payload){
        try {
            commit('SET_ORDER_LOADING', true);
            const response = await OrderService.post(payload);
            commit('SET_CREATED_ORDER', response.data)
            commit('SET_ORDER_LOADING', false);
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async fetchMyOrders({ commit }, id){
        try {
            commit('SET_ORDER_LOADING', true);
            const response = await OrderService.get();
            commit('SET_ORDERS', response.data)
            commit('SET_ORDER_LOADING', false);
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    }
}

const getters = {
    getOrderLoading: state => state.orderLoading,
    getOrders: state => state.orders

}

export default {
    state,
    getters,
    mutations,
    actions
};