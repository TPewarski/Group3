app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cartState/cart.html'
	})
})

app.controller('CartController', function($scope, cartFactory){
	console.log("hello WOrld")
    $scope.items = cartFactory.items

    $scope.totalPrice = cartFactory.totalPrice($scope.items)


});
