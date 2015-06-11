app.config(function($stateProvider){
	$stateProvider.state('editpage', {
		url: '/editpage/:theID',
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

app.controller('AdminController', function($scope, AdminFactory, $stateParams, productsFactory, $state) {

	productsFactory.getAllProducts().then(function(productsArray){
		$scope.products = productsArray.data;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				console.log("a Prod", aProd);
				$scope.currentMed = aProd;
			}
		});	

		$scope.submitEdit = function(){
			console.log($stateParams);
			AdminFactory.editProduct($scope.currentMed);
		};
	});


});