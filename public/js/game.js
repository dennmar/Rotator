var Board = {
	boardSize: 0,

	/**
	 * Prepares the board for play by setting listeners.
	 */
	init: function() {
		this.determineBoard();
		this.setSquareListeners();
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
		$( ".square" ).on( "click", function() {
			rotate( $( this ).attr( "id" ) );
		});
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
	}
};

Board.init();