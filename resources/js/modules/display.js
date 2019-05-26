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
		selectedCategory: null,
		selectedPoint: null
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
			Toggles the selected point.
		*/
		toggleSelectedPoint({ commit }, data) {
			commit('setSelectedPoint', data);
		}
	},

	/*
		Defines the mutations used by the state.
	*/
	mutations: {
		/*
			Sets the selected category.
		*/
		setSelectedCategory(state, selectedCategory) {
			state.selectedCategory = selectedCategory;
		},

		/*
			Sets the selected point.
		*/
		setSelectedPoint(state, selectedPoint) {
			state.selectedPoint = selectedPoint;
		}
	},

	/*
		Defines the getters on the Vuex module.
	*/
	getters: {
		/*
			Returns the selected category.
		*/
		getSelectedCategory(state) {
			return state.selectedCategory;
		},

		/*
			Returns the selected point.
		*/
		getSelectedPoint(state) {
			return state.selectedPoint;
		}
	}
}
