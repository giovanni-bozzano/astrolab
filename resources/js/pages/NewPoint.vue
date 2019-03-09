<style lang="scss" scoped>
	@import 'resources/sass/abstracts/_variables.scss';
	div#new-point {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
		z-index: 99999;
		overflow: auto;
		img#back {
			float: right;
			margin-top: 20px;
			margin-right: 20px;
		}
		.centered {
			margin: auto;
		}
		h2.page-title {
			color: #342C0C;
			font-size: 36px;
			font-weight: 900;
			font-family: "Lato", sans-serif;
			margin-top: 60px;
		}
		label.form-label {
			font-family: "Lato", sans-serif;
			text-transform: uppercase;
			font-weight: bold;
			color: black;
			margin-top: 10px;
			margin-bottom: 10px;
		}
		input[type="text"].form-input {
			border: 1px solid #BABABA;
			border-radius: 3px;
			&.invalid {
				border: 1px solid #D0021B;
			}
		}
		textarea {
			border: 1px solid #BABABA;
			border-radius: 3px;
			&.invalid {
				border: 1px solid #D0021B;
			}
		}
		div.validation {
			color: #D0021B;
			font-family: "Lato", sans-serif;
			font-size: 14px;
			margin-top: -15px;
			margin-bottom: 15px;
		}
		a.add-point-button{
			display: block;
			text-align: center;
			height: 50px;
			color: white;
			border-radius: 3px;
			font-size: 18px;
			font-family: "Lato", sans-serif;
			background-color: $secondary-color;
			line-height: 50px;
			margin-top: 25px;
			margin-bottom: 50px;
		}
	}
	div#points-map-container {
		position: relative;
		width: 100%;
		height: 400px;
		top: 0px;
		div#points-map {
			position: relative;
		}
	}
</style>

<template>
	<transition name="scale-in-center">
		<div id="new-point">
			<router-link :to="{ name: 'home' }">
				<img src="/img/close-modal.svg" id="back"/>
			</router-link>

			<div class="grid-container">
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<h2 class="page-title">Add Point</h2>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<label class="form-label">Name</label>
						<input type="text" id="name" placeholder="Name" class="form-input" autocomplete="off" v-model="name" v-bind:class="{'invalid' : !validations.name.is_valid }"/>
						<div class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</div>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<label class="form-label">Address</label>
						<input type="text" id="address" placeholder="Address" class="form-input" autocomplete="off" v-model="address"/>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<label class="form-label">Description</label>
						<textarea rows="4" id="description" placeholder="Description" class="form-input"  v-model="description" v-bind:class="{'invalid' : !validations.description.is_valid }"/>
						<div class="validation" v-show="!validations.description.is_valid">{{ validations.description.text }}</div>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<label class="form-label">Available Categories</label>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<div class="category option" v-on:click="toggleSelectedCategory(category.id)" v-for="category in categories" v-bind:class="{'active': category.id == selectedCategory }">
							<div class="option-container">
								<img v-bind:src="'/img/icons/' + category.icon + '.svg'" class="option-icon"/> <span class="option-name">{{ category.name }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<label class="form-label">Position</label>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<points-map ref="map"></points-map>
						<div class="validation" v-show="!validations.position.is_valid">{{ validations.position.text }}</div>
					</div>
				</div>
				<div class="grid-x grid-padding-x">
					<div class="large-8 medium-9 small-12 cell centered">
						<a class="add-point-button" v-on:click="submitNewPoint()">Add Point</a>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import { EventBus } from '../event-bus.js';
	import PointsMap from '../components/points/PointsMap.vue';

	export default {
		components: {
			'points-map': PointsMap
		},

		data: function() {
			return {
				name: '',
				address: '',
				description: '',
				selectedCategory: null,
				validations: {
					name: {
						is_valid: true,
						text: ''
					},
					description: {
						is_valid: true,
						text: ''
					},
					position: {
						is_valid: true,
						text: ''
					}
				}
			}
		},
		computed: {
			categories: function() {
				return this.$store.getters.getCategories;
			},
			pointAddStatus: function() {
				return this.$store.getters.getPointAddStatus;
			}
		},
		mounted: function() {
			this.$refs.map.setEditable(true);
		},
		watch: {
			pointAddStatus: function() {
				if (this.pointAddStatus == 2) {
					/*
						Clear the form.
					*/
					this.clearForm();
					/*
						Go back to the points screen.
					*/
					this.$router.push({ name: 'points' });
				}
			}
		},
		methods: {
			/*
				Toggles the selected category
			*/
			toggleSelectedCategory: function(id) {
				this.selectedCategory = id;
			},
			submitNewPoint: function() {
				if (this.validateNewPoint()) {
					this.$store.dispatch('addPoint', {
						name: this.name,
						address: this.address,
						description: this.description,
						category_id: this.selectedCategory,
						latitude: this.$refs.map.$canvas.newMarker.x,
						longitude: this.$refs.map.$canvas.newMarker.y
					});
				}
			},
			validateNewPoint: function() {
				let validNewPointForm = true;

				/*
					Ensure a name has been entered
				*/
				if (this.name.trim() == '') {
					validNewPointForm = false;
					this.validations.name.is_valid = false;
					this.validations.name.text = 'Please enter a name for the new point!';
				} else {
					this.validations.name.is_valid = true;
					this.validations.name.text = '';
				}

				/*
					Ensure a description has been entered
				*/
				if (this.description.trim() == '') {
					validNewPointForm = false;
					this.validations.description.is_valid = false;
					this.validations.description.text = 'Please enter a description for the new point!';
				} else {
					this.validations.description.is_valid = true;
					this.validations.description.text = '';
				}

				if (this.$refs.map.$canvas.newMarker == null) {
					validNewPointForm = false;
					this.validations.position.is_valid = false;
					this.validations.position.text = 'Please select a position on the map!';
				} else {
					this.validations.position.is_valid = true;
					this.validations.position.text = '';
				}

				return validNewPointForm;
			},
			clearForm: function() {
				this.name = '';
				this.address = '';
				this.description = '';
				if (this.$refs.map.$canvas.newMarker != null) {
					this.$refs.map.$canvas.newMarker = null;
				}
				this.selectedCategory = null;
				this.validations = {
					name: {
						is_valid: true,
						text: ''
					},
					description: {
						is_valid: true,
						text: ''
					},
					position: {
						is_valid: true,
						text: ''
					}
				};
			}
		}
	}
</script>
