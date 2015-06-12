app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/item/:theID',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	});
});

app.controller('SingleProductController', function($scope, productsFactory, cartFactory, $stateParams, $state){
	
	productsFactory.getAllProducts().then(function(productsArray) {
		$scope.products = productsArray.data;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				$scope.anItem = aProd;
			}
		});	
		
	});

	$scope.addToCart = function(id){

		// $cookies.put("key", "val");
		cartFactory.add({id:id,quant:1});
	};

});