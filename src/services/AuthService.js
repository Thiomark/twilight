import Api from './Api'

export default {
    login(credentials) {
        return Api().post('users/login', credentials);
    },
    getUser(){
        return Api().get('users/profile');
    },
    create(credentials){
        return Api().post('users/', credentials);
    },
    update(credentials){
        return Api().put('users/profile', credentials);
    }
}