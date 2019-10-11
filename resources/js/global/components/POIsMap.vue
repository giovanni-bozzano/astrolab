<template>
	<div id="pois-map">
		<canvas id="pois-map-canvas"><p>canvas unsupported</p></canvas> 
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				prieviouslySelectedCategory: null,
				prieviouslySelectedPoi: null
			}
		},

		computed: {
			/*
				Gets the POIs
			*/
			pois: function() {
				return this.$store.getters.getPois;
			},

			/*
				Gets the selected category
			*/
			selectedCategory: function() {
				return this.$store.getters.getSelectedCategory;
			},

			/*
				Gets the selected POI
			*/
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

			selectedCategory: function() {
				this.highlightCategory();
			},

			selectedPoi: function() {
				this.highlightPoi();
			}
		},

		mounted: function() {
			this.$canvas = new fabric.Canvas('pois-map-canvas', {
				selection: false,
				height: 500
			});
			this.$canvas.hoverCursor = 'pointer';
			this.resizeCanvas();
			window.onresize = (e) => {
				this.resizeCanvas();
				this.clearMarkers();
				this.buildMarkers();
			};
			this.$canvas.editable = false;
			this.$elements = [];

			let router = this.$router;
			let elements = this.$elements;
			let canvas = this;
			this.$canvas.on('mouse:down', function(event) {
				if (!this.editable) {
					if (event.target != null && event.target.poi != null) {
						router.push({ name: 'poi', params: { id: event.target.poi.id } });
					}
					return;
				}
				if (this.newMarker != null) {
					this.remove(this.newMarker);
				}
				canvas.addNewMarker(event.e.offsetX / canvas.$canvas.getWidth(), event.e.offsetY / canvas.$canvas.getWidth());
			});
			this.$canvas.on('mouse:over', function(event) {
				if (this.editable) {
					return;
				}
				if (event.target != null && event.target.poi != null) {
					for (let i = 0; i < elements[event.target.poi.category.id].length; i++) {
						if (elements[event.target.poi.category.id][i].type == 'line') {
							elements[event.target.poi.category.id][i].set('strokeWidth', 5);
						} else {
							elements[event.target.poi.category.id][i].scale(elements[event.target.poi.category.id][i].get('scaleX') + 0.2);
						}
					}
					this.renderAll();
					console.log(event.target.poi.id + ' ' + event.target.poi.latitude + ' ' + event.target.poi.longitude);
				}
			});
			this.$canvas.on('mouse:out', function(event) {
				if (this.editable) {
					return;
				}
				if (event.target != null && event.target.poi != null) {
					for (let i = 0; i < elements[event.target.poi.category.id].length; i++) {
						if (elements[event.target.poi.category.id][i].type == 'line') {
							elements[event.target.poi.category.id][i].set('strokeWidth', 3);
						} else {
							elements[event.target.poi.category.id][i].scale(elements[event.target.poi.category.id][i].get('scaleX') - 0.2);
						}
					}
					this.renderAll();
				}
			});
			this.clearMarkers();
			this.buildMarkers();
		},

		methods: {
			/*
				Clears the markers from the canvas.
			*/
			clearMarkers: function() {
				this.$canvas.remove(...this.$canvas.getObjects());
			},

			/*
				Builds all of the markers for the POIs
			*/
			buildMarkers: function() {
				if (this.$canvas.newMarker != null) {
					let canvas = this.$canvas;
					fabric.Image.fromURL('/img/poi-marker.png', function(image) {
						let previousX = canvas.newMarker.x;
						let previousY = canvas.newMarker.y;
						image.set({
							selectable: false,
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
						let canvas = this.$canvas;
						let marker = new Image();
						marker.src = '/img/poi-marker.png';
						marker.poi = poi;
						marker.onload = function() {
							let image = new fabric.Image(marker);
							image.set({
								selectable: false,
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
							let line = new fabric.Line([ parseFloat(poi.latitude) * canvas.getWidth(), parseFloat(poi.longitude) * canvas.getHeight(), parseFloat(nearestPoi.latitude) * canvas.getWidth(), parseFloat(nearestPoi.longitude) * canvas.getHeight() ], {
								fill: 'white',
								stroke: 'white',
								strokeWidth: 3,
								selectable: false,
								evented: false,
								originX: 'center',
								originY: 'center'
							});
							canvas.add(line);
							elements[poi.category.id].push(line);
						} else if (poisInCategory > 2) {
							let line = new fabric.Line([ parseFloat(poi.latitude) * canvas.getWidth(), parseFloat(poi.longitude) * canvas.getHeight(), parseFloat(firstPoi.latitude) * canvas.getWidth(), parseFloat(firstPoi.longitude) * canvas.getHeight() ], {
								fill: 'white',
								stroke: 'white',
								strokeWidth: 3,
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
			},

			setEditable: function(editable) {
				this.$canvas.editable = editable;
			},

			addNewMarker: function(x, y) {
				let canvas = this.$canvas;
				fabric.Image.fromURL('/img/poi-marker.png', function(image) {
					image.set({
						selectable: false,
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
					var width = document.getElementById('pois-map').offsetWidth / 1.5;
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

			highlightCategory: function() {
				if (this.editable) {
					return;
				}
				if (this.selectedCategory == null) {
					if (this.prieviouslySelectedCategory == null) {
						return;
					}
					if (this.$elements[this.prieviouslySelectedCategory] !== undefined) {
						for (let i = 0; i < this.$elements[this.prieviouslySelectedCategory].length; i++) {
							if (this.$elements[this.prieviouslySelectedCategory][i].type == 'line') {
								this.$elements[this.prieviouslySelectedCategory][i].set('strokeWidth', 3);
							} else {
								this.$elements[this.prieviouslySelectedCategory][i].scale(this.$elements[this.prieviouslySelectedCategory][i].get('scaleX') - 0.2);
							}
						}
						this.$canvas.renderAll();
					}
				} else {
					if (this.$elements[this.selectedCategory] !== undefined) {
						for (let i = 0; i < this.$elements[this.selectedCategory].length; i++) {
							if (this.$elements[this.selectedCategory][i].type == 'line') {
								this.$elements[this.selectedCategory][i].set('strokeWidth', 5);
							} else {
								this.$elements[this.selectedCategory][i].scale(this.$elements[this.selectedCategory][i].get('scaleX') + 0.2);
							}
						}
						this.$canvas.renderAll();
					}
				}
				this.prieviouslySelectedCategory = this.selectedCategory;
			},

			highlightPoi: function() {
				if (this.editable) {
					return;
				}
				if (this.selectedPoi == null) {
					if (this.prieviouslySelectedPoi == null) {
						return;
					}
					var categoryId;
					for (categoryId in this.$elements) {
						let found = false;
						for (let i = 0; i < this.$elements[categoryId].length; i++) {
							if (this.$elements[categoryId][i].poi != null && this.$elements[categoryId][i].poi.id == this.prieviouslySelectedPoi) {
								this.$elements[categoryId][i].setShadow({
									color: '#ffffff',
									blur: 0
								});
								found = true;
								break;
							}
						}
						if (found) {
							 break;
						}
					}
					this.$canvas.renderAll();
				} else {
					for (let i = 0; i < this.$elements[this.selectedCategory].length; i++) {
						if (this.$elements[this.selectedCategory][i].poi != null && this.$elements[this.selectedCategory][i].poi.id == this.selectedPoi) {
							this.$elements[this.selectedCategory][i].setShadow({
								color: '#ffffff',
								blur: 15
							});
							break;
						}
					}
					this.$canvas.renderAll();
				}
				this.prieviouslySelectedPoi = this.selectedPoi;
			}
		}
	}
</script>
