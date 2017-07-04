var boardSize = 5;

$( ".square" ).on( "click", function() {
	$( this ).toggleClass( "rotated" );
	if ( checkWin() ) {
		console.log( "YOU WON!!!!!!!!" );
	}
});

function checkWin() {  
	return allUnrotated() || allRotated();
}

function allUnrotated() {
	// checks if all squares are the color of an unrotated square
	for ( var r = 0; r < boardSize; r++ ) {
  	for ( var c = 0; c < boardSize; c++ ) {
  		var squareId = "#r" + r + "c" + c;
  		if ( $( squareId ).hasClass( "rotated" ) ) {
  			return false;
  		}
  	}
  }
  console.log( "All are unrotated" );
  return true;
}

function allRotated() {
	// checks if all squares are the color of a rotated square
	for ( var r = 0; r < boardSize; r++ ) {
  	for ( var c = 0; c < boardSize; c++ ) {
  		var squareId = "#r" + r + "c" + c;
  		if ( !$( squareId ).hasClass( "rotated" ) ) {
  			return false;
  		}
  	}
  }
  console.log( "All are rotated" );
  return true;
}