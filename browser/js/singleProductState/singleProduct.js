app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/item/:theID',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	});
});

app.controller('SingleProductController', function($scope, productsFactory, cartFactory, $stateParams, $state){
	$scope.reviews = null;

	productsFactory.getAllProducts().then(function(productsArray) {
		$scope.products = productsArray;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				$scope.anItem = aProd;
			}
		});	
	});

	productsFactory.getReviews($stateParams.theID).then(function(reviews){
		$scope.reviews = reviews;
	})

	$scope.addToCart = function(id){

		// $cookies.put("key", "val");
		cartFactory.add({id:id,quant:1});
	};
	$scope.toggleReviewForm = function(){
		if($scope.showReviewForm === false) $scope.showReviewForm = true;
		$scope.showReviewForm = false;
	}
	
	$scope.showReviewForm = false;


});