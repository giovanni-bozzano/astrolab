<template>
	<div id="suggest-poi-page" class="top-padding bottom-padding">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<h1>Pubblica un nuovo luogo</h1>
					<router-link :to="{ name: 'publish-poi' }">
						<img src="/img/close-modal.svg" id="back"/>
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
					<label>Descrizione</label>
					<textarea rows="4" id="description" placeholder="Inserisci una descrizione..." class="form-input"  v-model="description" v-bind:class="{'invalid' : !validations.description.is_valid }"/>
					<div class="validation" v-show="!validations.description.is_valid">{{ validations.description.text }}</div>
				</div>
			</div>
			<div class="grid-x grid-padding-x" v-if="categories.length > 1">
				<div class="cell large-8 medium-9 small-12">
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
					<a class="button" v-on:click="publishNewPoi()">Conferma</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
				description: '',
				selectedCategory: null,
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
			}
		},
		computed: {
			categories: function() {
				return this.$store.getters.getCategories;
			},
			poiAddStatus: function() {
				return this.$store.getters.getPoiAddStatus;
			},
			suggestedPoisLoadStatus: function() {
				return this.$store.getters.getSuggestedPoisLoadStatus;
			},
			suggestedPoi: function() {
				return this.$store.getters.getSuggestedPoi(this.$route.params.id);
			}
		},
		watch: {
			poiAddStatus: function() {
				if (this.poiAddStatus == 2) {
					this.clearForm();
					this.$store.dispatch('loadSuggestedPois');
					this.$router.push({ name: 'publish-poi' });
				}
			},
			suggestedPoisLoadStatus: function() {
				if (this.suggestedPoisLoadStatus == 2 && this.suggestedPoi != null) {
					this.id = this.suggestedPoi.id;
					this.name = this.suggestedPoi.name;
					this.address = this.suggestedPoi.address;
					this.description = this.suggestedPoi.description;
					this.category_id = this.suggestedPoi.category_id;
					this.latitude = this.suggestedPoi.latitude;
					this.longitude = this.suggestedPoi.longitude;
					this.$refs.map.addNewMarker(this.suggestedPoi.latitude, this.suggestedPoi.longitude);
				}
			}
		},
		mounted: function() {
			if (this.suggestedPoisLoadStatus == 2 && this.suggestedPoi != null) {
				this.id = this.suggestedPoi.id;
				this.name = this.suggestedPoi.name;
				this.address = this.suggestedPoi.address;
				this.description = this.suggestedPoi.description;
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
			/*
				Toggles the selected category
			*/
			toggleSelectedCategory: function(id) {
				this.selectedCategory = id;
			},
			publishNewPoi: function() {
				if (this.categories.length == 1) {
					this.toggleSelectedCategory(this.categories[0].id);
				}
				if (this.validateForm()) {
					this.$store.dispatch('publishNewPoi', {
						id: this.id,
						name: this.name,
						address: this.address,
						description: this.description,
						category_id: this.selectedCategory,
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
					this.validations.name.text = 'Inserisci un nome per il nuovo luogo!';
				} else {
					this.validations.name.is_valid = true;
					this.validations.name.text = '';
				}

				if (this.address.trim() == '') {
					validForm = false;
					this.validations.address.is_valid = false;
					this.validations.address.text = 'Inserisci un indirizzo per il nuovo luogo!';
				} else {
					this.validations.address.is_valid = true;
					this.validations.address.text = '';
				}

				if (this.description.trim() == '') {
					validForm = false;
					this.validations.description.is_valid = false;
					this.validations.description.text = 'Inserisci una descrizione per il nuovo luogo!';
				} else {
					this.validations.description.is_valid = true;
					this.validations.description.text = '';
				}

				if (this.selectedCategory == null) {
					validForm = false;
					this.validations.category.is_valid = false;
					this.validations.category.text = 'Seleziona una categoria per il nuovo luogo!';
				} else {
					this.validations.category.is_valid = true;
					this.validations.category.text = '';
				}

				if (this.hashtag.trim() == '') {
					validForm = false;
					this.validations.hashtag.is_valid = false;
					this.validations.hashtag.text = 'Inserisci un hashtag per il nuovo luogo!';
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
				this.name = '';
				this.address = '';
				this.description = '';
				if (this.$refs.map.$canvas.newMarker != null) {
					this.$refs.map.$canvas.newMarker = null;
				}
				this.selectedCategory = null;
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
