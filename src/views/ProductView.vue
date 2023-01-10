<template>
    <div class="__product min-h-screen flex flex-col">
        <HeaderComponent />  
        <main class="flex-grow py-12">
            <div class="_image_and_info grid lg:grid-cols-2 container m-auto">
                <div class="mx-16" v-if="getProductLoading">
                    <div class="w-full animate-pulse bg-gray-300 h-96 rounded-md "></div>
                </div>
                <div v-if="!getProductLoading" class="px-6 flex items-center justify-center">
                    <img :src="getProduct.image" :alt="`Picture of ${getProduct.name}`">
                    <!-- <img src="https://res.cloudinary.com/thiomark/image/upload/v1673353037/image-389038c7-6c3c-4c92-a94e-30bd760ac90f.png" :alt="`Picture of ${getProduct.name}`"> -->
                </div>
                <InformationComponent @reviews="scrollToReviews" v-if="!getProductLoading" class="p-6 pb-0 pt-12"/>
                <ProductSkeleton v-if="getProductLoading" class="p-6 pb-0 pt-12"/>
            </div>
            <div class="flex items-center border-b lg:mt-20 border-t justify-center">
                <button 
                    @click="show = 'Description'" 
                    :class="show === 'Description' && 'text-blue-500 border-blue-500'" 
                    class="transition duration-300 lg:border-b-2 ease-in-out border-transparent text-gray-700 lg:mt-2 text-xs py-4 px-5 font-bold">Description</button>
                <button 
                    @click="show = 'Reviews'" 
                    :class="show === 'Reviews' && 'text-blue-500 border-blue-500'" 
                    class="relative transition duration-300 lg:border-b-2 ease-in-out border-transparent text-gray-700 lg:mt-2 text-xs py-4 px-5 font-bold">Reviews
                    <span style="font-size: .8em" class="bg-gray-300 flex items-center justify-center h-4 w-4 rounded-full absolute top-2 right-0">{{getProductLoading ? 0 : getProduct.numReviews}}</span>
                </button>
            </div>
            <div class="pt-4 container m-auto">
                <div class="px-6 " v-if="show === 'Description'">
                    <h1 class="font-semibold text-gray-900 text-sm">Description</h1>
                    <p class="pt-5 text-sm text-gray-600 leading-6">Short sleeve crewneck t-shirt in white in a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that’s filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been since the early 1960ies, and quite likely since the sixteenth century.</p>
                </div>
                <section ref="reviews" v-if="show === 'Reviews' && !getProductLoading">
                    <ReviewsComponent :reviews="getProduct.reviews"/>
                </section>
            </div>
        </main>  
    </div>
</template>

<script>
    import ReviewsComponent from '../components/product/ReviewsComponent.vue'
    import InformationComponent from '../components/product/InformationComponent.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
    import ProductSkeleton from '../components/skeleton/ProductSkeleton.vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Product',
        components: {
            ReviewsComponent,
            InformationComponent,
            HeaderComponent,
            ProductSkeleton
        },
        data() {
            return {
                show: 'Description'
            }
        },
        methods: {
            ...mapMutations(['SET_SELECTED']),
            ...mapActions(['fetchProduct']),
            async scrollToReviews() {
                this.show = 'Reviews';
                setTimeout(() => {
                    const element = this.$refs['reviews'];
                    const top = element.offsetTop;
                    window.scrollTo(0, top);
                }, 1);
            },
        },
        computed: {
            ...mapGetters(['getProduct', 'getProductLoading']),
        },
        destroyed(){
            this.SET_SELECTED()
        },
        created(){
            this.fetchProduct(this.$route.params.id);
        }
    }
</script>

<style lang="scss" scoped>
    .__product {
    }


</style>


