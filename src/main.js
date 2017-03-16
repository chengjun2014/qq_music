import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import store from './vuex/store'
//import axios from 'axios'

Vue.use(vueResource)

new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { App }
})
