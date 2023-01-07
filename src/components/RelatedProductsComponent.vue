<template>
    <div @mouseup="pressed = false">
        <div @mouseup="pressed = false" ref="slider" :style="pressed ? { cursor: 'grabbing' } : { cursor: 'grab' }" class="_slider" @mousedown="mouseDown($event)" @mouseenter="mouseEnter()" @mousemove.prevent="mouseMove($event)" >
            <div ref="innerSlider" class="_slider-inner">
                <SingleProductComponent :product="a"/>
                <SingleProductComponent :product="a"/>
                <SingleProductComponent :product="a"/>
                <SingleProductComponent :product="a"/>
                <SingleProductComponent :product="a"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import SingleProductComponent from './product/SingleProductComponent.vue';
    export default {
        components: { 
            SingleProductComponent 
        },
        name: 'RelatedProduct',
        data() {
            return {
                pressed: false,
                startX: null,
                scrollLeft: null,
                relatedProducts: [],
                a: {
                    __v:7,
                    _id: "6163f7aec67d7b42c481e0b2",
                    brand: "Apple",
                    category: ['err', 'ee'],
                    countInStock: 3,
                    createdAt: "2021-10-11T08:37:02.469Z",
                    description: "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
                    image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                    name:" Airpods Wireless Bluetooth Headphones",
                    numReviews: 1,
                    price: 89.99,
                    rating: 3,
                    reviews: [],
                    updatedAt: "2021-10-13T12:22:13.753Z",
                    user: "6163f7aec67d7b42c481e0af"
                }
            }
        },
        methods: {
            ...mapMutations(['SET_RELATED_PRODUCTS']),
            ...mapActions(['fetchTopProducts']),
            ...mapGetters(['getTopProducts']),
            mouseDown(e){
                // this.$refs.slider.style.cursor = 'grabbing';
                this.pressed = true;
                this.startX = e.offsetX - this.$refs.innerSlider.offsetLeft;
            },
            mouseEnter(){
                this.$refs.slider.style.cursor = 'grab';
            },
            mouseMove(e){
                if(!this.pressed) return;
                this.x = e.offsetX;
                this.$refs.innerSlider.style.left = `${this.x - this.startX}px`;

                this.checkBoundary();
            },
            checkBoundary(){
                let outer = this.$refs.slider.getBoundingClientRect();
                let inner = this.$refs.innerSlider.getBoundingClientRect();

                if(parseInt(this.$refs.innerSlider.style.left) > 0){
                    this.$refs.innerSlider.style.left = '0px';
                }else if(inner.right < outer.right){
                     this.$refs.innerSlider.style.left = `-${inner.width - outer.width}px`;
                }
            }
        },
        created(){
            this.fetchTopProducts();
        }
    }
</script>

<style lang="scss" scoped>

    ._slider {
        position: relative;
        width: 100%;
        height: 350px;
        overflow: hidden;
    
        ._slider-inner {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 200%;
            display: grid;
            grid-template-columns:  repeat(7, 1fr);
            gap: 10px;
            pointer-events: none;
            
            // ._product {
            //     max-width: 220px;
            //     ._image {
            //         width: 100%;
            //         height: 100%;
            //         background-size: cover;
            //         background-repeat: no-repeat;
            //         background-position: 50% 50%;
            //         background-image: url('https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
            //     }
            // }
        }
    }


    


</style>