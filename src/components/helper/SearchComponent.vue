<template>
    <div class="menu__component"
        :style=" showThisCommponent ? { display: 'block' } : { display: 'none' }"
    >
        <div :class="isMenuOpen ? 'opacity-90' : 'opacity-0'" class="fixed top-0 w-full z-50 transition duration-200 bg-black ease-out bottom-0">
            <div class="flex-grow w-full flex items-center justify-center relative h-full">
                <button @click="TOGGLE_MENU(false)" class="absolute p-4 rounded-full top-2 right-2">
                    <svg class="h-8 w-8 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                </button>
                <div class="mx-6 w-full max-w-lg rounded-sm bg-black border border-gray-400 flex items-center">
                    <input v-model="keyword" type="text" placeholder="Search products..." class="text-white w-full p-4 border-none focus:outline-none placeholder-white bg-transparent">
                    <button class=" flex items-center justify-center cursor-pointer" @click="searchKeyword">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 fill-current font-bold text-white h-7 w-7" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapMutations } from 'vuex'
    export default {
        name: "SearchComponent",
        data() {
            return {
                showThisCommponent: false,
                isMenuOpen: false,
                keyword: ''
            }
        },
        methods: {
            ...mapMutations(['TOGGLE_MENU']),
            searchKeyword(){
                this.$router.push(`/product/search/${this.keyword}`)
                this.TOGGLE_MENU(false)
                //this.keyword = ''
            }
        },
        watch: {
            '$store.state.helpers.isMenuOpen': function(){
                if(this.$store.state.helpers.isMenuOpen){
                    this.showThisCommponent = true;
                    setTimeout(() => {
                        this.isMenuOpen = true;
                    }, 2)
                }else{
                    this.isMenuOpen = false;
                    setTimeout(() => {
                        this.showThisCommponent = false
                    }, 150);
                }
            }
        }
    }
</script>
