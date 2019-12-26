<template>
	<transition name="login-scale-in-center">
		<div id="login-modal" v-show="show">
			<div class="login-background" v-on:click.self="show = false"></div>
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
	import { EventBus } from '../../event-bus.js';

	export default {
		data: function() {
			return {
				show: false
			};
		},

		mounted: function() {
			EventBus.$on('prompt-login', function() {
				this.show = true;
			}.bind(this));
		}
	}
</script>