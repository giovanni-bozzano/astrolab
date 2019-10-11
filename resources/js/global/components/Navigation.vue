<template>
	<div id="navigation">
		<div class="title-bar hide-for-large">
			<div class="title-bar-center">
				<button type="button" data-close="navigation" class="menu-icon" aria-expanded="true" aria-controls="navigation"></button>
			</div>
		</div>
		<div class="navigation-content">
		    <div class="logo-container" data-close="navigation">
		        <figure class="logo-wrap">
		            <router-link :to="{ name: 'map'}">
		            	<img class="logo" src="/img/logo-white.svg" width="65px" height="auto">
		            </router-link>
		        </figure>
		    </div>
			<nav id="nav" class="menu-sections-container">
				<div class="menu-section" data-close="navigation" v-if="isUserLoggedIn && isUserAdministrator">
					<a href="/admin">
						<li class="menu-inner"><strong>Admin</strong></li>
					</a>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['map']) }">
					<router-link :to="{ name: 'map' }">
						<li class="menu-inner">Mappa</li>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['project']) }">
					<router-link :to="{ name: 'project' }">
						<li class="menu-inner">Progetto</li>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['about']) }">
					<router-link :to="{ name: 'about' }">
						<li class="menu-inner">Chi Siamo</li>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['suggest-poi']) }">
					<router-link :to="{ name: 'suggest-poi' }">
						<li class="menu-inner">Consigli</li>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation">
					<a v-if="isUserLoggedIn" v-on:click="logout()">
						<li class="menu-inner">Logout</li>
					</a>
					<a v-else v-on:click="login()">
						<li class="menu-inner">Login</li>
					</a>
				</div>
			</nav>
	    </div>
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
				Retrieves whether the User is logged in from Vuex
			*/
			isUserLoggedIn() {
				return this.$store.getters.isUserLoggedIn;
			},
			/*
				Retrieves whether the User is an administrator from Vuex
			*/
			isUserAdministrator() {
				return this.$store.getters.isUserAdministrator;
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
			}
		}
	}
</script>
