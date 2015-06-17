app.directive('userHistory', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/order-history-directive/orderHistoryDirective.html',
		link: function (scope, ele, attr){
			
			scope.TotalPrice = function(){
				var total = 0;
				scope.order.cart.forEach(function(item){
					total += item.price
				})
				return total
			}
		}
	};
});
