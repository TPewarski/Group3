app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/selectedProduct',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	})
})

app.controller('SingleProductController', function($scope, productsFactory, cartFactory){
	$scope.product = productsFactory.singleProduct;

	$scope.addToCart = function(){
		var cartItem = {}
		cartItem.product = $scope.product
		cartItem.quantity = 1
		// console.log("cartItem", cartItem)
		cartFactory.items.push(cartItem)
		// console.log("cartFactorys.items", cartFactory.items)
	}

})