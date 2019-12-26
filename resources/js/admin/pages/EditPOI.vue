<template>
	<div id="edit-poi-page" class="page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-10 page-title">
					<h1>Modifica luogo</h1>
				</div>
				<div class="cell large-2 medium-2 small-2 back-container">
					<router-link :to="{ name: 'current-pois' }">
						<img src="/img/close-modal.svg" class="back"/>
					</router-link>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<label>Nome</label>
					<input type="text" id="name" placeholder="Inserisci un nome..." class="form-input" autocomplete="off" v-model="name" v-bind:class="{'invalid' : !validations.name.is_valid }"/>
					<div class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<label>Indirizzo</label>
					<input type="text" id="address" placeholder="Inserisci un indirizzo..." class="form-input" autocomplete="off" v-model="address" v-bind:class="{'invalid' : !validations.address.is_valid }"/>
					<div class="validation" v-show="!validations.address.is_valid">{{ validations.address.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<label>Coordinate</label>
					<input type="text" id="coordinates" placeholder="Inserisci delle coordinate..." class="form-input" autocomplete="off" v-model="coordinates"/>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<label>Descrizione</label>
					<textarea rows="4" id="description" placeholder="Inserisci una descrizione..." class="form-input"  v-model="description" v-bind:class="{'invalid' : !validations.description.is_valid }"/>
					<div class="validation" v-show="!validations.description.is_valid">{{ validations.description.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x" v-if="categories.length > 1">
				<div class="cell large-8 medium-9 small-12">
					<label>Categoria</label>
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
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<label>Hashtag</label>
					<input type="text" id="hashtag" placeholder="Inserisci un hashtag..." class="form-input" autocomplete="off" v-model="hashtag" v-bind:class="{'invalid' : !validations.hashtag.is_valid }"/>
					<div class="validation" v-show="!validations.hashtag.is_valid">{{ validations.hashtag.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<label>Posizione</label>
					<div>
						<pois-map ref="map"></pois-map>
					</div>
					<div class="validation" v-show="!validations.position.is_valid">{{ validations.position.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<a class="button" v-on:click="editPoi()">Conferma</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';
	import POIsMap from '../../global/components/POIsMap.vue';

	export default {
		components: {
			'pois-map': POIsMap
		},

		data: function() {
			return {
				id: null,
				name: '',
				address: '',
				coordinates: '',
				description: '',
				category_id: null,
				hashtag: '',
				validations: {
					name: {
						is_valid: true,
						text: ''
					},
					address: {
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
					hashtag: {
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
			categories: function() {
				return this.$store.getters.getCategories;
			},
			poiEditStatus: function() {
				return this.$store.getters.getPoiEditStatus;
			},
			poisLoadStatus: function() {
				return this.$store.getters.getPoisLoadStatus;
			},
			poi: function() {
				return this.$store.getters.getPoi(this.$route.params.id);
			}
		},

		watch: {
			poiEditStatus: function() {
				if (this.poiEditStatus == 2) {
					this.clearForm();
					EventBus.$emit('show-success');
					this.$router.push({ name: 'current-pois' });
				} else if (this.poiEditStatus == 3) {
					EventBus.$emit('show-error');
				}
			},
			poisLoadStatus: function() {
				if (this.poisLoadStatus == 2 && this.poi != null) {
					this.id = this.poi.id;
					this.name = this.poi.name;
					this.address = this.poi.address;
					if (this.poi.coordinates != null) {
						this.coordinates = this.poi.coordinates;
					}
					this.description = this.poi.description;
					this.category_id = this.poi.category_id;
					if (this.poi.hashtag != null) {
						this.hashtag = this.poi.hashtag;
					}
					this.latitude = this.poi.latitude;
					this.longitude = this.poi.longitude;
					this.$refs.map.addNewMarker(this.poi.latitude, this.poi.longitude);
				}
			}
		},

		mounted: function() {
			if (this.poisLoadStatus == 2 && this.poi != null) {
				this.id = this.poi.id;
				this.name = this.poi.name;
				this.address = this.poi.address;
				if (this.poi.coordinates != null) {
					this.coordinates = this.poi.coordinates;
				}
				this.description = this.poi.description;
				this.category_id = this.poi.category_id;
				if (this.poi.hashtag != null) {
					this.hashtag = this.poi.hashtag;
				}
				this.latitude = this.poi.latitude;
				this.longitude = this.poi.longitude;
				this.$refs.map.addNewMarker(this.poi.latitude, this.poi.longitude);
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
			editPoi: function() {
				if (this.categories.length == 1) {
					this.toggleSelectedCategory(this.categories[0].id);
				}
				if (this.validateForm()) {
					this.$store.dispatch('editPoi', {
						id: this.id,
						name: this.name,
						address: this.address,
						coordinates: this.coordinates,
						description: this.description,
						category_id: this.category_id,
						hashtag: this.hashtag,
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

				if (this.address.trim() == '') {
					validForm = false;
					this.validations.address.is_valid = false;
					this.validations.address.text = 'Inserisci un indirizzo per il luogo!';
				} else {
					this.validations.address.is_valid = true;
					this.validations.address.text = '';
				}

				if (this.description.trim() == '') {
					validForm = false;
					this.validations.description.is_valid = false;
					this.validations.description.text = 'Inserisci una descrizione per il luogo!';
				} else {
					this.validations.description.is_valid = true;
					this.validations.description.text = '';
				}

				if (this.category_id == null) {
					validForm = false;
					this.validations.category.is_valid = false;
					this.validations.category.text = 'Seleziona una categoria per il luogo!';
				} else {
					this.validations.category.is_valid = true;
					this.validations.category.text = '';
				}

				if (this.hashtag != null && (this.hashtag.includes(' ') || this.hashtag.includes('#'))) {
					validForm = false;
					this.validations.hashtag.is_valid = false;
					this.validations.hashtag.text = 'L\'hashtag non deve contenere spazi o il carattere #';
				} else {
					this.validations.hashtag.is_valid = true;
					this.validations.hashtag.text = '';
				}

				if (this.$refs.map.$canvas.newMarker == null) {
					validForm = false;
					this.validations.position.is_valid = false;
					this.validations.position.text = 'Seleziona una posizione nella mappa!';
				} else {
					this.validations.position.is_valid = true;
					this.validations.position.text = '';
				}

				return validForm;
			},
			clearForm: function() {
				this.id = null;
				this.name = '';
				this.address = '';
				this.coordinates = '';
				this.description = '';
				if (this.$refs.map.$canvas.newMarker != null) {
					this.$refs.map.$canvas.newMarker = null;
				}
				this.category_id = null;
				this.hashtag = '';
				this.validations = {
					name: {
						is_valid: true,
						text: ''
					},
					address: {
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
					hashtag: {
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