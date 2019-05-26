<template>
	<div id="new-point-page" class="right-container">
		<div class="shadow-box-top"></div>
		<div class="shadow-box-bottom"></div>
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<h1>Aggiungi Punto</h1>
					<router-link :to="{ name: 'home' }">
						<img src="/img/close-modal.svg" id="back"/>
					</router-link>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<label>Nome</label>
					<input type="text" id="name" placeholder="Nome" class="form-input" autocomplete="off" v-model="name" v-bind:class="{'invalid' : !validations.name.is_valid }"/>
					<div class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<label>Indirizzo</label>
					<input type="text" id="address" placeholder="Indirizzo" class="form-input" autocomplete="off" v-model="address"/>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<label>Descrizione</label>
					<textarea rows="4" id="description" placeholder="Descrizione" class="form-input"  v-model="description" v-bind:class="{'invalid' : !validations.description.is_valid }"/>
					<div class="validation" v-show="!validations.description.is_valid">{{ validations.description.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<label>Categoria</label>
					<div class="options">
						<div class="category option" v-on:click="toggleSelectedCategory(category.id)" v-for="category in categories" v-bind:class="{'active': category.id == selectedCategory }">
							<div class="option-container">
								<img class="option-icon" v-bind:src="'/img/icons/' + category.icon + '.svg'"/> <span class="option-name">{{ category.name }}</span>
							</div>
						</div>
						<div class="clear"></div>
					</div>
					<div class="validation" v-show="!validations.category.is_valid">{{ validations.category.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<label>Posizione</label>
					<points-map ref="map"></points-map>
					<div class="validation" v-show="!validations.position.is_valid">{{ validations.position.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="large-8 medium-9 small-12 cell">
					<a class="add-point-button" v-on:click="submitNewPoint()">Add Point</a>
				</div>
			</div>
		</div>
	</div>
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
					category: {
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
			document.getElementById('points-map-canvas').style.border = '1px solid #FFFFFF';
		},
		watch: {
			pointAddStatus: function() {
				if (this.pointAddStatus == 2) {
					/*
						Clear the form.
					*/
					this.clearForm();
					/*
						Go back to the home page.
					*/
					this.$router.push({ name: 'home' });
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

				if (this.selectedCategory == null) {
					validNewPointForm = false;
					this.validations.category.is_valid = false;
					this.validations.category.text = 'Please select a category for the new point!';
				} else {
					this.validations.category.is_valid = true;
					this.validations.category.text = '';
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
