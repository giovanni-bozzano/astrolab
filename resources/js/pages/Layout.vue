<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	@font-face {
	    font-family: 'lemurmure-regular';
	    src: url('/fonts/lemurmure-regular.woff');
	}
	html {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		font-smoothing: antialiased;
	}
	* {
	    margin: 0;
	    padding: 0;
	    box-sizing: border-box;
	    border: none;
	    font-kerning: normal;
	    text-decoration: none;
	}
	html, body, div, p, a, span, article, nav, aside, main {
	    margin: 0;
	    padding: 0;
	    border: none;
	}
	body {
	    overflow: hidden;
	    background-color: #00030b;
	}
	h1 {
	    font-family: 'lemurmure-regular', 'sans-serif';
	    font-size: 3.6em;
	    margin-top: -7px;
	    margin-bottom: 0.6em;
	    color: #fff;
	}
	h3 {
		font-family: 'IBM Plex Mono', monospace;
	    color: #fff;
	    font-size: 0.8em;
	    letter-spacing: 0.06em;
	    line-height: 2em;
	}
	h4 {
		font-family: 'IBM Plex Mono', monospace;
		font-weight: normal;
	    color: #fff;
	    font-size: 0.8em;
	    letter-spacing: 0.06em;
	    line-height: 2em;
	}
	::-webkit-scrollbar {
	    width: 0px;
	    /* make scrollbar transparent */
	    background: transparent;
	}
	:root {
		cursor: auto;
		--cursorX: 50vw;
		--cursorY: 50vh;
	}
	:root:before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		z-index: -2;
		position: fixed;
		pointer-events: none;
		background: radial-gradient(
			circle 20vmax at var(--cursorX) var(--cursorY),
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.5) 40%,
			rgba(0, 0, 0, 0.95) 100%
		)
	}
	.background {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: blue;
		z-index: -3;
		mix-blend-mode: multiply;
	}
	.background-surf {
		position: fixed;
		z-index: -3;
		width: 100vw;
		height: 100vh;
		background-image: url('/img/background.jpg');
		background-size: cover;
		background-position: center;
	}
	.container-large {
	    display: grid;
	    height: 100vh;
	    width: 100vw;
	    grid-template-rows: [row0-start] 50px [row0-end row1-start] auto [row1-end row2-start] 50px [row2-end row3-start] 50px [row3-end];
	    grid-template-columns: [col1-start] 150px [col1-end col2-start] auto [col2-end];
	    grid-template-areas: "menu content" "footer footer";
		.left-container {
		  	grid-area: menu;
		   	grid-column-start: col1-start;
		   	grid-column-end: col1-end;
		   	grid-row-start: row1-start;
		   	grid-row-end: row1-end;
		   	border-right: solid 1px rgba(208, 208, 208, 0.31);
		}
		.right-container {
		    grid-area: content;
		    grid-column-start: col2-start;
		    grid-column-end: col2-end;
		    grid-row-start: row0-start;
		    grid-row-end: row2-end;
		    padding-top: 50px;
		}
		.footer-container {
		    grid-area: footer;
		    height: auto;
		    grid-column-start: 1-col;
		    grid-column-end: 3-col;
		    grid-row-start: row2-end;
		    grid-row-end: row3-end;
		    border-top: solid 2.5px #fff;
		}
	}
</style>

<template>
	<div id="app-layout">
		<success-notification></success-notification>
		<error-notification></error-notification>
		<main class="container-large">
				<div id="background" v-if="['home'].includes($route.name)">
				<div class="background-surf"></div>
				<div class="background"></div>
			</div>
			<navigation class="left-container"></navigation>
			<router-view></router-view>
			<app-footer class="footer-container"></app-footer>
		</main>
		<login-modal></login-modal>
	</div>
</template>

<script>
	/*
		Imports the Event Bus to pass events on tag updates
	*/
	import { EventBus } from '../event-bus.js';

	/*
		Define the components used in the Layout
	*/
	import Navigation from '../components/global/Navigation.vue';
	import Footer from '../components/global/Footer.vue';
	import LoginModal from '../components/global/LoginModal.vue';
	import SuccessNotification from '../components/global/SuccessNotification.vue';
	import ErrorNotification from '../components/global/ErrorNotification.vue';

	export default {
		components: {
			'success-notification': SuccessNotification,
			'error-notification': ErrorNotification,
			'navigation': Navigation,
			'app-footer': Footer,
			'login-modal': LoginModal
		},

		created: function() {
			this.$store.dispatch('loadPoints');
			this.$store.dispatch('loadUser');
			this.$store.dispatch('loadCategories');
		},

		computed: {
			/*
				Get the point that was added.
			*/
			pointAdded() {
				return this.$store.getters.getPointAdded;
			},
			/*
				Get the point added status.
			*/
			pointAddStatus() {
				return this.$store.getters.getPointAddStatus;
			},
			/*
				Gets the current views the points are in.
			*/
			pointsView() {
				return this.$store.getters.getPointsView;
			}
		},

		/*
			Define what to watch in the module.
		*/
		watch: {
			/*
				When the point added status changes, emit the success
				if the point was added successfully!
			*/
			pointAddStatus: function() {
				if (this.pointAddStatus == 2) {
					EventBus.$emit('show-success', {
						notification: this.pointAdded.name + ' has been added!'
					});
				}
			}
		}
	}
</script>
