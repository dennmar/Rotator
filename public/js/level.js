var Board = {
	boardSize: 0,
	hours: 0,
	minutes: 0,
	moves: 0,
	seconds: 0,
	hasWon: false,
	startingSqs: [],
	timer: undefined,

	/**
	 * Prepares the board for play by setting listeners.
	 */
	init: function() {
		this.determineBoard();
		this.setSquareListeners();
		this.setIconListeners();
		this.setLabels();
		this.setBoard();
	},

	/**
	 * Determines what board the user is playing on.
	 */
	determineBoard: function() {
		if ( $( ".easy" ).length > 0 ) {
			this.boardSize = 4;
		}
		else if ( $( ".medium" ).length > 0 ) {
			this.boardSize = 5;
		}
		else {
			this.boardSize = 6;
		}
	},

	/**
	 * Sets listeners on all squares to rotate upon clicking.
	 */
	setSquareListeners: function() {
		var rotate = this.rotateWithNeighbors.bind( this );
		var allAreUnrotated = this.allUnrotated.bind( this );
		var allAreRotated = this.allRotated.bind( this );
		var updateMoveLabel = this.updateMoves.bind( this );
		var thisBoard = this;

		$( ".square" ).on( "click", function() {
			if ( !thisBoard.hasWon ) {
				rotate( $( this ).attr( "id" ) );
				if ( allAreUnrotated() || allAreRotated() ) {
					thisBoard.hasWon = true;
					clearInterval( thisBoard.timer );
					$( ".fa-star" ).removeClass( "zero-opacity" );
					$( "#movesIcon" ).addClass( "green" );
					$( "#timeIcon" ).addClass( "green" );
				}
				thisBoard.moves++;
				updateMoveLabel();
			}
		});
	},

	/**
	 * Sets listeners on all game icons to act appropriately when clicked.
	 */
	setIconListeners: function() {
		var reset = this.resetGame.bind( this );

		$( "#resetIcon" ).on( "click", function() {
			reset();
		});
	},

	/**
	 * Sets the moves label and time label equal to the current moves and time.
	 */
	setLabels: function() {
		this.updateMoves();
		this.startTimer();
	},

	/**
	 * Sets up the corresponding board to the level.
	 */
	setBoard: function() {
		this.rotateMultiple( [ "#r0c0", "#r1c1", "#r2c1" ] );
	},

	/**
	 * Rotates the clicked square and its neighboring squares to the north,
	 *     east, south, and west.
	 * @param clickedId The id of the square that was clicked
	 */
	rotateWithNeighbors: function( clickedId ) {
		$( "#" + clickedId ).toggleClass( "rotated" );

		this.rotateNorthSouth( Number( clickedId[1] ),
			Number( clickedId[3] ) );
		this.rotateWestEast( Number( clickedId[1] ), Number( clickedId[3] ) );
	},

	/**
	 * Rotates the neighboring squares to the north and south of the square
	 *     that was clicked.
	 * @param rowOfClicked The row number of the clicked square
	 * @param colOfClicked The column number of the clicked square
	 */
	rotateNorthSouth: function( rowOfClicked, colOfClicked ) {
		var northRow = rowOfClicked - 1;
		var northSqSel = "#r" + northRow + "c" + colOfClicked;
		var southRow = rowOfClicked + 1;
		var southSqSel = "#r" + southRow + "c" + colOfClicked;

		if ( northRow >= 0 ) {
			$( northSqSel ).toggleClass( "rotated" );
		}
		if ( southRow < this.boardSize ) {
			$( southSqSel ).toggleClass( "rotated" );
		}
	},

	/**
	 * Rotates the neighboring squares to the west and east of the square that
	 *   was clicked.
	 * @param rowOfClicked The row number of the square that was clicked
	 * @param colOfClicked The column number of the square that was clicked
	 */
	rotateWestEast: function( rowOfClicked, colOfClicked ) {
		var westCol = colOfClicked - 1;
		var westSqSel = "#r" + rowOfClicked + "c" + westCol;
		var eastCol = colOfClicked + 1;
		var eastSqSel = "#r" + rowOfClicked + "c" + eastCol;

		if ( westCol >= 0 ) {
			$( westSqSel ).toggleClass( "rotated" );
		}
		if ( eastCol < this.boardSize ) {
			$( eastSqSel ).toggleClass( "rotated" );
		}
	},

	/**
	 * Checks if all squares are unrotated.
	 * @return True if all squares are unrotated, false otherwise.
	 */
	allUnrotated: function() {
		for ( var r = 0; r < this.boardSize; r++ ) {
			for ( var c = 0; c < this.boardSize; c++ ) {
				var squareSel = "#r" + r + "c" + c;
				if ( $( squareSel ).hasClass( "rotated" ) ) {
					return false;
				}
			}
		}
		return true;
	},

	/**
	 * Checks if all squares are rotated.
	 * @return True if all squares are rotated, false otherwise.
	 */
	allRotated: function() {
		for ( var r = 0; r < this.boardSize; r++ ) {
			for ( var c = 0; c < this.boardSize; c++ ) {
				var squareSel = "#r" + r + "c" + c;
				if ( !$( squareSel ).hasClass( "rotated" ) ) {
					return false;
				}
			}
		}
		return true;
	},

	/**
	 * Resets the icons and labels to their initial state and returns the board
	 *     to its starting configuration.
	 */
	resetGame: function() {
		this.clear();
		this.rotateMultiple( this.startingSqs );
		this.resetDisplayAndStatus();
	},

	/**
	 * Resets the icons and labels to their initial state with no victory
	 *     display and sets win status to false.
	 */
	resetDisplayAndStatus: function() {
		clearInterval( this.timer );

		$( ".fa-star" ).addClass( "zero-opacity" );
		$( "#movesIcon" ).removeClass( "green" );
		$( "#timeIcon" ).removeClass( "green" );
		$( "#time" ).text( "00:00:00" );

		this.hasWon = false;
		this.moves = 0;
		this.seconds = 0;
		this.minutes = 0;
		this.hours = 0;

		this.setLabels();
	},

	/**
	 * Removes rotated class from all squares on the board.
	 */
	clear: function() {
		$( ".square" ).removeClass( "rotated" );
	},

	/**
	 * Rotates all squares with their neighbors in the given array.
	 * @param squares The ids of all the squares to be rotated with their
	 *                neighbors
	 */
	rotateMultiple: function( squares ) {
		var rotate = this.rotateWithNeighbors.bind( this );

		squares.forEach( function( squareId ) {
			rotate( squareId.slice( 1 ) );
		});

		this.startingSqs = squares;
	},

	/**
	 * Updates the moves label to reflect the current amount of moves that the
	 *     user has taken.
	 */
	updateMoves: function() {
		$( "#moves" ).text( this.moves );
	},

	/**
	 * Starts the game timer for the amount of time that the user has been
	 *     attempting to solve the current game.
	 */
	startTimer: function() {
		var thisBoard = this;
		this.timer = setInterval( function() {
			thisBoard.seconds++;
			if ( thisBoard.seconds === 60 ) {
				thisBoard.seconds = 0;
				thisBoard.minutes++;
			}
			if ( thisBoard.minutes === 60 ) {
				thisBoard.minutes = 0;
				thisBoard.hours++;
			}

			var secondsStr = ( "0" + thisBoard.seconds ).slice( -2 );
			var minutesStr = ( "0" + thisBoard.minutes ).slice( -2 );
			var hoursStr = ( "0" + thisBoard.hours ).slice( -2 );

			$( "#time" ).text( hoursStr + ":" + minutesStr + ":" +
				secondsStr );
		}, 1000 );
	}
};

Board.init();