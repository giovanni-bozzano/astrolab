<template>
	<div id="suggest-poi-page" class="top-padding bottom-padding">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-12 medium-12 small-12">
					<h1>Pubblica un nuovo luogo</h1>
				</div>
			</div>
			<br />
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-12">
					<table id="table" class="responsive-card-table">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Data di aggiunta</th>
								<th>Utente</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="suggestedPoi in suggestedPois">
								<td data-label="Nome">{{ suggestedPoi.name }}</td>
								<td data-label="Data di aggiunta">{{ suggestedPoi.created_at }}</td>
								<td data-label="Utente">{{ suggestedPoi.user.name }}</td>
								<td class="fit"><router-link :to="{ name: 'publish-poi-new', params: { id: suggestedPoi.id }}" class="button">Pubblica</router-link></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="grid-x grid-padding-x">
				<div class="cell large-8 medium-9 small-12">
					<router-link :to="{ name: 'publish-poi-new', params: { id: 0 }}" class="button">Aggiungi</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			suggestedPois: function() {
				return this.$store.getters.getSuggestedPois;
			},
			suggestedPoisLoadStatus: function() {
				return this.$store.getters.getSuggestedPoisLoadStatus;
			}
		},
		watch: {
			suggestedPoisLoadStatus: function() {
				if (this.suggestedPoisLoadStatus == 2) {
					$(document).ready(function () {
						$('#table').DataTable({
							'language': {
								'url': 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json'
							},
							'order': [[ 1, "desc" ]],
							"columnDefs": [ {
								"targets": 3,
								"orderable": false
							} ]
						});
					});
				}
			}
		},
		mounted: function() {
			if (this.suggestedPoisLoadStatus == 2) {
				$('#table').DataTable({
					'language': {
						'url': 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json'
					},
					'order': [[ 1, "desc" ]],
					"columnDefs": [ {
						"targets": 3,
						"orderable": false
					} ]
				});
			}
		}
	}
</script>
