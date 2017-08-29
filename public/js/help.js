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

setUserHover();