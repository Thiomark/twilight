import Api from './Api'

export default {
    post(id, comment) {
        return Api().post(`/products/${id}/reviews`, comment);
    },
    delete(productID, reviewID){
        return Api().delete(`/products/${productID}/reviews/${reviewID}`);
    }
}