<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	div#point-page {
		position: absolute;
		right: 30px;
		top: 125px;
		background: #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(3,27,78,0.10);
		width: 100%;
		max-width: 480px;
		padding: 20px;
		padding-top: 10px;
		img.close-icon {
			float: right;
			cursor: pointer;
			margin-top: 10px;
		}
		h2.point-title {
			color: #342C0C;
			font-size: 36px;
			line-height: 44px;
			font-family: "Lato", sans-serif;
			font-weight: bolder;
		}
		label.point-label {
			font-family: "Lato", sans-serif;
			text-transform: uppercase;
			font-weight: bold;
			color: black;
			margin-top: 20px;
			margin-bottom: 10px;
		}
		div.address-container {
			color: #666666;
			font-size: 18px;
			line-height: 23px;
			font-family: "Lato", sans-serif;
			margin-bottom: 5px;
			span.address {
				display: block;
			}
		}
		a.suggest-point-edit{
			font-family: "Lato", sans-serif;
			color: #054E7A;
			font-size: 14px;
			display: inline-block;
			margin-top: 30px;
			text-decoration: underline;
		}
	}
	/* Small only */
	@media screen and (max-width: 39.9375em) {
		div#point-page {
			position: fixed;
			right: 0px;
			left: 0px;
			top: 0px;
			bottom: 0px;
			z-index: 99999;
		}
	}
	/* Medium only */
	@media screen and (min-width: 40em) and (max-width: 63.9375em) {
	}
	/* Large only */
	@media screen and (min-width: 64em) and (max-width: 74.9375em) {
	}
</style>

<template>
	<div id="point-page">
		<a v-on:click="leavePoint()">
			<img class="close-icon" src="/img/close-icon.svg"/>
		</a>
		<h2 class="point-title">{{ point.name }}</h2>
		<div class="grid-x">
			<div class="large-12 medium-12 small-12 cell">
				<label class="point-label">Categories</label>
				<div class="category option" v-for="category in point.categories">
					<div class="option-container">
						<img v-bind:src="'/img/icons/' + category.icon + '.svg'" class="option-icon"/> <span class="option-name">{{ category.name }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-x">
			<div class="large-12 medium-12 small-12 cell">
				<label class="point-label">Address</label>
				<div class="address-container">
					<span class="address">{{ point.address }}</span>
				</div>
				<router-link :to="{ name: 'editpoint', params: { id: point.id } }" v-show="userLoadStatus == 2 && user != ''" class="suggest-point-edit">
					Suggest an edit
				</router-link>
				<a class="suggest-point-edit" v-if="userLoadStatus == 2 && user == ''" v-on:click="loginToEdit()">
					Sign in to make an edit
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../event-bus.js';

	export default {
		/*
			When created, load the point based on the ID in the
			route parameter.
		*/
		created() {
			this.$store.dispatch('toggleShowFilters', { showFilters : false });
			this.$store.dispatch('changePointsView', 'map' );
			this.$store.dispatch('loadPoint', {
				id: this.$route.params.id
			});
		},
		/*
			Defines what to watch in the component.
		*/
		watch: {
			/*
				When the route changes, we load the new point.
			*/
			'$route.params.id': function() {
				this.$store.dispatch('loadPoint', {
					id: this.$route.params.id
				});
			},
			/*
				Watch for when the point has been loaded successfully.
			*/
			pointLoadStatus: function() {
				/*
					If the point has been loaded successfully, zoom to the point.
				*/
				if (this.pointLoadStatus == 2) {
					EventBus.$emit('point-selected', { lat: parseFloat(this.point.latitude), lng: parseFloat(this.point.longitude) });
				}
				/*
					If the point has been loaded unsuccessfully, show an error and go
					back to the points page.
				*/
				if (this.pointLoadStatus == 3) {
					EventBus.$emit('show-error', { notification: 'Point not found!'});
					this.$router.push({ name: 'points' });
				}
			}
		},
		/*
			Defines the computed variables on the point.
		*/
		computed: {
			/*
				Grabs the point load status from the Vuex state.
			*/
			pointLoadStatus() {
				return this.$store.getters.getPointLoadStatus;
			},
			/*
				Grabs the point from the Vuex state.
			*/
			point() {
				return this.$store.getters.getPoint;
			},
			/*
				Gets the authenticated user.
			*/
			user() {
				return this.$store.getters.getUser;
			},
			/*
				Gets the user's load status.
			*/
			userLoadStatus() {
				return this.$store.getters.getUserLoadStatus;
			}
		},
		/*
			Defines the methods used by the component.
		*/
		methods: {
			/*
				Requires the user be logged in to edit.
			*/
			loginToEdit(){
				EventBus.$emit('prompt-login');
			},
			leavePoint() {
				this.$router.push({ name: 'points' });
			}
		}
	}
</script>
