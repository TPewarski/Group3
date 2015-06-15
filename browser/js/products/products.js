app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products/',
		controller: 'ProductsController',
		templateUrl: 'js/products/products.html'

	});
});

app.controller('ProductsController', function($scope, productsFactory, $state, AuthService, AdminFactory){
	$scope.theUser;
	$scope.adminLoggedIn;
	$scope.products;
	
	productsFactory.getAllProducts().then(function(productsArray){
			$scope.products = productsArray;

	AuthService.getLoggedInUser().then(function(user){
		$scope.theUser = user;
		
		if(user) $scope.adminLoggedIn = user.isAdmin;
	});

	// $scope.myFinderFilter = function() {
	// 	$scope.products = $scope.products.filter(function(aProduct) {
	// 		if(aProduct.name.indexOf($scope.searchBod) > -1) {
	// 			console.log("it works");
	// 			return true;
	// 		}
	// 		if(aProduct.description.indexOf($scope.searchBod) > -1) return true;
	// 		return false;
	// 	});
	// };

	$scope.selectAndRedirect = function(){
		productsFactory.singleProduct = this.product;
		$state.go('singleProduct');
	};
	

	});

});	
