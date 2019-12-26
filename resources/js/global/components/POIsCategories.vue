<template>
	<div class="pois-categories-wrapper">
<!--
		<div v-for="category in categories" v-if="categories.length > 1">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/poi-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-pois" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<router-link :to="{ name: 'poi', params: { id: poi.id }}" v-for="poi in expandedPois(categories[0].id)" v-bind:key="poi.id">
					<div class="poi" v-on:mouseenter="toggleSelectedPoi(category.id, poi.id)" v-on:mouseleave="toggleSelectedPoi(null, null)">
						<li class="poi-name">{{ poi.name }}</li>
					</div>
				</router-link>
			</div>
		</div>
-->
		<div class="pois-categories-container" v-for="category in categories">
			<router-link :to="{ name: 'poi', params: { id: poi.id }}" v-for="poi in expandedPois(categories[0].id)" v-bind:key="poi.id">
				<button :ref="'poi-' + poi.id" class="button" v-on:mouseenter="toggleSelectedPoi(categories[0].id, poi.id)" v-on:mouseleave="toggleSelectedPoi(null, null)">{{ poi.name }}</button>
				<br class="show-for-large" />
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				expandedCategory: null,
				previouslySelectedPoi: null
			};
		},

		computed: {
			pois: function() {
				return this.$store.getters.getPois;
			},
			categories: function() {
				return this.$store.getters.getCategories;
			},
			selectedPoi: function() {
				return this.$store.getters.getSelectedPoi;
			}
		},
		
		watch: {
			selectedPoi: function() {
				this.highlightPoi();
			}
		},

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
			},
			highlightPoi: function() {
				if (this.selectedPoi == null) {
					this.$refs['poi-' + this.previouslySelectedPoi][0].blur();
					return;
				}
				this.$refs['poi-' + this.selectedPoi][0].focus();
				this.previouslySelectedPoi = this.selectedPoi;
			}
		}
	}
</script>