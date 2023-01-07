<template>
    <footer class="flex justify-center px-4 text-white bg-gray-800">
        <div class="container py-6">
            <h1 class="text-lg font-bold text-center lg:text-2xl">Never miss <br> out on new deals.</h1>
            <div class="flex justify-center mt-6">
                <div class="bg-white border rounded-md focus-within:ring focus-within:border-blue-500">
                    <div class="flex flex-wrap justify-between md:flex-row">
                        <input type="email" class="p-2 m-1 text-sm text-gray-700 appearance-none focus:outline-none focus:placeholder-transparent" placeholder="Enter your email" aria-label="Enter your email">
                        <button class="w-full p-2 m-1 text-sm font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded-md lg:w-auto hover:bg-gray-700">subscribe</button>
                    </div>
                </div>
            </div>
            <hr class="h-px mt-6 border-gray-300 border-none bg-gray-700">
            <div class="flex flex-col items-center justify-between mt-6 md:flex-row">
                <div>
                    <router-link to="/" class="text-xl font-bold text-white hover:text-gray-300">{{$store.state.helpers.storeName}}</router-link>
                </div>
                <div class="flex mt-4 md:m-0">
                    <div class="-mx-4">
                        <router-link v-for="(link, index) in links" :key="index" :to="link.path"  class="px-4 text-sm font-medium text-gray-200 hover:text-gray-400 hover:underline">{{link.name}}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                toggleMenu: false,
                links: [
                    {
                        name: 'Track Order',
                        path: '/track-order'
                    },
                    {
                        name: 'About',
                        path: '#'
                    },
                    {
                        name: 'FAQ',
                        path: '#'
                    },
                    {
                        name: 'Contact',
                        path: '/contact-us'
                    }
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>