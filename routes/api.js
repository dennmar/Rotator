var express  = require( "express" );
var router   = express.Router();
var User     = require( "../models/user" );
var Level    = require( "../models/level" );

router.get( "/user", function( req, res ) {
	if ( !req.user ) {
		res.json( {} );
	}
	else {
		User.findOne( { username: req.user.username }, function( err, foundUser ) {
			if ( err ) {
				console.log( err );
			}
			res.json( foundUser );
		});
	}
});

router.put( "/user", function( req, res ) {
	if ( req.user ) {
		User.findOne( { username: req.user.username }, function( err, foundUser ) {
			if ( err ) {
				console.log( err );
			}
			else {
				foundUser.completedLevels.push( req.body.completedLevel );
				foundUser.save();
			}
		});
	}
});

router.get( "/levels", function( req, res ) {
	Level.find( function( err, levels ) {
		if ( err ) {
			res.send( err );
		}
		res.json( levels );
	});
});

module.exports = router;