<template>
	<div id="points-categories">
		<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
				<div class="point" v-on:mouseenter="toggleSelectedPoint(category.id, point.id)" v-on:mouseleave="toggleSelectedPoint(null, null)" v-for="point in expandedPoints(category.id)">
					<li class="point-name">{{ point.name }}</li>
				</div>
			</div>
		</div>
				<div v-for="category in categories">
			<div class="category" v-on:mouseenter="toggleSelectedCategory(category.id)" v-on:mouseleave="toggleSelectedCategory(null)" v-on:click="toggleExpandedCategory($event, category.id)">
				<img class="category-icon" src="/img/point-marker.png"></img><li class="category-name"> {{ category.name }}</li>
			</div>
			<div class="category-points" v-bind:class="{ 'collapsed': category.id != expandedCategory }">
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
