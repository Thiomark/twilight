<template>
    <div class="flex items-center">
        <button v-if="$store.state.user.user" @mouseover="openMenu = true" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 hidden md:block text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:ml-4 capitalize md:my-0">{{$store.state.user.user.name}}</button>
        <button @mouseover="openMenu = true" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:ml-4 capitalize md:my-0">
            <div class="flex flex-col items-center w-6 justify-center">
                <div style="border-width: 3px; height: .9rem; width: .9rem" class=" bg-white z-10 border-gray-800 rounded-full"></div>
                <div style="margin-top: -4.5px; border-top-width: 3px; border-left-width: 3px; border-right-width: 3px;" class="bg-white rounded-t-full  w-6 h-3 border-gray-800"></div>
            </div>
        </button>
        <div class="relative" @mouseleave="openMenu = false"  v-if="openMenu">
            <div class="absolute border border-gray-200 right-0 z-20 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-700">
                <router-link to="/favourites" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Liked</router-link>
                <router-link to="/profile/orders" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Orders</router-link>
                <router-link to="/profile/account" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Personal Details</router-link>
                <router-link v-if="!$store.state.user.user" to="/auth" class="block px-4 py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Login</router-link>
                <p role="button" @click="LOG_USER_OUT()" v-if="$store.state.user.user" class="block px-4 w-full py-2 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Log Out</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: 'ProfileButtonComponent',
        props: {
            noBackground: {
                Type: Boolean
            },
        },
        data() {
            return {
                openMenu: false,
                buttons: false
            }
        },
        methods: {
            ...mapMutations(['LOG_USER_OUT']),
            closeMenu(){
                if(this.buttons) return;
                this.openMenu = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>