app.factory('productsFactory', function($http){
	return {
		getAllProducts : function() {
			$http.get('/api/GETproducts/allproducts').
		  success(function(data, status, headers, config) {
		    console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		  	console.log(data);
		  });
		}
	}
})