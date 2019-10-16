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
			Loads a user.
		*/
		loadSuggestedPois({ commit }) {
			commit('setSuggestedPoisLoadStatus', 1);
			AdminAPI.getSuggestedPois().then(function(response) {
				EventBus.$emit('destroy-datatable');
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
			AdminAPI.publishNewPoi(data.id, data.name, data.address, data.description, data.category_id, data.hashtag, data.latitude, data.longitude).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiAddStatus', 2);

				/*
					Load the POIs.
				*/
				dispatch('loadPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setNotificationText', error.response.data);
				}
				commit('setPoiAddStatus', 3);
			});
		},

		/*
			Deletes a suggested POI.
		*/
		deleteSuggestedPoi({ commit, state, dispatch }, data) {
			commit('setPoiDeleteStatus', 1);
			AdminAPI.deleteSuggestedPoi(data.id).then(function(response) {
				commit('setNotificationText', response.data);
				commit('setPoiDeleteStatus', 2);

				/*
					Load the suggested POIs.
				*/
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
