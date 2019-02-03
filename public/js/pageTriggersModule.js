/* ======================================================================================= */
/* ------------------------------------ BOOKLOOK APP ------------------------------------- */
/*																						   */
/* @description - A book search application powered by Javascript and Google Books API.    */
/*                For each query entered, the application displays a list of books that    */
/*				  match the title and/or author(s) name.								   */
/*				  This file defines generic functions for page functionality.			   */
/* @author - Samone Morris																   */
/* @date - 02/03/2019																	   */
/* ======================================================================================= */

/* ======================================================================================= */
/* -------------------------------------- FUNCTIONS -------------------------------------- */
/* ======================================================================================= */

/**
 * -----------------------------------------------------------------------------------------
 * setToTopOfPageButtonTrigger()
 * 
 * Controls the 'Top Top of Page' button visibility and click event.
 * -----------------------------------------------------------------------------------------
 */
setToTopOfPageButtonTrigger = function(){
	// -------------------------------------------------------------------------------------
	// Set the parameters which activate the 'to top of page' button visibility.
	$( window ).scroll( function(){
		if( $( this ).scrollTop() > 200 ){
			$( "#top" ).fadeIn();
		} else {
			$( "#top" ).fadeOut();
		} 
	});

	// -------------------------------------------------------------------------------------
	// When click event occurs, return back to the top of the page
	$( "#top" ).click(function(){
    	$( "html, body" ).animate( { scrollTop : 0 }, 1000 );
	});
}// end function setToTopOfPageButtonTrigger()

/**
 * -----------------------------------------------------------------------------------------
 * setSearchFieldEnterKeyTrigger()
 * 
 * While the search field is in focus, users can hit the enter key to begin the search 
 * instead of clicking the 'Search' button.
 * -----------------------------------------------------------------------------------------
 */
setSearchFieldEnterKeyTrigger = function(){
	$( "#input-field" ).bind( "keyup", function( event ){
		if( event.keyCode == 13 ){
			event.preventDefault();
			$( "#search-button" ).click();

			return;
		}
	});
}// end setSearchFieldEnterKeyTrigger()

/**
 * -----------------------------------------------------------------------------------------
 * setClearSearchFieldIfTextTrigger()
 *
 * Clear the Search Field when 'Clear' / 'x' button is clicked.
 * -----------------------------------------------------------------------------------------
 */
setClearSearchFieldIfTextTrigger = function(){
	// -------------------------------------------------------------------------------------
	// As long as text is entered into the search field and the 'Clear' button is visible
	// can text be cleared from the field.
	$( "#input-clear" ).on( "click", function(){
		if( $( "#input-clear" ).css( "visibility" ) == "visible" ){				
			$( "#input-field" ).val( "" );
			$( "#input-clear" ).css( "visibility", "hidden" );
		}
	});
}// end setClearSearchFieldIfTextTrigger()

/**
 * -----------------------------------------------------------------------------------------
 * setClearSearchFieldButtonVisibility()
 * 
 * If text is entered into the search field, display the 'Clear' / 'x' button. Otherwise,
 * hide it.
 * -----------------------------------------------------------------------------------------
 */
setClearSearchFieldButtonVisibility = function(){
	var numChars;

	$( "#input-field" ).bind( "change paste keyup", function( event ) {
	    numChars = $( "#input-field" ).val().length;

	    if( $( "#input-clear" ).css( "visibility" ) == "visible" ){
			if( numChars < 1 ){
				$( "#input-clear" ).css( "visibility", "hidden" );
			}
		} else {
			if( numChars > 0 ){
				$( "#input-clear" ).css( "visibility", "visible" );
			}
		}
	});
}// end function setClearSearchFieldButtonVisibility()