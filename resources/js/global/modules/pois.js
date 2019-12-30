/*
|-------------------------------------------------------------------------------
| VUEX modules/pois.js
|-------------------------------------------------------------------------------
| The Vuex data store for the POIs.
*/

import POIsAPI from '../api/pois.js';

export const pois = {
	/*
		Defines the state being monitored for the module.
	*/
	state: {
		pois: [],
		poisLoadStatus: 0,
		poiAddStatus: 0,
		poiEditStatus: 0,
		poiDeleteStatus: 0
	},

	/*
		Defines the actions used to retrieve the data.
	*/
	actions: {
		/*
			Loads POIs.
		*/
		loadPois({ commit }) {
			commit('setPoisLoadStatus', 1);
			POIsAPI.getPois().then(function(response) {
				commit('setPois', response.data);
				commit('setPoisLoadStatus', 2);
			}).catch(function() {
				commit('setPois', []);
				commit('setPoisLoadStatus', 3);
			});
		},

		/*
			Suggests a new POI.
		*/
		suggestNewPoi({ commit, state, dispatch }, data) {
			commit('setPoiAddStatus', 1);
			POIsAPI.suggestNewPoi(data.id, data.name, data.description, data.address, data.email_address, data.phone_number, data.website, data.category_id, data.latitude, data.longitude).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiAddStatus', 2);
				dispatch('loadUser');
			}).catch(function(error) {
				if (error.response.status == 403) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiAddStatus', 3);
			});
		},

		/*
			Deletes a suggested POI.
		*/
		deleteUserSuggestedPoi({ commit, state, dispatch }, data) {
			commit('setPoiDeleteStatus', 1);
			POIsAPI.deleteUserSuggestedPoi(data.id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiDeleteStatus', 2);
				dispatch('loadUser');
			}).catch(function(error) {
				if (error.response.status == 403) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiDeleteStatus', 3);
			});
		},

		/*
			Orders the POIs in the data store.
		*/
		orderPois({ commit, state, dispatch }, data) {
			/*
				Set the POIs to a local variable.
			*/
			let localPois = state.pois;

			/*
				Switch what we are ordering by.
			*/
			switch(data.order) {
				case 'name':
					/*
						Sort POIs by name.
					*/
					localPois.sort(function(a, b) {
						if (data.direction == 'desc') {
							return ((a.name == b.name) ? 0 : ((a.name < b.name) ? 1 : -1));
						} else {
							return ((a.name == b.name) ? 0 : ((a.name > b.name) ? 1 : -1));
						}
					});
				break;
			}

			/*
				Update the POIs state.
			*/
			commit('setPois', localPois);
		}
	},

	/*
		Defines the mutations used.
	*/
	mutations: {
		/*
			Sets the POIs.
		*/
		setPois(state, pois) {
			state.pois = pois;
		},
		
		/*
			Sets the POIs load status.
		*/
		setPoisLoadStatus(state, status) {
			state.poisLoadStatus = status;
		},

		/*
			Sets the POI.
		*/
		setPoi(state, poi) {
			state.poi = poi;
		},

		/*
			Sets the POI load status.
		*/
		setPoiLoadStatus(state, status) {
			state.poiLoadStatus = status;
		},

		/*
			Set the POI add status.
		*/
		setPoiAddStatus(state, status) {
			state.poiAddStatus = status;
		},

		/*
			Set the POI edit status.
		*/
		setPoiEditStatus(state, status) {
			state.poiEditStatus = status;
		},

		/*
			Set the POI delete status.
		*/
		setPoiDeleteStatus(state, status) {
			state.poiDeleteStatus = status;
		}
	},

	/*
		Defines the getters used by the module.
	*/
	getters: {
		/*
			Returns the POIs.
		*/
		getPois(state) {
			return state.pois;
		},

		/*
			Returns the POIs load status.
		*/
		getPoisLoadStatus(state) {
			return state.poisLoadStatus;
		},

		/*
			Returns the POI.
		*/
		getPoi: (state) => (id) => {
			return state.pois.find(function(element) {
				return element.id == id;
			});
		},

		/*
			Returns the POI load status.
		*/
		getPoiLoadStatus(state) {
			return state.poiLoadStatus;
		},

		/*
			Gets the POI add status.
		*/
		getPoiAddStatus(state) {
			return state.poiAddStatus;
		},

		/*
			Gets the POI edit status.
		*/
		getPoiEditStatus(state) {
			return state.poiEditStatus;
		},

		/*
			Gets the POI delete status.
		*/
		getPoiDeleteStatus(state) {
			return state.poiDeleteStatus;
		}
	}
}