<style lang="scss">
	.cookies-consent {
		position: fixed;
		max-width: 75%;
		z-index: 3;
		background-color: var(--background-color);
		padding: 1em;
		-webkit-box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.3);
		box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.3);
		bottom: 4rem;
		right: 1rem;
		border: solid 2.5px var(--foreground-color);
		p {
			font-size: 1.2em;
		}
	}
</style>

<template>
	<div class="cookies-consent" v-show="!cookiesConsent">
		<p>This website uses cookies to ensure you get the best experience on our website.</p>
	    <button v-on:click="accept()" class="button">Accept</button>
	</div>
</template>

<script>
	export default {
		computed: {
			cookiesConsent: function() {
				return this.$store.getters.getCookiesConsent;
			}
		},
		mounted: function() {
			this.$store.dispatch('loadCookiesConsent');
		},
		methods: {
			accept(id) {
				this.$store.dispatch('giveCookiesConsent');
			}
		}
	}
</script>