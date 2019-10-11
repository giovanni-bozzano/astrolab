/*
|-------------------------------------------------------------------------------
| VUEX modules/users.js
|-------------------------------------------------------------------------------
| The Vuex data store for the administrator.
*/
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
				commit('setPoiAddText', response.data.name + ' è stato pubblicato!');
				commit('setPoiAddStatus', 2);
				commit('setPoiAdded', response.data);

				/*
					Load the POIs.
				*/
				dispatch('loadPois');
			}).catch(function() {
				if (error.response.status == 401) {
					commit('setPoiAddText', 'Non hai il permesso per questa azione.');
				}
				commit('setPoiAddStatus', 3);
			});
		}
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
