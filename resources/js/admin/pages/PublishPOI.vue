<template>
	<div id="publish-poi-page" class="page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-12 medium-12 small-12 page-title">
					<h1>Pubblica un nuovo luogo</h1>
				</div>
				<br />
				<div class="cell large-10 medium-10 small-12">
					<table id="publish-poi-table" class="responsive-card-table">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Data di aggiunta</th>
								<th>Utente</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="suggestedPoi in suggestedPois">
								<td data-label="Nome">{{ suggestedPoi.name }}</td>
								<td data-label="Data di aggiunta">{{ suggestedPoi.created_at }}</td>
								<td data-label="Utente">{{ suggestedPoi.user.name }}</td>
								<td class="fit"><center><router-link :to="{ name: 'publish-poi-new', params: { id: suggestedPoi.id }}" class="button">Approva</router-link></center></td>
								<td class="fit"><center><a v-on:click="rejectSuggestedPoi(suggestedPoi.id)" class="button">Rifiuta</a></center></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="cell large-8 medium-9 small-12">
					<router-link :to="{ name: 'publish-poi-new' }" class="button">Aggiungi</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';

	export default {
		computed: {
			suggestedPois: function() {
				return this.$store.getters.getSuggestedPois;
			},
			suggestedPoisLoadStatus: function() {
				return this.$store.getters.getSuggestedPoisLoadStatus;
			},
			poiDeleteStatus: function() {
				return this.$store.getters.getPoiDeleteStatus;
			}
		},

		watch: {
			suggestedPoisLoadStatus: function() {
				if (this.suggestedPoisLoadStatus == 2) {
					$(document).ready(function() {
						$('#publish-poi-table').DataTable({
							'language': {
								'url': 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json'
							},
							'order': [[ 1, 'desc' ]],
							'columnDefs': [ {
								'targets': [ 3, 4 ],
								'orderable': false
							} ]
						});
					});
				}
			},
			poiDeleteStatus: function() {
				if (this.poiDeleteStatus == 2) {
					EventBus.$emit('show-success');
				} else if (this.poiDeleteStatus == 3) {
					EventBus.$emit('show-error');
				}
			}
		},
		mounted: function() {
			if (this.suggestedPoisLoadStatus == 2) {
				$('#publish-poi-table').DataTable({
					'language': {
						'url': 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json'
					},
					'order': [[ 1, "desc" ]],
					"columnDefs": [ {
						"targets": [ 3, 4 ],
						"orderable": false
					} ]
				});
			}
			EventBus.$on('destroy-datatable', function() {
				$('#publish-poi-table').DataTable().destroy();
			}.bind(this));
		},
		
		methods: {
			rejectSuggestedPoi(id) {
				this.$store.dispatch('rejectSuggestedPoi', {
					id: id
				});
			}
		}
	}
</script>