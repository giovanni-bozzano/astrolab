<style lang="scss">
	.footer-wrap {
		padding-top: 0.5rem;
		font-size: 1.2em;
	}
</style>
<template>
	<div class="footer-wrap">
		<marquee-text :duration="30" :repeat="10" :paused="paused"><div v-on:mouseover="paused = true" v-on:mouseout="paused = false">Per qualsiasi informazione // <a href="mailto:progettoastrolab@gmail.com" target="_blank" rel="noopener">progettoastrolab@gmail.com</a>, <a href="https://www.facebook.com/progettoastrolab/" target="_blank" rel="noopener">Facebook</a>, <a href="https://www.instagram.com/progettoastrolab/" target="_blank" rel="noopener" style="margin-right: 20rem;">Instagram</a></div></marquee-text>
	</div>
</template>

<script>
	import MarqueeText from 'vue-marquee-text-component';

	export default {
		components: {
			'marquee-text': MarqueeText
		},

		data() {
			return {
				paused: false
			};
		}
	}
</script>