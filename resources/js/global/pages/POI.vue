<template>
	<div id="poi-page" class="top-padding bottom-padding">
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
			<infinite-loading force-use-infinite-wrapper @infinite="infiniteHandler">
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
