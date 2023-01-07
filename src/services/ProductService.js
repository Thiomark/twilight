import Api from './Api'

export default {
    get(keyword, pageNumber) {
        return Api().get(`products?keyword=${keyword}&pageNumber=${pageNumber}`);
    },
    getOne(id) {
        return Api().get(`products/${id}`);
    },
    getTop() {
        return Api().get(`products/top`);
    },
    // update(projectId, credentials) {
    //     return Api().patch(`projects/${projectId}`, credentials)
    // },
    // delete(projectId) {
    //     return Api().delete(`projects/${projectId}`)
    // }
}