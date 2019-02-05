module.exports = {
	beforeEach : function( browser, done ){
		console.log( "[+] beforeEach() : Navigate to BookLook" );
		
		browser.globals.booklook = browser.page.booklookPageObject();
		browser.globals.booklook
			.navigate()
			.waitForElementPresent( "body", 5000, "---> Element %s was present on the page for %d ms" );
		
		done();
	},
	
	afterEach : function( browser, done ){
		console.log( "[+] afterEach() : Teardown" );
		
		browser.globals.booklook = undefined;
		browser.end();
		
		done();	
	},

	"--> Query Displays No Search Results" : function( browser ){
		var query = browser.globals.query.valid.withNoResults;
		var searchWrapper = browser.globals.booklook.section.searchWrapper;
	
		searchWrapper
			.input( query )
			.expect.element( "@clearButton" ).to.be.visible;

		searchWrapper
			.submit();
			
		browser.globals.booklook
			.expect.element( ".input-wrapper" ).to.have.attribute( "data-disabled" );

		var resultsContainer = browser.globals.booklook.section.resultsContainer; 	
			
		resultsContainer
			.waitForElementPresent( "@loader", 5000, "---> Element %s is present" )
			.assert.containsText( 
				"@loader", 
				(browser.globals.strings.loadingMessage).replace( "{query}", query )
			);
				
		resultsContainer	
			.waitForElementNotPresent( "@loader", 10000, "---> Element %s is not present after %d ms" );
			
		browser.globals.booklook
			.expect.element( ".input-wrapper" ).to.not.have.attribute( "data-disabled" );
			
		resultsContainer
			.waitForElementPresent( "@resultsHeaderText", "---> Element %s was present on the page for %d ms" )
			.assert.containsText( 
				"@resultsHeaderText", 
				(browser.globals.strings.noResultsHeader).replace( "{query}", query ) 
			);
	},
	
	"--> Query Displays Less Than the Maximum Number of Results" : function( browser ){
		var query = browser.globals.query.valid.withMinResults;
		var searchWrapper = browser.globals.booklook.section.searchWrapper;
	
		searchWrapper
			.input( query )
			.expect.element( "@clearButton" ).to.be.visible;

		searchWrapper
			.submit();
			
		browser.globals.booklook
			.expect.element( ".input-wrapper" ).to.have.attribute( "data-disabled" );

		var resultsContainer = browser.globals.booklook.section.resultsContainer; 	
			
		resultsContainer
			.waitForElementPresent( "@loader", 5000, "---> Element %s is present" )
			.assert.containsText( 
				"@loader", 
				(browser.globals.strings.loadingMessage).replace( "{query}", query )
			);
				
		resultsContainer	
			.waitForElementNotPresent( "@loader", 10000, "---> Element %s is not present after %d ms" );
			
		resultsContainer
			.waitForElementPresent( "@resultsHeaderText", "---> Element %s was present on the page for %d ms" )
			.assert.containsText(
				"@resultsHeaderText", 
				(browser.globals.strings.resultsHeader).replace( "{query}", query ) 
			);
			
		resultsContainer
			.waitForElementPresent( "@bookRow" );
			
		resultsContainer
			.expect.element( "@loadMoreButton" ).to.not.be.present;
	},
	
	"--> Query Displays the Maximum Number of Results" : function( browser ){
		var query = browser.globals.query.valid.withMaxResults;
		var searchWrapper = browser.globals.booklook.section.searchWrapper;
	
		searchWrapper
			.input( query )
			.expect.element( "@clearButton" ).to.be.visible;

		searchWrapper
			.submit();
			
		browser.globals.booklook
			.expect.element( ".input-wrapper" ).to.have.attribute( "data-disabled" );

		var resultsContainer = browser.globals.booklook.section.resultsContainer; 	
			
		resultsContainer
			.waitForElementPresent( "@loader", 5000, "---> Element %s is present" )
			.assert.containsText( 
				"@loader", 
				(browser.globals.strings.loadingMessage).replace( "{query}", query )
			);
				
		resultsContainer	
			.waitForElementNotPresent( "@loader", 10000, "---> Element %s is not present after %d ms" );
			
		resultsContainer
			.waitForElementPresent( "@resultsHeaderText", "---> Element %s was present on the page for %d ms" )
			.assert.containsText(
				"@resultsHeaderText", 
				(browser.globals.strings.resultsHeader).replace( "{query}", query ) 
			);
			
		resultsContainer
			.waitForElementPresent( "@bookRow" );
			
		resultsContainer
			.expect.element( "@loadMoreButton" ).to.be.present;
			
		resultsContainer
			.click( "@loadMoreButton" );
			
		resultsContainer
			.waitForElementVisible( { selector : ".row-wrapper", index : 3 }, function( result ){} )
			.click( ".book-more" );
	}
};