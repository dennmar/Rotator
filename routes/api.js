var express  = require( "express" );
var router   = express.Router();
var User     = require( "../models/user" );
var Level    = require( "../models/level" );

router.get( "/users", function( req, res ) {
	User.find( function( err, users ) {
		if ( err ) {
			res.send( err );
		}
		res.json( users );
	});
});

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
		difficulty: req.body.difficulty,
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
		difficulty: req.body.difficulty,
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

router.delete( "/levels/:level_id", function( req, res ) {
	Level.findByIdAndRemove( req.params.level_id, function( err ) {
		if ( err ) {
			console.log( err );
		}
		else {
			res.redirect( "/api/levels" );
		}
	});
});

module.exports = router;