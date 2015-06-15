app.factory('productsFactory', function($http){
	return {

		// myQueriesResult: null,

		getAllProducts : function(category) {
			var queryParams = {};

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
				
			}, function(err){
				
			});

		},

		getReviews: function(productId){
			var queryParams ={};
			queryParams.product = productId;
			console.log("made get req for reviews")

			return $http.get('/api/reviews',{
				params: queryParams
			}).then(function(response){
				console.log("resp from getReviews", response)
				return response.data
			}, function(err){
				console.log("err", err)
			})
		},
		submitNewReview: function(review){
			return $http.post('/api/reviews', review)
				.then(function(response){
					console.log("response", response)
					return response.data
				}).catch(function(err){

				})
		}

	};
});
