<template>
    <div class="border rounded">
        <div v-if="!showMore" class="p-4 border-b flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-500">Delivered Fri, 27 Aug 2021</p>
            <div>
                <button @click="showMore = true" class="px-6 py-3 rounded-md font-semibold text-gray-600 hover:bg-gray-300 text-sm bg-gray-200">Order Details</button>
            </div>
        </div>
        <div v-if="showMore" class="p-4 border-b flex items-center justify-between">
            <p class="text-sm text-gray-500">
                <span class="font-bold">Order</span> {{order._id}} | 
                <span class="font-bold">Ordered</span> {{order.createdAt}} | 
                <span class="font-bold">Paid</span>
            </p>
            <button @click="showMore = false">
                <svg xmlns="http://www.w3.org/2000/svg" class=" fill-current text-gray-800" height="24px" viewBox="0 0 24 24" width="24px" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>
        </div>
        <div v-if="showMore" class="p-3 grid grid-cols-4 border-b">
            <div>
                <p class="text-sm text-gray-700 font-semibold capitalize pb-2">shipping address</p>
                <p class="text-sm text-gray-600" v-for="(field, index) in order.shippingAddress" :key="index">{{field}}</p>
            </div>
            <div class="flex flex-col justify-between">
                <div>
                    <p class="text-sm text-gray-700 font-semibold capitalize pb-2">Delivery Method</p>
                    <p class="text-sm text-gray-600">standard</p>
                </div>
                <div>
                    <p class="text-sm text-gray-700 font-semibold capitalize pb-2">Payment Method</p>
                    <p class="text-sm text-gray-600">{{order.paymentMethod}}</p>
                </div>
            </div>
            <div class="flex flex-col justify-between">
                <div>
                    <p class="text-sm text-gray-700 font-semibold capitalize pb-2">Order Summary</p>
                    <p class="text-sm text-gray-600">items {{order.orderItems.length}}</p>
                    <p class="text-sm text-gray-600">Shipping</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Order Total:</p>
                </div>
            </div>
            <div class="flex flex-col justify-between">
                <div>
                    <p class="text-sm text-gray-700 font-semibold capitalize pb-2">Order Summary</p>
                    <p class="text-sm text-gray-600">{{$store.state.helpers.currency}} {{order.itemsPrice}}</p>
                    <p class="text-sm text-gray-600">{{$store.state.helpers.currency}} {{order.shippingPrice}}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">{{$store.state.helpers.currency}} {{order.totalPrice}}</p>
                </div>
            </div>
        </div>
        <div v-if="!showMore" class="flex m-3 space-x-3">
            <div v-for="(image, index) of order.orderItems" :key="index" :style="{'background-image': 'url(' + image.image + ')'}" class="bg-cover bg-center h-20 w-20 border-dashed rounded-md shadow-sm"></div>
        </div>
        <div v-if="showMore" class="m-3 space-y-3">
            <div v-for="(product, index) of order.orderItems" :key="index" class="flex items-center space-x-8">
                <div :style="{'background-image': 'url(' + product.image + ')'}" class="bg-cover bg-center h-20 w-20 border-dashed rounded-md shadow-sm"></div>
                <div class="space-y-1">
                    <p class=" text-indigo-800 text-sm cursor-pointer hover:underline capitalize">{{ product.name }}</p>
                    <p class=" text-gray-400 font-semibold text-sm capitalize">qty: {{ product.qty }}</p>
                    <p class=" text-gray-800 font-semibold text-sm capitalize">{{$store.state.helpers.currency}} {{ product.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderCard',
        data() {
            return {
                showMore: false
            }
        },
        props: {
            order: {
                Type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>