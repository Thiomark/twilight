<template>
    <div class="relative">
        <!-- Menu toggle button --> 
        <button v-click-outside="() => openMenu = false" @click="openMenu = !openMenu" class="relative rotate-90 z-10 block p-2 transition-colors duration-200 transform rounded-full hover:bg-gray-50 focus:outline-none ">
            <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
        </button>

        <!-- Menu list -->
        <div v-if="openMenu" class="absolute right-0 z-20 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-700">
            <p v-if="$store.state.user.user && $store.state.user.user._id === review.user" @click="deleteReview({productID: $route.params.id, reviewID: review._id})" role="button" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Delete</p>
            <p v-if="false" role="button" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Edit</p>
            <p role="button" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Report</p>
        </div>
    </div>
</template>

<script>
    import ClickOutside from 'vue-click-outside'
    import { mapActions } from 'vuex'
    export default {
        name: 'ButtonOpen',
        props: {
            review: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                openMenu: false
            }
        },
        methods: {
            ...mapActions(['deleteReview'])
        },
        directives: {
            ClickOutside
        }
    }
</script>

<style lang="scss" scoped>

</style>