app.directive('ordermanagement', function(UserFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/order-management-directive/orderManagement.html',
		link: function (scope, ele, attr){
			scope.TotalPrice = function(){
				var total = 0;
				scope.order.cart.forEach(function(item){
					total += item.price
				})
				return total
			};

			scope.setStatusShipped = function(id){
				UserFactory.setStatusShipped(id)
			};

			scope.setStatusClosed = function(id){
				UserFactory.setStatusClosed(id)
			}

		}
	};
});

// app.controller('userHistoryDirectiveController', function($scope, $stateParams, $state){

// });