<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<div class="shadow-box-top"></div>
		<div class="shadow-box-bottom"></div>
		<div class="title-bar hide-for-medium">
			<div class="title-bar-left">
				<button class="menu-icon" type="button" data-open="navigation"></button>
			</div>
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
		<app-footer class="footer-container show-for-large"></app-footer>
		<cookie-consent></cookie-consent>
		<loader></loader>
	</div>
</template>

<script>
	/*
		Imports the Event Bus to pass events on tag updates
	*/
	import { EventBus } from '../../event-bus.js';

	/*
		Define the components used in the Layout
	*/
	import SuccessNotification from '../../global/components/SuccessNotification.vue';
	import ErrorNotification from '../../global/components/ErrorNotification.vue';
	import Navigation from '../components/Navigation.vue';
	import Footer from '../../global/components/Footer.vue';
	import CookieConsent from '../../global/components/CookieConsent.vue';
	import Loader from '../../global/components/Loader.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'cookie-consent': CookieConsent,
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
