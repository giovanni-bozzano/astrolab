<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	div#poi-page {
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
		h2.poi-title {
			color: #342C0C;
			font-size: 36px;
			line-height: 44px;
			font-family: "Lato", sans-serif;
			font-weight: bolder;
		}
		label.poi-label {
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
		a.suggest-poi-edit{
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
		div#poi-page {
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
	<div id="poi-page">
		<a v-on:click="leavePoi()">
			<img class="close-icon" src="/img/close-icon.svg"/>
		</a>
		<h2 class="poi-title">{{ poi.name }}</h2>
		<div class="grid-x">
			<div class="large-12 medium-12 small-12 cell">
				<label class="poi-label">Categories</label>
				<div class="category option" v-for="category in poi.categories">
					<div class="option-container">
						<img v-bind:src="'/img/icons/' + category.icon + '.svg'" class="option-icon"/> <span class="option-name">{{ category.name }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-x">
			<div class="large-12 medium-12 small-12 cell">
				<label class="poi-label">Address</label>
				<div class="address-container">
					<span class="address">{{ poi.address }}</span>
				</div>
				<router-link :to="{ name: 'editpoi', params: { id: poi.id } }" v-show="userLoadStatus == 2 && user != ''" class="suggest-poi-edit">
					Suggest an edit
				</router-link>
				<a class="suggest-poi-edit" v-if="userLoadStatus == 2 && user == ''" v-on:click="loginToEdit()">
					Sign in to make an edit
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';

	export default {
		/*
			When created, load the POI based on the ID in the
			route parameter.
		*/
		created() {
			this.$store.dispatch('toggleShowFilters', { showFilters : false });
			this.$store.dispatch('changePoisView', 'map' );
			this.$store.dispatch('loadPoi', {
				id: this.$route.params.id
			});
		},
		/*
			Defines what to watch in the component.
		*/
		watch: {
			/*
				When the route changes, we load the new POI.
			*/
			'$route.params.id': function() {
				this.$store.dispatch('loadPoi', {
					id: this.$route.params.id
				});
			},
			/*
				Watch for when the POI has been loaded successfully.
			*/
			poiLoadStatus: function() {
				/*
					If the POI has been loaded successfully, zoom to the POI.
				*/
				if (this.poiLoadStatus == 2) {
					EventBus.$emit('poi-selected', { lat: parseFloat(this.poi.latitude), lng: parseFloat(this.poi.longitude) });
				}
				/*
					If the POI has been loaded unsuccessfully, show an error and go
					back to the POIs page.
				*/
				if (this.poiLoadStatus == 3) {
					EventBus.$emit('show-error', { notification: 'POI not found!'});
					this.$router.push({ name: 'pois' });
				}
			}
		},
		/*
			Defines the computed variables on the POI.
		*/
		computed: {
			/*
				Grabs the POI load status from the Vuex state.
			*/
			poiLoadStatus() {
				return this.$store.getters.getPoiLoadStatus;
			},
			/*
				Grabs the POI from the Vuex state.
			*/
			poi() {
				return this.$store.getters.getPoi;
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
			leavePoi() {
				this.$router.push({ name: 'pois' });
			}
		}
	}
</script>
