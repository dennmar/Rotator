var boardSize = 5;

$( ".square" ).on( "click", function() {
	$( this ).toggleClass( "rotated" );
	if ( checkWin() ) {
		console.log( "YOU WON!!!!!!!!" );
	}
});

function checkWin() {
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