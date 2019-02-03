/* ======================================================================================= */
/* ------------------------------------ BOOKLOOK APP ------------------------------------- */
/*																						   */
/* @description - A book search application powered by Javascript and Google Books API.    */
/*                For each query entered, the application displays a list of books that    */
/*				  match the title and/or author(s) name.								   */
/*				  This file controls the functionality behind making the AJAX call and     */
/*				  presenting results.													   */
/* @author - Samone Morris																   */
/* @date - 02/03/2019																	   */
/* ======================================================================================= */

/* ======================================================================================= */
/* -------------------------------------- VARIABLES -------------------------------------- */
/* ======================================================================================= */
var BATCH_COUNT = 10,
	MAX_RESULTS = 40,
	i = 0,
	totalItems,
	booksData,
	loadMoreButton;

/* ======================================================================================= */
/* -------------------------------------- FUNCTIONS -------------------------------------- */
/* ======================================================================================= */

/**
 * -----------------------------------------------------------------------------------------
 * createLoadingGraphic( query )
 * -----------------------------------------------------------------------------------------
 */
createLoadingGraphic = function( query ){
    var loaderContainer = document.createElement( "div" );
    loaderContainer.id = "loader";

    var loaderText = document.createElement( "h1" );
    $( loaderText ).text( "Searching for '" + query + "'" );
    $( loaderContainer ).append( $( loaderText ) );
    $( loaderContainer ).append( "<img src=\"images/loading.png\"/>" );

    return loaderContainer;
}// end createLoadingGraphic()

/**
 * -----------------------------------------------------------------------------------------
 * createLoadMoreButton()
 * -----------------------------------------------------------------------------------------
 */
createLoadMoreButton = function(){
	var moreResultsButton = document.createElement( "a" );
	moreResultsButton.id = "load-more";
	$( moreResultsButton ).append( "<span>Load More</span>" )
					   .append( "<i class=\"fas fa-angle-double-down\"></i>" );
	$( moreResultsButton ).on( "click", loadResultsBatch );

	return moreResultsButton;
}// end createLoadMoreButton()

/**
 * -----------------------------------------------------------------------------------------
 * resetSearch()
 * 
 * Prepares page when a new search query is submitted by removing all previously generated
 * content and resets global variables.
 * -----------------------------------------------------------------------------------------
 */
resetSearch = function(){
	$( "#loader" ).remove();
	$( ".results-header" ).remove();
	$( ".row-wrapper" ).remove();
	$( "#load-more" ).remove();
	$( "#results-complete" ).remove();

	loadMoreButton = null;
	MAX_RESULTS = 40;
	totalItems = 0;
	i = 0;
}// end function resetSearch()

/**
 * -----------------------------------------------------------------------------------------
 * hasMoreResultsToDisplay()
 * -----------------------------------------------------------------------------------------
 */
hasMoreResultsToDisplay = function(){
	return i < MAX_RESULTS;
}// end function hasMoreResultsToDisplay()

/**
 * -----------------------------------------------------------------------------------------
 * buildBookRow( i, book )
 * 
 * @param	i    	the current index we are at in our books data object
 * @param   book 	single book object at index i
 *
 * @return  a 'row' element which holds all of the book information needed to display to 
 *		    the user.
 *
 * Builds a single row to hold book information. A row wil contain :
 * (1) a list number
 * (2) book thumbnail
 * (3) book information (title, author, publisher).
 * (4) a link which redirects to the Google Play store
 * -----------------------------------------------------------------------------------------
 */
buildBookRow = function( i, book ){
	// -------------------------------------------------------------------------------------
	// Create a single row to display the book information
	var bookRow = document.createElement( "div" );
	bookRow.className = "row-wrapper";

	// -------------------------------------------------------------------------------------
	// Create an element to hold the row number
	var rowValue = document.createElement( "span" );
	rowValue.className = "row-value";
	$( rowValue ).text( i + 1 );
	$( bookRow ).append( $( rowValue ) );

	// -------------------------------------------------------------------------------------
	// Create an element to hold the book cover thumbnail. Some books may not contain
	// an image, so we need to check if this book object contains the 'imageLinks' 
	// key. If it does not, display a placeholder instead.
	var thumbnail = document.createElement( "img" );
	thumbnail.className = "book-cover";
	thumbnail.src = ( book.hasOwnProperty( "imageLinks" ) ) ? book.imageLinks.smallThumbnail : "images/noCover.png"; 

	$( bookRow ).append( $( thumbnail ) );

	// -------------------------------------------------------------------------------------
	// Create a container to hold the book information.
	var infoContainer = document.createElement( "div" );
	infoContainer.className = "book-info";
	$( bookRow ).append( $( infoContainer ) );

	// -------------------------------------------------------------------------------------
	// Within the info container, create an element to hold the title,
	// author, and publisher text. 
	var title = document.createElement( "h3" );
	var authors = document.createElement( "span" );
	var publisher = document.createElement( "span" );


	title.className = "book-title";
	authors.className = "book-details book-authors";
	publisher.className = "book-details book-publisher";

	// -------------------------------------------------------------------------------------
	// Some books may not have an author and/or publisher, so we need to
	// check to see if this book object contains the 'authors' and 'publisher'
	// keys respectivelu. If one (or both) do not exist, then we must display 
	// placeholder.
	if( book.hasOwnProperty( "authors" ) ){
		$( authors ).text( book.authors );
	} else {
		$( authors ).addClass( "details-unavailable" );
	}

	if( book.hasOwnProperty( "publisher" ) ){
		$( publisher ).text( book.publisher );
	} else {
		$( publisher ).addClass( "details-unavailable" );
	}

	$( title ).text( book.title );

	$( infoContainer ).append( $( title ) ).append( $( authors ) ).append( $( publisher ) );

	// -------------------------------------------------------------------------------------
	// Create a clickable element that will redirect the user to more
	// information about the book
	var moreInfo = document.createElement( "a" );
	moreInfo.className = "book-more";
	moreInfo.target = "_blank";
	moreInfo.href = book.infoLink;
	$( moreInfo ).text( "View More Information" );
	$( infoContainer ).append( $( moreInfo ) );

	return bookRow;
}// end function buildBookRow(...)

