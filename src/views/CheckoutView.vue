<template>
    <div class="min-h-screen">
        <HeaderComponent />
        <div class="container max-w-5xl px-6 mx-auto md:mt-16 pb-12 bg-white py-6 dark:bg-gray-800">
            <StepsComponent class="hidden"/>
            <div class=" md:border-b py-2 md:py-4">
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Billing Details</h2>
            </div>       
            <form class="mb-10">
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div v-for="(field, index) in form" :key="index">
                        <label class="text-gray-700 dark:text-gray-200 capitalize" for="username">{{field.for}}</label>
                        <input :required="field.required" :type="field.type" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" v-model="field.varible">
                    </div>
                </div>
                <div v-if="!$store.state.helpers.authenticateBeforeCheckout" class="pt-8">
                    <label class="md:w-2/3 block text-gray-500 font-bold">
                        <input v-model="createAccount" class="mr-2 leading-tight" type="checkbox">
                        <span class="text-sm">
                            Create an account?
                        </span>
                    </label>
                </div>
                <div class="mt-8">
                    <label class="text-gray-700 dark:text-gray-200 capitalize" for="message">Message</label>
                    <textarea v-model="message" placeholder="message to the person delivering..." class="block w-full mt-2 h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                </div>
            </form>
            <TotalSummaryComponent title="Your Order" submit='place order' @event="placeOrder"/>
        </div>
    </div>
</template>

<script>
    import TotalSummaryComponent from '../components/TotalSummaryComponent.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
    import StepsComponent from '../components/StepsComponent.vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Checkout',
        components: {
            TotalSummaryComponent,
            HeaderComponent,
            StepsComponent
        },
        methods: {
            ...mapActions(['createOrder']),
            ...mapGetters(['getCart']),
            ...mapMutations(['SET_ALERT']),
            getField(selectedField){
                return this.form.filter(x => x.for === selectedField)
            },
            check(){
                return this.form.filter(x => x.varible === '');
                
            },
            placeOrder(paymentMethod){
                if(!paymentMethod || this.check().length > 0){
                    this.SET_ALERT({
                        heading: 'error',
                        message: `Please enter:  ${this.check().map(x => ` ${x.for}`).toString()}`
                    })
                    return 
                }
                this.createOrder({
                    orderItems: this.getCart(),
                    shippingAddress: {
                        address: this.getField('house number and street name')[0].varible,
                        city: this.getField('town/city')[0].varible,
                        province: this.getField('province')[0].varible,
                        postalCode: this.getField('postcode')[0].varible,
                        country: this.country,
                    },
                    paymentMethod,
                    message: this.message,
                    phone: this.getField('phone')[0].varible
                });
            },
        },
        created(){
            if(this.$store.state.helpers.authenticateBeforeCheckout){
                for(const field of this.form){
                    if(field.for === 'name'){
                        field.varible = this.$store.state.user.user.name
                    }
                    if(field.for === 'email address'){
                        field.varible = this.$store.state.user.user.email
                    }
                }
            }
        },
        data() {
            return {
                createAccount: '',
                missigField: [],
                message: '',
                country: '',
                form: [
                    {
                        for: 'Name',
                        varible: '',
                        type: 'text',
                        required: true
                    },
                    {
                        for: 'House number and street name',
                        varible: '',
                        type: 'text',
                        required: true
                    },
                    {
                        for: 'Town/City',
                        varible: '',
                        type: 'text',
                        required: true
                    },
                    {
                        for: 'Province',
                        varible: '',
                        type: 'text',
                        required: true
                    },
                    {
                        for: 'Post Code',
                        varible: '',
                        type: 'text',
                        required: true
                    },
                    {
                        for: 'Phone',
                        varible: '',
                        type: 'text',
                        required: true
                    },
                    {
                        for: 'Email Address',
                        varible: '',
                        type: 'text',
                        required: true
                    }
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>