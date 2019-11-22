<template>
	<transition name="slide-in-top">
		<div class="success-notification-container" v-show="show">
			<div class="success-notification">
				<img src="/img/success.svg"/> {{ text }}
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
				show: false
			}
		},
		computed: {
			text: function() {
				return this.$store.getters.getNotificationText;
			}
		},
		/*
			Sets up the component when mounted.
		*/
		mounted: function() {
			EventBus.$on('show-success', function() {
				this.show = true;
				/*
					Hide the notification after 3 seconds.
				*/
				setTimeout(function() {
					this.show = false;
				}.bind(this), 3000);
			}.bind(this));
		}
	}
</script>