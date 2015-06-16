app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cartState/cart.html'
	})
});

app.controller('CartController', function($scope, $state, cartFactory, productsFactory, AuthService){

    cartFactory.update();

    cartFactory.getAllCartItems().then(function(data){
        $scope.items = data;
        $scope.totalPrice = cartFactory.totalPrice(data);
        
    });

    AuthService.getLoggedInUser().then(function(user){
        $scope.user = user;
        console.log("user", user) 
        
    })

    $scope.stripeCheckout = function(){
        console.log("user after checkout", $scope.user._id)
        cartFactory.checkout($scope.user._id);
        $state.go('products')
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
