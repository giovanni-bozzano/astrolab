<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<div class="shadow-box-top show-for-medium"></div>
		<div class="shadow-box-bottom"></div>
		<div id="background" class="show-for-large" v-show="$route.name.endsWith('map')">
			<div class="background-surf"></div>
			<div class="background"></div>
		</div>
		<div class="title-bar hide-for-medium">
			<button class="menu-icon" type="button" data-open="navigation"></button>
			<figure class="logo-wrap-small">
				<router-link :to="{ name: 'map'}">
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
		<login-modal></login-modal>
		<cookies-consent></cookies-consent>
		<loader></loader>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	import SuccessNotification from '../components/SuccessNotification.vue';
	import ErrorNotification from '../components/ErrorNotification.vue';
	import Navigation from '../components/Navigation.vue';
	import Footer from '../components/Footer.vue';
	import LoginModal from '../components/LoginModal.vue';
	import CookiesConsent from '../components/CookiesConsent.vue';
	import Loader from '../components/Loader.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'login-modal': LoginModal,
			'cookies-consent': CookiesConsent,
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
				if (e.clientX == undefined || e.clientY == undefined) {
					$('#background').hide();
				}
				document.documentElement.style.setProperty('--cursorX', e.clientX + 'px');
				document.documentElement.style.setProperty('--cursorY', e.clientY + 'px');
			}
		}
	}
</script>