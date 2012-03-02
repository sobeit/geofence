
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

var PolygonFence = require('./lib/PolygonFence');
var GeoFence = require('./model/GeoFence');
app.get('/fence/point', function(req, res){
	GeoFence.find({'fence_id':req.query.fence_id},function(err,docs){
		polygonFence = new PolygonFence(docs[0].poly_loc);
		result = polygonFence.findPoint({x:req.query.lat,y:req.query.lng});
		res.contentType('application/json');
		res.json({'result':result});
	    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
