<template>
	<transition name="slide-in-top">
		<div class="success-notification-container" v-show="show">
			<div class="success-notification">
				<img src="/img/success.svg"/> {{ successMessage }}
			</div>
		</div>
	</transition>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	
	export default {
		/*
			Defines the data used by the component.
		*/
		data: function() {
			return {
				successMessage: '',
				show: false
			}
		},
		/*
			Sets up the component when mounted.
		*/
		mounted: function() {
			/*
				On show success, show the notification.
			*/
			EventBus.$on('show-success', function(data) {
				this.successMessage = data.notification;
				this.show = true;
				/*
					After 3 seconds hide the notification.
				*/
				setTimeout(function() {
					this.show = false;
				}.bind(this), 3000);
			}.bind(this));
		}
	}
</script>
