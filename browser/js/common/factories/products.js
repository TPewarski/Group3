app.factory('productsFactory', function($http){
	return {
		getAllProducts : function() {
			$http.get('/GETproducts').
		  success(function(data, status, headers, config) {
		    console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		  	console.log(data);
		  });
		}
	}
})