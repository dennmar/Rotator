var boardSize = 5;
var maxBoardSize = 6;
var currentDiff = "medium";
var boardSizings = {
  easy: 4,
  medium: 5,
  hard: 6
};
var difficulties = [ 
  "easy",
  "medium",
  "hard"
];

init();

/**
 * Randomizes the board and adds event listeners for the squares and buttons.
 */
function init() {
	$( ".square" ).on( "click", function() {
		$( this ).toggleClass( "rotated" );
		rotateNeighbors( $( this ).attr( "id" ) );
		if ( checkWin() ) {
			$( "h1" ).text( "Victory!" );
		}
	});

  difficulties.forEach( function( diff ) {
    setDiffBtnListener( diff );
  });
  $( "#newGameBtn" ).on( "click", randomizeBoard );

  randomizeBoard();
}

/**
 * Sets an event listener for a button of the specified difficulty so that it
 *   will change the game properties once clicked.
 * @param difficulty The type of difficulty button that needs an event listener
 */
function setDiffBtnListener( difficulty ) {
  var buttonID = "#" + difficulty + "Btn";
  $ ( buttonID ).on( "click", function() {
    if ( currentDiff !== difficulty ) {
      toggleDiff( currentDiff );
      currentDiff = difficulty;
      boardSize = boardSizings[currentDiff];
      swapDiff();
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
 * Resets the board to a starting state where random squares are rotated and
 *   all other squares are not rotated.
 */
function swapDiff() {
  toggleDiff( currentDiff );
  adjustBoard();
  randomizeBoard();
}

/**
 * Adjusts the board so that it corresponds to the current board size.
 */
function adjustBoard() {
  for ( var r = 0; r < maxBoardSize; r++ ) {
    for ( var c = 0; c < maxBoardSize; c++ ) {
      var squareID = "#r" + r + "c" + c;
      if ( r < boardSize && c < boardSize ) {
        $( squareID ).css( "display", "block" );
      }
      else {
        $( squareID ).css( "display", "none" );
      }
    }
  }
}

/**
 * Toggles the difficulty spacer classes for the given difficulty to either
 *   remove the previous difficulty classes or add the new difficulty classes.
 * @param difficulty The difficulty set of spacer classes that must be toggled
 */
function toggleDiff( difficulty ) {
  var leftmost = difficulty + "Left";
  var rightmost = difficulty + "Right";
  var topmost = difficulty + "Top";

  // adds the spacer class for the first square in each row
  for ( var r = 0; r < boardSizings[difficulty]; r++ ) {
    var firstSquareID = "#r" + r + "c0";
    $( firstSquareID ).toggleClass( leftmost );
  }

  // adds the spacer class for the last square in each row
  for ( var r = 0; r < boardSizings[difficulty]; r++ ) {
    var lastSquareID = "#r" + r + "c" + ( boardSize - 1 );
    $( lastSquareID ).toggleClass( rightmost );
  }

  // adds the spacer class for the squares in the first row
  for ( var c = 0; c < boardSizings[difficulty]; c++ ) {
    var squareID = "#r0c" + c;
    $( squareID ).toggleClass( topmost );
  }
}

/**
 * Clears the board and then randomly selects a certain amount of squares to 
 *   rotate based on the board size.
 */
function randomizeBoard() {
  // clears board of current rotated squares
  $( ".square" ).removeClass( "rotated" );

  var rotates = boardSize + 2;
  rotates += Math.floor( Math.random() * boardSize );

  while ( rotates > 0 ) {
    var randomRow = Math.floor( Math.random() * boardSize );
    var randomCol = Math.floor( Math.random() * boardSize );
    var randomSqID = "#r" + randomRow + "c" + randomCol;
    
    if ( !$( randomSqID ).hasClass( "rotated" ) ) {
      $( randomSqID ).addClass( "rotated" );
      rotates--;
    }
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