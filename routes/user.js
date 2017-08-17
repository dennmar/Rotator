var express     = require( "express" );
var router      = express.Router();
var passport    = require( "passport" );
var User        = require( "../models/user" );
var middleware  = require( "../middleware/index" );

router.get( "/", middleware.isLoggedIn, function( req, res ) {
	res.render( "user" );
});

router.post( "/login", [middleware.isLoggedIn, passport.authenticate( "local", {
		successRedirect: "/",
		failureRedirect: "/user",
		failureFlash: true
	})], function( req, res ) {

});

router.post( "/signup", middleware.isLoggedIn, function( req, res ) {
	var newUser = new User( { username: req.body.username } );
	User.register( newUser, req.body.password, function( err, user ) {
		if ( err ) {
			var errorMessage = err.message + ".";
			req.flash( "signInError", errorMessage );
			res.redirect( "/user" );
		}
		else {
			passport.authenticate( "local" )( req, res, function() {
				res.redirect( "/" );
			});
		}
	});
});

router.get( "/logout", function( req, res ) {
	req.logout();
	req.flash( "userMessage", "Logged out" );
	res.redirect( "/" );
});

module.exports = router;