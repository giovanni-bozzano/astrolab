<template>
	<transition name="login-scale-in-center">
		<div id="login-modal" v-show="show" v-on:click="show = false">
			<div class="login-background"></div>
			<div class="login-wrapper">
				<div class="login-container">
					<p>Accedi con Facebook o Google</p>
					<a href="/login/google" class="social-link">
						<img src="/img/google-login.svg"/>
					</a>
					<a href="/login/facebook" class="social-link">
						<img src="/img/facebook-login.svg"/>
					</a>
				</div>
			</div>
		</div>
	</transition>
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