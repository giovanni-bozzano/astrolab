/*
|-------------------------------------------------------------------------------
| VUEX store.js
|-------------------------------------------------------------------------------
| Builds the data store from all of the modules for the app.
*/
/*
	Adds the promise polyfill for IE 11
*/
require('es6-promise').polyfill();

/*
	Imports Vue and Vuex
*/
import Vue from 'vue'
import Vuex from 'vuex'

/*
	Initializes Vuex on Vue.
*/
Vue.use(Vuex)

/*
	Imports all of the modules used in the application to build the data store.
*/
import { pois } from '../global/modules/pois.js';
import { users } from '../global/modules/users.js';
import { categories } from '../global/modules/categories.js';
import { display } from '../global/modules/display.js';
import { admin } from './modules/admin.js';

/*
	Exports our data store.
*/
export default new Vuex.Store({
	modules: {
		pois,
		users,
		categories,
		display,
		admin
	}
});
