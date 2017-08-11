$( "input[name='option']" ).on( "change", function() {
	if ( $( this ).val() === "log-in" ) {
		$( ".log-in" ).toggleClass( "removed" );
		$( "span.sign-up" ).removeClass( "removed" );
		$( "form.sign-up" ).addClass( "removed" );
	}
	else {
		$( ".sign-up" ).toggleClass( "removed" );
		$( "span.log-in" ).removeClass( "removed" );
		$( "form.log-in" ).addClass( "removed" );
	}
});