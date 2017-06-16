import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		curTab: 0,
		curSong: '',
		songIndex: 0,
		songList: [],
	},
	mutations: {
		changeTab (state, n) {
			state.curTab = n;
		},
		changeSong (state, song) {
			state.curSong = song;
		},
		changeSongIndex (state, index) {
			state.songIndex = index;
		},
		changeSongList (state, songList) {
			state.songList = songList;
		}
	},
	getters: {
		getTab (state, getters) {
			return state.curTab;
		},
		getSong (state, getters) {
			return state.curSong;
		},
		getSongIndex (state, getters) {
			return state.songIndex;
		},
		getSongByIndex (state, getters) {
			return state.songList[state.songIndex];
		}
	}
})