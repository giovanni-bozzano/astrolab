<style lang="scss">
	.loader-container {
		text-align: center;
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


	var doc = window.document;
	
	// If there's a hash, or addEventListener is undefined, stop here
	if(!window.navigator.standalone && !location.hash && window.addEventListener ){
		
		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return window.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
		
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );
		
		window.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		}, false );
	}



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
