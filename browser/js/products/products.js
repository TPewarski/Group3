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
		if(productsFactory.myQueriesResult) {
			$scope.products = productsFactory.myQueriesResult;
		} else {
			$scope.products = productsArray;
		}

	AuthService.getLoggedInUser().then(function(user){
		$scope.theUser = user;
		
		if(user) $scope.adminLoggedIn = user.isAdmin;
	});
		


	$scope.selectAndRedirect = function(){
		productsFactory.singleProduct = this.product;
		$state.go('singleProduct');
	};
	

	});

	$scope.searchByName = function(searchBod) {
        productsFactory.getByName($scope.searchBod).then(function(prodArr) {
        	$scope.products = prodArr;
        	console.log("products", $scope.products);
            productsFactory.myQueriesResult = prodArr;
            console.log("thisis", productsFactory.myQueriesResult);
            $state.go("products");
        });
    };


    productsFactory.searchByDescription = function(searchBod) {
        productsFactory.getByCategories($scope.searchBod);
        console.log($scope.searchBod);
        // $state.go("products");
    };
});	
