app.factory('productsFactory', function($http){
	return {
		getAllProducts : function() {
			console.log("Hit get from factory")
			return $http.get('/api/GETproducts/allproducts').
		  success(function(data, status, headers, config) {
		    console.log("data", data);
		  }).
		  error(function(data, status, headers, config) {
		  	console.log(data);
		  });
		}
	}
})