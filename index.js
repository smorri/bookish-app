const express = require('express');
const PORT = process.env.PORT || 5000;

var application = express();

application
	.get('/', function( req, res ){ res.send( JSON.stringify({ Hello: 'World'}); ); });
	.listen( PORT, function (){ console.log( 'Listening on $( PORT )' ); } );