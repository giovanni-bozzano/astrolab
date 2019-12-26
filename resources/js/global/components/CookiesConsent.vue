<template>
	<div class="cookies-consent" v-show="!cookiesConsent">
		<h4>Cookies &amp; Privacy</h4>
		<p>This website uses cookies to ensure you get the best experience on our website.</p>
		<p><button v-on:click="accept()" type="button">Accept Cookies</button></p>
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