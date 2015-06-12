app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cartState/cart.html'
	})
});

app.controller('CartController', function($scope, cartFactory, productsFactory){

    cartFactory.getAllCartItems(cartFactory.get()).then(function(data){
        $scope.items = data;
        $scope.totalPrice = cartFactory.totalPrice(data);
        // $scope.quantityArray = cartFa
    });

    // getAllCartItems.then(function(data){
    //     $scope.items = data
    // })

    // $scope.totalPrice = cartFactory.totalPrice($scope.items);

    $scope.potentialQuantities = function(num){
    	var arr = Array.apply(null, {length: num}).map(Number.call, Number)
    	return arr
    }
    
    $scope.inventoryQuantity = function(productName){
    	// return an array from 0-inventoryQuantity
    	return productsFactory.getInventoryQuantity(productName)
    }
    // $scope.test = $scope.potentialQuantities(5)


});
