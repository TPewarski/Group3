app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products',
		controller: 'ProductsController',
		templateUrl: 'js/products/products.html'
	});
});

app.controller('ProductsController', function($scope, productsFactory, $state, AuthService, AdminFactory){
	$scope.theUser;
	$scope.adminLoggedIn;
	AuthService.getLoggedInUser().then(function(user){
		$scope.theUser = user;
		$scope.adminLoggedIn = user.isAdmin;
		console.log(user.isAdmin);
	});

	$scope.products;
	productsFactory.getAllProducts().then(function(productsArray){
		$scope.products = productsArray.data;
		console.log("scope.products", $scope.products);
	});


	$scope.selectAndRedirect = function(){
		productsFactory.singleProduct = this.product;
		$state.go('singleProduct');
	};

	// $scope.editProduct = function(){
	// 	if($scope.adminLoggedIn){
	// 		$state.go('editpage');
	// 	}
	// };
	

});