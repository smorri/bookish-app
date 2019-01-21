const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var application = express();

application
	.use( express.static( path.join(__dirname, 'public') ) )
	.set( 'views', path.join( __dirname, 'views' ) )
	.set( 'view-engine', 'ejs' )
	.get( '/', function( req, res ){ 
			res.render( 'pages/index' );
		})
	.listen( PORT, function (){ 
			console.log( 'Listening on port:', PORT ) 
		});