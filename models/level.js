var mongoose = require( "mongoose" );

var levelSchema = new mongoose.Schema( {
	level: Number,
	difficulty: String,
	startingRotates: [ String ]
});

module.exports = mongoose.model( "Level", levelSchema );