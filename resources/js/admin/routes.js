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
	base: '/admin/',
	routes: [
		{
			path: '/',
			name: 'layout',
			component: Vue.component('Layout', require('./pages/Layout.vue').default),
			redirect: { name: 'current-pois' },
			children: [
				{
					path: 'pois',
					name: 'current-pois',
					component: Vue.component('CurrentPOIs', require('./pages/CurrentPOIs.vue').default)
				},
				{
					path: 'pois/edit/:id?',
					name: 'edit-poi',
					component: Vue.component('EditPOI', require('./pages/EditPOI.vue').default)
				},
				{
					path: 'pois/publish',
					name: 'publish-poi',
					component: Vue.component('PublishPOI', require('./pages/PublishPOI.vue').default)
				},
				{
					path: 'pois/publish/new/:id?',
					name: 'publish-poi-new',
					component: Vue.component('PublishPOINew', require('./pages/PublishPOINew.vue').default)
				}
			]
		}
	]
});
