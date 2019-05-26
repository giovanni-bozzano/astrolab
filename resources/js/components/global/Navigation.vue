<template>
	<div id="navigation">
	    <div class="logo-container">
	        <figure class="logo-wrap">
	            <router-link :to="{ name: 'home'}">
	            	<img class="logo" src="img/logo-white.svg" width="65px" height="auto">
	            </router-link>
	        </figure>
	    </div>
	    <nav id="nav" class="menu-sections-container">
			<div class="menu-section" v-bind:class="{ 'active': ['project'].includes($route.name) }">
				<router-link :to="{ name: 'project' }">
					<li class="menu-inner">Progetto</li>
				</router-link>
			</div>
			<div class="menu-section" v-bind:class="{ 'active': ['about'].includes($route.name) }">
				<router-link :to="{ name: 'about' }">
					<li class="menu-inner">Chi Siamo</li>
				</router-link>
			</div>
			<div class="menu-section" v-if="user != '' && userLoadStatus == 2" v-bind:class="{ 'active': ['suggestions'].includes($route.name) }">
				<router-link :to="{ name: 'newpoint' }">
					<li class="menu-inner">Consigli</li>
				</router-link>
			</div>
			<div class="menu-section" v-if="user != '' && userLoadStatus == 2 && user.permission >= 1">
				<router-link :to="{ name: 'newpoint'}">
					<li class="menu-inner">Admin</li>
				</router-link>
			</div>
			<div class="menu-section">
				<a v-if="user != '' && userLoadStatus == 2" v-show="userLoadStatus == 2" v-on:click="logout()">
					<li class="menu-inner">Logout</li>
				</a>
				<a v-if="user == ''" v-on:click="login()">
					<li class="menu-inner">Login</li>
				</a>
			</div>
	    </nav>
	</div>
</template>
<script>
	/*
		Imports the event bus.
	*/
	import { EventBus } from '../../event-bus.js';
	export default {
		/*
			Defines the computed properties on the component.
		*/
		computed: {
			/*
				Retrieves the User Load Status from Vuex
			*/
			userLoadStatus() {
				return this.$store.getters.getUserLoadStatus;
			},
			/*
				Retrieves the User from Vuex
			*/
			user() {
				return this.$store.getters.getUser;
			},
			/*
				Get categories filter.
			*/
			categories() {
				return this.$store.getters.getCategoriesFilter;
			}
		},
		/*
			Defines the methods for the component
		*/
		methods: {
			/*
				Prompts the login form.
			*/
			login() {
				EventBus.$emit('prompt-login');
			},
			/*
				Logs the user out.
			*/
			logout() {
				this.$store.dispatch('logoutUser');
				window.location = '/logout';
			}
		}
	}
</script>
