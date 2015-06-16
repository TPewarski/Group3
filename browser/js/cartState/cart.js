app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cartState/cart.html'
	})
});

app.controller('CartController', function($scope, $state, cartFactory, productsFactory){

    cartFactory.update();

    cartFactory.getAllCartItems().then(function(data){
        $scope.items = data;
        
        $scope.totalPrice = cartFactory.totalPrice(data);
        
    });


    $scope.stripeCheckout = function(){
        cartFactory.checkout();
    }

    $scope.deleteCartItem = function(id){
        cartFactory.del(id);

    }

    $scope.updateQuantity = function(id, quantity){
        cartFactory.updateOneQuantity(id, quantity);
    }

    
    $scope.goToProduct = function(id) {
        
        $state.go('singleProduct', {theID: id});
    };

    $scope.inventoryQuantity = function(productName){
    	
    	return productsFactory.getInventoryQuantity(productName)
    }
    


});
