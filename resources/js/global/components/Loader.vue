<style lang="scss">
.loader-container {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background-color: #000;
	span {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		color: #fff;
		top: 50%;
		left: 50%;
	}
}

</style>

<template>
	<div class="loader-container" v-show="show">
		<span>Caricamento...</span>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				show: true
			}
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
		}
	}
</script>
