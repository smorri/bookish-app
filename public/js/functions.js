	/* ======================================================================================= */
	/* ------------------------------------ BOOKLOOK APP ------------------------------------- */
	/*																						   */
	/* @description - A book search application powered by Javascript and Google Books API.    */
	/*                For each query entered, the application displays a list of books that    */
	/*				  match the title and/or author(s) name.								   */
	/* @author - Samone Morris																   */
	/* @date - 01/25/2019																	   */
	/* ======================================================================================= */

$( document ).ready( function(){
	/* ======================================================================================= */
	/* -------------------------------------- VARIABLES -------------------------------------- */
	/* ======================================================================================= */
	var BATCH_COUNT = 10,
		MAX_RESULTS = 40,
		i = 0,
		resultsContainer = $( "#results-container" ),
		loadMoreButton,
		booksData,
		centerPosition,
	    totalItems;

	/* ======================================================================================= */
	/* -------------------------------------- FUNCTIONS -------------------------------------- */
	/* ======================================================================================= */

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
		// Trim whitespace from the userinput and set it as the actual input value.
		$( "#input-field" ).val(  $( "#input-field" ).val().trim() );

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

	/**
	 * -----------------------------------------------------------------------------------------
	 * centerSearchContainer()
	 * 
	 * When the application loads for the first time, the search container should be centered
	 * in the middle of the page. This function calculates the 'centered' value and sets the
	 * top margin and top attributes of the search container and header respectively.
	 * -----------------------------------------------------------------------------------------
	 */
	centerSearchContainer = function(){
		centerPosition = ( window.innerHeight / 2 ) - 82;
		$( "#search-container" ).css( "margin-top", centerPosition );
		$( ".search-header" ).css( "top", centerPosition );
	}// end function centerSearchContainer()

	/**
	 * -----------------------------------------------------------------------------------------
	 * setSearchFieldTrigger()
	 * 
	 * Users can activate the click action for the 'search' (Go) button by clicking enter.
	 * -----------------------------------------------------------------------------------------
	 */
	setSearchFieldTrigger = function(){
		$( "#input-field" ).on( "keyup", function( event ){
			event.preventDefault();
			
			// ---------------------------------------------------------------------------------
			// Key Code of 13 = 'Enter' key
			if( event.keyCode == 13 ){
				$( "#search-button" ).click();
			}// end if
		});
	}// end function setSearchFieldTrigger()	

	/**
	 * -----------------------------------------------------------------------------------------
	 * resetSearch()
	 * 
	 * Removes any previously generated elements when a search has already been completed and
	 * results are displayed to the user. This includes the loading spinner, results header
	 * all rows, and load more button. We also need to reset the index counter to zero and set
	 * the load more button variable to NULL to prevent duplicate buttons from showing after 
	 * additional search(es) are performed.
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
	 * hasMoreResults()
	 * 
	 * Determines, based on the current index, if there are still items available to display 
	 * to the user. The Google Books API only allows us to retrieve a maximum of 40 items. 
	 * As long as the index, i, is not greater than this count (or the total number of items 
	 * retrieved by the AJAX call) we can load additional items.
	 * -----------------------------------------------------------------------------------------
	 */
	hasMoreResults = function(){
		return i < MAX_RESULTS;
	}// end function hasMoreResults()

	/**
	 * -----------------------------------------------------------------------------------------
	 * createRow( i, book )
	 * 
	 * @param	i    	the current index we are at in our books data object
	 * @param   book 	single book object at index i
	 *
	 * @return  a 'row' element which holds all of the book information needed to display to 
	 *		    the user.
	 *
	 * Create a single row to hold book information. A row wil contain a list number, book 
	 * thumbnail, and book information (title, author, publisher). Additionally, a link is 
	 * displayed which redirects the user to the Google Play store to learn more about the 
	 * selected book.
	 * -----------------------------------------------------------------------------------------
	 */
	createRow = function( i, book ){
		// -------------------------------------------------------------------------------------
		// Create a single row to display the book information
		var row = document.createElement( "div" );
		row.className = "row-wrapper";

		// -------------------------------------------------------------------------------------
		// Create an element to hold the row number
		var rowValue = document.createElement( "span" );
		rowValue.className = "row-value";
		$( rowValue ).text( i + 1 );
		$( row ).append( $( rowValue ) );

		// -------------------------------------------------------------------------------------
		// Create an element to hold the book cover thumbnail. Some books may not contain
		// an image, so we need to check if this book object contains the 'imageLinks' 
		// key. If it does not, we need to display a placeholder instead.
		var thumbnail = document.createElement( "img" );
		thumbnail.className = "book-cover";
		thumbnail.src = ( book.hasOwnProperty( "imageLinks" ) ) ? book.imageLinks.smallThumbnail :
																  "images/noCover.png"; 

		$( row ).append( $( thumbnail ) );

		// -------------------------------------------------------------------------------------
		// Create a container to hold the book information.
		var infoContainer = document.createElement( "div" );
		infoContainer.className = "book-info";
		$( row ).append( $( infoContainer ) );

		// -------------------------------------------------------------------------------------
		// Within the info container, create an element to hold the title,
		// author, and publisher text. 
		var title = document.createElement( "h3" ); 
		    authors = document.createElement( "span" ), 
		    publisher = document.createElement( "span" );


		title.className = "book-title";
		authors.className = "book-details book-authors";
		publisher.className = "book-details book-publisher";

		// -------------------------------------------------------------------------------------
		// Some books may not have an author and/or publisher, so we need to
		// check to see if this book object contains the 'authors' and 'publisher'
		// keys respectivelu. If one (or both) do not exist, then we must display 
		// placeholder  text instead (which we can accomplish with easy CSS styling)
		if( book.hasOwnProperty( "authors" ) ){
			$( authors ).text( book.authors );
		} else {
			$( authors ).addClass( "details-unavailable" );
		}// end if / else

		if( book.hasOwnProperty( "publisher" ) ){
			$( publisher ).text( book.publisher );
		} else {
			$( publisher ).addClass( "details-unavailable" );
		}// end if / else

		$( title ).text( book.title );

		$( infoContainer ).append( $( title ) )
						  .append( $( authors ) )
						  .append( $( publisher ) );

		// -------------------------------------------------------------------------------------
		// Create a clickable element that will redirect the user to more
		// information about the book
		var moreInfo = document.createElement( "a" );
		moreInfo.className = "book-more";
		moreInfo.target = "_blank";
		moreInfo.href = book.infoLink;
		$( moreInfo ).text( "View More Information" );
		$( infoContainer ).append( $( moreInfo ) );

		return row;
	}// end function createRow(...)

	/**
	 * -----------------------------------------------------------------------------------------
	 * loadResultsBatch()
	 *
	 * Generates a 'batch' (typically 10) of results per function call. Occassionally, less
	 * items will be produced if the remaining number of items in our data object is less 
	 * than the BATCH_COUNT per function call. Also, no more results can be displayed if we have
	 * reached our MAX_RESULTS value.
	 * -----------------------------------------------------------------------------------------
	 */
	loadResultsBatch = function(){
		// This should only trigger if the 'Load More' button was actually generated in a 
		// previous function call. Hide the 'Load More' button from view...
		$( "#load-more" ).hide();		

		var j = 0;	// Batch counter

		// -------------------------------------------------------------------------------------
		// Use a loop to generate the rows in the results container
		while( j < BATCH_COUNT ){
			resultsContainer.append( 
				createRow( i, booksData.items[ i ].volumeInfo )
			);

			i++;
			j++;

			// ---------------------------------------------------------------------------------
			// If we have run out of books to display, then display "No more results" message
			// and break out of the loop
			if( !hasMoreResults( i ) ){ 
				$( "#load-more" ).remove();

				$( resultsContainer )
					.append( "<em id=\"results-complete\">--- End of results ---</em>" );
				return;
			}// end if
		}// end for(...)

		// -------------------------------------------------------------------------------------
		// If more results exist in our data object, append the 'Load More' button to the
		// bottom of our list again and re-display it.
		$( resultsContainer ).append( $( loadMoreButton ).show() );
	}// end loadResultsBatch()

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
		// -------------------------------------------------------------------------------------
		// Perform an AJAX call to the Google Books API
		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q=" + query + 
				 "&maxResults=" + MAX_RESULTS,
			dataType: 'json',
			success: function( data ){
				console.info("[>] Success : AJAX call to Google Books API");

				// -----------------------------------------------------------------------------
				// This is not necessary, but lets delay for 5 additional seconds
				// since this AJAX call may perform pretty quickly. I just want the
				// loader to display for a bit longer...
				$( "#loader" ).delay( 5000 ).fadeOut( function(){
					// Enable horizontal page scroll, the search input field and button
					$( "html" ).css( "overflow-y", "initial" );
		    		$( "#input-field" ).removeAttr( "disabled" );
    				$( "#search-button" ).removeAttr( "disabled" );

					booksData = data;
					totalItems = booksData.totalItems;

					// -----------------------------------------------------------------------------
					// Suppose the books data is not greater than our MAX_RESULTS count of 40. Then
					// we need to update the MAX_RESULTS, since the maximum number of items to
					// display is equal to the total retrieved items from the AJAX call. This is a 
					// special case!
					if( totalItems < MAX_RESULTS ){
						MAX_RESULTS = totalItems;
					}// end if

					// -----------------------------------------------------------------------------
					// Display information about the search results
					var resultsHeader = document.createElement( "div" );
					resultsHeader.className = "results-header";
					$( resultsHeader ).append( "<h2></h2>" );
					$( resultsContainer ).append( $( resultsHeader ) );

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
					}// end if / else

					// ----------------------------------------------------------------------------
					// Suppose our initial batch is displayed but more items remain in our
					// data object. We should create a 'Load More' button to display after the 
					// last item in the list

					loadResultsBatch();

					if( hasMoreResults( i ) ){
						loadMoreButton = document.createElement( "a" );
						loadMoreButton.id = "load-more";
						$( loadMoreButton ).append( "<span>Load More</span>" )
										   .append( "<i class=\"fas fa-angle-double-down\"></i>" );
						//$( loadMoreButton ).text( "Load More Results" );
						$( loadMoreButton ).on( "click", loadResultsBatch );
						$( resultsContainer ).append( $( loadMoreButton ) );
					}// end if
				});
			}// end fucntion success(...)
		});// end ajax call({...})
	}// end function buildList(...)

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
		$( "#input-field" ).prop( "disabled", true );
		$( "#search-button" ).prop( "disabled", true );

   		// -------------------------------------------------------------------------------------
		// Display some visual (IE loader) to the user to show that the search is underway!
	    var loaderContainer = document.createElement( "div" );
	    loaderContainer.id = "loader";

	    var loaderText = document.createElement( "h1" );
	    $( loaderText ).text( "Searching for '" + query + "'" );
	    $( loaderContainer ).append( $( loaderText ) );
	    $( loaderContainer ).append( "<img src=\"images/loading.png\"/>" );

	    resultsContainer.append( $( loaderContainer ) );

   		// -------------------------------------------------------------------------------------
		// Fade the book results container into view once input is validated
    	resultsContainer.fadeIn( "slow", function(){
		    // Perform the AJAX call and generate the results
		    buildList( query );
    	});   
	}// end function beginSearch()

	/* ======================================================================================= */
	/* ----------------------------------------- MAIN ---------------------------------------- */
	/* ======================================================================================= */

	setSearchFieldTrigger();	// Allow users to hit 'Enter' to begin the search
	centerSearchContainer();	// Center the search box on the page


	$( "#search-container" ).fadeIn( "fast", function(){
		$( ".header-wrapper" ).fadeTo( 1500, 1 );
		$( "#search-button" ).on( "click", function(){
			// If the search error message is already displayed, delete it.
			$( "#search-error" ).remove();

			// ---------------------------------------------------------------------------------
			// Retrieve and verify that the user actually entered in text into the search input 
	   		// field. If not, we cannout actually perform a search. Display and error and
	   		//  request the user enter some valid text!
			var query = validateUserInput();
			if( query.length == 0 ){
				return;
			}// end if

			// ---------------------------------------------------------------------------------
			// When the application loads for the first time, the search container is
			// centered on the page. This centered styling should only occur once, so we need to 
			// animate the search container to the top of the page.
			var currentPosition = $("#search-container").css( "margin-top" )
														.replace( "px", "" );
			if( currentPosition > "100" ){
				$( "#search-container" ).animate(
					{ 'margin-top': '100px' }, 
					{ duration: 1500, queue: false }
				);

				$( ".search-header" ).animate(
					{ 'top': '100' }, 
					{ duration: 1500, queue: false }
				);
			}// end if

			beginSearch( query );
		});
	});
});