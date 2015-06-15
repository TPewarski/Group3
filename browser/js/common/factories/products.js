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


		getByName: function(name) {
			console.log("Hit getName");
			var queryParams = {};
			console.log(name);

			if(name) queryParams.name = name;

			return $http.get('/api/products', {
				params: queryParams
			}).then(function(response) {
				return response.data;
			});
		},

		getByCategories : function(categories) {
			console.log("Hit get from factory");
			var queryParams = {};
			console.log(categories);

			if(categories) queryParams.categories = categories;

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

		getReviews: function(productId){
			var queryParams ={};
			queryParams.product = productId;

			return $http.get('/api/reviews',{
				params: queryParams
			}).then(function(response){
				return response.data
			}, function(err){
				console.log("err", err)
			})
		}

	};
})