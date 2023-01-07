<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex items-center justify-center ">
            <div class="w-full mb-40 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div class="px-6 py-4">
                    <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">{{$store.state.helpers.storeName}}</h2>

                    <h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                    <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                    <form>
                        <div v-if="!login" class="w-full mt-4">
                            <input v-model="name" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Full Name" aria-label="Full Name" />
                        </div>
                        
                        <div class="w-full mt-4">
                            <input v-model="email" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Email Address" aria-label="Email Address" />
                        </div>

                        <div class="w-full mt-4">
                            <input v-model="password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password" />
                        </div>

                        <div class="flex items-center justify-between mt-4">
                            <router-link to="#" class="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</router-link>
                            
                            <button :class="getLoadingUser && 'cursor-not-allowed'" v-if="login" @click.prevent="submitLogin" class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform focus:outline-none bg-gray-700 rounded hover:bg-gray-600">
                                <div v-if="getLoadingUser" class="h-5 w-5 mr-2 animate-spin _spinner rounded-full border-4"></div>
                                <span class="ml-2">Login</span>
                            </button>
                            <button v-if="!login" @click.prevent="submitRegister" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">Register</button>
                        </div>
                    </form>
                </div>

                <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span class="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
                    <p role="button" v-if="login" @click="login = !login" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</p>
                    <p role="button" v-if="!login" @click="login = !login" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Login</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'Login',
        components: {
            HeaderComponent
        },
        data() {
            return {
                login: true,
                password: "",
                email: "",
                name: ""
            }
        },
        methods: {
            ...mapActions(['loginUser', 'registerUser']),
            submitLogin(){
                if(!this.getLoadingUser){
                    if(this.email && this.password){
                        this.loginUser({
                            email: this.email, 
                            password: this.password
                        });
                    }
                }
            },
            submitRegister(){
                if(this.email && this.password && this.name){
                    this.registerUser({
                        name: this.name,
                        email: this.email, 
                        password: this.password
                    })
                }
            }
        },
        computed: {
            ...mapGetters(['getLoadingUser'])
        }
    }
</script>

<style lang="scss" scoped>

    $_spinner: rgb(87, 87, 87);

    ._spinner {
        border-top-color: #c7c7c7;
        border-right-color: $_spinner;
        border-left-color: $_spinner;
        border-bottom-color: $_spinner;
    }
    
    .login__component {
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        display: flex;

        .__form {
            width: 100%;
            flex-grow: 1;
            background-color: #F1F1F1;
            max-width: 400px;
            display: flex;
            align-items: center;
            position: relative;

            form {
                width: 100%;
                padding: 2em;
                margin-bottom: 40%;
                display: flex;
                flex-direction: column;

                label {
                    font-size: .9rem;
                    font-weight: bold;
                    color: #707070;
                    margin-bottom: .8em;

                    &:not(:first-child){
                        margin-top: 1.5em;
                    }
                }
                
                input[type="text"], input[type="password"]{
                    border: 2px #D9D9D9 solid;
                    
                    border-radius: 6px;
                    background-color: rgb(255, 255, 255);       
                    color: rgb(82, 82, 82);
                    padding: 1.3em 1em;
                    width: 100%;
                    font-family: inherit;
                    font-weight: semi-bold;
                    font-size: .878em;

                    &:focus {
                        outline: none;
                    }
                }

                input[type="submit"] {
                    background-color: #559BD8;
                    border: none;
                    width: 100%;
                    max-width: 144px;
                    color: #f3f3f3;
                    padding: 1em 0;
                    border-radius: 50em;
                    font-size: 0.78em;
                    cursor: pointer;
                }

                > div {
                    margin-top: 2em;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    a {
                        font-size: .8rem;
                        font-weight: bold;
                        color: #484848;
                        text-decoration: none;
                        margin-right: 1em;
                    }
                }

                input:focus {
                    outline: none;
                }
            }
        }

        section {
            width: 100%;
            flex-grow: 1;
            
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    

</style>