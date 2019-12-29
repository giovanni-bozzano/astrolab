<template>
	<div class="pois-categories-container" v-for="category in categories">
		<router-link :to="{ name: 'poi', params: { id: poi.id }}" v-for="poi in expandedPois(categories[0].id)" v-bind:key="poi.id">
			<button :ref="'poi-' + poi.id" class="button" v-on:mouseenter="toggleSelectedPoi(categories[0].id, poi.id)" v-on:mouseleave="toggleSelectedPoi(null, null)">{{ poi.name }}</button>
		</router-link>
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

		mounted: function() {
			this.toggleSelectedPoi(null, null);
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
					if (this.previouslySelectedPoi == null) {
						return;
					}
					this.$refs['poi-' + this.previouslySelectedPoi][0].blur();
					this.previouslySelectedPoi = null;
				} else {
					this.$refs['poi-' + this.selectedPoi][0].focus();
					this.previouslySelectedPoi = this.selectedPoi;
				}				
			}
		}
	}
</script>