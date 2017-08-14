$( "input[name='option']" ).on( "change", function() {
	if ( $( this ).val() === "log-in" ) {
		$( "label[for='sign-up-radio']" ).removeClass( "green" );
		$( "label[for='log-in-radio']" ).addClass( "green" );

		$( "span.log-in" ).fadeOut( 0, function() {
			$( "form.log-in" ).fadeIn( 250 );
		});

		$( "form.sign-up" ).fadeOut( 0, function() {
			$( "span.sign-up.description" ).fadeIn( 250 );
		});
	}
	else {
		$( "label[for='log-in-radio']" ).removeClass( "green" );
		$( "label[for='sign-up-radio']" ).addClass( "green" );

		$( "span.sign-up" ).fadeOut( 0, function() {
			$( "form.sign-up" ).fadeIn( 250 );
		});

		$( "form.log-in" ).fadeOut( 0, function() {
			$( "span.log-in.description" ).fadeIn( 250 );
		});
	}
});