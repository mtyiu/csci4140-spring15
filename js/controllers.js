var app = angular.module( 'csci4140App', [ 'angular-loading-bar', 'ngAnimate' ] );

app.controller( 'defaultController', function ( $scope, $http ) {
	$scope.download = function( url ) {
		window.open( url, '_blank' );
		ga( 'send', 'event', 'download', url );
	};

	var jsons = [ 'news', 'metadata', 'navs', 'modals', 'tutorials' ];
	for ( var i in jsons ) {
		$http.get( 'json/' + jsons[ i ] + '.json' ).success( function() {
			var key = jsons[ i ];
			return function( data ) {
				$scope[ key ] = data;
			}
		}() );
	}
});

app.filter( 'raw', [ '$sce', function( $sce ){
	return function( val ) {
		return $sce.trustAsHtml( val );
  };
} ] );