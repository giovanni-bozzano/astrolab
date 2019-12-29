<template>
	<div id="navigation">
		<div class="navigation-content">
			<div class="logo-container hide-for-small-only" data-close="navigation">
				<figure class="logo-wrap">
					<router-link :to="{ name: 'map'}">
						<img class="logo" src="/img/logo-white.svg" alt="Logo" width="90px" height="auto">
					</router-link>
				</figure>
			</div>
			<nav id="nav" class="menu-sections-container">
				<div class="menu-section first-section" data-close="navigation" v-on:click="showLoader" v-if="isUserLoggedIn && isUserAdministrator">
					<a href="/admin">
						<div class="menu-inner"><strong>Admin</strong></div>
					</a>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'first-section': !isUserLoggedIn || !isUserAdministrator, 'active': $route.name.includes(['map']) }">
					<router-link :to="{ name: 'map' }">
						<div class="menu-inner">Mappa</div>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['project']) }">
					<router-link :to="{ name: 'project' }">
						<div class="menu-inner">Progetto</div>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['archive']) }">
					<router-link :to="{ name: 'archive' }">
						<div class="menu-inner">Archivio</div>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['suggest-poi']) }">
					<router-link :to="{ name: 'suggest-poi' }">
						<div class="menu-inner">Consigli</div>
					</router-link>
				</div>
				<div class="menu-section last-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['about']) }">
					<router-link :to="{ name: 'about' }">
						<div class="menu-inner">Chi Siamo</div>
					</router-link>
				</div>
				<div class="menu-section">
					<a v-if="isUserLoggedIn" v-on:click="logout()">
						<div class="menu-inner">Logout</div>
					</a>
					<a v-else v-on:click="login()">
						<div class="menu-inner">Login</div>
					</a>
				</div>
			</nav>
	    </div>
	</div>
</template>
<script>
	import { EventBus } from '../../event-bus.js';
	
	export default {
		computed: {
			isUserLoggedIn() {
				return this.$store.getters.isUserLoggedIn;
			},
			isUserAdministrator() {
				return this.$store.getters.isUserAdministrator;
			}
		},

		methods: {
			showLoader() {
				EventBus.$emit('show-loader');
			},
			login() {
				EventBus.$emit('prompt-login');
			},
			logout() {
				this.showLoader();
				this.$store.dispatch('logoutUser');
			}
		}
	}
</script>