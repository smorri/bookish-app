const express = require('express');
const PORT = process.env.PORT || 5000;

var application = express();

application
	.set( 'view-engine', 'ejs' )
	.get( '/', function( req, res ){ 
			res.render( 'pages/index' );
		})
	.listen( PORT, function (){ 
			console.log( 'Listening on port:', PORT ) 
		});