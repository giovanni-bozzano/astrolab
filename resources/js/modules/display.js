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
		selectedPoint: null,
		zoomLevel: '',
		latitude: 0.0,
		longitude: 0.0
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
		},

		/*
			Applies the zoom level.
		*/
		applyZoomLevel({ commit }, data) {
			commit('setZoomLevel', data);
		},

		/*
			Applies the latitude.
		*/
		applyLatitude({ commit }, data) {
			commit('setLatitude', data);
		},

		/*
			Applies the longitude.
		*/
		applyLongitude({ commit }, data) {
			commit('setLongitude', data);
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
		},

		/*
			Sets the zoom level.
		*/
		setZoomLevel(state, level) {
			state.zoomLevel = level;
		},

		/*
			Sets the latitude.
		*/
		setLatitude(state, latitude) {
			state.latitude = latitude;
		},

		/*
			Sets the longitude.
		*/
		setLongitude(state, longitude) {
			state.longitude = longitude;
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
		},

		/*
			Gets the zoom level.
		*/
		getZoomLevel(state) {
			return state.zoomLevel;
		},

		/*
			Gets the latitude.
		*/
		getLatitude(state) {
			return state.latitude;
		},

		/*
			Gets the longitude.
		*/
		getLongitude(state) {
			return state.longitude;
		}
	}
}
