<style lang="scss">
	@import 'resources/sass/abstracts/_variables.scss';
	div#login-modal {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .6);
		z-index: 99999;
		div.login-box {
			width: 100%;
			max-width: 530px;
			min-width: 320px;
			padding: 20px;
			background-color: var(--foreground-color);
			border: 1px solid #ddd;
			-webkit-box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
			box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
			-webkit-border-radius: 4px;
			border-radius: 4px;
			font-size: 16px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			a.social-link {
				display: block;
				margin: auto;
				width: 230px;
				margin-top: 10px;
				margin-bottom: 10px;
			}
			div.login-label {
				color: var(--background-color);
				font-weight: bold;
				text-transform: uppercase;
				text-align: center;
				margin-top: 20px;
				margin-bottom: 20px;
			}
		}
	}
	@media #{$small-only} {
		div#login-modal {
			div.login-box {
				width: 95%;

				a.learn-more-button {
					width: 300px;
				}
			}
		}
	}
</style>

<template>
	<div id="login-modal" v-show="show" v-on:click="show = false">
			<div class="login-box" v-on:click.stop="">
				<div class="login-label">Accedi con Facebook o Google</div>

				<a href="/login/google" class="social-link">
					<img src="/img/google-login.svg"/>
				</a>

				<a href="/login/facebook" class="social-link">
					<img src="/img/facebook-login.svg"/>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	/*
		Imports the event bus.
	*/
	import { EventBus } from '../../event-bus.js';

	export default {
		/*
			Defines the data used by the component.
		*/
		data: function() {
			return {
				show: false
			}
		},

		/*
			Sets up the component on the mounted lifecycle hook.
		*/
		mounted: function() {
			/*
				When prompted for login, show the component.
			*/
			EventBus.$on('prompt-login', function() {
				this.show = true;
			}.bind(this));
		}
	}
</script>
