require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/geofence');
var Schema = mongoose.Schema;
var PolySchema = new Schema({x:Number,y:Number});
var GeoFence = new Schema({
			  fence_id:Number,
			  poly_loc:[PolySchema]
    });

mongoose.model('GeoFence',GeoFence);
module.exports = db.model('GeoFence');