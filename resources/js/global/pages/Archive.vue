<template>
	<div id="archive-page" class="top-padding bottom-padding">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-12">
					<h1>Archivio AstroLab</h1>
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
			'infinite-loading': InfiniteLoading
		},
		data: function() {
			return {
				instagramList: [],
				endCursor: ''
			}
		},
		mounted: function() {
			sweep(document.documentElement, '--background-color', '#000', '#fff', {duration: 200});
			sweep(document.documentElement, '--foreground-color', '#fff', '#000', {duration: 200});
			sweep(document.documentElement, '--background-color-rgba-000', 'rgba(0, 0, 0, 0.01)', 'rgba(255, 255, 255, 0.01)', {duration: 200});
			sweep(document.documentElement, '--background-color-rgba-050', 'rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)', {duration: 200});
			sweep(document.documentElement, '--background-color-rgba-095', 'rgba(0, 0, 0, 0.95)', 'rgba(255, 255, 255, 0.95)', {duration: 200});
			$({brightness: 100}).animate({brightness: 0}, {
				duration: 100,
				step: function() {
					$('.logo').css({
						'-webkit-filter': 'brightness(' + Math.ceil(this.brightness) + '%)',
						'filter': 'brightness(' + Math.ceil(this.brightness) + '%)'
					});
				},
				complete: function() {
					$('.logo').css({
						'-webkit-filter': 'brightness(0%)',
						'filter': 'brightness(0%)'
					});
				}
			});
		},
		beforeDestroy: function() {
			sweep(document.documentElement, '--background-color', '#fff', '#000', {duration: 200});
			sweep(document.documentElement, '--foreground-color', '#000', '#fff', {duration: 200});
			sweep(document.documentElement, '--background-color-rgba-000', 'rgba(255, 255, 255, 0.01)', 'rgba(0, 0, 0, 0.01)', {duration: 200});
			sweep(document.documentElement, '--background-color-rgba-050', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)', {duration: 200});
			sweep(document.documentElement, '--background-color-rgba-095', 'rgba(255, 255, 255, 0.95)', 'rgba(0, 0, 0, 0.95)', {duration: 200});
			$({brightness: 0}).animate({brightness: 100}, {
				duration: 100,
				step: function() {
					$('.logo').css({
						'-webkit-filter': 'brightness(' + Math.ceil(this.brightness) + '%)',
						'filter': 'brightness(' + Math.ceil(this.brightness) + '%)'
					});
				},
				complete: function() {
					$('.logo').css({
						'-webkit-filter': 'brightness(100%)',
						'filter': 'brightness(100%)'
					});
				}
			});
		},
		methods: {
			infiniteHandler($state) {
				POIsAPI.getInstagramPosts(this.endCursor).then(({ data }) => {
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