/**
 * -----------------------------------------------------------------------------------------
 * loadResultsBatch()
 *
 * Generates a 'batch' of results, typically 10 (or less) per function call.
 * -----------------------------------------------------------------------------------------
 */
loadResultsBatch = function(){
	$( "#load-more" ).hide();		

	var j = 0;	// Batch counter

	// -------------------------------------------------------------------------------------
	// Generate the rows in the results container.
	while( j < BATCH_COUNT ){
		$( "#results-container" ).append( 
			buildBookRow( i, booksData.items[ i ].volumeInfo )
		);

		i++;
		j++;

		// ---------------------------------------------------------------------------------
		// There are no more results to display.
		if( !hasMoreResultsToDisplay( i ) ){ 
			$( "#load-more" ).remove();

			$( "#results-container" )
				.append( "<em id=\"results-complete\">--- End of Results ---</em>" );
			return;
		}
	}// end for(...)

	// -------------------------------------------------------------------------------------
	// Re-display 'Load More' button.
	$( "#results-container" ).append( $( loadMoreButton ).show() );
}// end loadResultsBatch()

/**
 * -----------------------------------------------------------------------------------------
 * getJSONData( query, maxResults, callback )
 *
 * @param	query    	the query to search for
 * @param   maxResults 	the maximum number of items to retrieve
 * @param	callback	
 *
 * Completes an asynchronous AJAX call to the Google Books API and returns the JSON data.
 * -----------------------------------------------------------------------------------------
 */	
getJSONData = function( query, maxResults, callback ){
	new Promise( function( resolve, reject ){
		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q=" + query +
				 "&maxResults=" + maxResults,
			dataType: "json",
			success: function( data ){
				console.info("[>] Success : AJAX call to Google Books API");
			 	resolve( data );
			},
			error: function( request, error ){
				reject( Error( "[!] An error occurred while trying to complete the request" + error ) );
			}
		});
	}).then( function( returnValue ){
		callback( returnValue );
	});
}// end function getJSONData(...)

/**
 * -----------------------------------------------------------------------------------------
 * buildList( query )
 * 
 * @param	query   text entered by the user
 *
 * Performs an AJAX call to the Google Books API and inserts the user's query. Once call
 * is successfully completed, begin building the list. This method initially displays 
 * the first 10 books (or less if the AJAX call does not contain 10 items ).
 * -----------------------------------------------------------------------------------------
 */
buildList = function( query ){
	getJSONData( query, MAX_RESULTS, function( callback ){
		// -----------------------------------------------------------------------------
		// This is not necessary, but lets delay for 5 additional seconds
		// since this AJAX call may perform pretty quickly. I just want the
		// loader to display for a bit longer...
		$( "#loader" ).delay( 5000 ).fadeOut( function(){
			// Enable horizontal page scroll, the search input field and button
			$( "#loader" ).remove();
			setSearchFieldState( STATE_ENABLED ); 		

			booksData = callback;
			totalItems = booksData.totalItems;

			// -----------------------------------------------------------------------------
			// Suppose the books data is not greater than our MAX_RESULTS count of 40. Then
			// we need to update the MAX_RESULTS, since the maximum number of items to
			// display is equal to the total retrieved items from the AJAX call. This is a 
			// special case!
			if( totalItems < MAX_RESULTS ){
				MAX_RESULTS = totalItems;
			}

			// -----------------------------------------------------------------------------
			// Display information about the search results
			var resultsHeader = document.createElement( "div" );
			resultsHeader.className = "results-header";
			$( resultsHeader ).append( "<h2></h2>" );
			$( "#results-container" ).append( $( resultsHeader ) );

			// -----------------------------------------------------------------------------
			// Sometimes a search yields NO results. So we need to account for
			// this special case and display a message to the user. If results do exist
			// display the appropriate messages to the user.
			if( MAX_RESULTS == 0 ){
				$( resultsHeader ).addClass( "results-none");
				$( ".results-header h2" ).text( "Sorry - No results exist for '" + 
												query + "'" );
				return;
			} else {
				$( ".results-header h2" ).text( "Here are the results for '" + 
												query + "'" );
				$( ".results-header" ).append( "<em>Retrieved " + MAX_RESULTS + 
				   								" of " + totalItems + 
				   								" items </em>");
			}

			// ----------------------------------------------------------------------------
			// Suppose our initial batch is displayed but more items remain in our
			// data object. We should create a 'Load More' button to display after the 
			// last item in the list

			loadResultsBatch();

			if( hasMoreResultsToDisplay( i ) ){
				loadMoreButton = createLoadMoreButton();
				$( "#results-container" ).append( $( loadMoreButton ) );
			}
 		});
	});
}// end function buildList(...)