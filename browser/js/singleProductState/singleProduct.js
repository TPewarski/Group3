app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/item/:theID',
		controller: 'SingleProductController',
		templateUrl: 'js/singleProductState/singleProduct.html'
	});
});

app.controller('SingleProductController', function($scope, productsFactory, AuthService, cartFactory, $stateParams, $state){
	$scope.reviews = null;
	$scope.showReviewForm = false;
	$scope.isLoggedIn = AuthService.isAuthenticated()


	productsFactory.getAllProducts().then(function(productsArray) {
		$scope.products = productsArray;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				$scope.anItem = aProd;
			}
		});	
	});

	productsFactory.getReviews($stateParams.theID).then(function(reviews){
		console.log("reviews from db", reviews)
		console.log($stateParams.theID)
		$scope.reviews = reviews;
	})

	$scope.addToCart = function(id){

		// $cookies.put("key", "val");
		cartFactory.add({id:id,quantity:1});
	};
	$scope.toggleReviewForm = function(){
		console.log("showReviewForm", $scope.showReviewForm)
		if($scope.showReviewForm === false) $scope.showReviewForm = true;
		else $scope.showReviewForm = false;
	}
	

	$scope.getNumber = function(num){
		return new Array(num)
	};

	AuthService.getLoggedInUser().then(function(user){
		if(user){
			$scope.newReview = {
			user: user._id,
			comment: null,
			rating: null,
			product: $stateParams.theID
			}
		}
	});


	$scope.submitNewReview = function(review){
		console.log("review", $scope.newReview)
		productsFactory.submitNewReview(review)
	}





});