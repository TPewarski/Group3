app.directive('product', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/products-directive/productsDirective.html',
		link: function (scope, ele, attr){
			
		}
	};
});


app.controller('ProductDirectiveController', function($scope, productsFactory, $state, AuthService, AdminFactory, $stateParams){

	console.log("ajflafjaflaf", $scope);

	$scope.editProduct = function(){
		if($scope.adminLoggedIn){
			// console.log($scope.currentMed);
			// AdminFactory.presentEdit = $scope.product;
			$state.go('editpage', {theID: $scope.product._id});
		}
	};
	

});