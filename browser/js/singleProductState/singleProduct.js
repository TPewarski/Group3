app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/item/:theID',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	});
});

app.controller('SingleProductController', function($scope, productsFactory, cartFactory, $stateParams, $state){
	console.log("i has it", $scope.products);
	productsFactory.getAllProducts().then(function(productsArray) {
		$scope.products = productsArray.data;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				$scope.anItem = aProd;
			}
		});	
		console.log("an item", $scope.anItem);
	});

	$scope.addToCart = function(anItem){
		cartFactory.items.push(anItem);
	};

});