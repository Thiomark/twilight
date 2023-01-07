import Vue from 'vue'
import Vuex from 'vuex'
import helpers from './modules/helpers';
import user from './modules/user';
import product from './modules/product';
import review from './modules/review';
import order from './modules/order';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        helpers,
        user,
        product,
        review,
        order
    }
})
