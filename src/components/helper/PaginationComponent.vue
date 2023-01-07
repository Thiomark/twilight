<template>
    <div class="flex items-center justify-center p-6">
        <div class="flex">
            <button :class="$store.state.product.page === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-600 dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-200' " @click="navigateTo('back')" class="flex items-center px-4 py-2 mx-1 text-gray-500 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-600">
                previous
            </button>

            <router-link v-for="(page, index) in $store.state.product.pages" :key="index" :to="`/page/${page}`" class="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-200">
                {{page}}
            </router-link>

            <button :class="$store.state.product.page === $store.state.product.pages ? 'cursor-not-allowed' : 'hover:bg-gray-600 dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-200'" @click="navigateTo('next')" class="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-200">
                Next
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        methods: {
            navigateTo(page){
                if(page === 'back'){
                    this.$store.state.product.page >= 2 ? this.$router.push(`/page/${this.$store.state.product.page - 1}`) : ''
                }else{
                    this.$store.state.product.page < this.$store.state.product.pages ? this.$router.push(`/page/${this.$store.state.product.page + 1}`) : ''
                }

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>