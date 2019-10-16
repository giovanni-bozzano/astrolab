<template>
	<div id="map-poi-page" class="top-padding bottom-padding">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-10">
					<h1>{{ name }}</h1>
				</div>
				<div class="cell large-2 medium-2 small-2 back-container">
					<router-link :to="{ name: 'map' }">
						<img src="/img/close-modal.svg" class="back"/>
					</router-link>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-12">
					<p>{{ description }}</p>
				</div>
			</div>
			<div class="grid-x grid-padding-x instagram-grid">
				<div class="cell large-3 medium-6 small-12 instagram-cell" v-for="post in instagramList">
					<div class="instagram-container" :style="{ backgroundImage: 'url(' + post.imageUrl + ')' }">
						<a :href="post.url" target="_blank" class="instagram-text-container">
							<div class="instagram-title">{{ post.title }}</div>
							<div class="instagram-date">{{ post.date }}</div>
						</a>
					</div>
				</div>
			</div>
			<infinite-loading @infinite="infiniteHandler">
				<div slot="no-more"></div>
				<div slot="no-results"></div>
			</infinite-loading>
		</div>
	</div>
</template>

<style lang="scss">
#map-poi-page {
	.instagram-grid {
		margin-left: -0.1rem;
		margin-right: -0.1rem;
	}
	.instagram-cell {
		padding: 0.1rem;
	}
	.instagram-container {
		position: relative;
		padding-top: 100%;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.instagram-container .instagram-text-container {
		display: none;
	}
	.instagram-container:hover .instagram-text-container {
		display: flex;
	}
	.instagram-text-container {
		flex-direction: column;
		-webkit-justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.5rem;
		background-color: rgba(0, 0, 0, 0.7);
	}
	.instagram-title {
		text-align: center;
		color: #fff;
		overflow: hidden;
		margin-bottom: 0.6rem;
		margin-top: 0.3rem;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 8;
		-webkit-box-orient: vertical;
	}
	.instagram-date {
		text-align: center;
		color: #ccc;
		font-size: 0.7rem;
	}
}
</style>

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
				description: null,
				instagramList: [],
				endCursor: ''
			}
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
					this.description = this.poi.description;
				}
			}
		},
		mounted: function() {
			if (this.poisLoadStatus == 2) {
				this.name = this.poi.name;
				this.description = this.poi.description;
			}
		},
		methods: {
			infiniteHandler($state) {
				POIsAPI.getPoiInstagramPosts(this.$route.params.id, this.endCursor).then(({ data }) => {
					if (data.list.length) {
						this.endCursor = data.endCursor;
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
		},
	}
</script>
