app.config(function($stateProvider){
	$stateProvider.state('editpage', {
		url: '/editpage',
		controller: 'AdminController',
		templateUrl: 'js/admin/editPage.html',
		data: {authenticate: true}
	});
});

app.factory('AdminFactory', function($http) {
	return {
		editProduct: function(selectedProd) {
			return $http.post('?', selectedProd).
				success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				}).
				error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
		},

		presentEdit: null


	};
});

app.controller('AdminController', function($scope, AdminFactory) {
	$scope.product = AdminFactory.presentEdit;
});