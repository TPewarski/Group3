app.factory('productsFactory', function($http){
	return {

		getAllProducts : function() {
			// console.log("Hit get from factory")
			return $http.get('/api/products').
		  success(function(data, status, headers, config) {
		    console.log("data", data);
		  }).
		  error(function(data, status, headers, config) {
		  	console.log(data);
		  });
		},
		getProductById : function(id){
			return $http({
				url: '/api/products/'+id,
				method: 'GET',
			}).then(function(data){
				console.log("data", data)
			}, function(err){
				console.log("err", err)
			})

		}
	}
})