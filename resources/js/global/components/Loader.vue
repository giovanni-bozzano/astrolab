<template>
	<div class="loader-container" v-show="show">
		<p>Caricamento...</p>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	
	export default {
		data: function() {
			return {
				show: true
			};
		},

		computed: {
			userLoadStatus: function() {
				return this.$store.getters.getUserLoadStatus;
			}
		},

		watch: {
			userLoadStatus: function() {
				if (this.userLoadStatus == 2) {
					this.show = false;
				}
			}
		},
		
		mounted: function() {
			if (this.userLoadStatus == 2) {
				this.show = false;
			}
			EventBus.$on('show-loader', function() {
				this.show = true;
			}.bind(this));
		}
	}
</script>