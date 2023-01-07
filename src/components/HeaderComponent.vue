<template>
    <nav v-click-outside="() => toggleMenu = false" :class="noBackground ? 'bg-transparent' : 'bg-white'" class="shadow dark:bg-gray-800">
        <div class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div class="flex items-center justify-between">
                <div>
                    <router-link :class=" noBackground ? 'text-gray-50 dark:text-gray-200 hover:text-gray-300' : 'text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300'" class="text-2xl font-bold lg:text-3xl" to="/">Brand</router-link>
                </div>
                
                <div>
                    <!-- Mobile menu button -->
                    <div class="flex items-center md:hidden">
                        <div class="flex justify-center md:block mr-4 space-x-4">
                            <button @click="TOGGLE_MENU(true)" class="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg class="w-7 h-7 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </button>
                            <router-link to="/cart" class="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300" href="#">
                                <svg style="height: 1.7rem; width: 1.7rem;" class="fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="none"><g><rect fill="none" height="24" width="24"/><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"/></g></svg>
                                <span v-if="getCart.length > 0" class="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span>
                            </router-link>
                        </div>
                        <button @click="toggleMenu = !toggleMenu" type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            <div class="flex flex-col items-center w-6 justify-center">
                                <div style="border-width: 3px; height: .9rem; width: .9rem" class=" bg-white z-10 border-gray-800 rounded-full"></div>
                                <div style="margin-top: -4.5px; border-top-width: 3px; border-left-width: 3px; border-right-width: 3px;" class="bg-white rounded-t-full  w-6 h-3 border-gray-800"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div class="items-center md:flex lg:visible" :class="toggleMenu ? 'visble' : 'hidden'">
                    <div class="flex space-y-4 md:space-y-0 py-3 md:py-0 border-t md:border-none mt-3 md:mt-0 border-gray-100 flex-col items-center md:flex-row">
                        <router-link to="/profile/orders" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 md:hidden text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Orders</router-link>
                        <router-link to="/profile/account" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 md:hidden text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Personal Details</router-link>
                        <p v-if="$store.state.user.user" role="button" @click="LOG_USER_OUT()" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 md:hidden text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Log Out</p>
                        <router-link to="/favourites" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 md:hidden  text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Favourites</router-link>
                        <router-link v-if="!$store.state.user.user" to="/auth" :class=" noBackground ? 'text-gray-50 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'" class="my-1 md:hidden  text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Sign In</router-link>
                        <button  @click="TOGGLE_MENU(true)" class="hidden md:block relative mr-4 text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg class="fill-current hover:text-indigo-500 text-gray-800" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        </button>
                        <router-link to="/cart" class="relative hidden md:block mx-4 text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300" href="#">
                                <svg class="w-6 h-6 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="none"><g><rect fill="none" height="24" width="24"/><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"/></g></svg>
                                <span v-if="getCart.length > 0" class="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span>
                        </router-link>
                        <ProfileButtonComponent class="hidden md:flex" :noBackground="noBackground"/>  
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import ClickOutside from 'vue-click-outside'
    import ProfileButtonComponent from './header/ProfileButtonComponent.vue'
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'HeaderComponent',
        components: {
            ProfileButtonComponent
        },
        props: {
            noBackground: {
                Type: Boolean
            },
            noBorder: {
                Type: Boolean
            }
        },
        methods: {
            ...mapMutations(['TOGGLE_MENU', 'LOG_USER_OUT']),
            search(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber});
            }
        },
        data() {
            return {
                toggleMenu: false,
                links: [

                    {
                        name: 'Favourites',
                        path: '/favourites'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['getCart']),
        },
        directives: {
            ClickOutside
        }
    }
</script>

<style lang="scss" scoped>
    header {
        
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 2em;
        border-bottom: 1px solid #e9e9e9;

        p {
            font-size: 1rem;
            font-weight: bold;
            color: rgb(87, 87, 87);
        }
    }
</style>