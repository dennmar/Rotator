var express     = require( "express" );
var mongoose    = require( "mongoose" );
var bodyParser  = require( "body-parser" );

var app         = express();
var port        = process.env.PORT || 8000;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.set( "view engine", "ejs" );

app.get( "/", function( req, res ) {
	res.render( "start" );
});

app.listen( port, function() {
	console.log( "Starting on port " + port );	
});