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

setIconHover();