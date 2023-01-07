<template>
    <div>
        <h1 class="text-gray-800 font-bold text-3xl capitalize">{{getProduct.name}}</h1>
        <div class="flex items-center py-5">
            <StarsComponent :rating="getProduct.rating"/>
            <p @click="$emit('reviews')" class="text-xs cursor-pointer hover:underline font-medium text-gray-500 hover:text-gray-700 ml-3">({{getProduct.numReviews}} customer reviews)</p>
        </div>
        <h1 class="font-bold text-2xl text-gray-800">{{$store.state.helpers.currency}} {{getProduct.price}}</h1>
        <p class="text-gray-500 text-md font-normal pt-4">{{getProduct.description}}</p>
        <div class="py-6 flex items-center space-x-2">
            <input type="number" class="outline-none focus:outline-none text-center w-24 h-12 text-gray-500 text-sm border rounded-sm p-2 border-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center " name="custom-input-number" v-model="qty" >
            <button @click="ADD_TO_CART({...getProduct, qty})" style="background-color: #303133;" class="transition duration-300 ease-in-out h-12 border-transparent text-white hover:bg-transparent text-sm font-semibold hover:text-gray-300 py-3 px-7 border hover:border-gray-700 ">
            Add to cart
            </button>
        </div>
        <div class="flex items-center space-x-3">
            <svg v-if="isAvilable(getProduct._id, 'liked')" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FF7F7F"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <svg v-if="!isAvilable(getProduct._id, 'liked')" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            <p v-if="!isAvilable(getProduct._id, 'liked')" @click="ADD_TO_LIKED({...getProduct, qty: 1})" class="text-gray-600 hover:text-gray-800 cursor-pointer hover:underline">Add to Wishlist</p>
            <p v-if="isAvilable(getProduct._id, 'liked')" class="text-gray-600 hover:text-gray-800 capitalize">Added to wishlist</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 2fr;" class="space-x-2 my-6 mb-0 py-5 border-t">
            <div class="space-y-1">
                <p class="font-medium text-gray-800 text-sm">SKU</p>
                <p class="font-medium text-gray-800 text-sm">Categories</p>
                <p v-if="getProduct.tags[0]" class="font-medium text-gray-800 text-sm">Tags</p>
            </div>
            <div class="space-y-1">
                <p class="text-gray-500 text-sm">0567890</p>
                <p class="text-gray-500 capitalize text-sm">{{getProduct.category.toString().replace(',', ', ')}}</p>
                <p v-if="getProduct.tags[0]" class="text-gray-500 capitalize text-sm">{{getProduct.tags.toString().replace(',', ', ')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import StarsComponent from './reviews/StarsComponent.vue'
    export default {
        name: 'Information',
        components: {
            StarsComponent
        },
        computed: {
            ...mapGetters(['getProduct', 'getCart', 'getLiked']),
        },
        data() {
            return {
                qty: 1
            }
        },
        methods: {
            ...mapMutations(['ADD_TO_CART', 'ADD_TO_LIKED']),
            scrollMeTo() {
                this.$emit('scrollmeto')
            },
            isAvilable(id, type){
                if(type === 'liked'){
                    return this.getLiked.find(x => x._id === id) ? true : false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>