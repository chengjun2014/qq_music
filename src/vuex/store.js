import Vue from 'vue'
import Vuex from 'vuex'
import header from '../components/header/index'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		curTab: 0,
		curSong: ''
	},
	mutations: {
		changeTab (state, n) {
			state.curTab = n;
		},
		changeSong (state, song) {
			state.curSong = song;
		}
	},
	getters: {
		getTab (state, getters) {
			return state.curTab;
		},
		getSong (state, getters) {
			return state.curSong;
		}
	},
	modules: {
		header
	}
})