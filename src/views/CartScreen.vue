<template>
    <div class="__cart min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex flex-col">
            <EmptyCartComponent class="h-full flex-grow" v-if="getCart().length === 0"/>
            <div v-else>
                <div class="_review_your_product bg-cover bg-no-repeat bg-center flex items-center justify-center">
                    <p class="sha shadow text-gray-50 text-3xl font-bold">Review your shopping</p>
                </div>
                <div class="px-6 sm:mt-10 container mx-auto">
                    <div>
                        <CartItemsComponent :items="cartItems"/>
                        <div class="sm:container sm:mx-auto py-8">
                            <form @click.prevent="applyCoupon" class="flex sm:space-x-4 flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center">
                                <input type="text" placeholder="Coupon code"
                                class="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-200 outline-none focus:outline-none focus:ring" />
                                <button class="px-4 py-3 font-medium tracking-wide text-gray-600 text-xs capitalize transition-colors duration-200 transform bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                    Apply Coupon
                                </button>
                            </form>
                        </div>
                    </div>
                    <TotalSummaryComponent @event="proceedToCheckout" title="Cart" class="mb-20" submit="Proceed to checkout"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import CartItemsComponent from '../components/cart/CartItemsComponent.vue';
    import EmptyCartComponent from '../components/cart/EmptyCartComponent.vue';
    import TotalSummaryComponent from '../components/TotalSummaryComponent.vue';
    import HeaderComponent from '../components/HeaderComponent.vue'
    export default {
        name: 'Cart',
        components: {
                CartItemsComponent,
                TotalSummaryComponent,
                HeaderComponent,
                EmptyCartComponent
        },
        data() {
            return {
                headerItems: ['Image', 'Product', 'Price', 'Quantity', 'Subtotal'],
                cartItems: []
            }
        },
        methods: {
            ...mapGetters(['getCart']),
            ...mapMutations(['REDIRECT']),
            proceedToCheckout(){
                if(this.$store.state.helpers.authenticateBeforeCheckout && !this.$store.state.user.user){
                    this.REDIRECT('/checkout');
                    this.$router.push('/auth?redirect=checkout');
                } else this.$router.push('/checkout');
            },
            applyCoupon(){
              // ..  
            }
        },
        watch: {
            '$store.state.product.cart': function(){
                this.cartItems = this.getCart();
            }
        },
        created(){
            this.cartItems = this.getCart();
        }
    }
</script>

<style lang="scss" scoped>
    .__cart {
        ._review_your_product {
            height: 20vh;
            background-image: url('https://images.pexels.com/photos/1682330/pexels-photo-1682330.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        }

        img {
            width: 100;
            max-height: 12em;
        }
    }

    @media only screen and (min-width: 640px){
        .__cart {
            img {
                max-width: 60px;
            }

            ._review_your_product {
                height: 25em;
            }
        }
    }

    @media only screen and (min-width: 740px){
        .__cart {
            .__to_checkout {
                max-width: 400px;
            }
        }
    }
</style>