<template>
	<div id="pois-map">
		<canvas id="pois-map-canvas"><p>canvas unsupported</p></canvas> 
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				previouslySelectedCategory: null,
				previouslySelectedPoi: null
			};
		},

		computed: {
			pois: function() {
				return this.$store.getters.getPois;
			},
			selectedCategory: function() {
				return this.$store.getters.getSelectedCategory;
			},
			selectedPoi: function() {
				return this.$store.getters.getSelectedPoi;
			}
		},

		watch: {
			/*
				Watches the POIs. When they are updated, clear the markers
				and re build them.
			*/
			pois: function() {
				this.clearMarkers();
				this.buildMarkers();
			},

			selectedPoi: function() {
				this.highlightPoi();
			}
		},

		mounted: function() {
			this.$canvas = new fabric.Canvas('pois-map-canvas', {
				selection: false,
				height: 500,
				allowTouchScrolling: true
			});
			this.$canvas.hoverCursor = 'pointer';
			this.resizeCanvas();
			let map = this;
			window.addEventListener('resize', function(e) {
				map.resizeCanvas();
				map.clearMarkers();
				map.buildMarkers();
			});
			this.$canvas.editable = false;
			this.$elements = [];

			let router = this.$router;
			let elements = this.$elements;
			this.$canvas.on('mouse:up', function(event) {
				event.e.preventDefault();
				if (!this.editable) {
					if (event.target != null && event.target.poi != null) {
						router.push({ name: 'poi', params: { id: event.target.poi.id } });
					}
					return;
				}
				if (this.newMarker != null) {
					this.remove(this.newMarker);
				}
				map.addNewMarker(event.pointer.x / map.$canvas.getWidth(), event.pointer.y / map.$canvas.getWidth());
			});
			this.$canvas.on('mouse:over', function(event) {
				if (this.editable) {
					return;
				}
				if (event.target != null && event.target.poi != null) {
					map.$store.dispatch('toggleSelectedCategory', event.target.poi.category.id);
					map.$store.dispatch('toggleSelectedPoi', event.target.poi.id);
				}
			});
			this.$canvas.on('mouse:out', function(event) {
				if (this.editable) {
					return;
				}
				if (event.target != null && event.target.poi != null) {
					map.$store.dispatch('toggleSelectedCategory', null);
					map.$store.dispatch('toggleSelectedPoi', null);
				}
			});
			this.resizeCanvas();
			this.clearMarkers();
			this.buildMarkers();
		},

		methods: {
			/*
				Clears the markers from the canvas.
			*/
			clearMarkers: function() {
				this.$elements = [];
				this.previouslySelectedCategory = null;
				this.previouslySelectedPoi = null;
				this.$store.dispatch('toggleSelectedCategory', null);
				this.$store.dispatch('toggleSelectedPoi', null);
				this.$canvas.remove(...this.$canvas.getObjects());
			},

			/*
				Builds all of the markers for the POIs
			*/
			buildMarkers: function() {
				let canvas = this.$canvas;
				if (this.$canvas.newMarker != null) {
					fabric.Image.fromURL('/img/poi-marker.png', function(image) {
						let previousX = canvas.newMarker.x;
						let previousY = canvas.newMarker.y;
						image.set({
							selectable: false,
							width: 18,
							height: 18,
							left: canvas.newMarker.x * canvas.getWidth(),
							top: canvas.newMarker.y * canvas.getHeight(),
							originX: 'center',
							originY: 'center'
						});
						canvas.newMarker = image;
						canvas.newMarker.x = previousX;
						canvas.newMarker.y = previousY;
						canvas.add(canvas.newMarker);
					});
				}
				for (let i = 0; i < this.pois.length; i++) {
					this.$elements[this.pois[i].category.id] = new Array();
				}
				let elements = this.$elements;
				let categoryId;
				for (categoryId in elements) {
					let remainingPois = [];
					for (let i = 0; i < this.pois.length; i++) {
						if (this.pois[i].category.id == categoryId) {
							remainingPois.push(this.pois[i]);
						}
					}
					let firstPoi = remainingPois[0];
					let poisInCategory = remainingPois.length;
					let poi = remainingPois[0];
					for (; remainingPois.length > 0; poi = nearestPoi) {
						let marker = new Image();
						marker.src = '/img/poi-marker.png';
						marker.poi = poi;
						marker.onload = function() {
							let image = new fabric.Image(marker);
							image.set({
								selectable: false,
								width: 18,
								height: 18,
								left: parseFloat(marker.poi.latitude) * canvas.getWidth(),
								top: parseFloat(marker.poi.longitude) * canvas.getHeight(),
								originX: 'center',
								originY: 'center',
								poi: marker.poi
							});
							canvas.add(image);
							elements[marker.poi.category.id].push(image);
						}
						remainingPois.splice(remainingPois.indexOf(poi), 1);
						var nearestPoi = this.nearestPoi(poi, remainingPois);
						if (nearestPoi != null) {
							let line = new fabric.Line([parseFloat(poi.latitude) * canvas.getWidth(), parseFloat(poi.longitude) * canvas.getHeight(), parseFloat(nearestPoi.latitude) * canvas.getWidth(), parseFloat(nearestPoi.longitude) * canvas.getHeight()], {
								fill: 'white',
								stroke: 'white',
								strokeWidth: 2,
								selectable: false,
								evented: false,
								originX: 'center',
								originY: 'center'
							});
							canvas.add(line);
							elements[poi.category.id].push(line);
						} else if (poisInCategory > 2) {
							let line = new fabric.Line([parseFloat(poi.latitude) * canvas.getWidth(), parseFloat(poi.longitude) * canvas.getHeight(), parseFloat(firstPoi.latitude) * canvas.getWidth(), parseFloat(firstPoi.longitude) * canvas.getHeight()], {
								fill: 'white',
								stroke: 'white',
								strokeWidth: 2,
								selectable: false,
								evented: false,
								originX: 'center',
								originY: 'center'
							});
							canvas.add(line);
							elements[poi.category.id].push(line);
						}
					}
				}
				this.$canvas.renderAll();
			},

			setEditable: function(editable) {
				this.$canvas.editable = editable;
			},

			addNewMarker: function(x, y) {
				let canvas = this.$canvas;
				fabric.Image.fromURL('/img/poi-marker.png', function(image) {
					image.set({
						selectable: false,
						width: 18,
						height: 18,
						left: x * canvas.getWidth(),
						top: y * canvas.getHeight(),
						originX: 'center',
						originY: 'center'
					});
					canvas.newMarker = image;
					canvas.newMarker.x = x;
					canvas.newMarker.y = y;
					canvas.add(canvas.newMarker);
				});
			},

			resizeCanvas: function() {
				if (document.getElementById('pois-map') == null) {
					return;
				}
				if (this.$canvas.editable) {
					if (window.matchMedia('(max-width: 639px)').matches) {
						var width = document.getElementById('pois-map').offsetWidth;
					} else {
						var width = document.getElementById('pois-map').offsetWidth / 1.5;
					}
					this.$canvas.setWidth(width);
					this.$canvas.setHeight(width);
					return;
				}
				var width = document.getElementById('pois-map').offsetWidth;
				var height = document.getElementById('pois-map').offsetHeight;
				if (width >= height) {
					this.$canvas.setWidth(height);
					this.$canvas.setHeight(height);
				} else {
					this.$canvas.setWidth(width);
					this.$canvas.setHeight(width);
				}
				if (document.getElementById('map-cell')) {
					document.getElementById('map-cell').style.height = width + 'px';
				}
			},

			nearestPoi: function(poi, remainingPois) {
				if (remainingPois.length == 0) {
					return null;
				}
				var minimum = Math.sqrt(Math.pow((parseFloat(poi.latitude) - parseFloat(remainingPois[0].latitude)) * this.$canvas.getWidth(), 2) + Math.pow((parseFloat(poi.longitude) - parseFloat(remainingPois[0].longitude)) * this.$canvas.getHeight(), 2));
				var nearest = remainingPois[0];
				for (let j = 1; j < remainingPois.length; j++) {
					let value = Math.sqrt(Math.pow((parseFloat(poi.latitude) - parseFloat(remainingPois[j].latitude)) * this.$canvas.getWidth(), 2) + Math.pow((parseFloat(poi.longitude) - parseFloat(remainingPois[j].longitude)) * this.$canvas.getHeight(), 2));
					if (value < minimum) {
						minimum = value;
						nearest = remainingPois[j];
					}
				}
				return nearest;
			},

			highlightPoi: function() {
				if (this.editable) {
					return;
				}
				if (this.selectedPoi == null) {
					if (this.previouslySelectedCategory == null || this.previouslySelectedPoi == null) {
						return;
					}
					for (let i = 0; i < this.$elements[this.previouslySelectedCategory].length; i++) {
						if (this.$elements[this.previouslySelectedCategory][i].poi != null && this.$elements[this.previouslySelectedCategory][i].poi.id == this.previouslySelectedPoi) {
							this.$elements[this.previouslySelectedCategory][i].setShadow({
								color: '#ffffff',
								blur: 0
							});
							this.$elements[this.previouslySelectedCategory][i].scale(1);
							break;
						}
					}
					this.previouslySelectedCategory = null;
					this.previouslySelectedPoi = null;
					this.$canvas.renderAll();
				} else {
					for (let i = 0; i < this.$elements[this.selectedCategory].length; i++) {
						if (this.$elements[this.selectedCategory][i].poi != null && this.$elements[this.selectedCategory][i].poi.id == this.selectedPoi) {
							this.$elements[this.selectedCategory][i].setShadow({
								color: '#ffffff',
								blur: 15
							});
							this.$elements[this.selectedCategory][i].scale(1.2);
							break;
						}
					}
					this.previouslySelectedCategory = this.selectedCategory;
					this.previouslySelectedPoi = this.selectedPoi;
					this.$canvas.renderAll();
				}
			}
		}
	}
</script>