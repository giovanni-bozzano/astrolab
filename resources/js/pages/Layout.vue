<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<div id="background" class="show-for-large" v-if="['home'].includes($route.name)">
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
	</div>
</template>

<script>
	/*
		Imports the Event Bus to pass events on tag updates
	*/
	import { EventBus } from '../event-bus.js';

	/*
		Define the components used in the Layout
	*/
	import SuccessNotification from '../components/global/SuccessNotification.vue';
	import ErrorNotification from '../components/global/ErrorNotification.vue';
	import Navigation from '../components/global/Navigation.vue';
	import Footer from '../components/global/Footer.vue';
	import LoginModal from '../components/global/LoginModal.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'login-modal': LoginModal
		},

		created: function() {
			this.$store.dispatch('loadPoints');
			this.$store.dispatch('loadUser');
			this.$store.dispatch('loadCategories');
		},

		computed: {
			/*
				Get the point that was added.
			*/
			pointAdded() {
				return this.$store.getters.getPointAdded;
			},
			/*
				Get the point added status.
			*/
			pointAddStatus() {
				return this.$store.getters.getPointAddStatus;
			}
		},

		/*
			Define what to watch in the module.
		*/
		watch: {
			/*
				When the point added status changes, emit the success
				if the point was added successfully!
			*/
			pointAddStatus: function() {
				if (this.pointAddStatus == 2) {
					EventBus.$emit('show-success', {
						notification: this.pointAdded.name + ' has been added!'
					});
				}
			}
		},

		mounted: function() {
			$(document).foundation();
		}
	}
</script>
