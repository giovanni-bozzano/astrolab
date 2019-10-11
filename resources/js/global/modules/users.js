/*
|-------------------------------------------------------------------------------
| VUEX modules/users.js
|-------------------------------------------------------------------------------
| The Vuex data store for the users.
*/
import UsersAPI from '../api/users.js';

export const users = {
	/*
		Defines the state being monitored for the module.
	*/
	state: {
		user: {},
		userLoadStatus: 0
	},

	/*
		Defines the actions used to retrieve the data.
	*/
	actions: {
		/*
			Loads a user.
		*/
		loadUser({ commit }) {
			commit('setUserLoadStatus', 1);
			UsersAPI.getUser().then(function(response) {
				commit('setUser', response.data);
				commit('setUserLoadStatus', 2);
			}).catch(function() {
				commit('setUser', {});
				commit('setUserLoadStatus', 3);
			});
		},

		/*
			Logs out a user.
		*/
		logoutUser({ commit }) {
			UsersAPI.logout().then(function () {
				location.reload();
			});
		}
	},

	/*
		Defines the mutations used.
	*/
	mutations: {
		/*
			Sets the user.
		*/
		setUser(state, user) {
			state.user = user;
		},

		setUserLoadStatus(state, userLoadStatus) {
			state.userLoadStatus = userLoadStatus;
		}
	},

	/*
		Defines the getters used by the module.
	*/
	getters: {
		/*
			Returns the user.
		*/
		getUser(state) {
			return state.user;
		},

		getUserLoadStatus(state) {
			return state.userLoadStatus;
		},

		/*
			Returns whether the user is logged in or not.
		*/
		isUserLoggedIn(state) {
			return typeof state.user.id != 'undefined';
		},

		/*
			Returns whether the user is an administrator or not.
		*/
		isUserAdministrator(state) {
			return typeof state.user.id != 'undefined' && state.user.is_administrator;
		},

		/*
			Returns whether the user's suggested POIs.
		*/
		getUserSuggestedPois(state) {
			return state.user.suggested_pois;
		}
	}
}
