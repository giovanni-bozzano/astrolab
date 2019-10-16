/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/

/*
	Imports Vue and VueRouter to extend with the routes.
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

/*
	Extends Vue to use Vue Router
*/
Vue.use(VueRouter)

/*
	Makes a new VueRouter that we will use to run all of the routes
	for the app.
*/
export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'layout',
			component: Vue.component('Layout', require('./pages/Layout.vue').default),
			redirect: { name: 'map' },
			children: [
				{
					path: 'map',
					name: 'map',
					component: Vue.component('Map', require('./pages/Map.vue').default)
				},
				{
					path: 'map/:id',
					name: 'map-poi',
					component: Vue.component('MapPOI', require('./pages/MapPOI.vue').default)
				},
				{
					path: 'pois/suggest',
					name: 'suggest-poi',
					component: Vue.component('SuggestPOI', require('./pages/SuggestPOI.vue').default)
				},
				{
					path: 'pois/suggest/new/:id?',
					name: 'suggest-poi-new',
					component: Vue.component('SuggestPOINew', require('./pages/SuggestPOINew.vue').default)
				},
				{
					path: 'project',
					name: 'project',
					component: Vue.component('Project', require('./pages/Project.vue').default)
				},
				{
					path: 'about',
					name: 'about',
					component: Vue.component('About', require('./pages/About.vue').default)
				}
			]
		}
	]
});
