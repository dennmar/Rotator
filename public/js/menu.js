/**
 * Brings the labels for all icons to full opacity when their respective
 *     icon is hovered over.
 */
function setIconHover() {
	$( ".labeled-icon i" ).on( "mouseenter", function() {
		var labelSel = "label[for=" + $( this ).attr( "id" ) + "]";
		$( labelSel ).addClass( "full-opacity" );
	});

	$( ".labeled-icon i" ).on( "mouseleave", function() {
		var labelSel = "label[for=" + $( this ).attr( "id" ) + "]";
		$( labelSel ).removeClass( "full-opacity" );
	});
}

/**
 * Changes the text beside the user icon to "Log out" when the logged in
 *     user hovers over the user icon.
 */
function setUserHover() {
	if ( $( "#loggedUserIcon").length > 0 ) {
		var loggedInText = $( "#loggedInText" ).text();
		$( "#loggedUserIcon" ).on( "mouseenter", function() {
			$( "#loggedInText" ).text( "Log out" );
		});
		$( "#loggedUserIcon" ).on( "mouseleave", function() {
			$( "#loggedInText" ).text( loggedInText );
		});
	}
}

/**
 * Changes the color of the level icons representing the levels completed
 *     by the user in the level select menu.
 */
function highlightCompleted() {
	if ( $( ".level-select" ).length > 0 ) {
		var completedLevels = [];
		$.ajax( {
			url: "/api/user",
			method: "GET",
			success: function( data ) {
				if ( data.username ) {
					data.completedLevels.forEach( function( completedLevel ) {
						var levelIconSel = "a[href='/levels/" + String( completedLevel ) + "'] i";
						$( levelIconSel ).addClass( "green" );
					});
				}
			}
		});
	}
}

setIconHover();
setUserHover();
highlightCompleted();