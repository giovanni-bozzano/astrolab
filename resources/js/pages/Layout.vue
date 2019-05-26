<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<main class="container-large">
				<div id="background" v-if="['home'].includes($route.name)">
				<div class="background-surf"></div>
				<div class="background"></div>
			</div>
			<navigation class="left-container"></navigation>
			<router-view></router-view>
			<app-footer class="footer-container"></app-footer>
		</main>
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
		}
	}
</script>
