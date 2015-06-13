app.factory('productsFactory', function($http){
	return {

		// myQueriesResult: null,

		getAllProducts : function(category) {
			var queryParams = {};
			console.log(category);

			if(category) queryParams.category = category;

			return $http.get('/api/products', {
				params: queryParams
			}).then(function(response) {
				return response.data;
			});
		},

		getProductById : function(id){
			return $http({
				url: '/api/products/'+id,
				method: 'GET',
			}).then(function(data){
				console.log("data", data);
			}, function(err){
				console.log("err", err);
			});

		},

	};
});