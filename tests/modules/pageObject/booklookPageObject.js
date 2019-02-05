var searchCommands = {
	input : function( query ){
		return this.waitForElementPresent( "@searchField" )
				   .setValue( "@searchField" , query );
	},
	clear : function(){
		return this.waitForElementPresent( "@clearButton" )
				   .click( "@clearButton" );
	},
	submit : function(){
		return this.waitForElementVisible( "@submitButton" )
				   .click( "@submitButton" );
	}
}

module.exports = {
	url : "https://booklook-app.herokuapp.com/",
	elements: {
		errorText : {
			selector : "#search-error"
		}
	},
	sections : {
		searchWrapper : {
			selector : ".input-wrapper",
			commands : [ searchCommands ],
			elements : {
				searchField : {
					selector : "#input-field"
				},
				clearButton : {
					selector : "#input-clear"
				},
				submitButton : {
					selector : "#search-button"
				}
			}
		},
		resultsContainer : {
			selector : "#results-container",
			elements : {
				loader : {
					selector : "#loader"
				},
				resultsHeaderText : {
					selector : ".results-header h2"
				},
				resultsHeaderTotalsText : {
					selector : ".results-header em"
				},
				bookRow : {
					selector : ".row-wrapper"
				},
				loadMoreButton : {
					selector : "#load-more"
				}
			}
		}
	}
}