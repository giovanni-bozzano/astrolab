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
		            <a href="/">
		            	<img class="logo" src="/img/logo-white.svg" width="65px" height="auto">
		            </a>
		        </figure>
		    </div>
			<nav id="nav" class="menu-sections-container">
				<div class="menu-section" data-close="navigation">
					<a href="/">
						<li class="menu-inner"><strong>Sito</strong></li>
					</a>
				</div>
				<div class="menu-section" data-close="navigation" v-bind:class="{ 'active': $route.name.includes(['publish-poi']) }">
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
