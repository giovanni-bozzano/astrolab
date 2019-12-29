/*
|-------------------------------------------------------------------------------
| VUEX modules/users.js
|-------------------------------------------------------------------------------
| The Vuex data store for the administrator.
*/
import { EventBus } from '../../event-bus.js';
import AdminAPI from '../api/admin.js';

export const admin = {
	/*
		Defines the state being monitored for the module.
	*/
	state: {
		suggestedPois: [],
		suggestedPoisLoadStatus: 0,
	},

	/*
		Defines the actions used to retrieve the data.
	*/
	actions: {
		/*
			Edits a POI.
		*/
		editPoi({ commit, state, dispatch }, data) {
			commit('setPoiEditStatus', 1);
			AdminAPI.editPoi(data.id, data.name, data.image, data.description, data.address, data.coordinates, data.email_address, data.phone_number, data.hashtag, data.category_id, data.latitude, data.longitude).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiEditStatus', 2);

				/*
					Load the POIs.
				*/
				EventBus.$emit('destroy-datatable');
				dispatch('loadPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiEditStatus', 3);
			});
		},

		/*
			Shows a POI.
		*/
		showPoi({ commit, state, dispatch }, data) {
			commit('setPoiEditStatus', 1);
			AdminAPI.showPoi(data.id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiEditStatus', 2);

				/*
					Load the POIs.
				*/
				EventBus.$emit('destroy-datatable');
				dispatch('loadPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiEditStatus', 3);
			});
		},

		/*
			Hides a POI.
		*/
		hidePoi({ commit, state, dispatch }, data) {
			commit('setPoiEditStatus', 1);
			AdminAPI.hidePoi(data.id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiEditStatus', 2);

				/*
					Load the POIs.
				*/
				EventBus.$emit('destroy-datatable');
				dispatch('loadPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiEditStatus', 3);
			});
		},

		/*
			Deletes a POI.
		*/
		deletePoi({ commit, state, dispatch }, data) {
			commit('setPoiDeleteStatus', 1);
			AdminAPI.deletePoi(data.id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiDeleteStatus', 2);

				/*
					Load the POIs.
				*/
				EventBus.$emit('destroy-datatable');
				dispatch('loadPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiDeleteStatus', 3);
			});
		},

		/*
			Loads suggested POIs.
		*/
		loadSuggestedPois({ commit }) {
			commit('setSuggestedPoisLoadStatus', 1);
			AdminAPI.getSuggestedPois().then(function(response) {
				commit('setSuggestedPois', response.data);
				commit('setSuggestedPoisLoadStatus', 2);
			}).catch(function() {
				commit('setSuggestedPois', []);
				commit('setSuggestedPoisLoadStatus', 3);
			});
		},

		/*
			Publishes a new POI.
		*/
		publishNewPoi({ commit, state, dispatch }, data) {
			commit('setPoiAddStatus', 1);
			AdminAPI.publishNewPoi(data.name, data.image, data.description, data.address, data.coordinates, data.email_address, data.phone_number, data.hashtag, data.category_id, data.latitude, data.longitude, data.suggestion_id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiAddStatus', 2);

				/*
					Load the POIs.
				*/
				EventBus.$emit('destroy-datatable');
				dispatch('loadPois');
				dispatch('loadSuggestedPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiAddStatus', 3);
			});
		},

		/*
			Rejects a suggested POI.
		*/
		rejectSuggestedPoi({ commit, state, dispatch }, data) {
			commit('setPoiDeleteStatus', 1);
			AdminAPI.rejectSuggestedPoi(data.id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiDeleteStatus', 2);

				/*
					Load the suggested POIs.
				*/
				EventBus.$emit('destroy-datatable');
				dispatch('loadSuggestedPois');
			}).catch(function(error) {
				if (error.response.status == 403) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiDeleteStatus', 3);
			});
		},
	},

	/*
		Defines the mutations used.
	*/
	mutations: {
		/*
			Sets the suggested POIs.
		*/
		setSuggestedPois(state, suggestedPois) {
			state.suggestedPois = suggestedPois;
		},

		setSuggestedPoisLoadStatus(state, suggestedPoisLoadStatus) {
			state.suggestedPoisLoadStatus = suggestedPoisLoadStatus;
		}
	},

	/*
		Defines the getters used by the module.
	*/
	getters: {
		/*
			Returns the suggested POIs.
		*/
		getSuggestedPois(state) {
			return state.suggestedPois;
		},

		getSuggestedPoisLoadStatus(state) {
			return state.suggestedPoisLoadStatus;
		},

		getSuggestedPoi: (state) => (id) => {
			return state.suggestedPois.find(function(element) {
				return element.id == id;
			});
		}
	}
}