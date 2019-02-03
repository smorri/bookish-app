/* ======================================================================================= */
/* ------------------------------------ BOOKLOOK APP ------------------------------------- */
/*																						   */
/* @description - A book search application powered by Javascript and Google Books API.    */
/*                For each query entered, the application displays a list of books that    */
/*				  match the title and/or author(s) name.								   */
/* @author - Samone Morris																   */
/* @date - 01/25/2019																	   */
/* @updated - 02/03/2019																   */
/* ======================================================================================= */

/* ======================================================================================= */
/* -------------------------------------- VARIABLES -------------------------------------- */
/* ======================================================================================= */
var STATE_ENABLED = "enabled",
	STATE_DISABLED = "disabled";

/* ======================================================================================= */
/* -------------------------------------- FUNCTIONS -------------------------------------- */
/* ======================================================================================= */

/**
 * -----------------------------------------------------------------------------------------
 * getSearchFieldState()
 *
 * Returns the state ( enabled || disabled ) of the Search Field which ultimately controls
 * the state of it's child nodes.
 * -----------------------------------------------------------------------------------------
 */
getSearchFieldState = function(){
	return ( $( ".input-wrapper" ).attr( "data-disabled" ) != null ) ? "disabled" : "enabled";
}// end getSearchFieldState()

/**
 * -----------------------------------------------------------------------------------------
 * getSearchFieldState()
 *
 * Sets the "data-disabled" attribute state of the 'Search Field'
 * -----------------------------------------------------------------------------------------
 */
setSearchFieldState = function( state ){
	var currentState = getSearchFieldState();
	state = state.toLowerCase();

	if( currentState != state ){
		if( state == "disabled" ){
			$( ".input-wrapper" ).attr( "data-disabled", "" );
			$( ".input-wrapper" ).children().blur();
		} else{
			$( ".input-wrapper" ).removeAttr( "data-disabled" );
		}
	}
}// end setSearchFieldState(...)

/**
  * -----------------------------------------------------------------------------------------
  * validateUserInput()
  * 
  * @return	the trimmed text entered into the search field.
  *
  * Ensure that the text entered into the search field is non-blank. If blank input
  * is detected, warn the user and return an empty string.
  * -----------------------------------------------------------------------------------------
  */
validateUserInput = function(){
	// -------------------------------------------------------------------------------------
	// Trim whitespace from the Search Field and set it as the actual input value.
	$( "#input-field" ).val( $( "#input-field" ).val().trim() ).change();

		var queryText = $( "#input-field" ).val();

		// -------------------------------------------------------------------------------------
		// If user input is blank, display an error message.
	if( queryText.length < 1 ){
		var errorMessage = document.createElement( "small" );
		errorMessage.id = "search-error";
		$( errorMessage ).text( "Enter some text before performing your search!" );
		$( "#search-container" ).append( $( errorMessage ) );

		return "";
   	}// end if

   	return queryText;
}// end function validateUserInput()

$( document ).ready( function(){
	/**
	 * -----------------------------------------------------------------------------------------
	 * beginSearch()
	 *
	 * This function is responsible for a number of different tasks : 
	 *
	 * [2 Clears Previous Search Results - If the user performs subsequent searches, we need
	 *     to perform a cleanup process where we remove the old results to make room for the 
	 *     new search results.
	 * [2] Display the Results Container & Loader - For a nicer user experience, I include
	 *     a loading icon and header text to inform the user that the search is underway.
	 * [3] Builds Results - Calls an additional function to complete the AJAX call and display
	 *     results
	 * -----------------------------------------------------------------------------------------
	 */
    beginSearch = function( query ){
		// -------------------------------------------------------------------------------------
   		// Lets perform a page reset. If any error messages are displayed, remove those
   		// and if results are already presented, hide the results container again
   		resetSearch();

   		// -------------------------------------------------------------------------------------
		// To prevent the user from making additional AJAX calls while a search is in
		// progress, disable the search field and button.
		setSearchFieldState( STATE_DISABLED );

   		// -------------------------------------------------------------------------------------
		// Display some visual to the user to show that the search is underway!
	    $( "#results-container" ).append( createLoadingGraphic( query ) );

   		// -------------------------------------------------------------------------------------
		// Fade the book results container into view once input is validated and perform the 
		// AJAX call and generate the results
    	$( "#results-container" ).fadeIn( "slow", function(){
		    buildList( query );
    	});   
	}// end function beginSearch()

	/* ======================================================================================= */
	/* ----------------------------------------- MAIN ---------------------------------------- */
	/* ======================================================================================= */

	setSearchFieldEnterKeyTrigger();
	setClearSearchFieldIfTextTrigger();
	setClearSearchFieldButtonVisibility();
	setToTopOfPageButtonTrigger();

	$( "#search-container" ).fadeIn( "fast", function(){
		$( ".header-wrapper" ).fadeTo( 1500, 1 );
		$( "#search-button" ).on( "click", function(){
			// If the search error message is already displayed, delete it.
			$( "#search-error" ).remove();

			// ---------------------------------------------------------------------------------
			// Validate user input. Input should not be empty.
			var query = validateUserInput();
			if( query.length == 0 ){
				return;
			}// end if

			beginSearch( query );
		});
	});
});