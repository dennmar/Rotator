var boardSize = 5;

init();

/**
 * Initializes the board and event listeners for the squares.
 */
function init() {
	$( ".square" ).on( "click", function() {
		$( this ).toggleClass( "rotated" );
		if ( checkWin() ) {
			console.log( "YOU WON!!!!!!!!" );
		}
	});
}

/**
 * Checks if the player has won the game by changing all squares to the same 
 *   color.
 * @return True if the player has won, false otherwise.
 */
function checkWin() {  
	return allUnrotated() || allRotated();
}

/**
 * Checks if all squares are the color of an unrotated square.
 * @return True if all squares are the color of an unrotated square, false 
 *         otherwise.
 */
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

/**
 * Checks if all squares are the color of a rotated square.
 * @return True if all squares are the color of a rotated square, false 
 *         otherwise.
 */
function allRotated() {
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