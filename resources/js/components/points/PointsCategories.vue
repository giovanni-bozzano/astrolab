<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	@import 'resources/sass/components/_navigation.scss';
	div#points-categories {
		.category:before {
			content: '';
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}
		.category-icon,
		.category-name,
		.point-name {
			display: inline-block;
			vertical-align: middle;
		}
		.category-icon {
			padding-left: 50px;
		}
		.category-name,
		.point-name {
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.8em;
			color: #fff;
			letter-spacing: 0.06em;
			line-height: 40px;
		}
		.category-name {
			padding-left: 20px;
		}
		.point-name {
			padding-left: 120px;
			font-weight: lighter;
		}
		.category:hover .category-name,
		.point:hover .point-name,
		.category:hover,
		.point:hover {
		    background-color: #fff;
		    color: #000;
		    cursor: pointer;
		}
		.category-name.is-expanded {
			background-color: darken(#38cc70, 10%);
			&:before {
				transform: rotate(-225deg);
			}
		}
		.category-points {
			height: auto;
			overflow: hidden;    
			max-height: 50em;
			transition: max-height 1s;   
			@media screen and (min-width:48em) {
				max-height: 15em;
				transition: max-height 0.5s
			}
		}
		.category-points.is-collapsed {
			max-height: 0;
		}
	}
</style>

<template>
	<div id="points-categories">
		<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)" v-bind:class="{ 'is-expanded': category.id == expandedCategory }">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'is-collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				expandedCategory: null
			}
		},
		/*
			Defines the computed variables.
		*/
		computed: {
			/*
				Gets the points
			*/
			points: function() {
				return this.$store.getters.getPoints;
			},
			categories: function() {
				return this.$store.getters.getCategories;
			}
		},

		/*
			Defines the methods used by the component.
		*/
		methods: {
			expandedPoints: function(id) {
				return this.points.filter(function(point) {
		        	return point.category_id == id;
				});
			},
			toggleExpandedCategory: function(e, id) {
				if (this.expandedCategory == id) {
					this.expandedCategory = null;
				} else {
					this.expandedCategory = id;
				}
			},
			toggleSelectedCategory: function(id) {
				this.$store.dispatch('toggleSelectedCategory', id);
			},
			toggleSelectedPoint: function(categoryId, pointId) {
				this.$store.dispatch('toggleSelectedCategory', categoryId);
				this.$store.dispatch('toggleSelectedPoint', pointId);
			}
		}
	}
</script>
