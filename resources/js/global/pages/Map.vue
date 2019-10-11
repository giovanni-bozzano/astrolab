<template>
	<div id="home-page">
		<div class="categories top-padding bottom-padding">
			<pois-categories></pois-categories>
		</div>
		<div class="map top-padding bottom-padding">
			<pois-map></pois-map>
		</div>
	</div>
</template>

<script>
	import POIsCategories from '../components/POIsCategories.vue';
	import POIsMap from '../components/POIsMap.vue';

	export default {
		components: {
			'pois-categories': POIsCategories,
			'pois-map': POIsMap
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
