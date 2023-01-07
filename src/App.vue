<template>
  <div id="app">
      <div :class="getAlerts.length > 0 && 'space-y-1 py-3 __alert shadow-sm '" class="fixed top-0 w-full z-50 backdrop-opacity-60 backdrop-blur-lg">
          <AlertComponent v-for="(alert, index) in getAlerts" :key="index" :alert="alert"/>
      </div>
      <SearchComponent />
      <div class="fixed hidden top-0 z-30 bottom-0 right-0 left-0 blur-md bg-black opacity-90">
          <div class="flex-grow flex items-center justify-center relative h-full">
              <button class="absolute p-4 rounded-full top-2 right-2">
                  <svg class="h-8 w-8 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
              </button>
              <div class="mx-6 w-full max-w-lg rounded-sm bg-black border border-gray-400 flex items-center">
                  <input type="text" placeholder="Search products..." class="text-white w-full p-4 border-none focus:outline-none placeholder-white bg-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 fill-current font-bold text-white h-7 w-7" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </div>
          </div>
      </div>
      <router-view/>
      <FooterComponent />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FooterComponent from './components/FooterComponent'
  import AlertComponent from './components/helper/AlertComponent.vue'
  import SearchComponent from './components/helper/SearchComponent.vue'
  export default {
      components: {
          FooterComponent,
          SearchComponent,
          AlertComponent
      },
      watch: {
          '$store.state.helpers.hideScrollBar': function(){
              if(this.$store.state.helpers.isMenuOpen){
                  document.documentElement.style.overflow = 'hidden'
              }else{
                  document.documentElement.style.overflow = null
              }
          }
      },
      computed: {
          ...mapGetters(['getAlerts']),
      }
  }
</script>

<style lang="scss">

  html {
      font-family:
          Roboto,
          'Source Sans Pro',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          'Helvetica Neue',
          Arial,
          sans-serif;
      font-size: 16px;
      word-spacing: 1px;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      background-color: white;
  }

  *,
  *::before,
  *::after {
      box-sizing: border-box;
      margin: 0;
      
  }

  .__alert {
      backdrop-filter: blur(10px);
      background-color: rgba(0, 195, 255, 0.041);
  }

</style>