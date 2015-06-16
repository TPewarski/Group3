app.directive('userHistory', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/order-history-directive/userHistoryDirective.html',
		link: function (scope, ele, attr){
			
		}
	};
});

app.controller('userHistoryDirectiveController', function($scope, $stateParams, $state){

});