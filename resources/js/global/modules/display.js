/*
|-------------------------------------------------------------------------------
| VUEX modules/display.js
|-------------------------------------------------------------------------------
| The Vuex data store for the display state
*/
export const display = {
	/*
		Defines the state being monitored for the module
	*/
	state: {
		notificationText: '',
		selectedCategory: null,
		selectedPoi: null
	},

	/*
		Defines the actions that can be performed on the state.
	*/
	actions: {
		/*
			Toggles the selected category.
		*/
		toggleSelectedCategory({ commit }, data) {
			commit('setSelectedCategory', data);
		},

		/*
			Toggles the selected POI.
		*/
		toggleSelectedPoi({ commit }, data) {
			commit('setSelectedPoi', data);
		}
	},

	/*
		Defines the mutations used by the state.
	*/
	mutations: {
		/*
			Sets the notification text.
		*/
		setNotificationText(state, notificationText) {
			state.notificationText = notificationText;
		},

		/*
			Sets the selected category.
		*/
		setSelectedCategory(state, selectedCategory) {
			state.selectedCategory = selectedCategory;
		},

		/*
			Sets the selected POI.
		*/
		setSelectedPoi(state, selectedPoi) {
			state.selectedPoi = selectedPoi;
		}
	},

	/*
		Defines the getters on the Vuex module.
	*/
	getters: {
		/*
			Returns the notification text.
		*/
		getNotificationText(state) {
			return state.notificationText;
		},

		/*
			Returns the selected category.
		*/
		getSelectedCategory(state) {
			return state.selectedCategory;
		},

		/*
			Returns the selected POI.
		*/
		getSelectedPoi(state) {
			return state.selectedPoi;
		}
	}
}
