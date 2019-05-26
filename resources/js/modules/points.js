/*
|-------------------------------------------------------------------------------
| VUEX modules/points.js
|-------------------------------------------------------------------------------
| The Vuex data store for the points.
*/

import PointsAPI from '../api/points.js';

export const points = {
	/*
		Defines the state being monitored for the module.
	*/
	state: {
		points: [],
		pointsLoadStatus: 0,
		point: {},
		pointLoadStatus: 0,
		pointAdded: {},
		pointAddStatus: 0,
		pointAddText: ''
	},

	/*
		Defines the actions used to retrieve the data.
	*/
	actions: {
		/*
			Loads points.
		*/
		loadPoints({ commit }) {
			commit('setPointsLoadStatus', 1);
			PointsAPI.getPoints().then(function(response) {
				commit('setPoints', response.data);
				commit('setPointsLoadStatus', 2);
			}).catch(function() {
				commit('setPoints', []);
				commit('setPointsLoadStatus', 3);
			});
		},

		/*
			Loads a point.
		*/
		loadPoint({ commit }, data) {
			commit('setPointLoadStatus', 1);
			PointsAPI.getPoint(data.id).then(function(response) {
				commit('setPoint', response.data);
				commit('setPointLoadStatus', 2);
			}).catch( function(){
				commit('setPoint', {});
				commit('setPointLoadStatus', 3);
			});
		},

		/*
			Adds a point.
		*/
		addPoint({ commit, state, dispatch }, data) {
			commit('setPointAddedStatus', 1);
			PointsAPI.postAddNewPoint(data.name, data.address, data.description, data.category_id, data.latitude, data.longitude).then(function(response) {
				/*
					If the addition is pending, let the user know, otherwise let them know
					the point has been added successfully.
				*/
				if (typeof response.data.point_add_pending !== 'undefined') {
					commit('setPointAddedText', response.data.point_add_pending +' is pending approval!');
				} else {
					commit('setPointAddedText', response.data.name +' has been added!');
				}
				commit('setPointAddedStatus', 2);
				commit('setPointAdded', response.data);

				/*
					Load the points.
				*/
				dispatch('loadPoints');
			}).catch(function() {
				commit('setPointAddedStatus', 3);
			});
		},

		/*
			Orders the points in the data store.
		*/
		orderPoints({ commit, state, dispatch }, data) {
			/*
				Set the points to a local variable.
			*/
			let localPoints = state.points;

			/*
				Switch what we are ordering by.
			*/
			switch(data.order) {
				case 'name':
					/*
						Sort points by name.
					*/
					localPoints.sort(function(a, b) {
						if (data.direction == 'desc') {
							return ((a.name == b.name) ? 0 : ((a.name < b.name) ? 1 : -1));
						} else {
							return ((a.name == b.name) ? 0 : ((a.name > b.name) ? 1 : -1));
						}
					});
				break;
			}

			/*
				Update the points state.
			*/
			commit('setPoints', localPoints);
		}
	},

	/*
		Defines the mutations used.
	*/
	mutations: {
		/*
			Sets the points.
		*/
		setPoints(state, points) {
			state.points = points;
		},
		
		/*
			Sets the points load status.
		*/
		setPointsLoadStatus(state, status) {
			state.pointsLoadStatus = status;
		},

		/*
			Sets the point.
		*/
		setPoint(state, point) {
			state.point = point;
		},

		/*
			Sets the point load status.
		*/
		setPointLoadStatus(state, status) {
			state.pointLoadStatus = status;
		},

		/*
			Set the added point.
		*/
		setPointAdded(state, point) {
			state.pointAdded = point;
		},

		/*
			Set the point add status.
		*/
		setPointAddedStatus(state, status) {
			state.pointAddStatus = status;
		},

		/*
			Set the point add text
		*/
		setPointAddedText(state, text) {
			state.pointAddText = text;
		}
	},

	/*
		Defines the getters used by the module.
	*/
	getters: {
		/*
			Returns the points.
		*/
		getPoints(state) {
			return state.points;
		},

		/*
			Returns the points load status.
		*/
		getPointsLoadStatus(state) {
			return state.pointsLoadStatus;
		},

		/*
			Returns the point.
		*/
		getPoint(state) {
			return state.point;
		},

		/*
			Returns the point load status.
		*/
		getPointLoadStatus(state) {
			return state.pointLoadStatus;
		},

		/*
			Gets the added point.
		*/
		getPointAdded(state) {
			return state.pointAdded;
		},

		/*
			Gets the point add status.
		*/
		getPointAddStatus(state) {
			return state.pointAddStatus;
		},

		/*
			Gets the point add text
		*/
		getPointAddText(state) {
			return state.pointAddText;
		}
	}
}
