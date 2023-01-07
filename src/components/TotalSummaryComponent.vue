<template>
    <div style="background-color: #F3F3F3;" class="rounded-md p-8">
        <div>
            <h1 class="mb-6 font-bold text-2xl text-gray-600">{{title}}</h1>
            <div v-if="$route.path === '/checkout'" class="flex py-6 border-b border-t justify-between items-center">
                <p class="font-semibold text-md text-gray-800">Product</p>
                <p class="font-semibold text-md text-gray-700">Subtotal</p>
            </div>
            <div v-if="$route.path === '/checkout'" class="py-6">
                <ul class="space-y-3">
                    <li v-for="(item, index) in getCart()" :key="index" class="font-bold text-gray-700 flex items-center justify-between"><p class="capitalize">( {{item.name | shoten}} )<span class="pl-5">x {{item.qty}}</span></p> <span class="text-gray-600 font-medium">{{$store.state.helpers.currency}} {{item.price}}</span></li>
                </ul>
            </div>
            <div class="flex py-6 border-b border-t justify-between items-center">
                <p class="font-semibold text-md text-gray-800">Subtotal</p>
                <p class="text-md text-gray-700">{{$store.state.helpers.currency}} {{(getCart().reduce((acc, item) => acc + item.qty * item.price, 0)).toFixed(2)}}</p>
            </div>
            <div class="flex py-6 justify-between items-center">
                <p class="font-semibold text-md text-gray-800">Shipping</p>
                <p class="text-md text-gray-700">{{$store.state.helpers.currency}} {{getShipping()}}</p>
            </div>
            <div class="flex py-6 border-b border-t justify-between items-center">
                <p class="font-semibold text-md text-gray-800">Total</p>
                <p class="text-xl font-bold text-gray-700 ">{{$store.state.helpers.currency}} {{ (getCart().reduce((acc, item) => acc + item.qty * item.price, 0) + getShipping()).toFixed(2)}}</p>
            </div>
            <div v-if="$route.path !== '/cart'">
                <div class="py-6">
                    <label class="block text-gray-500 font-bold">
                        <span class="mr-2 text-sm">
                            Pay Pal or Credit Card
                        </span>
                        <input v-model="paymentMethod" type="radio" name="payment" value="paypal">
                    </label>
                    <label class="block text-gray-500 font-bold">
                        <span class="mr-2 text-sm">
                            Debit Card
                        </span>
                        <input v-model="paymentMethod" type="radio" name="payment" value="other">
                    </label>
                </div>
            </div>
            <div>
                <button @click="event" class="__to_checkout w-full px-10 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80">
                    {{submit}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'TotalSummary',
        props: {
            title: {
                type: String,
                required: true
            },
            submit: {
                required: true,
                type: String
            }
        },
        data() {
            return {
                paymentMethod: ''
            }
        },
        methods: {
            ...mapGetters(['getShipping', 'getCart']),
            event(){
                this.$emit('event', this.paymentMethod)
            }
        },
        filters: {
            shoten: function(desc){
                if(desc.length >= 30 ){
                    return desc.substring(0, 30) + '...'
                }
                return desc;
            },
            addDecimals: function(num){
                return (Math.round(num * 100) / 100).toFixed(2);
            }
        },
    }
</script>

<style lang="scss" scoped>

    @media only screen and (min-width: 740px){
        .__to_checkout {
            max-width: 400px
        }
    }
</style>