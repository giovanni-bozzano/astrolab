<template>
	<div id="map-page" class="page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-3 medium-3 small-12 categories-cell">
					<div class="categories">
						<pois-categories></pois-categories>
					</div>
				</div>
				<div class="cell large-9 medium-9 small-12 map-cell" id="map-cell">
					<div class="map">
						<pois-map ref="map"></pois-map>
					</div>
				</div>
			</div>
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
		}
	}
</script>