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
	routes: [
		{
			path: '/',
			name: 'layout',
			component: Vue.component('Layout', require('./pages/Layout.vue').default),
			redirect: { name: 'home' },
			children: [
				{
					path: 'home',
					name: 'home',
					component: Vue.component('Home', require('./pages/Home.vue').default),
					children: [
						{
							path: ':id',
							name: 'point',
							component: Vue.component('Point', require('./pages/Point.vue').default)
						}
					]
				},
				{
					path: 'admin/points/new',
					name: 'newpoint',
					component: Vue.component('NewPoint', require('./pages/NewPoint.vue').default)
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
