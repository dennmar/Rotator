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

router.post( "/levels", function( req, res ) {
	if ( req.user && req.user.username === "Admin" ) {
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
				res.redirect( "/find/levels" );
			}
		});
	}
	else {
		req.flash( "userMessage", "Permission denied" );
		res.redirect( "/" );
	}
});

router.put( "/levels/:level_id", function( req, res ) {
	if ( req.user && req.user.username === "Admin" ) {
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
				res.redirect( "/find/levels" );
			}
		});
	}
	else {
		req.flash( "userMessage", "Permission denied" );
		res.redirect( "/" );
	}
});

router.delete( "/levels/:level_id", function( req, res ) {
	if ( req.user && req.user.username === "Admin" ) {
		Level.findByIdAndRemove( req.params.level_id, function( err ) {
			if ( err ) {
				console.log( err );
			}
			else {
				res.redirect( "/find/levels" );
			}
		});
	}
	else {
		req.flash( "userMessage", "Permission denied" );
		res.redirect( "/" );
	}
});

module.exports = router;