<style lang="scss" scoped>
	.v-marquee {
		white-space: nowrap;
		overflow: hidden;
		> div {
			display: inline-block;
			animation: marquee linear infinite;
		}
		.pause {
			animation-play-state: paused;
		}
		.running {
			animation-play-state: running;
		}
	}
</style>

<template>
	<div class="v-marquee" @click="$emit('click',$event)">
		<div :style="{'animation-duration': time,'animation-name': name}" :class="animate ? 'running' : 'pause'" @mouseover="pause()" @mouseleave="resume()">
			<slot>
				<div v-html="content"></div>
			</slot>
		</div>
	</div>
</template>

<script>
	let count = 0;
	export default {
		name: 'TextMarquee',
		props: {
			speed: {
				type: Number,
				default: 50,
			},
			content: String,
		},
		data() {
			count++;
			return {
				time: 0,
				name: 'marquee' + count,
				animate: true,
				styleEl: document.createElement('style'),
			};
		},
		watch: {
			content() {
				this.start();
			},
			speed() {
				this.start();
			}
		},
		methods: {
			pause() {
				this.animate = false;
			},
			resume() {
				this.animate = true;
			},
			getTime() {
				return Math.max(this.$el.firstChild.offsetWidth, this.$el.offsetWidth) / this.speed + 's';
			},
			prefix(key, value) {
				return ['-webkit-', '-moz-', '-ms-', ''].map(el => `${el + key}:${value};`).join('');
			},
			keyframes() {
				const from = this.prefix('transform', `translateX(${this.$el.offsetWidth}px)`);
				const to = this.prefix('transform', `translateX(-${this.$el.firstChild.offsetWidth}px)`);
				const v = `@keyframes ${this.name} {
									from { ${from} }
									to { ${to} }
							}`;
				this.styleEl.innerHTML = v;
				document.head.appendChild(this.styleEl);
			},
			start() {
				this.$nextTick(() => {
					this.time = this.getTime();
					this.keyframes();
				});
			}
		},
		mounted() {
			let textMarquee = this;
			let previousWindowWidth = $(window).width();
			window.addEventListener('resize', function(e) {
				if (previousWindowWidth < 1024 && $(window).width() >= 1024) {
					textMarquee.start();
				}
				previousWindowWidth = $(window).width();
			});
			this.start();
		}
	}
</script>