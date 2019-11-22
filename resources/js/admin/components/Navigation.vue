<template>
	<div id="navigation">
		<div class="navigation-content">
			<div class="logo-container hide-for-small-only" data-close="navigation">
				<figure class="logo-wrap">
					<router-link :to="{ name: 'current-pois'}">
						<img class="logo" src="/img/logo-white.svg" width="90px" height="auto">
					</router-link>
				</figure>
			</div>
			<nav id="nav" class="menu-sections-container">
				<div class="menu-section first-section" data-close="navigation">
					<a href="/">
						<li class="menu-inner"><strong>Sito</strong></li>
					</a>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['current-pois']) }">
					<router-link :to="{ name: 'current-pois' }">
						<li class="menu-inner">Modifica</li>
					</router-link>
				</div>
				<div class="menu-section last-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['publish-poi']) }">
					<router-link :to="{ name: 'publish-poi' }">
						<li class="menu-inner">Pubblica</li>
					</router-link>
				</div>
				<div class="menu-section" data-close="navigation">
					<a v-on:click="logout()">
						<li class="menu-inner">Logout</li>
					</a>
				</div>
			</nav>
	    </div>
	</div>
</template>
<script>
	export default {
		/*
			Defines the methods for the component
		*/
		methods: {
			/*
				Logs the user out.
			*/
			logout() {
				this.$store.dispatch('logoutUser');
			}
		}
	}
</script>