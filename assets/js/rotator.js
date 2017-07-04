var boardSize = 5;

init();

/**
 * Initializes the board and event listeners for the squares.
 */
function init() {
	$( ".square" ).on( "click", function() {
		$( this ).toggleClass( "rotated" );
		rotateNeighbors( $( this ).attr( "id" ) );
		if ( checkWin() ) {
			$( "h1" ).text( "Victory!" );
		}
	});
}

/**
 * Rotates the squares to the north, east, west, and south of the clicked
 *   square.
 * @param clickedSquare The ID of the square that was clicked by the user
 */
function rotateNeighbors( clickedID ) {
  rotateNorthSouth( Number( clickedID[1] ), Number( clickedID[3] ) );
  rotateWestEast( Number( clickedID[1] ), Number( clickedID[3] ) );
}

/**
 * Rotates the neighboring squares to the north and south of the square that
 *   was clicked.
 * @param rowOfClicked The row number of the square that was clicked
 * @param colOfClicked The column number of the square that was clicked
 */
function rotateNorthSouth( rowOfClicked, colOfClicked ) {
	var northRow = rowOfClicked - 1;
	var northSqID = "#r" + northRow + "c" + colOfClicked;
	var southRow = rowOfClicked + 1;
  var southSqID = "#r" + southRow + "c" + colOfClicked;

  if ( northRow >= 0 ) {
  	$( northSqID ).toggleClass( "rotated" );
  }
  if ( southRow < boardSize ) {
  	$( southSqID ).toggleClass( "rotated" );
  }
}

/**
 * Rotates the neighboring squares to the east and west of the square that
 *   was clicked.
 * @param rowOfClicked The row number of the square that was clicked
 * @param colOfClicked The column number of the square that was clicked
 */
function rotateWestEast( rowOfClicked, colOfClicked ) {
	var westCol = colOfClicked - 1;
  var westSqID = "#r" + rowOfClicked + "c" + westCol;
	var eastCol = colOfClicked + 1;
	var eastSqID = "#r" + rowOfClicked + "c" + eastCol;

  if ( westCol >= 0 ) {
  	$( westSqID ).toggleClass( "rotated" );
  }
  if ( eastCol < boardSize ) {
  	$( eastSqID ).toggleClass( "rotated" );
  }
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
	for ( var r = 0; r < boardSize; r++ ) {
  	for ( var c = 0; c < boardSize; c++ ) {
  		var squareId = "#r" + r + "c" + c;
  		if ( $( squareId ).hasClass( "rotated" ) ) {
  			return false;
  		}
  	}
  }
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
  return true;
}