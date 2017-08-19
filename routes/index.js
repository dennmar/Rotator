var express  = require( "express" );
var router   = express.Router();
var modes    = [ "easy", "medium", "hard" ];

router.get( "/", function( req, res ) {
	res.render( "start" );
});

router.get( "/help", function( req, res ) {
	res.render( "help" );
});

router.get( "/game", function( req, res ) {
	res.render( "game" );
});

router.get( "/game/:mode", function( req, res ) {
	var mode = req.params.mode;
	modes.forEach( function( difficulty ) {
		if ( mode === difficulty ) {
			res.render( req.params.mode );
		}
	});
});

router.get( "/levels", function( req, res ) {
	res.render( "levels" );
});

router.get( "/levels/:level", function( req, res) {
	res.render( "level", { level: req.params.level } );
});

module.exports = router;