<template>
	<div id="points-map">
		<canvas id="points-map-canvas"><p>canvas unsupported</p></canvas> 
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				prieviouslySelectedCategory: null,
				prieviouslySelectedPoint: null
			}
		},

		computed: {
			/*
				Gets the points
			*/
			points: function() {
				return this.$store.getters.getPoints;
			},

			/*
				Gets the selected category
			*/
			selectedCategory: function() {
				return this.$store.getters.getSelectedCategory;
			},

			/*
				Gets the selected point
			*/
			selectedPoint: function() {
				return this.$store.getters.getSelectedPoint;
			}
		},

		watch: {
			/*
				Watches the points. When they are updated, clear the markers
				and re build them.
			*/
			points: function() {
				this.clearMarkers();
				this.buildMarkers();
			},

			selectedCategory: function() {
				this.highlightCategory();
			},

			selectedPoint: function() {
				this.highlightPoint();
			}
		},

		mounted: function() {
			this.$canvas = new fabric.Canvas('points-map-canvas', {
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
			this.$canvas.on('mouse:down', function(event) {
				if (!this.editable) {
					if (event.target != null && event.target.point != null) {
						router.push({ name: 'point', params: { id: event.target.point.id } });
					}
					return;
				}
				if (this.newMarker != null) {
					this.remove(this.newMarker);
				}
				let canvas = this;
				fabric.Image.fromURL('/img/point-marker.png', function(image) {
					image.set({
						selectable: false,
						left: event.e.offsetX,
						top: event.e.offsetY,
						originX: 'center',
						originY: 'center'
					});
					canvas.newMarker = image;
					canvas.newMarker.x = event.e.offsetX / canvas.getWidth();
					canvas.newMarker.y = event.e.offsetY / canvas.getHeight();
					canvas.add(canvas.newMarker);
				});
			});
			this.$canvas.on('mouse:over', function(event) {
				if (this.editable) {
					return;
				}
				if (event.target != null && event.target.point != null) {
					for (let i = 0; i < elements[event.target.point.category.id].length; i++) {
						if (elements[event.target.point.category.id][i].type == 'line') {
							elements[event.target.point.category.id][i].set('strokeWidth', 5);
						} else {
							elements[event.target.point.category.id][i].scale(elements[event.target.point.category.id][i].get('scaleX') + 0.2);
						}
					}
					this.renderAll();
					console.log(event.target.point.id + ' ' + event.target.point.latitude + ' ' + event.target.point.longitude);
				}
			});
			this.$canvas.on('mouse:out', function(event) {
				if (this.editable) {
					return;
				}
				if (event.target != null && event.target.point != null) {
					for (let i = 0; i < elements[event.target.point.category.id].length; i++) {
						if (elements[event.target.point.category.id][i].type == 'line') {
							elements[event.target.point.category.id][i].set('strokeWidth', 3);
						} else {
							elements[event.target.point.category.id][i].scale(elements[event.target.point.category.id][i].get('scaleX') - 0.2);
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
				Builds all of the markers for the points
			*/
			buildMarkers: function() {
				for (let i = 0; i < this.points.length; i++) {
					this.$elements[this.points[i].category.id] = new Array();
				}
				let elements = this.$elements;
				let categoryId;
				for (categoryId in elements) {
					let remainingPoints = [];
					for (let i = 0; i < this.points.length; i++) {
						if (this.points[i].category.id == categoryId) {
							remainingPoints.push(this.points[i]);
						}
					}
					let firstPoint = remainingPoints[0];
					let pointsInCategory = remainingPoints.length;
					let point = remainingPoints[0];
					for (; remainingPoints.length > 0; point = nearestPoint) {
						let canvas = this.$canvas;
						let marker = new Image();
						marker.src = '/img/point-marker.png';
						marker.point = point;
						marker.onload = function() {
						    let image = new fabric.Image(marker);
						    image.set({
						    	selectable: false,
								left: parseFloat(marker.point.latitude) * canvas.getWidth(),
								top: parseFloat(marker.point.longitude) * canvas.getHeight(),
								originX: 'center',
								originY: 'center',
								point: marker.point
						    });
							canvas.add(image);
							elements[marker.point.category.id].push(image);
						}
						remainingPoints.splice(remainingPoints.indexOf(point), 1);
						var nearestPoint = this.nearestPoint(point, remainingPoints);
						if (nearestPoint != null) {
							let line = new fabric.Line([ parseFloat(point.latitude) * canvas.getWidth(), parseFloat(point.longitude) * canvas.getHeight(), parseFloat(nearestPoint.latitude) * canvas.getWidth(), parseFloat(nearestPoint.longitude) * canvas.getHeight() ], {
								fill: 'white',
								stroke: 'white',
								strokeWidth: 3,
								selectable: false,
								evented: false,
								originX: 'center',
								originY: 'center'
							});
							canvas.add(line);
							elements[point.category.id].push(line);
						} else if (pointsInCategory > 2) {
							let line = new fabric.Line([ parseFloat(point.latitude) * canvas.getWidth(), parseFloat(point.longitude) * canvas.getHeight(), parseFloat(firstPoint.latitude) * canvas.getWidth(), parseFloat(firstPoint.longitude) * canvas.getHeight() ], {
								fill: 'white',
								stroke: 'white',
								strokeWidth: 3,
								selectable: false,
								evented: false,
								originX: 'center',
								originY: 'center'
							});
							canvas.add(line);
							elements[point.category.id].push(line);
						}
					}
				}
			},

			setEditable: function(editable) {
				this.$canvas.editable = editable;
			},

			resizeCanvas: function() {
				if (this.$canvas.editable) {
					return;
				}
				var width = document.getElementById('points-map').offsetWidth;
				var height = document.getElementById('points-map').offsetHeight;
				if (width >= height) {
					this.$canvas.setWidth(height);
					this.$canvas.setHeight(height);
				} else {
					this.$canvas.setWidth(width);
					this.$canvas.setHeight(width);
				}
			},

			nearestPoint: function(point, remainingPoints) {
				if (remainingPoints.length == 0) {
					return null;
				}
				var minimum = Math.sqrt(Math.pow((parseFloat(point.latitude) - parseFloat(remainingPoints[0].latitude)) * this.$canvas.getWidth(), 2) + Math.pow((parseFloat(point.longitude) - parseFloat(remainingPoints[0].longitude)) * this.$canvas.getHeight(), 2));
				var nearest = remainingPoints[0];
				for (let j = 1; j < remainingPoints.length; j++) {
					let value = Math.sqrt(Math.pow((parseFloat(point.latitude) - parseFloat(remainingPoints[j].latitude)) * this.$canvas.getWidth(), 2) + Math.pow((parseFloat(point.longitude) - parseFloat(remainingPoints[j].longitude)) * this.$canvas.getHeight(), 2));
					if (value < minimum) {
						minimum = value;
						nearest = remainingPoints[j];
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
					for (let i = 0; i < this.$elements[this.prieviouslySelectedCategory].length; i++) {
						if (this.$elements[this.prieviouslySelectedCategory][i].type == 'line') {
							this.$elements[this.prieviouslySelectedCategory][i].set('strokeWidth', 3);
						} else {
							this.$elements[this.prieviouslySelectedCategory][i].scale(this.$elements[this.prieviouslySelectedCategory][i].get('scaleX') - 0.2);
						}
					}
					this.$canvas.renderAll();
				} else {
					for (let i = 0; i < this.$elements[this.selectedCategory].length; i++) {
						if (this.$elements[this.selectedCategory][i].type == 'line') {
							this.$elements[this.selectedCategory][i].set('strokeWidth', 5);
						} else {
							this.$elements[this.selectedCategory][i].scale(this.$elements[this.selectedCategory][i].get('scaleX') + 0.2);
						}
					}
					this.$canvas.renderAll();
				}
				this.prieviouslySelectedCategory = this.selectedCategory;
			},

			highlightPoint: function() {
				if (this.editable) {
					return;
				}
				if (this.selectedPoint == null) {
					if (this.prieviouslySelectedPoint == null) {
						return;
					}
					var categoryId;
					for (categoryId in this.$elements) {
						let found = false;
						for (let i = 0; i < this.$elements[categoryId].length; i++) {
							if (this.$elements[categoryId][i].point != null && this.$elements[categoryId][i].point.id == this.prieviouslySelectedPoint) {
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
						if (this.$elements[this.selectedCategory][i].point != null && this.$elements[this.selectedCategory][i].point.id == this.selectedPoint) {
							this.$elements[this.selectedCategory][i].setShadow({
								color: '#ffffff',
								blur: 15
							});
							break;
						}
					}
					this.$canvas.renderAll();
				}
				this.prieviouslySelectedPoint = this.selectedPoint;
			}
		}
	}
</script>
