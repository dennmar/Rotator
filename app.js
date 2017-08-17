var express                = require( "express" );
var mongoose               = require( "mongoose" );
var passport               = require( "passport" );
var bodyParser             = require( "body-parser" );
var flash                  = require( "connect-flash" );
var User                   = require( "./models/user" );
var Level                  = require( "./models/level" );
var LocalStrategy          = require( "passport-local" );
var passportLocalMongoose  = require( "passport-local-mongoose" );

var app         = express();
var port        = process.env.PORT || 8000;

var apiRoutes          = require( "./routes/api" );
var userRoutes         = require( "./routes/user" );
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

app.use( menuAndGameRoutes );
app.use( "/user", userRoutes );
app.use( "/api", apiRoutes );

app.listen( port, function() {
	console.log( "Starting on port " + port );	
});