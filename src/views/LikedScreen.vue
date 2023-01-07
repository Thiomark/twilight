<template>
    <div class="__cart min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow">
            <div v-if="getLiked().length === 0">
                <h1 class="p-8 font-bold text-4xl text-gray-400 text-center">Nothing added yet</h1>
            </div>
            <div v-else>
                <div class="_review_your_product flex items-center justify-center">
                    <p class="sha shadow text-gray-50 text-3xl font-bold">Favourites</p>
                </div>
                <div class="px-6 sm:mt-10 container mx-auto">
                    <div>
                        <CartItemsComponent :items="likedItems" />
                    </div>
                    <TotalSummaryComponent @event="proceedToCheckout" title="Cart" class="mb-20 hidden" submit="Proceed to checkout"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import CartItemsComponent from '../components/cart/CartItemsComponent.vue';
    import TotalSummaryComponent from '../components/TotalSummaryComponent.vue';
    import HeaderComponent from '../components/HeaderComponent.vue';
    export default {
        name: 'Liked',
        components: {
                CartItemsComponent,
                TotalSummaryComponent,
                HeaderComponent
        },
        data() {
            return {
                headerItems: ['Image', 'Product', 'Price', 'Quantity', 'Subtotal'],
                likedItems: []
            }
        },
        methods: {
            ...mapGetters(['getLiked']),
            proceedToCheckout(){
                if(this.$store.state.helpers.authenticateBeforeCheckout){
                    this.$router.push('/login?redirect=shopping');
                } else this.$router.push('/checkout');
            },
            applyCoupon(){
              // ..  
            }
        },
        watch: {
            '$store.state.product.liked': function(){
                this.likedItems = this.getLiked();
            }
        },
        created(){
            this.likedItems = this.getLiked();
        }
    }
</script>

<style lang="scss" scoped>
    .__cart {
        ._review_your_product {
            height: 20vh;
            background-image: url('https://images.pexels.com/photos/1682330/pexels-photo-1682330.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            // height: 13em;
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