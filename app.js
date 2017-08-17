var express                = require( "express" );
var mongoose               = require( "mongoose" );
var passport               = require( "passport" );
var bodyParser             = require( "body-parser" );
var flash                  = require( "connect-flash" );
var User                   = require( "./models/user" );
var Level                  = require( "./models/level" );
var LocalStrategy          = require( "passport-local" );
var middleware             = require( "./middleware/index" );
var passportLocalMongoose  = require( "passport-local-mongoose" );

var app         = express();
var port        = process.env.PORT || 8000;

var menuAndGameRoutes  = require( "./routes/index" );

mongoose.connect( "mongodb://localhost/rotator",
	{ useMongoClient: true } );
mongoose.Promise = global.Promise;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.set( "view engine", "ejs" );
app.use( express.static( __dirname + "/public" ) );
app.use( flash() );
app.use( require( "express-session" )( {
	secret: "cozy lummox gives smart squid who asked for job pen",
	resave: false,
	saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new LocalStrategy( User.authenticate() ) );
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.use( function( req, res, next ) {
	res.locals.currentUser = req.user;
	res.locals.logInError = req.flash( "error" );
	res.locals.signInError = req.flash( "signInError" );
	res.locals.userMessage = req.flash( "userMessage" );
	next();
});

app.get( "/user", middleware.isLoggedIn, function( req, res ) {
	res.render( "user" );
});

app.post( "/user/login", [middleware.isLoggedIn, passport.authenticate( "local", {
		successRedirect: "/",
		failureRedirect: "/user",
		failureFlash: true
	})], function( req, res ) {

});

app.post( "/user/signup", middleware.isLoggedIn, function( req, res ) {
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

app.get( "/user/logout", function( req, res ) {
	req.logout();
	req.flash( "userMessage", "Logged out" );
	res.redirect( "/" );
});

app.get( "/api/levels", function( req, res ) {
	Level.find( function( err, levels ) {
		if ( err ) {
			res.send( err );
		}
		res.json( levels );
	});
});

app.post( "/api/levels", function( req, res ) {
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

app.use( menuAndGameRoutes );

app.listen( port, function() {
	console.log( "Starting on port " + port );	
});