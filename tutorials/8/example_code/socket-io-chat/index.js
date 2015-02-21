var app = require( 'express' )();

app.get( '/', function( request, response ) {
	response.sendFile( __dirname + '/views/index.html' );
} );

var server = app.listen( 4140, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log( 'Listening on http://%s:%s...', host, port );
} );

var io = require( 'socket.io' )( server );
io.on( 'connection', function( socket ) {
	console.log( 'New user connected' );
	socket.on( 'disconnect', function() {
		console.log( 'User disconnected' );
	} );
	socket.on( 'chat', function( data ) {
		console.log( 'Message: ' + data );
		io.emit( 'chat', data );
	} );
} );