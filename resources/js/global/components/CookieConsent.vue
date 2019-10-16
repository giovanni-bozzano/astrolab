<style lang="scss">
	.cookie-consent {
		position: fixed;
		max-width: 88%;
		z-index: 3;
		background-color: #000;
		padding: 1em;
		-webkit-box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.3);
		box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.3);
		bottom: 4rem;
		right: 1rem;
		border: solid 2.5px #fff;
	}
</style>

<template>
	<div class="js-cookie-consent cookie-consent" v-show="show">
		<p>This website uses cookies to ensure you get the best experience on our website.</p>
	    <button v-on:click="accept()" class="button">Accept</button>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';

	export default {
		data: function() {
			return {
				show: false
			}
		},
		mounted: function() {
            if (!Cookies.get('cookie_consent')) {
                this.show = true;
            }
		},
		methods: {
			accept: function() {
                this.show = false;
                Cookies.set('cookie_consent', 1);
            },
		}
	}
</script>
