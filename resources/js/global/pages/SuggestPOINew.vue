<template>
	<div id="suggest-poi-new-page" class="page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-10 page-title">
					<h1>Suggerisci un nuovo luogo</h1>
				</div>
				<div class="cell large-2 medium-2 small-2 back-container">
					<router-link :to="{ name: 'suggest-poi' }">
						<img src="/img/close-modal.svg" class="back"/>
					</router-link>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Nome *</label>
					<input type="text" id="name" placeholder="Inserisci un nome..." class="form-input" autocomplete="off" v-model="name" v-bind:class="{'invalid' : !validations.name.is_valid }"/>
					<div class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Descrizione *</label>
					<textarea rows="4" id="description" placeholder="Inserisci una descrizione..." class="form-input"  v-model="description" v-bind:class="{'invalid' : !validations.description.is_valid }"/>
					<div class="validation" v-show="!validations.description.is_valid">{{ validations.description.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Indirizzo *</label>
					<input type="text" id="address" placeholder="Inserisci un indirizzo..." class="form-input" autocomplete="off" v-model="address" v-bind:class="{'invalid' : !validations.address.is_valid }"/>
					<div class="validation" v-show="!validations.address.is_valid">{{ validations.address.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Indirizzo email</label>
					<input type="text" id="email_address" placeholder="Inserisci un indirizzo email..." class="form-input" autocomplete="off" v-model="email_address"/>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Numero di telefono</label>
					<input type="text" id="phone_number" placeholder="Inserisci un numero di telefono..." class="form-input" autocomplete="off" v-model="phone_number"/>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Sito web</label>
					<input type="text" id="website" placeholder="Inserisci un indirizzo web..." class="form-input" autocomplete="off" v-model="website"/>
				</div>
				<div class="cell large-12 medium-12 small-12" v-if="categories.length > 1">
					<label>Categoria *</label>
					<div class="options">
						<div class="category option" v-on:click="toggleSelectedCategory(category.id)" v-for="category in categories" v-bind:class="{'active': category.id == category_id }">
							<div class="option-container">
								<img class="option-icon" v-bind:src="'/img/icons/' + category.icon + '.svg'"/> <span class="option-name">{{ category.name }}</span>
							</div>
						</div>
						<div class="clear"></div>
					</div>
					<div class="validation" v-show="!validations.category.is_valid">{{ validations.category.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Posizione *</label>
					<div>
						<pois-map ref="map"></pois-map>
					</div>
					<div class="validation" v-show="!validations.position.is_valid">{{ validations.position.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<p>* Campi obbligatori.</p>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<a class="button" v-on:click="suggestNewPoi()">Conferma</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	import POIsMap from '../components/POIsMap.vue';

	export default {
		components: {
			'pois-map': POIsMap
		},

		data: function() {
			return {
				id: null,
				name: '',
				description: '',
				address: '',
				email_address: '',
				phone_number: '',
				website: '',
				category_id: null,
				validations: {
					name: {
						is_valid: true,
						text: ''
					},
					description: {
						is_valid: true,
						text: ''
					},
					address: {
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
			};
		},

		computed: {
			isUserLoggedIn: function() {
				return this.$store.getters.isUserLoggedIn;
			},
			userLoadStatus: function() {
				return this.$store.getters.getUserLoadStatus;
			},
			categories: function() {
				return this.$store.getters.getCategories;
			},
			poiAddStatus: function() {
				return this.$store.getters.getPoiAddStatus;
			},
			suggestedPoi: function() {
				return this.$store.getters.getUserSuggestedPoi(this.$route.params.id);
			}
		},

		watch: {
			isUserLoggedIn: function() {
				if (!this.isUserLoggedIn) {
					this.$router.push({ name: 'suggest-poi' });
				}
			},
			poiAddStatus: function() {
				if (this.poiAddStatus == 2) {
					this.clearForm();
					EventBus.$emit('show-success');
					this.$router.push({ name: 'suggest-poi' });
				} else if (this.poiAddStatus == 3) {
					EventBus.$emit('show-error');
				}
			},
			userLoadStatus: function() {
				if (this.userLoadStatus == 2 && this.suggestedPoi != null) {
					this.id = this.suggestedPoi.id;
					this.name = this.suggestedPoi.name;
					this.description = this.suggestedPoi.description;
					this.address = this.suggestedPoi.address;
					if (this.suggestedPoi.email_address != null) {
						this.email_address = this.suggestedPoi.email_address;
					}
					if (this.suggestedPoi.phone_number != null) {
						this.phone_number = this.suggestedPoi.phone_number;
					}
					if (this.suggestedPoi.website != null) {
						this.website = this.suggestedPoi.website;
					}
					this.category_id = this.suggestedPoi.category_id;
					this.latitude = this.suggestedPoi.latitude;
					this.longitude = this.suggestedPoi.longitude;
					this.$refs.map.addNewMarker(this.suggestedPoi.latitude, this.suggestedPoi.longitude);
				}
			}
		},

		mounted: function() {
			if (this.userLoadStatus == 2 && this.suggestedPoi != null) {
				this.id = this.suggestedPoi.id;
				this.name = this.suggestedPoi.name;
				this.description = this.suggestedPoi.description;
				this.address = this.suggestedPoi.address;
				if (this.suggestedPoi.email_address != null) {
					this.email_address = this.suggestedPoi.email_address;
				}
				if (this.suggestedPoi.phone_number != null) {
					this.phone_number = this.suggestedPoi.phone_number;
				}
				if (this.suggestedPoi.website != null) {
					this.website = this.suggestedPoi.website;
				}
				this.category_id = this.suggestedPoi.category_id;
				this.latitude = this.suggestedPoi.latitude;
				this.longitude = this.suggestedPoi.longitude;
				this.$refs.map.addNewMarker(this.suggestedPoi.latitude, this.suggestedPoi.longitude);
			}
			this.$refs.map.setEditable(true);
			this.$refs.map.resizeCanvas();
			this.$refs.map.clearMarkers();
			this.$refs.map.buildMarkers();
			document.getElementById('pois-map-canvas').style.border = '1px solid #FFFFFF';
			document.getElementById('pois-map').style.marginBottom = '1rem';
		},

		methods: {
			toggleSelectedCategory: function(id) {
				this.category_id = id;
			},
			suggestNewPoi: function() {
				if (this.categories.length == 1) {
					this.toggleSelectedCategory(this.categories[0].id);
				}
				if (this.validateForm()) {
					this.$store.dispatch('suggestNewPoi', {
						id: this.id,
						name: this.name,
						description: this.description,
						address: this.address,
						email_address: this.email_address,
						phone_number: this.phone_number,
						website: this.website,
						category_id: this.category_id,
						latitude: this.$refs.map.$canvas.newMarker.x,
						longitude: this.$refs.map.$canvas.newMarker.y
					});
				}
			},
			validateForm: function() {
				let validForm = true;

				if (this.name.trim() == '') {
					validForm = false;
					this.validations.name.is_valid = false;
					this.validations.name.text = 'Inserisci un nome per il luogo!';
				} else {
					this.validations.name.is_valid = true;
					this.validations.name.text = '';
				}

				if (this.description.trim() == '') {
					validForm = false;
					this.validations.description.is_valid = false;
					this.validations.description.text = 'Inserisci una descrizione per il luogo!';
				} else {
					this.validations.description.is_valid = true;
					this.validations.description.text = '';
				}

				if (this.address.trim() == '') {
					validForm = false;
					this.validations.address.is_valid = false;
					this.validations.address.text = 'Inserisci un indirizzo per il luogo!';
				} else {
					this.validations.address.is_valid = true;
					this.validations.address.text = '';
				}

				if (this.category_id == null) {
					validForm = false;
					this.validations.category.is_valid = false;
					this.validations.category.text = 'Seleziona una categoria per il luogo!';
				} else {
					this.validations.category.is_valid = true;
					this.validations.category.text = '';
				}

				if (this.$refs.map.$canvas.newMarker == null) {
					validForm = false;
					this.validations.position.is_valid = false;
					this.validations.position.text = 'Seleziona una posizione nella mappa per il luogo!';
				} else {
					this.validations.position.is_valid = true;
					this.validations.position.text = '';
				}

				return validForm;
			},
			clearForm: function() {
				this.id = null;
				this.name = '';
				this.description = '';
				this.address = '';
				this.email_address = '';
				this.phone_number = '';
				this.website = '';
				this.category_id = null;
				if (this.$refs.map.$canvas.newMarker != null) {
					this.$refs.map.$canvas.newMarker = null;
				}
				this.validations = {
					name: {
						is_valid: true,
						text: ''
					},
					description: {
						is_valid: true,
						text: ''
					},
					address: {
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
				};
			},
		}
	}
</script>