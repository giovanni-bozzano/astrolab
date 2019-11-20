<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<div id="background" class="show-for-large" v-show="$route.name.endsWith('map')">
			<div class="background-surf"></div>
			<div class="background"></div>
		</div>
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
		<login-modal></login-modal>
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
	import SuccessNotification from '../components/SuccessNotification.vue';
	import ErrorNotification from '../components/ErrorNotification.vue';
	import Navigation from '../components/Navigation.vue';
	import Footer from '../components/Footer.vue';
	import LoginModal from '../components/LoginModal.vue';
	import CookieConsent from '../components/CookieConsent.vue';
	import Loader from '../components/Loader.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'login-modal': LoginModal,
			'cookie-consent': CookieConsent,
			'loader': Loader
		},

		created: function() {
			this.$store.dispatch('loadPois');
			this.$store.dispatch('loadUser');
			this.$store.dispatch('loadCategories');
			document.addEventListener('mousemove', this.update);
			document.addEventListener('touchmove', this.update);
		},

		mounted: function() {
			$(document).foundation();
		},

		methods: {
			update: function(e) {
				document.documentElement.style.setProperty('--cursorX', e.clientX + 'px');
				document.documentElement.style.setProperty('--cursorY', e.clientY + 'px');
			}
		}
	}
</script>
