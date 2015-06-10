app.directive('product', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/products-directive/productsDirective.html',
		link: function (scope, ele, attr){
			
		}
	};
});


app.controller('ProductDirectiveController', function($scope, productsFactory, $state, AuthService, AdminFactory){
	$scope.editProduct = function(){
		if($scope.adminLoggedIn){
			console.log($scope.product);
			AdminFactory.presentEdit = $scope.product;
			$state.go('editpage');
		}
	};
	

});