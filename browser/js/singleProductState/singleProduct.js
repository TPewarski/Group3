app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/selectedProduct',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	})
})

app.controller('SingleProductController', function($scope, productsFactory){
	$scope.product = productsFactory.singleProduct;

})