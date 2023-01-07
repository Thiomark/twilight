<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex flex-col py-8">
            <div v-if="$store.state.user.loadingUser">
                <SpinnerComponent class="m-auto" />
            </div>
            <section v-else class="max-w-4xl w-full p-6 mx-auto bg-white  dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Profile Information</h2>
                <form @submit.prevent="updateInformation" class="border-b pb-8 mb-8">
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="name">Name</label>
                            <input v-model="name" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        </div>
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="email address">Email Address</label>
                            <input v-model="email" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        </div>
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="phone number">Phone Number</label>
                            <input v-model="phone" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        </div>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button type="submit" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                    </div>
                </form>
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Password</h2>
                <form @submit.prevent="updatePassword" class="border-b pb-8 mb-8">
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">                        
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="New Password">New Password</label>
                            <input v-model="newPassword" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        </div>
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="Password Confirmation">Password Confirmation</label>
                            <input v-model="confirmPassword" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button type="sumbit" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                    </div>
                </form>
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">shipping address</h2>
                <form>
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">                        
                        <div v-for="(field, index) in shipping" :key="index">
                            <label class="text-gray-700 dark:text-gray-200 capitalize" :for="field.name">{{field.name}}</label>
                            <input v-model="field.variable" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button type="sumbit" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                    </div>
                </form>
            </section>
        </main>    
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    import { mapActions, mapGetters } from 'vuex'
    import SpinnerComponent from '../components/helper/SpinnerComponent.vue'
    export default {
        name: 'Profile',
        components: {
            HeaderComponent,
            SpinnerComponent
        },
        data() {
            return {
                name: '',
                email: '',
                phone: '',
                newPassword: '',
                confirmPassword: '',
                shipping: [
                    {
                        name: 'address',
                        variable: ''
                    },
                    {
                        name: 'city',
                        variable: ''
                    },
                    {
                        name: 'province',
                        variable: ''
                    },
                    {
                        name: 'postalCode',
                        variable: ''
                    }
                ]
            }
        },
        methods: {
            ...mapActions(['fetchUser', 'updateUser']),
            ...mapGetters(['getUser']),
            updateInformation(){
                if(this.email !== this.$store.state.user.user.email || this.name !== this.$store.state.user.user.name){
                    this.updateUser({
                        name: this.name, 
                        email: this.email
                    })
                }
            },
            updatePassword(){
                if(this.newPassword === this.confirmPassword){
                    this.updateUser({
                        password: this.newPassword
                    })
                }
            }
        },
        watch: {
            '$store.state.user.loadingUser': function(){
                this.name = this.getUser().name;
                this.email = this.getUser().email; 
            }
        },
        created(){
            this.fetchUser();
        }
    }
</script>

<style lang="scss" scoped>

</style>