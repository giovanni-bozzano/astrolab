<style lang="scss">
	.footer-wrap {
		padding-top: 0.5rem;
		font-size: 1.2em;
	}
</style>
<template>
	<div class="footer-wrap">
		<text-marquee :speed="40">Per qualsiasi informazione // <a href="mailto:progettoastrolab@gmail.com" target="_blank">progettoastrolab@gmail.com</a> <a href="https://www.facebook.com/progettoastrolab/" target="_blank">Facebook</a> o <a href="https://www.instagram.com/progettoastrolab/" target="_blank">Instagram</a></text-marquee>
	</div>
</template>

<script>
	import TextMarquee from '../components/TextMarquee.vue';

	export default {
		components: {
			'text-marquee': TextMarquee
		}
	}
</script>