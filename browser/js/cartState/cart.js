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

    $scope.stripeCheckout = function(){
        console.log("CHECKED OUT BOYYYY")
    }

    $scope.deleteCartItem = function(id){
        cartFactory.del(id);
        //$scope.$apply(); //WHY WONT THIS WORK
    }

    $scope.updateQuantity = function(){
        //gotta figure this shit out. fuuuuuuuckkkkkk
    }

    
    $scope.goToProduct = function() {
        console.log($scope.product);
        $state.go('singleProduct', {theID: $scope.item._id});
    };

    $scope.inventoryQuantity = function(productName){
    	
    	return productsFactory.getInventoryQuantity(productName)
    }
    


});
