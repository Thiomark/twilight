<template>
    <section class="__reviews w-full px-6 py-4 mx-auto bg-white dark:bg-gray-800">  
        <div v-if="reviews.length > 0" class="container pb-4 border-b mb-8">
            <div v-for="(review, index) in reviews" :key="index" class="_reviewr py-4 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="gray"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                <div class="ml-4 space-y-1">
                    <StarsComponent class="-ml-1" :rating="review.rating"/>
                    <h1 class="tracking-tighter text-md font-medium text-gray-700 dark:text-white">{{review.name}}</h1>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{{review.createdAt}}</p>
                    <p class="tracking-tighter text-sm text-gray-500 dark:text-gray-400">{{review.comment}}</p>
                </div>
                <ButtonOpenComponent :review="review" />
            </div>
        </div>              
        <form  @submit.prevent="rate()" class="mt-0 container">
            <p class="mt-3 font-semibold mb-4 text-gray-600 dark:text-gray-400">Add Comment</p>
            <RateComponent @ratings="ratings"/>
            <div class="w-full mt-6">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Comment</label>
                <textarea v-model="comment" class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
            </div>
            <div class="flex lg:block justify-center mt-6">
                <button class="px-8 text-sm py-4 text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600">Comment</button>
            </div>
        </form>
    </section>
</template>

<script>
    import StarsComponent from './reviews/StarsComponent.vue'
    import RateComponent from './reviews/RateComponent.vue'
    import { mapActions, mapMutations } from 'vuex'
    import ButtonOpenComponent from './reviews/ButtonOpenComponent.vue'
    export default {
        name: 'Reviews',
        components: {
            StarsComponent,
            RateComponent,
            ButtonOpenComponent
        },
        props: {
            reviews: {
                type: Array
            }
        },
        data() {
            return {
                comment: '',
                rating: 0,
                openMenu: false
            }
        },
        methods: {
            ...mapActions(['rateProduct']),
            ...mapMutations(['SET_ALERT']),
            ratings(rate){
                this.rating = rate
            },
            rate(){
                if(!this.comment || this.rating === 0){ 
                    if(!this.comment){
                        this.SET_ALERT({
                            heading: 'error',
                            message: 'Rate the item!'
                        })
                    }
                    if(this.rating === 0){
                        this.SET_ALERT({
                            heading: 'error',
                            message: 'Write a review!'
                        })
                    }
                    return
                }
                if(!this.$store.state.user.user){
                    this.REDIRECT(`/product/${this.$route.params.id}`);
                    this.$router.push('/auth');
                } else this.rateProduct({id: this.$route.params.id, comment: this.comment, rating: this.rating})
            }
        }
    }
</script>

<style lang="scss" scoped>
    ._reviewr {
        display: grid;
        grid-template-columns: 50px 1fr 1.5rem;
    }
</style>