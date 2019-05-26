<template>
	<div id="home-page" class="right-container">
		<div class="shadow-box-top"></div>
		<div class="shadow-box-bottom"></div>
		<div class="categories">
			<points-categories></points-categories>
		</div>
		<div class="map">
			<points-map></points-map>
		</div>
	</div>
</template>

<script>
	import PointsCategories from '../components/points/PointsCategories.vue';
	import PointsMap from '../components/points/PointsMap.vue';

	export default {
		components: {
			'points-categories': PointsCategories,
			'points-map': PointsMap
		},

		created: function() {
			document.addEventListener('mousemove', this.update);
			document.addEventListener('touchmove', this.update);
		},

		methods: {
			update: function(e) {
				document.documentElement.style.setProperty('--cursorX', e.clientX + 'px');
				document.documentElement.style.setProperty('--cursorY', e.clientY + 'px');
			}
		}
	}
</script>
