app.directive('product', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/products-directive/productsDirective.html',
		link: function (scope, ele, attr){
			
		}
	};
});


app.controller('ProductDirectiveController', function($scope, productsFactory, $state, AuthService, AdminFactory, $stateParams){
	
	$scope.editProduct = function() {
		if($scope.adminLoggedIn){
			$state.go('editpage', {theID: $scope.product._id});
		}
	};
	
	$scope.goToProduct = function() {
		console.log($scope.product);
		$state.go('singleProduct', {theID: $scope.product._id});
	};

});