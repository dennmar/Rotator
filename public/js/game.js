var Board = {
	/**
	 * Prepares the board for play by setting listeners.
	 */
	init: function() {
		this.setSquareListeners();
	},

	/**
	 * Sets listeners on all squares to rotate upon clicking.
	 */
	setSquareListeners: function() {
		$( ".square" ).on( "click", function() {
			$( this ).toggleClass( "rotated" );
		});
	}
};

Board.init();