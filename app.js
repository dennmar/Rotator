var express     = require( "express" );
var mongoose    = require( "mongoose" );
var bodyParser  = require( "body-parser" );

var app         = express();
var port        = process.env.PORT || 8000;

app.use( bodyParser.urlencoded( { extended: true } ) );

app.get( "/", function( req, res ) {
	res.send( "Rotator" );
});

app.listen( port, function() {
	console.log( "Starting on port " + port );	
});