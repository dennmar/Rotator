var middlewareObj = {};

middlewareObj.isLoggedIn = function( req, res, next ) {
	if ( req.isAuthenticated() ) {
		req.flash( "userMessage", "You are already logged in" );
		return res.redirect( "/" );
	}
	next();
};

module.exports = middlewareObj;