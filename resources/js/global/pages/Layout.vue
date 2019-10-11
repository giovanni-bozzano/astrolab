<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<div id="background" class="show-for-large" v-if="['map'].includes($route.name)">
			<div class="background-surf"></div>
			<div class="background"></div>
		</div>
		<div class="shadow-box-top"></div>
		<div class="shadow-box-bottom"></div>
		<div class="off-canvas-wrapper">
			<div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
				<navigation class="off-canvas position-left reveal-for-large" data-off-canvas data-position="left"></navigation>
				<div class="off-canvas-content" data-off-canvas-content>
					<div class="title-bar hide-for-large">
						<div class="title-bar-left">
							<button class="menu-icon" type="button" data-open="navigation"></button>
						</div>
					</div>
					<div class="app-page">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
		<app-footer class="footer-container"></app-footer>
		<login-modal></login-modal>
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
	import Loader from '../components/Loader.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'login-modal': LoginModal,
			'loader': Loader
		},

		created: function() {
			this.$store.dispatch('loadPois');
			this.$store.dispatch('loadUser');
			this.$store.dispatch('loadCategories');
		},

		computed: {
			/*
				Get the POI add text.
			*/
			poiAddText() {
				return this.$store.getters.getPoiAddText;
			},
			/*
				Get the POI add status.
			*/
			poiAddStatus() {
				return this.$store.getters.getPoiAddStatus;
			}
		},

		/*
			Define what to watch in the module.
		*/
		watch: {
			/*
				When the POI added status changes, emit the success
				if the POI was added successfully!
			*/
			poiAddStatus: function() {
				if (this.poiAddStatus == 2) {
					EventBus.$emit('show-success', {
						notification: this.poiAddText
					});
				} else if (this.poiAddStatus == 3) {
					EventBus.$emit('show-error', {
						notification: this.poiAddText
					});
				}
			}
		},

		mounted: function() {
			$(document).foundation();
		}
	}
</script>
