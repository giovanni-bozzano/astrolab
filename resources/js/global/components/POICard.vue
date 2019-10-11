<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	div.point-card {
		border-radius: 5px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
		padding: 15px 5px 5px 5px;
		margin-top: 20px;
		cursor: pointer;
		-webkit-transform: scaleX(1) scaleY(1);
		transform: scaleX(1) scaleY(1);
		transition: .2s;
		span.title {
			display: block;
			text-align: center;
			color: black;
			font-size: 18px;
			font-weight: bold;
			font-family: 'Lato', sans-serif;
		}
		span.address {
			display: block;
			text-align: center;
			margin-top: 5px;
			color: $grey;
			font-family: 'Lato', sans-serif;
			span.street {
				font-size: 14px;
				display: block;
			}
		}
		&:hover {
			-webkit-transform: scaleX(1.041) scaleY(1.041);
			transform: scaleX(1.041) scaleY(1.041);
			transition: .2s;
		}
	}
</style>

<template>
	<div class="large-3 medium-4 small-6 cell poi-card-container" v-show="show">
		<router-link :to="{ name: 'poi', params: { id: poi.id} }" v-on:click.native="panToLocation(poi)">
			<div class="poi-card">
				<span class="title">{{ poi.name }}</span>
				<span class="address">
					<span class="street">{{ poi.address }}</span>
				</span>
			</div>
		</router-link>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	import { PointCategoriesFilter } from '../../mixins/filters/PoiCategoriesFilter.js';

	export default {
		/*
			The component accepts one POI as a property
		*/
		props: ['poi'],
		/*
			Define the data used by the component.
		*/
		data: function() {
			return {
				show: true
			}
		},
		/*
			Define the mixins used by the component.
		*/
		mixins: [
			PoiCategoriesFilter
		],
		/*
			Listen to the mounted lifecycle hook.
		*/
		mounted: function() {
			/*
				When the filters are updated, we process the filters.
			*/
			EventBus.$on('filters-updated', function(filters) {
				this.processFilters( filters );
			}.bind(this));
			/*
				Apply filters
			*/
			this.processFilters();
		},
		/*
			Defines the computed variables.
		*/
		computed: {
			/*
				Gets the categories filter from the Vuex data store.
			*/
			categoriesFilter: function() {
				return this.$store.getters.getCategoriesFilter;
			}
		},
		/*
			Defines what should be watched by the point card.
		*/
		watch: {
			/*
				Watches the categories filter.
			*/
			categoriesFilter: function() {
				this.processFilters();
			}
		},
		/*
			Defines the methods used by the component.
		*/
		methods: {
			/*
				Process the selected filters from the user.
			*/
			processFilters: function() {
				if (this.categoriesFilter.length == 0 || this.processPoiCategoriesFilter(this.poi, this.categoriesFilter)) {
					this.show = true;
				} else {
					this.show = false;
				}
			},
			/*
				Pans to the location of the point on the map when selected.
			*/
			panToLocation: function(point) {
				EventBus.$emit('location-selected', { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) });
			}
		}
	}
</script>
