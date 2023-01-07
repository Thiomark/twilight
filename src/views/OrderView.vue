<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex flex-col pt-8 mx-auto container px-6">
            <div class="heart-shape"></div>
            <div class="flex items-center justify-between">
                <h1 class="mb-8 text-gray-600 font-semibold text-xl">Orders</h1>
            </div>
            <div class="space-y-3 mb-16">
                <OrderCardComponent v-for="order in getOrders" :key="order._id" :order="order"/>
            </div>
        </main>    
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import HeaderComponent from '../components/HeaderComponent.vue'
import OrderCardComponent from '../components/order/OrderCardComponent.vue'
    export default {
        name: 'Order',
        components: {
            HeaderComponent,
                OrderCardComponent
        },
        methods: {
            ...mapActions(['fetchMyOrders']),
        },
        computed: {
            ...mapGetters(['getOrders'])
        },
        created(){
            this.fetchMyOrders()
        }
    }
</script>

<style lang="scss" scoped>
    
</style>