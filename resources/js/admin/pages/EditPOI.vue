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
				<div class="cell large-12 medium-12 small-12">
					<label>Nome *</label>
					<input type="text" id="name" placeholder="Inserisci un nome..." class="form-input" autocomplete="off" v-model="name" v-bind:class="{'invalid' : !validations.name.is_valid }"/>
					<div class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12">
					<label>Immagine</label>
					<label for="image" class="button">Carica un'immagine</label>
					<input type="file" id="image" class="show-for-sr" accept="image/*" v-on:change="previewImage" v-bind:class="{'invalid' : !validations.image.is_valid }"/>
					<div class="validation" v-show="!validations.image.is_valid">{{ validations.image.text }}</div>
				</div>
				<div class="cell large-12 medium-12 small-12" v-if="image_url">
					<img class="image-preview" v-bind:src="image_url"/>
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
					<label>Coordinate</label>
					<input type="text" id="coordinates" placeholder="Inserisci delle coordinate..." class="form-input" autocomplete="off" v-model="coordinates"/>
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
				<div class="cell large-12 medium-12 small-12">
					<label>Hashtag</label>
					<input type="text" id="hashtag" placeholder="Inserisci un hashtag..." class="form-input" autocomplete="off" v-model="hashtag" v-bind:class="{'invalid' : !validations.hashtag.is_valid }"/>
					<div class="validation" v-show="!validations.hashtag.is_valid">{{ validations.hashtag.text }}</div>
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
				image: null,
				image_url: null,
				description: '',
				address: '',
				coordinates: '',
				email_address: '',
				phone_number: '',
				website: '',
				hashtag: '',
				category_id: null,
				validations: {
					name: {
						is_valid: true,
						text: ''
					},
					image: {
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
					hashtag: {
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
					this.image_url = this.poi.image_url;
					this.description = this.poi.description;
					this.address = this.poi.address;
					if (this.poi.coordinates != null) {
						this.coordinates = this.poi.coordinates;
					}
					if (this.poi.email_address != null) {
						this.email_address = this.poi.email_address;
					}
					if (this.poi.phone_number != null) {
						this.phone_number = this.poi.phone_number;
					}
					if (this.poi.website != null) {
						this.website = this.poi.website;
					}
					if (this.poi.hashtag != null) {
						this.hashtag = this.poi.hashtag;
					}
					this.category_id = this.poi.category_id;
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
				this.image_url = this.poi.image_url;
				this.description = this.poi.description;
				this.address = this.poi.address;
				if (this.poi.coordinates != null) {
					this.coordinates = this.poi.coordinates;
				}
				if (this.poi.email_address != null) {
					this.email_address = this.poi.email_address;
				}
				if (this.poi.phone_number != null) {
					this.phone_number = this.poi.phone_number;
				}
				if (this.poi.website != null) {
					this.website = this.poi.website;
				}
				if (this.poi.hashtag != null) {
					this.hashtag = this.poi.hashtag;
				}
				this.category_id = this.poi.category_id;
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
			previewImage(event) {
				let file = event.target.files[0];
				let extensions = ['jpeg', 'jpg', 'png'];
				if ($.inArray(file.name.substr(file.name.lastIndexOf('.') + 1), extensions) == -1) {
					this.validations.image.is_valid = false;
					this.validations.image.text = 'Carica un\'immagine in uno dei seguenti formati: \'.jpeg\', \'.jpg\', \'.png\'!';
					this.image = null;
					this.image_url = null;
					return;
				} else {
					this.validations.image.is_valid = true;
					this.validations.image.text = '';
				}
				this.image = file;
				this.image_url = URL.createObjectURL(file);
			},
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
						image: this.image,
						description: this.description,
						address: this.address,
						coordinates: this.coordinates,
						email_address: this.email_address,
						phone_number: this.phone_number,
						website: this.website,
						hashtag: this.hashtag,
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

				if (this.hashtag != null && (this.hashtag.includes(' ') || this.hashtag.includes('#'))) {
					validForm = false;
					this.validations.hashtag.is_valid = false;
					this.validations.hashtag.text = 'L\'hashtag non deve contenere spazi o il carattere #';
				} else {
					this.validations.hashtag.is_valid = true;
					this.validations.hashtag.text = '';
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
				this.image = null;
				this.image_url = null;
				this.description = '';
				this.address = '';
				this.coordinates = '';
				this.email_address = '';
				this.phone_number = '';
				this.website = '';
				this.hashtag = '';
				this.category_id = null;
				if (this.$refs.map.$canvas.newMarker != null) {
					this.$refs.map.$canvas.newMarker = null;
				}
				this.validations = {
					name: {
						is_valid: true,
						text: ''
					},
					image: {
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
					hashtag: {
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
			}
		}
	}
</script>