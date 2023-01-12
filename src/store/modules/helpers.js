const state = () => ({
    isMenuOpen: false,
    authenticateBeforeCheckout: true,
    hideScrollBar: false,
    alerts: [],
    currency: 'R',
    storeName: 'twilight'
})
  
const mutations = {
    TOGGLE_MENU(state, payload) {
        state.hideScrollBar = payload
        state.isMenuOpen = payload
    },
    SET_ALERT(state, alert){
        state.alerts.unshift(alert);
        setTimeout(() => {
            state.alerts.pop();
        }, 5000);
    }
}

const getters = {
    getIsMenuOpen: state => state.isMenuOpen,
    getAlerts: state => state.alerts
}

export default {
    state,
    getters,
    mutations
};