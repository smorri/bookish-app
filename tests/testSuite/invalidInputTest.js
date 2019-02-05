module.exports = {
	beforeEach : function( browser, done ){
		console.log( "[+] beforeEach() : Navigate to BookLook" );
		
		browser.globals.booklook = browser.page.booklookPageObject();
		browser.globals.booklook
			.navigate()
			.waitForElementPresent( "body", 2000, "---> Element %s was visible on the page for %d ms" );
		
		done();
	},
	
	afterEach : function( browser, done ){
		console.log( "[+] afterEach() : Teardown" );
		
		browser.end();
		browser.globals.booklook = undefined;
		
		done();	
	},

	"--> No Search Input Triggers Error" : function( browser ){
		browser.globals.booklook.section.searchWrapper
			.input( browser.globals.query.blank )
			.expect.element( "@clearButton" ).to.not.be.visible;
		
		browser.globals.booklook.section.searchWrapper
			.submit();
			
		browser.globals.booklook
			.waitForElementPresent( "@errorText", "---> Element %s was present on the page for %d ms" )
			.assert.containsText( "@errorText", browser.globals.strings.blankInputError );
	},
	
	"--> Only Whitespace Input Triggers Error" : function( browser ){
		browser.globals.booklook.section.searchWrapper
			.input( browser.globals.query.allWhitespace )
			.expect.element( "@clearButton" ).to.be.visible;

		browser.globals.booklook.section.searchWrapper
			.submit()
			.expect.element( "@clearButton" ).to.not.be.visible
			
			
		browser.globals.booklook
			.waitForElementPresent( "@errorText", "---> Element %s was present on the page for %d ms" )
			.assert.containsText( "@errorText", browser.globals.strings.blankInputError );
	}
};