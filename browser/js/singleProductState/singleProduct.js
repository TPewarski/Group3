app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/item/:theID',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	});
});

app.controller('SingleProductController', function($scope, productsFactory, cartFactory, $stateParams, $state){
	productsFactory.getAllProducts().then(function(productsArray) {
		$scope.products = productsArray;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				$scope.anItem = aProd;
			}
		});	
		// console.log("an item", $scope.anItem);
	});

	$scope.addToCart = function(){
		var cartItem = {};
		cartItem.product = $scope.product;
		cartItem.quantity = 1;
		cartFactory.items.push(cartItem);
	};

});