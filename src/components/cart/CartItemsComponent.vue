<template>
    <ul class="_cart sm:container space-y-6 sm:mx-auto sm:space-y-4">
        <li class="pt-4 sm:flex items-center border-b border-t hidden">
            <div class="item__area space-x-4 pb-4 w-full sm:pb-4 items-center space-y-4 sm:space-y-0 ">
                <div class="hidden col-span-2 sm:block">
                    
                </div>
                <div class="flex items-center justify-between sm:h-full">
                    <p class="text-gray-800 text-sm font-semibold">Product</p>
                </div>
                <div class="flex items-center justify-between sm:h-full">
                    <p class="text-gray-800 text-sm font-semibold">Price</p>
                </div>
                <div class="flex items-center justify-between sm:h-full">
                    <p class="text-gray-800 text-sm font-semibold">Quantity</p>
                </div>
                <div class="flex items-center justify-between sm:h-full sm:justify-end">
                    <p class="text-gray-800 text-sm font-semibold">Subtotal</p>
                </div>
            </div>
        </li>
        <li v-for="(item, index) in items" :key="index" class="sm:flex items-center border-b">
            <div class="_image relative py-8 sm:hidden flex items-center justify-center">
                <button v-if="$route.path === '/cart'" @click="REMOVE_FROM_CART(item)" class="border-none bg-transparent top-0 right-0 absolute">
                    ✕
                </button>
                <button v-if="$route.path === '/favourites'" @click="REMOVE_FROM_LIKED(item)" class="border-none bg-transparent top-0 right-0 absolute">
                    <span>✕</span>
                </button>
                <img :src="item.image" alt="" srcset="">
            </div>
            <div class="item__area pb-4 w-full sm:pb-4 items-center space-y-4 sm:space-x-4 sm:space-y-0 ">
                <div class="hidden sm:block">
                    <button v-if="$route.path === '/cart'" @click="REMOVE_FROM_CART(item)" class="border-none bg-transparent top-0 right-0 ">
                        <span>✕</span>
                    </button>
                    <button v-if="$route.path === '/favourites'" @click="REMOVE_FROM_LIKED(item)" class="border-none bg-transparent top-0 right-0 ">
                        <span>✕</span>
                    </button>
                </div>
                <div class="hidden sm:block __image_sqr" style="max-width: 5em;" :style="{'background-image': 'url(' + item.image + ')'}">
                    <!-- <img style="height: 10; width: 10em" :src="item.image" alt="" srcset=""> -->
                </div>
                <div class="flex items-center justify-between sm:h-full">
                    <p class="text-gray-600 text-sm sm:hidden">Product:</p>
                    <router-link :to="`/product/${item._id}`" class="text-gray-800 text-sm font-semibold capitalize underline">{{item.name}}</router-link>
                </div>
                <div class="flex items-center justify-between sm:h-full">
                    <p class="text-gray-600 text-sm sm:hidden">Price:</p>
                    <p class="text-gray-800 text-sm font-semibold">{{$store.state.helpers.currency}} {{item.price}}</p>
                </div>
                <div class="flex items-center justify-between sm:h-full">
                    <p class="text-gray-600 text-sm sm:hidden">Quantity:</p>
                    <input v-if="$route.path === '/cart'" @change="ADD_TO_CART({...item, qty: Number(item.qty)})" type="number" class="outline-none focus:outline-none text-center w-24 h-12 text-gray-500 text-sm border rounded-sm p-2 border-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center " name="custom-input-number" v-model="item.qty">
                    <input v-if="$route.path === '/favourites'" @change="ADD_TO_LIKED({...item, qty: Number(item.qty)})" type="number" class="outline-none focus:outline-none text-center w-24 h-12 text-gray-500 text-sm border rounded-sm p-2 border-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center " name="custom-input-number" v-model="item.qty">
                </div>
                <div class="sm:pl-8 flex items-center justify-between sm:justify-end sm:h-full" >
                    <p class="text-gray-600 text-sm sm:hidden">Subtotal:</p>
                    <p class="text-gray-800 text-sm font-semibold">{{$store.state.helpers.currency}} {{(item.price * item.qty).toFixed(2)}}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        name: 'CartItems',
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        methods: {
            ...mapMutations(['REMOVE_FROM_LIKED', 'REMOVE_FROM_CART', 'ADD_TO_CART', 'ADD_TO_LIKED']),
        }
    }
</script>

<style lang="scss" scoped>
    ._cart{
        img {
            width: 100;
            max-height: 12em;
        }
    }

    @media only screen and (min-width: 622px){
        .__cart{
            .item__area {
                display: grid;
                grid-template-columns: 50px 1fr 2fr 1fr 1fr 1fr;
            }
        }
    }

    @media only screen and (min-width: 1024px){
        ._cart{
            img {
                height: 90px;
            }
        }
    }
</style>