import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {},
		menu_list: [],
		dispatch_menu_list: [],
		system_menu_list: []
	},
	mutations: {
		initUser(state,payload){
			state.user = payload
		},
		initMenu(state,payload){
			state.menu_list = payload
		},
		init_dispatch_menu_list(state,payload){
			state.dispatch_menu_list = payload
		},
		init_system_menu_list(state,payload){
			state.system_menu_list = payload
		}
	}
})
