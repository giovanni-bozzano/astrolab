<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<div class="shadow-box-top show-for-medium"></div>
		<div class="shadow-box-bottom"></div>
		<div class="title-bar hide-for-medium">
			<button class="menu-icon" type="button" data-open="navigation"></button>
			<figure class="logo-wrap-small">
				<router-link :to="{ name: 'current-pois'}">
					<img class="logo" data-close="navigation" src="/img/logo-white-small.svg" alt="Logo" width="45px" height="auto">
				</router-link>
			</figure>
		</div>
		<div class="off-canvas-wrapper">
			<div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
				<navigation class="off-canvas position-left reveal-for-medium bottom-padding" data-off-canvas data-position="left"></navigation>
				<div class="off-canvas-content" data-off-canvas-content>
					<div class="app-page">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
		<app-footer class="footer-container show-for-medium"></app-footer>
		<cookies-consent></cookies-consent>
		<loader></loader>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	import SuccessNotification from '../../global/components/SuccessNotification.vue';
	import ErrorNotification from '../../global/components/ErrorNotification.vue';
	import Navigation from '../components/Navigation.vue';
	import Footer from '../../global/components/Footer.vue';
	import CookiesConsent from '../../global/components/CookiesConsent.vue';
	import Loader from '../../global/components/Loader.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'cookies-consent': CookiesConsent,
			'loader': Loader
		},

		created: function() {
			this.$store.dispatch('loadPois');
			this.$store.dispatch('loadUser');
			this.$store.dispatch('loadCategories');
			this.$store.dispatch('loadSuggestedPois');
		},

		mounted: function() {
			$(document).foundation();
		}
	}
</script>