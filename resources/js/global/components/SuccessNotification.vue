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
	import { EventBus } from '../../event-bus.js';
	
	export default {
		data: function() {
			return {
				show: false
			};
		},

		computed: {
			text: function() {
				return this.$store.getters.getNotificationText;
			}
		},

		mounted: function() {
			EventBus.$on('show-success', function() {
				this.show = true;
				setTimeout(function() {
					this.show = false;
				}.bind(this), 3000);
			}.bind(this));
		}
	}
</script>