<template>
	<div id="navigation">
		<div class="navigation-content">
			<div class="logo-container hide-for-small-only" data-close="navigation">
				<figure class="logo-wrap">
					<router-link :to="{ name: 'current-pois'}">
						<img class="logo" src="/img/logo-white.svg" alt="Logo" width="90px" height="auto">
					</router-link>
				</figure>
			</div>
			<nav id="nav" class="menu-sections-container">
				<div class="menu-section first-section" data-close="navigation" v-on:click="showLoader">
					<a href="/">
						<div class="menu-inner"><strong>Sito</strong></div>
					</a>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['current-pois']) }">
					<router-link :to="{ name: 'current-pois' }">
						<div class="menu-inner">Modifica</div>
					</router-link>
				</div>
				<div class="menu-section last-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['publish-poi']) }">
					<router-link :to="{ name: 'publish-poi' }">
						<div class="menu-inner">Pubblica</div>
					</router-link>
				</div>
				<div class="menu-section">
					<a v-on:click="logout()">
						<div class="menu-inner">Logout</div>
					</a>
				</div>
			</nav>
	    </div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	
	export default {
		methods: {
			showLoader() {
				EventBus.$emit('show-loader');
			},
			logout() {
				this.showLoader();
				this.$store.dispatch('logoutUser');
			}
		}
	}
</script>