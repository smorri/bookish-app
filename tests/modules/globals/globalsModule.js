module.exports = {
	booklook : undefined,
	
	query : {
		blank : "",
		allWhitespace : "     ",
		valid : {
			// Query produces the maximum results = 40 items
			withMaxResults : "red",	
			// Query produces < the maximum results = 5 items
			withMinResults : "wewewewewewewewewewewewewewewe",
			// Query produces no results
			withNoResults : "76ewtgfh8989w8e"
		}
	},
	
	strings : {
		pageTitle : "BookLook",
		blankInputError : "Enter some text before performing your search!",
		loadingMessage : "Searching for '{query}'",
		resultsHeader : "Here are the results for '{query}'",
		noResultsHeader : "Sorry - No results exist for '{query}'",
		loadMoreButton : "Load More"
	}
}