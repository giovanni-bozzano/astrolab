<template>
	<div id="suggest-poi-page" class="top-padding bottom-padding">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-12 medium-12 small-12">
					<h1>In cerca di nuove stelle</h1>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-12">
					<p>La rete di AstroLab è in continua crescita. Guidaci nei tuoi luoghi della città e ... ... ...</p>
					<p>La sezione è privata e i tuoi suggerimenti saranno controllati dal team di AstroLab. Una volta approvata la scelta, il luogo verrà pubblicato e diventerà ufficialmente parte dei percorsi AstroLab.</p>
				</div>
			</div>
			<br />
			<div class="grid-x grid-padding-x" v-if="isUserLoggedIn && userSuggestedPois.length > 0">
				<div class="cell large-10 medium-10 small-12">
					<table class="responsive-card-table">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Data di aggiunta</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="suggestedPoi in userSuggestedPois">
								<td data-label="Nome">{{ suggestedPoi.name }}</td>
								<td data-label="Data di aggiunta">{{ suggestedPoi.created_at }}</td>
								<td class="fit"><router-link :to="{ name: 'suggest-poi-new', params: { id: suggestedPoi.id }}" class="button">Modifica</router-link></td>
								<td class="fit"><a v-on:click="deleteUserSuggestedPoi(suggestedPoi.id)" class="button">Elimina</a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="grid-x grid-padding-x" v-if="isUserLoggedIn">
				<div class="cell large-8 medium-9 small-12">
					<router-link :to="{ name: 'suggest-poi-new' }" class="button">Aggiungi</router-link>
				</div>
			</div>
			<div class="grid-x grid-padding-x" v-else>
				<div class="cell large-8 medium-9 small-12">
					<a class="button" v-on:click="login()">Accedi con <strong>Facebook</strong> o <strong>Google</strong></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';

	export default {
		computed: {
			/*
				Retrieves whether the User is logged in from Vuex
			*/
			isUserLoggedIn() {
				return this.$store.getters.isUserLoggedIn;
			},
			userSuggestedPois: function() {
				return this.$store.getters.getUserSuggestedPois;
			},
			poiDeleteStatus: function() {
				return this.$store.getters.getPoiDeleteStatus;
			}
		},
		watch: {
			poiDeleteStatus: function() {
				if (this.poiDeleteStatus == 2) {
					EventBus.$emit('show-success');
				} else if (this.poiDeleteStatus == 3) {
					EventBus.$emit('show-error');
				}
			}
		},
		methods: {
			deleteUserSuggestedPoi(id) {
				this.$store.dispatch('deleteUserSuggestedPoi', {
					id: id
				});
			},
			/*
				Prompts the login form.
			*/
			login() {
				EventBus.$emit('prompt-login');
			}
		}
	}
</script>
