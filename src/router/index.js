import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/page/:pageNumber',
        name: 'HomePage',
        component: Home
    },
    {
        path: '/auth',
        name: 'Authentication',
        component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
    },
    {
        path: '/product/search/:search',
        name: 'ProductSearch',
        component: Home
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue'),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/CartScreen.vue')
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import(/* webpackChunkName: "about" */ '../views/CheckoutView.vue')
    },
    {
        path: '/favourites',
        name: 'Liked',
        component: () => import(/* webpackChunkName: "about" */ '../views/LikedScreen.vue')
    },
    {
        path: '/track-order',
        name: 'TrackOrder',
        component: () => import(/* webpackChunkName: "about" */ '../views/TrackOrderView.vue')
    },
    {
        path: '/profile/account',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')
    },
    {
        path: '/contact-us',
        name: 'ContactUs',
        component: () => import(/* webpackChunkName: "about" */ '../views/ContactUsView.vue')
    },
    {
        path: '/profile/orders',
        name: 'Order',
        component: () => import(/* webpackChunkName: "about" */ '../views/OrderView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`
  window.scrollTo(0, 0);
  next()
})

export default router
