$( "input[name='option']" ).on( "change", function() {
	if ( $( this ).val() === "log-in" ) {
		$( "span.log-in" ).fadeOut( 0, function() {
			$( "form.log-in" ).fadeIn( 1000 );
		});
		$( "form.sign-up" ).fadeOut( 0, function() {
			$( "span.sign-up" ).fadeIn( 1000 );
		});
	}
	else {
		$( "span.sign-up" ).fadeOut( 0, function() {
			$( "form.sign-up" ).fadeIn( 1000 );
		});
		$( "form.log-in" ).fadeOut( 0, function() {
			$( "span.log-in" ).fadeIn( 1000 );
		});
	}
});