/*
|-------------------------------------------------------------------------------
| VUEX modules/filters.js
|-------------------------------------------------------------------------------
| The Vuex data store for the filters state
*/
export const filters = {
	/*
		Defines the state used by the module
	*/
	state: {
		categoriesFilter: [],
		orderBy: 'name',
		orderDirection: 'asc'
	},

	/*
		Defines the actions that can be performed on the state.
	*/
	actions: {
		/*
			Updates the categories filter.
		*/
		updateCategoriesFilter({ commit }, data) {
			commit('setCategoriesFilter', data);
		},

		/*
			Updates the order by setting and sorts the points.
		*/
		updateOrderBy({ commit, state, dispatch }, data) {
			commit('setOrderBy', data);
			dispatch('orderPoints', { order: state.orderBy, direction: state.orderDirection });
		},

		/*
			Updates the order direction and sorts the points.
		*/
		updateOrderDirection({ commit, state, dispatch }, data) {
			commit('setOrderDirection', data);
			dispatch('orderPoints', { order: state.orderBy, direction: state.orderDirection });
		},

		/*
			Resets the filters
		*/
		resetFilters({ commit, state, dispatch }, data) {
			commit('resetFilters');
			dispatch('orderPoints', { order: state.orderBy, direction: state.orderDirection });
		}
	},

	/*
		Defines the mutations used by the state.
	*/
	mutations: {
		/*
			Sets the categories filter.
		*/
		setCategoriesFilter(state, categories) {
			state.categoriesFilter = categories;
		},

		/*
			Sets the order by filter.
		*/
		setOrderBy(state, orderBy) {
			state.orderBy = orderBy;
		},

		/*
			Sets the order direction filter.
		*/
		setOrderDirection(state, orderDirection) {
			state.orderDirection = orderDirection;
		},

		/*
			Resets the active filters.
		*/
		resetFilters(state) {
			state.categoriesFilter = [];
			state.orderBy = 'name';
			state.orderDirection = 'asc';
		}
	},

	/*
		Defines the getters on the Vuex module.
	*/
	getters: {
		/*
			Gets the categoris filter.
		*/
		getCategoriesFilter(state) {
			return state.categoriesFilter;
		},

		/*
			Gets the order by filter.
		*/
		getOrderBy(state) {
			return state.orderBy;
		},

		/*
			Gets the order direction filter.
		*/
		getOrderDirection(state) {
			return state.orderDirection;
		}
	}
}
