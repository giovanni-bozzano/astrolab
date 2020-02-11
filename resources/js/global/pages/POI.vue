<template>
	<div id="poi-page" class="page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-10 page-title">
					<h1>{{ name }}</h1>
				</div>
				<div class="cell large-2 medium-2 small-2 back-container">
					<router-link :to="{ name: 'map' }">
						<img src="/img/close-modal.svg" class="back"/>
					</router-link>
				</div>
				<div class="cell large-12 medium-12 small-12 poi-paragraph" v-if="image_url != null">
					<img v-bind:src="image_url"/>
				</div>
				<div class="cell large-12 medium-12 small-12 poi-paragraph">
					<p class="spectral">{{ description }}</p>
				</div>
				<div class="cell large-12 medium-12 small-12 poi-paragraph" v-if="address != null || coordinates != null">
					<h2 class="poi-paragraph-margin-large">Posizione</h2>
					<h3 class="poi-paragraph-margin-small" v-if="address != null">{{ address }}</h3>
					<h3 v-if="coordinates != null">{{ coordinates }}</h3>
				</div>
				<div class="cell large-12 medium-12 small-12 poi-paragraph" v-if="email_address != null || phone_number != null || website != null">
					<h2 class="poi-paragraph-margin-large">Contatti</h2>
					<h3 class="poi-paragraph-margin-large" v-if="email_address != null"><a class="button" target="_blank" rel="noopener" v-bind:href="'mailto:' + email_address">Indirizzo email: {{ email_address }}</a></h3>
					<h3 v-if="phone_number != null"><a class="button" target="_blank" rel="noopener" v-bind:href="'tel:' + phone_number">Numero di telefono: {{ phone_number }}</a></h3>
					<h3 v-if="website != null"><a class="button" target="_blank" rel="noopener" v-bind:href="website">Sito web: {{ website }}</a></h3>
				</div>
			</div>
			<div class="grid-x grid-padding-x instagram-grid" v-if="hashtag != null">
				<div class="cell large-6 medium-6 small-12 instagram-cell" v-for="post in instagramList">
					<div class="instagram-container" :style="{ backgroundImage: 'url(' + post.imageUrl + ')' }">
						<a :href="post.url" target="_blank" class="instagram-text-container">
							<div class="instagram-title">{{ post.title }}</div>
							<div class="instagram-date">{{ post.date }}</div>
						</a>
					</div>
				</div>
			</div>
			<infinite-loading force-use-infinite-wrapper @infinite="infiniteHandler" v-if="hashtag != null">
				<div slot="no-more"></div>
				<div slot="no-results"></div>
			</infinite-loading>
		</div>
	</div>
</template>

<script>
	import POIsAPI from '../api/pois.js';
	import InfiniteLoading from 'vue-infinite-loading';

	export default {
		components: {
			'infinite-loading': InfiniteLoading,
		},

		data: function() {
			return {
				name: null,
				image_url: null,
				description: null,
				address: null,
				coordinates: null,
				email_address: null,
				phone_number: null,
				website: null,
				instagramList: [],
				endCursor: ''
			};
		},

		computed: {
			poi: function() {
				return this.$store.getters.getPoi(this.$route.params.id);
			},
			poisLoadStatus: function() {
				return this.$store.getters.getPoisLoadStatus;
			}
		},

		watch: {
			poisLoadStatus: function() {
				if (this.poisLoadStatus == 2) {
					this.name = this.poi.name;
					this.image_url = this.poi.image_url;
					this.description = this.poi.description;
					this.address = this.poi.address;
					this.coordinates = this.poi.coordinates;
					this.email_address = this.poi.email_address;
					this.phone_number = this.poi.phone_number;
					this.website = this.poi.website;
				}
			}
		},

		mounted: function() {
			if (this.poisLoadStatus == 2) {
				this.name = this.poi.name;
				this.image_url = this.poi.image_url;
				this.description = this.poi.description;
				this.address = this.poi.address;
				this.coordinates = this.poi.coordinates;
				this.email_address = this.poi.email_address;
				this.phone_number = this.poi.phone_number;
				this.website = this.poi.website;
			}
		},
		
		methods: {
			infiniteHandler($state) {
				POIsAPI.getPoiInstagramPosts(this.$route.params.id, this.endCursor).then(({ data }) => {
					if (data.list.length) {
						this.endCursor = data.endCursor;
						data.list.forEach(element => element.date = new Date(element.date * 1000).toLocaleString());
						this.instagramList.push(...data.list);
						if (this.endCursor == null) {
							$state.complete();
						} else {
							$state.loaded();
						}
					} else {
						$state.complete();
					}
				}).catch(function(error) {
					$state.complete();
				});
			},
		}
	}
</script>