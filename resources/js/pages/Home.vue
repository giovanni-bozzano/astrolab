<style lang="scss">
	@import 'resources/sass/components/_navigation.scss';
	div#home-page {
		overflow: hidden;
	    display: grid;
	    grid-template-rows: [row0-start] auto [row0-end];
	    grid-template-columns: [col0-start] 300px [col0-end col1-start] auto [col1-end];
	    grid-template-areas: "menu content";
		.categories {
			overflow: auto;
		  	grid-area: menu;
		   	grid-column-start: col0-start;
		   	grid-column-end: col0-end;
		   	grid-row-start: row0-start;
		   	grid-row-end: row0-end;
		}
		.map {
			overflow: hidden;
		    grid-area: content;
		    grid-column-start: col1-start;
		    grid-column-end: col1-end;
		    grid-row-start: row0-start;
		    grid-row-end: row0-end;
		}
	}
</style>
<template>
	<div id="home-page" class="right-container">
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
				var x = e.clientX || e.touches[0].clientX;
				var y = e.clientY || e.touches[0].clientY;
				document.documentElement.style.setProperty('--cursorX', x + 'px');
				document.documentElement.style.setProperty('--cursorY', y + 'px');
			}
		}
	}
</script>
