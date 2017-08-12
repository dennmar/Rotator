var express                = require( "express" );
var mongoose               = require( "mongoose" );
var passport               = require( "passport" );
var bodyParser             = require( "body-parser" );
var flash                  = require( "connect-flash" );
var User                   = require( "./models/user" );
var LocalStrategy          = require( "passport-local" );
var passportLocalMongoose  = require( "passport-local-mongoose" );

var app         = express();
var port        = process.env.PORT || 8000;
var modes       = [ "easy", "medium", "hard" ];

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
	res.locals.logInError = req.flash( "logInError" );
	res.locals.signInError = req.flash( "signInError" );
	next();
});

app.get( "/", function( req, res ) {
	res.render( "start" );
});

app.get( "/game", function( req, res ) {
	res.render( "game" );
});

app.get( "/game/:mode", function( req, res ) {
	var mode = req.params.mode;
	modes.forEach( function( difficulty ) {
		if ( mode === difficulty ) {
			res.render( req.params.mode );
		}
	});
});

app.get( "/user", function( req, res ) {
	res.render( "user" );
});

app.post( "/user/signup", function( req, res ) {
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

app.listen( port, function() {
	console.log( "Starting on port " + port );	
});