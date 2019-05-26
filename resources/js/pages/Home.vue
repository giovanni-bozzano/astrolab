<template>
	<div id="home-page">
		<div class="categories top-padding bottom-padding">
			<points-categories></points-categories>
		</div>
		<div class="map top-padding bottom-padding">
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
