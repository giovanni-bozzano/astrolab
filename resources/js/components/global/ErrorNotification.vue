<template>
	<transition name="slide-in-top">
		<div class="error-notification-container" v-show="show">
			<div class="error-notification">
				<img src="/img/error.svg"/> {{ errorMessage }}
			</div>
		</div>
	</transition>
</template>

<script>
	/*
		Imports the Event Bus to pass events on tag updates
	*/
	import { EventBus } from '../../event-bus.js';
	export default {
		/*
			Defines the data used by the component.
		*/
		data: function() {
			return {
				errorMessage: '',
				show: false
			}
		},
		/*
			When mounted, bind the show error event.
		*/
		mounted: function() {
			EventBus.$on('show-error', function(data) {
				this.errorMessage = data.notification;
				this.show = true;
				/*
					Hide the error notification after 3 seconds.
				*/
				setTimeout(function() {
					this.show = false;
				}.bind(this), 3000);
			}.bind(this));
		}
	}
</script>
