var express  = require( "express" );
var router   = express.Router();
var Level    = require( "../models/level" );

router.get( "/levels", function( req, res ) {
	Level.find( function( err, levels ) {
		if ( err ) {
			res.send( err );
		}
		res.json( levels );
	});
});

router.post( "/levels", function( req, res ) {
	var newLevel = {
		level: req.body.level,
		startingRotates: req.body.startingRotates
	};
	Level.create( newLevel, function( err, level ) {
		if ( err ) {
			console.log( err );
		}
		else {
			res.redirect( "/api/levels" );
		}
	});
});

router.put( "/levels/:level_id", function( req, res ) {
	var updatedLevel = {
		level: req.body.level,
		startingRotates: req.body.startingRotates
	}
	Level.findByIdAndUpdate( req.params.level_id, updatedLevel, function( err, updatedLevel ) {
		if ( err ) {
			console.log( err );
		}
		else {
			res.redirect( "/api/levels" );
		}
	});
});

module.exports = router;