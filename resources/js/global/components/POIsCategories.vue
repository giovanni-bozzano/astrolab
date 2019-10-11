<template>
	<div id="pois-categories">
		<div v-for="category in categories" v-if="categories.length > 1">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/poi-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-pois" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="poi" v-on:mouseenter="toggleSelectedPoi(category.id, poi.id)" v-on:mouseleave="toggleSelectedPoi(null, null)" v-for="poi in expandedPois(category.id)">
					<li class="poi-name">{{ poi.name }}</li>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="poi" v-on:mouseenter="toggleSelectedPoi(categories[0].id, poi.id)" v-on:mouseleave="toggleSelectedPoi(null, null)" v-for="poi in expandedPois(categories[0].id)">
				<li class="poi-name">{{ poi.name }}</li>
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
				Gets the POIs
			*/
			pois: function() {
				return this.$store.getters.getPois;
			},
			categories: function() {
				return this.$store.getters.getCategories;
			}
		},

		/*
			Defines the methods used by the component.
		*/
		methods: {
			expandedPois: function(id) {
				return this.pois.filter(function(poi) {
		        	return poi.category_id == id;
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
			toggleSelectedPoi: function(categoryId, poiId) {
				this.$store.dispatch('toggleSelectedCategory', categoryId);
				this.$store.dispatch('toggleSelectedPoi', poiId);
			}
		}
	}
</script>
