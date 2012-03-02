function PolygonFence(points) {
    for(i = 0; i < points.length; i++) {
	points[i] = this.exchangeDegree(points[i]);
    }
    this.points = points;
}

PolygonFence.prototype.count = function() {
    return this.points.length;
}

PolygonFence.prototype.findPoint = function(point) {
    sides = this.count() - 1;
    j = sides - 1;
    result = false;
    point = this.exchangeDegree(point);

    for(i = 0; i < sides; i++) {
	if(this.points[i].y < point.y && this.points[j].y >= point.y || this.points[j].y < point.y && this.points[i].y >= point.y) {
	    if(this.points[i].x + (point.y - this.points[i].y) / (this.points[j].y - this.points[i].y) 
	       * (this.points[j].x - this.points[i].x) < point.x){
		result = !result;
	    }
	    j = i;
	}
	return result;
    }
}

PolygonFence.prototype.exchangeDegree = function(point) {
      latsec = Number(point.x.toString(10).substr(5,4))/6000;
      latmin = (Number(point.x.toString(10).substr(3,2))+latsec)/60;
      point.x = Number(point.x.toString(10).substr(0,2))+latmin;

      lngsec = Number(point.y.toString(10).substr(6,4))/6000;
      lngmin = (Number(point.y.toString(10).substr(4,2))+lngsec)/60;
      point.y = Number(point.y.toString(10).substr(0,3))+lngmin;

      return point;
}

module.exports = PolygonFence;