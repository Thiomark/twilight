<template>
    <div class="__track__order min-h-screen flex flex-col">
        <HeaderComponent :noBackground="true"/>
        <main class="flex-grow flex items-center justify-center">
            <form @submit.prevent="trackOrder" class="mx-6 max-w-xl rounded-md px-10 py-16 shadow-lg bg-white flex flex-col space-y-4">
                <h1 class="font-bold text-2xl ">Track Order</h1>
                <p class="text-sm tracking-wide text-gray-700">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                <input class="focus:outline-none transition ease-in-out duration-300 focus:border-blue-500 py-5 border-b text-sm" placeholder="Found in your order confirmation email" type="text">
                <button class="py-4 border transition duration-150 ease-in-out bg-gray-900 border-transparent hover:border-gray-800 font-bold text-gray-50 hover:bg-white hover:text-gray-900">Track</button>
            </form>
        </main>
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    export default {
        name: 'TrackOrder',
        components: {
            HeaderComponent
        },
        methods: {
            trackOrder(){
                // .
            }
        }
    }
</script>

<style lang="scss" scoped>
    .__track__order {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&h=1920&w=1080');
    }
</style>