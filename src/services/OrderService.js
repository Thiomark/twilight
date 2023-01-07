import Api from './Api'

export default {
    get() {
        return Api().get(`orders/myorders/`);
    },
    post(payload) {
        return Api().post(`orders/`, payload);
    },
}