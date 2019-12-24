<template>
	<div id="current-pois-page" class="page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="cell large-12 medium-12 small-12 page-title">
					<h1>Luoghi esistenti</h1>
				</div>
			</div>
			<br />
			<div class="grid-x grid-padding-x">
				<div class="cell large-10 medium-10 small-12">
					<table id="current-pois-table" class="responsive-card-table">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Data di aggiunta</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="poi in pois">
								<td data-label="Nome">{{ poi.name }}</td>
								<td data-label="Data di aggiunta">{{ poi.created_at }}</td>
								<td class="fit"><center><router-link :to="{ name: 'edit-poi', params: { id: poi.id }}" class="button">Modifica</router-link></center></td>
								<td class="fit">
									<center>
										<a v-on:click="showPoi(poi.id)" class="button" v-if="poi.is_hidden">Mostra</a>
										<a v-on:click="hidePoi(poi.id)" class="button" v-else>Nascondi</a>
									</center>
								</td>
								<td class="fit"><center><a v-on:click="deletePoi(poi.id)" class="button">Elimina</a></center></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus.js';

	export default {
		computed: {
			pois: function() {
				return this.$store.getters.getPois;
			},
			poisLoadStatus: function() {
				return this.$store.getters.getPoisLoadStatus;
			},
			poiEditStatus: function() {
				return this.$store.getters.getPoiEditStatus;
			},
			poiDeleteStatus: function() {
				return this.$store.getters.getPoiDeleteStatus;
			}
		},
		watch: {
			poisLoadStatus: function() {
				if (this.poisLoadStatus == 2) {
					$(document).ready(function() {
						$('#current-pois-table').DataTable({
							'language': {
								'url': 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json'
							},
							'order': [[ 1, 'desc' ]],
							'columnDefs': [ {
								'targets': [ 2, 3, 4 ],
								'orderable': false
							} ]
						});
					});
				}
			},
			poiEditStatus: function() {
				if (this.poiEditStatus == 2) {
					EventBus.$emit('show-success');
				} else if (this.poiEditStatus == 3) {
					EventBus.$emit('show-error');
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
			if (this.poisLoadStatus == 2) {
				$('#current-pois-table').DataTable({
					'language': {
						'url': 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json'
					},
					'order': [[ 1, 'desc' ]],
					'columnDefs': [ {
						'targets': [ 2, 3, 4 ],
						'orderable': false
					} ]
				});
			}
			EventBus.$on('destroy-datatable', function() {
				$('#current-pois-table').DataTable().destroy();
			}.bind(this));
		},
		methods: {
			showPoi(id) {
				this.$store.dispatch('showPoi', {
					id: id
				});
			},
			hidePoi(id) {
				this.$store.dispatch('hidePoi', {
					id: id
				});
			},
			deletePoi(id) {
				this.$store.dispatch('deletePoi', {
					id: id
				});
			}
		}
	}
</script>