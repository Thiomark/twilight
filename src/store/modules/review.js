import ReviewService from '../../services/ReviewService'
import router from '../../router'

const state = () => ({
    reviews: null,
    loading: false
})
  
const mutations = {
    ADD_REVIEW: (state, review) => {
        state.reviews = review;
    },
    SET_REVIEW_LOADING: (state, payload) => {
        state.loading = payload;
    }
}

const actions = {
    async rateProduct({commit}, comment){
        try {
            commit('SET_REVIEW_LOADING', true);
            const response = await ReviewService.post(comment.id, { comment: comment.comment, rating: comment.rating });
            commit('SET_PRODUCT', response.data)
            commit('SET_REVIEW_LOADING', false);
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async deleteReview({commit}, payload){
        try {
            const product = await ReviewService.delete(payload.productID, payload.reviewID);
            commit('REMOVE_COMMENT', product.data)
            commit('SET_ALERT', {
                heading: 'success',
                message: 'Review Deleted!'
            });
        } catch (error) {
            ccommit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    }
}

const getters = {
    getReviews: state => state.reviews,
    getReviewLoading: state => state.loading,
}

export default {
    state,
    getters,
    mutations,
    actions
};