app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products',
		controller: 'ProductsController',
		templateUrl: 'js/products/products.html'
	})
})

app.controller('ProductsController', function($scope, productsFactory){
	$scope.products=[" ","3"];
	// productsFactory.getAllProducts().then(function(productsArray){
	// 	$scope.products = productsArray
	// })

})