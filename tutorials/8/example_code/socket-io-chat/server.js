var app = require( 'express' )();

app.get( '/', function( request, response ) {
	response.sendFile( __dirname + '/views/index.html' );
} );

var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen( port, host, function() {
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
