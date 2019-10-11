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
		poi: {},
		poiLoadStatus: 0,
		poiAdded: {},
		poiAddStatus: 0,
		poiAddText: ''
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
			Loads a POI.
		*/
		loadPoi({ commit }, data) {
			commit('setPoiLoadStatus', 1);
			POIsAPI.getPoi(data.id).then(function(response) {
				commit('setPoi', response.data);
				commit('setPoiLoadStatus', 2);
			}).catch( function(){
				commit('setPoi', {});
				commit('setPoiLoadStatus', 3);
			});
		},

		/*
			Suggests a new POI.
		*/
		suggestNewPoi({ commit, state, dispatch }, data) {
			commit('setPoiAddStatus', 1);
			POIsAPI.suggestNewPoi(data.name, data.address, data.description, data.category_id, data.latitude, data.longitude).then(function(response) {
				commit('setPoiAddText', response.data.name + ' è stato suggerito!');
				commit('setPoiAddStatus', 2);
				commit('setPoiAdded', response.data);

				/*
					Load the POIs.
				*/
				dispatch('loadPois');
			}).catch(function(error) {
				if (error.response.status == 403) {
					commit('setPoiAddText', 'Hai raggiunto il numero massimo di suggerimenti.');
				}
				commit('setPoiAddStatus', 3);
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
			Set the added POI.
		*/
		setPoiAdded(state, poi) {
			state.poiAdded = poi;
		},

		/*
			Set the POI add status.
		*/
		setPoiAddStatus(state, status) {
			state.poiAddStatus = status;
		},

		/*
			Set the POI add text
		*/
		setPoiAddText(state, text) {
			state.poiAddText = text;
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
		getPoi(state) {
			return state.poi;
		},

		/*
			Returns the POI load status.
		*/
		getPoiLoadStatus(state) {
			return state.poiLoadStatus;
		},

		/*
			Gets the added POI.
		*/
		getPoiAdded(state) {
			return state.poiAdded;
		},

		/*
			Gets the POI add status.
		*/
		getPoiAddStatus(state) {
			return state.poiAddStatus;
		},

		/*
			Gets the POI add text
		*/
		getPoiAddText(state) {
			return state.poiAddText;
		}
	}
}
