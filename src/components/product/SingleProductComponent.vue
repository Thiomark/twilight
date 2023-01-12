<template>
    <div style="height: 28rem" @mouseover="hover = true" @mouseleave="hover = false" class="shadow-sm rounded-md cursor-pointer max-w-sm">
        <div @click.self="$router.push(`/product/${product._id}`)" class="w-full relative h-96 bg-gray-300 bg-center bg-cover" 
            :style="`background-image: url('${product.image}')`">
            <div class="absolute top-2 space-y-2 right-2">
                <div @click="REMOVE_FROM_LIKED(product)" v-if="isAvilable(product._id, 'liked')" class="h-7 w-7 rounded-full flex hover:shadow-md transition duration-400 ease-in-out items-center bg-gray-50 justify-center">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="#FF7F7F"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <button @click.prevent="ADD_TO_LIKED({...product, qty: 1})" v-else class="h-7 w-7 rounded-full hover:shadow-md transition duration-400 ease-in-out flex items-center bg-gray-50 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-800" height="22px" viewBox="0 0 24 24" width="22px" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                </button>
                <button @click.prevent="ADD_TO_CART({...product, qty: 1})" class="h-7 w-7 rounded-full flex md:hidden items-center bg-gray-50 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"/></svg>
                </button>
                <button style="display: none;" class="h-7 hover:shadow-md transition duration-400 ease-in-out w-10 rounded-full flex items-center bg-gray-50 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z"/></svg>
                </button>
            </div>
        </div>
        <div class="w-full h-16 dark:bg-gray-800">
            <div class="relative w-full h-full">
                <div @click.self="$router.push(`/product/${product._id}`)" class="absolute bg-white flex items-center justify-center z-10 w-full h-full">
                    <div class="justify-center px-10 space-x-2 w-full flex flex-col gap-1 items-center">
                        <div >
                            <h3 class="font-semibold text-xs text-center text-gray-700 uppercase dark:text-white">{{product.name}}</h3>
                        </div>
                        <!-- <span class="font-semibold text-xs text-center text-gray-700 uppercase dark:text-white"> - </span> -->
                        <h3 class="text-xs font-bold text-center text-gray-700 uppercase dark:text-white">R{{product.price}}</h3>
                    </div>
                </div>
                <div :style="hover && { 'transform': 'translateY(-4rem)'} " class="hidden md:flex h-16 ease-in-out duration-300 w-full items-center absolute justify-center px-1">
                    <button @click.self="ADD_TO_CART({...product, qty: 1})" class="bg-gray-800 text-sm rounded-sm font-semibold text-gray-50 w-full p-4">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'
    export default {
        name: 'SingleProduct',
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                hover: false
            }
        },
        computed: {
            ...mapGetters(['getLiked']),
        },
        methods: {
            ...mapMutations(['ADD_TO_CART', 'ADD_TO_LIKED', 'REMOVE_FROM_LIKED']),
            isAvilable(id, type){
                if(type === 'liked'){
                    return this.getLiked.find(x => x._id === id) ? true : false;
                }
            }
        }
    }
</script>