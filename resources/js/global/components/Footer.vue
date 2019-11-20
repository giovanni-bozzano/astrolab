<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	.footer-wrap {
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
	}
	#mail {
		text-decoration: none;
		color: var(--foreground-color);
	}
</style>
<template>
	<div class="footer-wrap">
		<text-marquee :speed="40">Per qualsiasi informazione // <a class="mail" href="mailto:progettoastrolab@gmail.com" target="_blank">progettoastrolab@gmail.com</a></text-marquee>
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