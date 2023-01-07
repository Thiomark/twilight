import ProductService from '../../services/ProductService'

const state = () => ({
    product: null,
    topProducts: [],
    pages: 0,
    page: 1,
    products: [],
    relatedProduct: [],
    shipping: 100,
    cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    liked: localStorage.getItem('likedItems') ? JSON.parse(localStorage.getItem('likedItems')) : [],
    productLoading: false
})
  
const mutations = {
    SET_PRODUCTS: (state, payload) => {
        state.products = payload.products;
        state.page = payload.page;
        state.pages = payload.pages;
    },
    SET_PRODUCT: (state, product) => {
        state.product = product
    },
    ADD_TO_CART: (state, newProduct) => {
        const newArray = state.cart.filter(product => product._id !== newProduct._id);
        if(newProduct.qty <= 0){
            state.cart = [{ ...newProduct, qty: 1 }, ...newArray]
            localStorage.setItem('cartItems', JSON.stringify([{ ...newProduct, qty: 1 }, ...newArray]));
        }else{
            state.cart = [newProduct, ...newArray]
            localStorage.setItem('cartItems', JSON.stringify([newProduct, ...newArray]));
        }
    },
    ADD_TO_LIKED: (state, newProduct) => {
        const newArray = state.liked.filter(product => product._id !== newProduct._id);
        state.liked = [newProduct, ...newArray]
        localStorage.setItem('likedItems', JSON.stringify([newProduct, ...newArray]));
    },
    REMOVE_FROM_CART: (state, SelectProduct) => {
        const newArray = state.cart.filter(product => product._id !== SelectProduct._id);
        state.cart = newArray;
        localStorage.setItem('cartItems', JSON.stringify(newArray));
    },
    REMOVE_FROM_LIKED: (state, SelectProduct) => {
        const newArray = state.liked.filter(product => product._id !== SelectProduct._id);
        state.liked = newArray;
        localStorage.setItem('likedItems', JSON.stringify(newArray));
    },
    SET_SELECTED: (state) => {
        state.product = null;
    },
    SET_PRODUCT_LOADING: (state, payload) => {
        state.productLoading = payload;
    },
    SET_RELATED_PRODUCTS(state){
        state.relatedProduct = state.products;
    },
    REMOVE_COMMENT(state, product){
        state.product = product;
    },
    SET_TOP_PRODUCTS(state, payload){
        state.topProducts = payload;
    }
}

const actions = {

    async fetchProduct({commit}, id){
        try {
            commit('SET_PRODUCT_LOADING', true);
            const response = await ProductService.getOne(id);
            commit('SET_PRODUCT', response.data)
            commit('SET_PRODUCT_LOADING', false);
        } catch (error) {}
    },
    async fetchProducts({commit}, { keyword = '', pageNumber = 1}){
        try {
            commit('SET_PRODUCT_LOADING', true);
            const response = await ProductService.get(keyword, pageNumber);
            commit('SET_PRODUCTS', response.data);
            commit('SET_PRODUCT_LOADING', false);
        } catch (error) {}
    },
    async fetchTopProducts({commit}){
        try {
            const response = await ProductService.getTop();
            commit('SET_TOP_PRODUCTS', response.data);
        } catch (error) {}
    }
}

const getters = {
    getProducts: state => state.products,
    getProduct: state => state.product,
    getCart: state => state.cart,
    getLiked: state => state.liked,
    getShipping: state => state.shipping,
    getProductLoading: state => state.productLoading,
    getRelatedProduct: state => state.relatedProduct,
    getTopProducts: state => state.topProducts
}

export default {
    state,
    getters,
    mutations,
    actions
};