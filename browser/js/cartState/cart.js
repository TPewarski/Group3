app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cartState/cart.html'
	})
});

app.controller('CartController', function($scope, $state, cartFactory, productsFactory){

    cartFactory.getAllCartItems(cartFactory.get()).then(function(data){
        $scope.items = data;
        $scope.totalPrice = cartFactory.totalPrice(data);
        
    });

    $scope.deleteCartItem = function(id){
        cartFactory.del(id);
        $scope.$apply(); //WHY WONT THIS WORK
    }

    $scope.updateQuantity = function(id, newQuant){
        cartFactory.updateQuantity(id, newQuant);
    }

    
    $scope.goToProduct = function() {
        console.log($scope.product);
        $state.go('singleProduct', {theID: $scope.item._id});
    };

    $scope.inventoryQuantity = function(productName){
    	
    	return productsFactory.getInventoryQuantity(productName)
    }
    


});
