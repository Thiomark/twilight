<template>
    <div class="__home min-h-screen relative flex flex-col">
        <HeaderComponent />
        <main class="flex-grow mt-2 flex flex-col">
            <div class="py-2">
                <div class="mx-auto max-w-md md:container flex items-center px-6">
                    <div class="flex px-2 md:px-0 items-center ml-auto">
                        <button @click="openMenu = !openMenu" v-click-outside="closeMenu" type="button" class="py-2 text-gray-500 font-semibold capitalize transition-colors duration-200 transform text-xs">{{ buttonText }}</button>
                        <div v-if="openMenu" class="relative">
                            <div class="absolute right-0 z-20 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-700">
                                <button @click="buttonText = 'Sort by latest'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Sort by latest</button>
                                <button @click="buttonText = 'sort by average rating'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">sort by average rating</button>
                                <button @click="buttonText = 'sort by price: low to high'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">sort by price: low to high</button>
                                <button @click="buttonText = 'sort by price: high to low'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">sort by price: high to low</button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="flex-grow mx-auto container px-6">
                <div v-if="$store.state.product.productLoading" class="md:grid space-y-6 md:space-y-0 gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SingleProductSkeleton class="mx-auto md:mx-0" v-for="(product, index) in 8" :key="index"/>
                </div>   
                <div v-else class="md:grid space-y-6 md:space-y-0 gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SingleProductComponent class="mx-auto md:mx-0" v-for="product in getProducts" :product="product" :key="product._id"/>
                </div>   
            </div>
            <PaginationComponent />
        </main>
    </div>
</template>

<script>
    import ClickOutside from 'vue-click-outside'
    import { mapActions, mapGetters } from 'vuex';
    import HeaderComponent from '../components/HeaderComponent.vue'
    import PaginationComponent from '../components/helper/PaginationComponent.vue';
    import SingleProductComponent from '../components/product/SingleProductComponent.vue';
    import SingleProductSkeleton from '../components/skeleton/SingleProductSkeleton.vue'
    export default {
        name: 'Home',
        components: {
            HeaderComponent,
            PaginationComponent,
            SingleProductComponent,
            SingleProductSkeleton
        },
        data() {
            return {
                openMenu: false,
                buttonText: 'Sort by latest'
            }
        },
        methods: {
            ...mapActions(['fetchProducts']),
            closeMenu(){
                this.openMenu = false
            }
        },
        watch: {
            '$route.params.pageNumber': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber});
            },
            '$route.params.search': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber});
            }
        },
        created(){
            this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber});
        },
        computed: {
            ...mapGetters(['getProducts']),
        },
        directives: {
            ClickOutside
        }
    }
</script>
