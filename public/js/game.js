var Board = {
	boardSize: 0,
	hasWon: false,
	startingSqs: [],

	/**
	 * Prepares the board for play by setting listeners.
	 */
	init: function() {
		this.determineBoard();
		this.setSquareListeners();
		this.setIconListeners();
		this.randomizeBoard();
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
		var thisBoard = this;

		$( ".square" ).on( "click", function() {
			if ( !thisBoard.hasWon ) {
				rotate( $( this ).attr( "id" ) );
				if ( allAreUnrotated() || allAreRotated() ) {
					thisBoard.hasWon = true;
					$( ".fa-star" ).removeClass( "zero-opacity" );
					$( "#movesIcon" ).addClass( "green" );
					$( "#timeIcon" ).addClass( "green" );
				}
			}
		});
	},

	/**
	 * Sets listeners on all game icons to act appropriately when clicked.
	 */
	setIconListeners: function() {
		var reset = this.resetGame.bind( this );
		var startNew = this.startNewGame.bind( this );

		$( "#resetIcon" ).on( "click", function() {
			reset();
		});
		$( "#newGameIcon" ).on( "click", function() {
			startNew();
		});
	},

	/**
	 * Randomly selects a certain amount of squares to rotate based on the
	 *     board size.
	 */
	randomizeBoard: function() {
		var rotates = this.boardSize * 3;
		var randomSqs = [];

		rotates += Math.floor( Math.random() * this.boardSize );

		while ( rotates > 0 ) {
			var randomRow = Math.floor( Math.random() * this.boardSize );
			var randomCol = Math.floor( Math.random() * this.boardSize );
			var randomSqSel = "#r" + randomRow + "c" + randomCol;

			// only rotates if the 5 most recent random rotates were not
			//     centered at the same square
			if ( randomSqs.slice( 0, 5 ).indexOf( randomSqSel ) < 0 ) {
				randomSqs.unshift( randomSqSel );
				rotates--;
			}
		}

		this.rotateMultiple( randomSqs );
		this.startingSqs = randomSqs;
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
	 * Resets the icons to their initial state and returns the board to
	 *     its starting configuration.
	 */
	resetGame: function() {
		this.clear();
		this.rotateMultiple( this.startingSqs );
		this.resetDisplayAndStatus();
	},

	/**
	 * Resets the icons to their initial state and randomizes the board.
	 */
	startNewGame: function() {
		this.clear();
		this.randomizeBoard();
		this.resetDisplayAndStatus();
	},

	/**
	 * Resets the icons to their initial state with no victory display and
	 *     sets win status to false.
	 */
	resetDisplayAndStatus: function() {
		$( ".fa-star" ).addClass( "zero-opacity" );
		$( "#movesIcon" ).removeClass( "green" );
		$( "#timeIcon" ).removeClass( "green" );

		this.hasWon = false;
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
	}
};

Board.init();